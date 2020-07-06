import * as args from 'args';
import * as index from '../src/index';

jest.mock('../src/new.ts', () => {
  return {
    newProject: (flags: any) => flags,
  };
});

jest.mock('../src/api.ts', () => {
  return {
    add: (flags: any) => flags,
  };
});

jest.mock('../src/plugin.ts', () => {
  return {
    add: (flags: any) => flags,
    remove: (flags: any) => flags,
  };
});

describe('Index', () => {
  it('should have startProgram available', () => {
    expect(index.startProgram).toBeTruthy();
  });
  it('should test new project', () => {
    expect(index.startProgram(['node', 'ycs', '-n'])).toMatchObject({
      new: true,
      n: true,
    });
    expect(
      index.startProgram(['node', 'ycs', '-n', 'helloWorld'])
    ).toMatchObject({
      new: 'helloWorld',
      n: 'helloWorld',
    });
  });
  it('should test new api', () => {
    expect(index.startProgram(['node', 'ycs', '-a'])).toMatchObject({
      apiAdd: true,
      a: true,
    });
  });
  it('should add new plugin', () => {
    expect(index.startProgram(['node', 'ycs', '-p'])).toMatchObject({
      pluginAdd: true,
      p: true,
    });
  });
  it('should remove a plugin', () => {
    expect(index.startProgram(['node', 'ycs', '-P'])).toMatchObject({
      pluginRemove: true,
      P: true,
    });
  });
  it('should return flags', () => {
    expect(index.startProgram(['node', 'ycs'])).toMatchObject({});
  });
});
