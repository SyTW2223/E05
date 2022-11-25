import {MongoClient} from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'story-app';

MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);
  console.log(db.databaseName);
}).catch((error) => {
  console.log(`Unable to connect to database: ${error.message}`);
});