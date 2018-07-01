export default (state, action) => {
	switch (action.type) {
		case 'reload_home':
			return { ...state, reload: action.payload };
			break;
		default:
			if (state === undefined) {
				return null;
			}
			return state;
	}
};