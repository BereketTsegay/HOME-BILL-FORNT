import { getLocalUser } from '../helpers/auth';
import axios from 'axios';

export default {
	namespaced: true,
	state: {
		currentUser: getLocalUser(),
		auth_error: null,
		permissionSet: [],
		companyInfo: {}
	},
	getters: {
		// get the current user
		currentUser(state) {
			return state.currentUser;
		},
		//gets the auth Errors if availables
		authError(state) {
			return state.auth_error;
		},

	},
	mutations: {
		login(state) {
			state.authError = null;
		},
		loginSuccess(state, payload) {
			(state.auth_error = null), (state.isLoggedIn = true), (state.isLoading = false);


			state.currentUser = Object.assign(
				{},
				payload.user,
				{
					token: payload.access_token
				}
			);
			axios.defaults.headers.common['Authorization'] = `Bearer ${state.currentUser.token}`;
			localStorage.setItem('user', JSON.stringify(state.currentUser));
		},
		loginFailed(state, payload) {
			state.auth_error = payload;
		},
		logout(state) {
			state.currentUser = null;
			localStorage.removeItem('user');
			localStorage.clear();
		},	 
	},
	actions: {
		login(contex, credentials) {
			return new Promise((res, rej) => {
				axios
					.post('/api/auth/login', credentials)
					.then((response) => {
						contex.commit('loginSuccess', response.data);
						res(response.data);
					})
					.catch((error) => {
						rej(error.response.data.error);
						contex.commit('loginFailed', error.response.data.error);
					});
			});
		},
	}
};
