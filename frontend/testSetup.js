import { createServer} from 'http';

module.exports = async () => {
  const app = require("../backend/src/server");
  server = createServer(app);
  server.listen(done);
};