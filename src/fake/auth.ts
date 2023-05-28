import { Auth } from '../store/types';

export const USERS: Auth[] = [
	{
		username: 'default',
		nicname: 'Пользователь',
		userType: 'user',
		serverToken: 'x'
	},
	{
		nicname: 'Персик',
		username: 'user',
		userType: 'user',
		serverToken: 'x'
	},
	{	
		nicname: 'Школа',
		username: 'group',
		userType: 'group',
		serverToken: 'x'
	},
];

export const getUserByUsername = username => USERS.find(user => user.username === username);