import * as dotenv from "dotenv";
import express from "express";
import path from "node:path";

dotenv.config();
console.log('PORT', process.env.PORT);
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.resolve(process.cwd() + '/src/views'))