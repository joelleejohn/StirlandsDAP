export default class StirlandsHelper {

	static async ajaxPost(method, formData){
		let returnData = {};
		formData.append('queryMethod', method);
		await fetch('https://bsch-jjohn1.chi.ac.uk/src/api/dbInferface.php', {
			method: 'POST',
			body: formData,
			credentials: "same-origin"})
					  .then(async response => { returnData = await response.json()});

		return returnData;
	}

	static checkAuthentication() {
		return StirlandsHelper.ajaxPost('isLoggedIn', new FormData()).then(resp => resp);
	}
}