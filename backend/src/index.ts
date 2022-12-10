import {app} from './app';

const cors = require("cors");

app.use(cors({
  origin:"http://localhost:8080"
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port http://localhost:${port}`);
});
