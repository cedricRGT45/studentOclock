import {Router} from 'express';
import {getHelloView} from '../controllers/helloController.ts';
const router = Router();

router.get('/, getHelloView')