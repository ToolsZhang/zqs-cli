import * as colors from 'colors/safe';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import * as lodash from 'lodash';
import * as rp from 'request-promise';
import { run } from './cmd';

export async function add(flags: any, answers_?: any) {
  const cwd = process.cwd();
  const exists = await loadExistsPlugins();
  console.log(colors.yellow('已安装 plugin :'));
  console.log('[', colors.green(exists.join(', ')), ']');
  console.log(colors.yellow('正在从github获取 plugin 列表'));
  const choices = await requestPlugins();
  let answers = answers_;
  if (!answers)
    answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'plugin',
        choices: lodash.difference(choices, exists),
        message: '请选择plugin',
      },
    ]);
  flags.plugin = answers.plugin;

  try {
    // yarn
    await run(`yarn add zqs-plugin-${flags.plugin}`, {
      cwd: `${cwd}`,
      stdio: 'inherit',
    });

    // copy default cinfig
    await fse.mkdirp(cwd + `/src/plugins`);
    await fse.copy(
      `node_modules/zqs-plugin-${flags.plugin}/default_config`,
      `${cwd}/src/plugins/${flags.plugin}.ts`
    );

    // success
    console.log('plugin', colors.cyan(flags.plugin), '已被安装');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function remove(flags: any, answers_?: any) {
  const cwd = process.cwd();
  const exists = await loadExistsPlugins();
  console.log(colors.yellow('已安装 plugin :'));
  console.log('[', colors.green(exists.join(', ')), ']');
  let answers = answers_;
  if (!answers)
    answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'plugins',
        choices: exists,
        default: [],
        message: colors.red('移除 plugin'),
      },
    ]);
  flags.plugins = answers.plugins;

  if (!flags.plugins.length) return false;

  try {
    // yarn
    const plugins = flags.plugins
      .map((x: string) => 'zqs-plugin-' + x)
      .join(' ');
    await run(`yarn remove ${plugins}`, {
      cwd: `${cwd}`,
      stdio: 'inherit',
    });

    // remove config
    for (const plugin of flags.plugins)
      await fse.remove(`${cwd}/src/plugins/${plugin}.ts`);

    // success
    console.log('plugin', colors.red(flags.plugins.join(' ')), '已被安装');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function requestPlugins() {
  const url = 'https://api.github.com/users/ToolsZhang/repos';
  const res: any[] = await rp.get(url, {
    json: true,
    headers: {
      'User-Agent': 'Zqs Cli ' + new Date().toISOString(),
    },
  });
  return res
    .filter(x => x.name.startsWith('zqs-plugin-'))
    .map(x => x.name.slice(11));
}

export async function loadExistsPlugins() {
  const cwd = process.cwd();
  const pluginPath = cwd + '/src/plugins';
  if (!fs.existsSync(pluginPath)) return [];
  const files = await fse.readdir(pluginPath);
  return files
    .filter(x => x.endsWith('.ts'))
    .map(x => x.slice(0, x.length - 3));
}
