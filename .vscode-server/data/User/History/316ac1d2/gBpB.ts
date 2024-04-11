import express from "express";
import path from "node:path";
import router from "./rooters/index";

console.log('PORT', process.env.PORT);
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.resolve(process.cwd() + '/src/views'))

app.listen( process.env.PORT ?? 3000, ()=>{
    console.log("server ready at htt")
})