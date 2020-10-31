#!/usr/bin/env node

'use strict'

const main = () => {
  const { argv } = process
  const [, , ...args] = argv
  console.log(args.join(' '))
}

main()
