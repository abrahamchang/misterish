export default reloadHomeData = (data) => {
	return {
		type: 'home_data_download',
		payload: {
			data: data.data,
			user: data.user,
			reload: !data.reload
		}
	}
};