
import axios from 'axios';

export function initialize(store, router) {
	router.beforeEach((to, from, next) => {
		const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
		const currentUser = store.getters['auth/currentUser'];
	
		if (requiresAuth && !currentUser) {
			next('/auth');
		}  
		else if (to.path == '/auth' && !!currentUser) {
			next('/');
		} else {
			next();
		}
	});

	//Check this later this is logging people out even though they are authenticated. This code is for authorization not authentication
	axios.interceptors.response.use(null, (error) => {
		console.log(error);
		if (error.response && error.response.status == 401) {
			localStorage.clear();
			store.commit('logout');
			if (window.location.pathname != '/auth')
				router.push({
					path: '/auth',
					query: { redirect: window.location.pathname }
				});
		}
		return Promise.reject(error);
	});

	if (store.getters.currentUser) {
		let currentUser = store.getters.currentUser;
		setAuthorization(currentUser ? currentUser.token : null);
	}
}

export function setAuthorization(token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
