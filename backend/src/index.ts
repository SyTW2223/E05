import express from 'express';
import './db/mongoose';
import {postRouter} from './routers/post';
import {getRouter} from './routers/get';
import {patchRouter} from './routers/patch';
import {deleteRouter} from './routers/delete';
import {defaultRouter} from './routers/default';

const cors = require("cors");
const app = express();

app.use(cors({
  origin:"http://localhost:8080"
}));

app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(deleteRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port http://localhost:${port}`);
});
