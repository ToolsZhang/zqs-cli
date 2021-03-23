import * as colors from 'colors/safe';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import { run } from './cmd';

export async function newProject(flags: any, answers_?: any) {
  // 返回node进程工作目录
  const cwd = process.cwd();
  if (flags.new === true) {
    let answers = answers_;
    if (!answers)
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'new',
          default: 'helloWorld',
          message: '项目名称',
        },
        {
          type: 'confirm',
          name: 'overwrite',
          default: false,
          message: (answers: any) => colors.red(`覆盖 ${cwd}/${answers.new}`),
          when: (answers: any) => fs.existsSync(`${cwd}/${answers.new}`),
        },
      ]);
    flags.new = answers.new;
    flags.overwrite = answers.overwrite;
  }

  if (flags.overwrite === false) return false;

  try {
    // remove exists
    if (flags.overwrite === true) {
      await fse.remove(`${cwd}/${flags.new}`);
    }

    // clone git/gitee repo

    // const github_repo = 'git clone https://github.com/ToolsZhang/zqs-base.git';
    const gitee_repo = 'git clone https://gitee.com/ToolsZhang/zqs-base.git';
    await run(`${gitee_repo} ${flags.new}`, {
      cwd: cwd,
      stdio: 'inherit',
    });

    // rm .git
    await fse.remove(`${cwd}/${flags.new}/.git`);

    // npm install
    await run('npm install', {
      cwd: `${cwd}/${flags.new}`,
      stdio: 'inherit',
    });

    // success
    console.log('已新建', colors.cyan(flags.new));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
