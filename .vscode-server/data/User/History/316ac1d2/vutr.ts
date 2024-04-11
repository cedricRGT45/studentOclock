import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import router from './routers/index'


const port = process.env.PORT ?? 3000
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd() + '/views'));

app.use(router)

app.listen(port, ()=>{
  console.log(`server ready at http://localhost:${port}`)
})



