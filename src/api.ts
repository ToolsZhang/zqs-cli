import * as colors from 'colors/safe';
import * as eac from 'english-article-classifier';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as lodash from 'lodash';
import * as inquirer from 'inquirer';
import * as pluralize from 'pluralize';
import { run } from './cmd';

export async function add(flags: any, answers_?: any) {
    const cwd = process.cwd();
    let answers
    if (!answers_)
        answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'model',
                default: 'sample',
                message: 'model 名称'
            },
            {
                type: 'input',
                name: 'endpoint',
                default: (answer: any) => `/api/${pluralize(answer.model)}`,
                message: '路由地址'
            },
            {
                type: 'input',
                name: 'path',
                default: (answer: any) => `${cwd}/src/api/${answer.model}`,
                message: '所在路径',
                validate: input => {
                    if (fs.existsSync(input))
                        return colors.red(`API Path ${input} already exits`);
                    return true;
                }
            }
        ]);
    else answers = answers_;
    flags.model = answers.model;
    flags.endpoint = answers.endpoint;
    flags.path = answers.path;

    try {
        //mkdir
        await fse.mkdirp(flags.path);

        //readfile
        const controllerTmp = await fse.readFile(
            __dirname + `/../templates/api/controller.ts`
        );
        const modelTmp = await fse.readFile(
            __dirname + `/../templates/api/model.ts`
        );
        const routerTmp = await fse.readFile(
            __dirname + `/../templates/api/routers.ts`
        );

        // prepare options
        const modelUppercase = lodash.capitalize(flags.model);
        const options: any = {
            model: flags.model,
            modelUppercase: modelUppercase,
            modelUppercasePlural: pluralize(modelUppercase),
            article: eac.classifyArticle(flags.model).type,
            endpoint: flags.endpoint
        };

        //render template
        const controller = lodash.template(controllerTmp.toString())(options);
        const model = lodash.template(modelTmp.toString())(options);
        const router = lodash.template(routerTmp.toString())(options);

        // output files
        await fse.outputFile(`${flags.path}/controller.ts`, controller);
        await fse.outputFile(`${flags.path}/model.ts`, model);
        await fse.outputFile(`${flags.path}/router.ts`, router);


        // success
        console.log('Your Api', colors.cyan(flags.model), 'has been created');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }

}