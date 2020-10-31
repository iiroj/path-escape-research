const execa = require('execa')

// prettier-ignore
const ARGS = ['test/file.js', 'test/{file.js}', 'test/file with spaces.js']
// prettier-ignore
const ARGS_SINGLE_QUOTES = ["'test/file.js'", "'test/{file.js}'", "'test/file with spaces.js'"]
// prettier-ignore
const ARGS_DOUBLE_QUOTES = ['"test/file.js"', '"test/{file.js}"', '"test/file with spaces.js"']
// prettier-ignore
const ARGS_ESCAPED = ['test\/file.js', 'test\/\{file.js\}', 'test\/file\ with\ spaces.js']
// prettier-ignore
const ARGS_ESCAPED_DOUBLE_SPACES = ['test\/file.js', 'test\/\{file.js\}', 'test\/file\\ with\\ spaces.js']

describe('execa (shell)', () => {
  const cmd = (args) => execa('prettier', ['--check', ...args], { all: true, shell: true })

  it('should fail with no escaping', async () => {
    await expect(cmd(ARGS)).rejects.toThrowErrorMatchingInlineSnapshot(`
            "Command failed with exit code 2: prettier --check test/file.js test/{file.js} test/file with spaces.js
            [error] No files matching the pattern were found: \\"test/{file.js}\\".
            [error] No files matching the pattern were found: \\"test/file\\".
            [error] No files matching the pattern were found: \\"with\\".
            [error] No files matching the pattern were found: \\"spaces.js\\".
            Checking formatting...
            All matched files use Prettier code style!"
          `)
  })

  it('should fail with single quotes', async () => {
    await expect(cmd(ARGS_SINGLE_QUOTES)).rejects.toThrowErrorMatchingInlineSnapshot(`
            "Command failed with exit code 2: prettier --check 'test/file.js' 'test/{file.js}' 'test/file with spaces.js'
            [error] No files matching the pattern were found: \\"test/{file.js}\\".
            Checking formatting...
            All matched files use Prettier code style!"
          `)
  })

  it('should fail with double quotes', async () => {
    await expect(cmd(ARGS_DOUBLE_QUOTES)).rejects.toThrowErrorMatchingInlineSnapshot(`
            "Command failed with exit code 2: prettier --check \\"test/file.js\\" \\"test/{file.js}\\" \\"test/file with spaces.js\\"
            [error] No files matching the pattern were found: \\"test/{file.js}\\".
            Checking formatting...
            All matched files use Prettier code style!"
          `)
  })

  it('should fail with escaped characters', async () => {
    await expect(cmd(ARGS_ESCAPED)).rejects.toThrowErrorMatchingInlineSnapshot(`
            "Command failed with exit code 2: prettier --check test/file.js test/{file.js} test/file with spaces.js
            [error] No files matching the pattern were found: \\"test/{file.js}\\".
            [error] No files matching the pattern were found: \\"test/file\\".
            [error] No files matching the pattern were found: \\"with\\".
            [error] No files matching the pattern were found: \\"spaces.js\\".
            Checking formatting...
            All matched files use Prettier code style!"
          `)
  })

  it('should fail with escaped characters (double spaces)', async () => {
    await expect(cmd(ARGS_ESCAPED_DOUBLE_SPACES)).rejects.toThrowErrorMatchingInlineSnapshot(`
            "Command failed with exit code 2: prettier --check test/file.js test/{file.js} test/file\\\\ with\\\\ spaces.js
            [error] No files matching the pattern were found: \\"test/{file.js}\\".
            Checking formatting...
            All matched files use Prettier code style!"
          `)
  })
})
