import { SignInPayloadDto } from '../auth/dtos/sign-in-payload.dto';

export const authorizantionToSignInPayload = (
  authorization: string,
): SignInPayloadDto | undefined => {
  const authorizationSplited = authorization.split('.');

  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );
};
