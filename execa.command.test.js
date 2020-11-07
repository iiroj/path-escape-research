const execa = require('execa')

const ARGS = ['test/file.js', 'test/{file.js}', 'test/file\\ with\\ spaces.js']

describe('execa.command', () => {
  const cmd = (args) => execa.command(`prettier --check ${args.join(' ')}`, { all: true })

  it('should run prettier', async () => {
    await expect(cmd(ARGS)).resolves.toMatchInlineSnapshot()
  })
})
