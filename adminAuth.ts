import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = 'admin_session';

function getRequiredEnv(name: 'ADMIN_PASSWORD' | 'ADMIN_SESSION_SECRET') {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

function getAdminPassword() {
  return getRequiredEnv('ADMIN_PASSWORD');
}

function getSessionSecret() {
  return getRequiredEnv('ADMIN_SESSION_SECRET');
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function createAdminSessionToken() {
  return createHmac('sha256', getSessionSecret())
    .update(getAdminPassword())
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
