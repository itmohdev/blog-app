import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class IsAuth implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getResponse();
    return request.isAuthenticated();
  }
}
