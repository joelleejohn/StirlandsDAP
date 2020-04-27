export default class StirlandsHelper {

	static async ajaxPost(method, formData, successCallback, failureCallback, authFailCallback = null){
		let returnData = {};
		formData.append('queryMethod', method);
		await fetch('http://localhost/StirlandsDAP/stirlandscricket/src/api/dbInferface.php', {  method: 'POST', body: formData, credentials: "same-origin"})
					  .then(async response => { returnData = await response.json()});

		return returnData;
		// if (returnData.authFail)
		// 	authFailCallback();
		// else if (returnData.hasErrored)
		// 	failureCallback(returnData.error);
		// else
		// 	successCallback(returnData.result);
	}

	static checkAuthentication() {
		return StirlandsHelper.ajaxPost('isLoggedIn', new FormData()).then(resp => resp);
	}
}