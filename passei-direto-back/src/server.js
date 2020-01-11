import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { endpoints } from './endpoints/index';
import consoleLogger from './utils/logger';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded());
app.use('/upload', express.static(__dirname + '/upload'));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

endpoints(app);

app.listen(port, () => {
  consoleLogger.info(`- - - - - - - - - - - - - - - - - - - -`);
  consoleLogger.info(`-    Server running on port ${port}      -`);
  consoleLogger.info(`- - - - - - - - - - - - - - - - - - - -`);
});
