const execa = require('execa')

const ARGS = ['"test/file.js"', '"test/{file.js}"', '"test/file\\ with\\ spaces.js"']

describe('execa (shell)', () => {
  const cmd = (args) => execa('prettier', ['--check', ...args], { all: true, shell: true })

  it('should run prettier', async () => {
    await expect(cmd(ARGS)).resolves.toMatchInlineSnapshot()
  })
})
