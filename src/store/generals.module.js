
export default{
    state:{
        loaderCounter:0,
        isOnline:true,
        IsCastingAvailable:false,
        isCasting:{},
        snackbar: {
			message: '',
			color: '',
			snackbar: false,
			timeout: 3000
		},
    },
    getters:{
        getLoaderCounter(state){
            return state.loaderCounter;
        },
        getIsOnline(state){
            return state.isOnline;
        },
        getSnackbar(state) {
			return state.snackbar;
		},
        getIsCasting(state) {
			return state.isCasting;
		},
        getIsCastingAvailable(state) {
			return state.IsCastingAvailable;
		},
       
    },
    mutations:{
        // set the online state depending on the internet connection
        setIsOnline(state, payload) {
			state.isOnline = payload;
		},
        setCastingAvailable(state, payload) {
			state.IsCastingAvailable = payload;
		},
        setIsCasting(state, payload) {
			state.isCasting = Object.assign({}, payload);
		},
    

        //snack bar
        setSnackbar(state, payload) {
			state.snackbar = Object.assign({}, payload);
		},
    },

}
