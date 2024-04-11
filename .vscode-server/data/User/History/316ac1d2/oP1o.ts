import { express} from "express";
import {dotenv/config} from "dotenv";
import {path} from "node:path";

dotenv.config();

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.resolve(process.cwd() + '/src/views'))