import * as args from 'args';
import { newProject } from './new';
import { add as addApi } from './api';
import { add as addPlugin, remove as removePlugin } from './plugin';

export function startProgram(argv: string[]): any {
  args
    .option('new', '创建一个新的Zqs项目')
    .option('api-add', '添加 api')
    .option('plugin-add', '添加 plugin')
    .option('plugin-remove', '移除 plugin');
  const flags = args.parse(argv);

  if (flags.n) return newProject(flags);
  if (flags.a) return addApi(flags);
  if (flags.ap) return addPlugin(flags);
  if (flags.rp) return removePlugin(flags);
  return flags;
}
