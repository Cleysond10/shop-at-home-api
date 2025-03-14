import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizantionToSignInPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const signInPayload = authorizantionToSignInPayload(authorization);

  return signInPayload?.id;
});
