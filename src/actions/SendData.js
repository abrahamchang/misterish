export default sendData = (type, datos) => {
	return {
		type: type,
		payload: datos
	};
};