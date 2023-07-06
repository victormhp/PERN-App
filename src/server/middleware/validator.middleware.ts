import { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';

type RequestLocation = 'body' | 'params' | 'query';

export function requestValidator(location: RequestLocation, schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let data: z.infer<typeof schema>;

    switch (location) {
      case 'body':
        data = req.body;
        break;
      case 'params':
        data = req.params;
        break;
      case 'query':
        data = req.query;
        break;
    }

    try {
      await schema.parseAsync(data);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errorName: 'BAD REQUEST',
          errorMessage: 'The server cannot process the request due to an apparent client error.',
          errorRawIssues: err.issues,
        });
      }
      return res.status(400).json(err);
    }
  };
}
