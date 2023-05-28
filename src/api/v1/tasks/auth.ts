import { join } from "@vovikilelik/task-queue-ts"
import { fakeResolve } from "../../../fake/fakeFetch";
import { Auth } from "../../../store/types";
import { getUserByUsername } from '../../../fake/auth';

export interface AuthorizePayload {
  username: string;
  password: string;
}

export interface TokenPayload {
  username: string;
  localToken: string;
}

export const authorizeTask = join<AuthorizePayload>(
  ({ username }) => {
    const user = getUserByUsername(username);
    return user ? fakeResolve<Auth>({ ...user, localToken: user?.serverToken }, 1000) : Promise.reject();
  }
);

export const localTokenTask = join<TokenPayload>(({ username, localToken }) => fakeResolve<Auth>({ username: username || 'x', serverToken: 'x', localToken: 'x' }, 1000));