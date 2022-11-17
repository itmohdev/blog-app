import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const StatusUser = createParamDecorator(
  (data: boolean, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    return user.status === data;
  },
);
