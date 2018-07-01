export default reloadHome = (toggleState) => {
	var toggled;
	if (toggleState === undefined) {
		toggled = false;
	} else {
		toggled = !toggleState;
	}
	console.log(toggled);
	return {
		type: 'reload_home',
		payload: toggled
	};
};