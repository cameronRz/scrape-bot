import { Request, Response } from 'express';

export class AskController {
  public ask(req: Request, res: Response) {
    res.json({ message: 'AskController index' });
  }
}