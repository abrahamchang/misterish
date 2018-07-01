export default sendData = (datos) => {
	return {
		type: 'data_load',
		payload: datos
	};
};