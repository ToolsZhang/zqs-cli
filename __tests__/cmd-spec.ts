import * as cmd from '../src/cmd';

describe('Cmd', () => {
  it('should execute success', async () => {
    try {
      const c = await cmd.run('ls -l');
      console.log(c);
      expect(c).toBeFalsy();
    } catch (e) {
      console.log(e);
    }
  });
  it('should execute failed', async () => {
    let err;
    try {
      await cmd.run('ls -l not_exists');
    } catch (e) {
      err = e;
    }
    expect(err.message).toMatch(/ls process exited with code/);
  });
  it('should throw an error', async () => {
    let err;
    try {
      await cmd.run('some_cmd_not_exists');
    } catch (e) {
      err = e;
    }
    expect(err.message).toBe('spawn some_cmd_not_exists ENOENT');
  });
});
