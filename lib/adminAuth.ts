import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = 'admin_session';
const SESSION_VERSION = 'red-shadow-admin-session-v1';

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error('ADMIN_PASSWORD is not configured');
  }

  return password;
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function createAdminSessionToken() {
  return createHmac('sha256', getAdminPassword())
    .update(SESSION_VERSION)
    .digest('base64url');
}

export function isValidAdminPassword(password: unknown) {
  if (typeof password !== 'string' || password.length === 0) {
    return false;
  }

  const expected = Buffer.from(getAdminPassword());
  const received = Buffer.from(password);

  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function isValidAdminSession(token: string | undefined) {
  if (!token) {
    return false;
  }

  const expected = Buffer.from(createAdminSessionToken());
  const received = Buffer.from(token);

  return expected.length === received.length && timingSafeEqual(expected, received);
}
