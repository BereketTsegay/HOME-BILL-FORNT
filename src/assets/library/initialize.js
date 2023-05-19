import axios from 'axios';
export function initialize(store, router) {
	router.beforeEach((to, from, next) => {
		const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
		const currentUser = store.getters.currentUser;
		// const reg_step = !!localStorage.getItem('step')
		// 	? Number(localStorage.getItem('step'))
		// 	: !!currentUser && !!currentUser.reg_step ? currentUser.reg_step : null;
		// const subscription = !!currentUser ? currentUser.active_subscription : null;

		// let paths = [];
		// let excludPaths = [ '/password/reset', '/verify-email', '/invitation' ];
		// if (currentUser) paths = [ '/singup/'+ to.params.id ];

		// if (subscription) {
		// 	if (
		// 		!!subscription.plan_expiry &&
		// 		Date.parse(subscription.plan_expiry.toString()) < Date.now() &&
		// 		Boolean(subscription.is_subscribed) == false &&
		// 		to.path !== '/settings/billing' &&
		// 		to.path !== '/login'
		// 	) {
		// 		console.log(Boolean(store.state.is_subscribed));
		// 		next('/settings/billing');
		// 	}
		// }

		if (requiresAuth && !currentUser) {
			next('/login');
		} else if (to.path == '/login' && !!currentUser) {
			next('/');
		} else {
			next();
		}
	});

	//Check this later this is logging people out even though they are authenticated. This code is for authorization not authentication
	axios.interceptors.response.use(null, (error) => {
		if (error.response && error.response.status == 401) {
			localStorage.clear();
			store.commit('logout');
			if (window.location.pathname != '/login')
				router.push({
					path: '/login',
					query: { redirect: window.location.pathname }
				});
		}
		return Promise.reject(error);
	});

	if (store.getters.currentUser || store.getters.getTenant) {
		let email = '';
		let currentUser = store.getters.currentUser;
		if (currentUser) {
			currentUser.company_email ? (email = currentUser.company_email) : (email = currentUser.email);
		} else if (store.getters.getTenant) email = store.getters.getTenant.email;

		// console.log("From store's current User", currentUser, '==\n');
		let session_id = currentUser ? currentUser.session_id : '123456789954';
		setAuthorization(currentUser ? currentUser.token : null, email, session_id);
	}
}

export function setAuthorization(token, email, session_id = null) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	if (email !== undefined) axios.defaults.headers.common['email'] = `${email}`;
	if (session_id) axios.defaults.headers.common['session_id'] = `${session_id}`;
}
