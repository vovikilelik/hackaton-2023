import { authorizeTask } from '../../v1/tasks/auth';

export class AuthApi {
    authorize(username, password) {
        return authorizeTask({ username, password });
    }
}

export const authApi = new AuthApi();