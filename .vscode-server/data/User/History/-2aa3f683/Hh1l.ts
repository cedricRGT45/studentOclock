import {Request, Response} from 'express';

function getHelloView(req: Request, res:Response){
res.render('home')
}