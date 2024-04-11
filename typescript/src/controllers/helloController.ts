import {Request, Response} from 'express';

export function getHelloView(req: Request, res:Response){
res.render('home')
}