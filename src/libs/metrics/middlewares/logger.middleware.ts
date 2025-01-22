import { v4 as uuidV4 } from 'uuid';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    req.headers = {
      ...req.headers,
      'X-Tracker-ID': uuidV4(),
    };

    next();
  }
}
