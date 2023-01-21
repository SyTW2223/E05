const { setup: setupDevServer } = require('jest-dev-server');

module.exports = async function globalSetup() {
  await setupDevServer({
    command: `node ../backend/src/server.js --port=3000`,
    launchTimeout: 50000,
    port: 3000,
  })
  // Your global setup
}