export default class StirlandsHelper {

	static async ajaxPost(method, formData, successCallback, failureCallback, authFailCallback = null){
		let returnData;
		formData.append('queryMethod', method);
		await fetch('http://localhost/StirlandsDAP/stirlandscricket/src/api/dbInferface.php', {  method: 'POST', body: formData})
					  .then(async response => { returnData = await response.json()});
		console.log('ajaxPost returned')
		console.log(returnData)

		return returnData;
		// if (returnData.authFail)
		// 	authFailCallback();
		// else if (returnData.hasErrored)
		// 	failureCallback(returnData.error);
		// else
		// 	successCallback(returnData.result);
	}

	static async checkAuthentication() {
		let auth; 
		await StirlandsHelper.ajaxPost('isLoggedIn', new FormData()).then(resp => {auth = resp.result.isAuthenticated});
		console.log('checkAuthentication() returned')
		console.log(auth)
		return auth;
	}
}