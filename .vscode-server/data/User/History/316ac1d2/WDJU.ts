import * as dotenv from "dotenv";
import express from "express";
import { path } from "node:path";
console.log(process.env.PORT)
dotenv.config();

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.resolve(process.cwd() + '/src/views'))