import {Router} from 'express';
import {getHelloView} from '../controllers/helloController';

const router = Router();

router.get('/', getHelloView)

export  default router;