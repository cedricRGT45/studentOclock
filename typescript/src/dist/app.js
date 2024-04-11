var _a, _b;
import 'dotenv/config';
import express from "express";
import path from "node:path";
import router from "./rooters/index";
console.log('PORT', process.env.PORT);
const app = express();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd() + '/src/views'));
app.use(router);
app.listen((_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000, () => {
    console.log(`server ready at http://localhost:${port}`);
});
