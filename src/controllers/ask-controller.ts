import { Request, Response } from 'express';
import { XataService } from '../services/xata-service';

const xataService = new XataService();

export class AskController {
  async ask(req: Request, res: Response) {
    const question = req.body.question;
    const result = await xataService.ask(question);

    res.json(result);
  }
}