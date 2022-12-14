import {connect} from 'mongoose';

const databaseURL = 'mongodb+srv://my-story-app:storyapp@cluster0.f1buatx.mongodb.net/SyTW';

connect(databaseURL, {
  autoIndex: true,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});