import {Request, Response} from 'express';

function getHelloView(req: Request, res:REsponse){
res.render('home')
}