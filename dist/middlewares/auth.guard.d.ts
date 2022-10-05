/// <reference types="@types/express" />
import { NextFunction, Request, Response } from 'express';
export declare function authGuard(req: Request & {
    user: any;
}, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.guard.d.ts.map