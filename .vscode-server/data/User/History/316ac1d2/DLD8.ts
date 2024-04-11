import { Express} from "express";
import {dotenv/config} from "dotenv";
import {path} from "node:path";

dotenv.config();

app.set('view engine', 'ejs')
app.set('views, path.resolve(process.cwd() + '/src/views'))