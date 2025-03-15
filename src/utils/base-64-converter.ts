import { SignInPayloadDTO } from '../auth/dtos/sign-in-payload.dto';

export const authorizationToSignInPayload = (
  token: string,
): SignInPayloadDTO | undefined => {
  const parts = token.split('.');

  if (parts.length < 3 || !parts[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(parts[1], 'base64').toString('ascii'),
  );
};
