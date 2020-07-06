import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import * as rp from 'request-promise';
import * as cmd from '../src/cmd';
import { add, remove } from '../src/plugin';

jest.mock('../src/cmd.ts', () => {
  return {
    run: jest.fn(),
  };
});

jest.mock('inquirer');
jest.mock('fs-extra', () => {
  return {
    remove: jest.fn(),
    mkdirp: jest.fn(),
    copy: jest.fn(),
    readdir: jest.fn(),
  };
});

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
  };
});
jest.mock('request-promise', () => {
  return {
    get: jest.fn(),
  };
});

console.log = jest.fn();
console.error = jest.fn();

describe('New plugin', () => {
  (rp as any).get.mockImplementation(() => {
    return Promise.resolve([
      { name: 'zqs-plugin-a' },
      { name: 'zqs-plugin-b' },
      { name: 'zqs-plugin-c' },
    ]);
  });
  it('should add a plugin', async () => {
    const flags = { pluginAdd: true };
    const res = await add(flags, { plugin: 'a' });
    expect(res).toBe(true);
  });
  it('should add a plugin with exists', async () => {
    const flags = { pluginAdd: true };
    (fs as any).existsSync.mockImplementationOnce(() => true);
    (fse as any).readdir.mockImplementationOnce(() =>
      Promise.resolve(['b.ts', 'c.ts'])
    );
    const res = await add(flags, { plugin: 'a' });
    expect(res).toBe(true);
  });

  // it('should throw errors', async () => {
  //   (cmd as any).run.mockImplementationOnce(() =>
  //     Promise.reject(new Error('throws errors'))
  //   );
  //   const flags = { pluginAdd: true };
  //   const res = await add(flags);
  //   expect(res).toBe(false);
  // });
});

describe('Remove plugin', () => {
  it('should remove a plugin', async () => {
    const flags = { pluginRemove: true };
    const res = await remove(flags, { plugins: ['a'] });
    expect(res).toBe(true);
  });

  it('should not remove plugins', async () => {
    const flags = { pluginRemove: true };
    const res = await remove(flags, { plugins: [] });
    expect(res).toBe(false);
  });

  // it('should throw errors', async () => {
  //   (cmd as any).run.mockImplementationOnce(() =>
  //     Promise.reject(new Error('throws errors'))
  //   );
  //   const flags = { pluginRemove: true };
  //   (inquirer as any).setAnswers({ plugins: ['a'] });
  //   const res = await remove(flags);
  //   expect(res).toBe(false);
  // });
});
