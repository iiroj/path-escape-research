const execa = require('execa')

const ARGS = ['test/file.js', 'test/{file.js}', 'test/file\\ with\\ spaces.js']

describe('execa', () => {
  const cmd = (args) => execa('prettier', ['--check', ...args], { all: true })

  it('should run prettier', async () => {
    await expect(cmd(ARGS)).resolves.toMatchInlineSnapshot()
  })
})
