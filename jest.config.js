// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to Next.js app to load next.config.js
  dir: './'
})

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  /**
   * Custom config goes here, I am not adding it to keep this example simple.
   * See next/jest examples for more information.
   */
 }

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    // The regex below is just a guess, you might tweak it
    'node_modules/(?!(react-markdown|rehype-raw|remark-gfm)/)',
  ]
})