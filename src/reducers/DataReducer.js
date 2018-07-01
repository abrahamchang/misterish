export default (state, action) => {
	switch (action.type) {
		case 'data_load':
			return { ...state, data: action.payload };
			break;
		case 'home_data_download':
			return { ...state, data: action.payload.data, loading: false, user: action.payload.user };
			break;
		default:
			if (state === undefined) {
				return null;
			}
			return state;
	}
};