import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const UserRoleDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userRole = req.user?.role;
    const isPermission = data === userRole;
    if (isPermission) false;
    return true;
  },
);
