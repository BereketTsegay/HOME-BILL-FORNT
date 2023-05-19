import axios from 'axios';


export function login(credentials) {
	return new Promise((res, rej) => {
		console.log(axios.defaults.baseURL);
		axios
			.post('/api/auth/login', credentials)
			.then((response) => {

				res(response.data);
			})
			.catch((error) => {
				rej(error.response.data.error);
			});
	});
}

export function getLocalUser() {
	const localUser = localStorage.getItem('user');
	if (!localUser) {
		return null;
	}
	return JSON.parse(localUser);
}

