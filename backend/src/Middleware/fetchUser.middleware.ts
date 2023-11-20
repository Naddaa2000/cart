import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class FetchUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).send('Invalid credentials');
    }

    try {
      const data = jwt.verify(token, 'nada123');
      console.log(req);
      req = data.user;

      // req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ message: error.message });
      console.log('Error executing request:', error.message);
    }
  }
}
