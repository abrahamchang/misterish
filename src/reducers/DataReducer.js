export default (state, action) => {
	switch (action.type) {
		case 'data_load':
			return { ...state, data: action.payload };
			break;
		case 'home_data_download':
			return { ...state, data: action.payload.data, loading: false, user: action.payload.user };
			break;
		case 'mistery_of_the_day':
			return { ...state, mistOfDay: action.payload };
			break;
		default:
			if (state === undefined) {
				return null;
			}
			return state;
	}
};