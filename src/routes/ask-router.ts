import { Router } from 'express';
import { AskController } from '../controllers/ask-controller';
import { body } from 'express-validator';

const router = Router();
const askController = new AskController();
const askValidator = body('question').isString().notEmpty().escape();

router.post('/', askValidator, askController.ask);

export default router;