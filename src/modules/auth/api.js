import axios from 'axios';

export class SeaCatAuthApi {

	/*
	SeaCat Auth Open ID Connect / OAuth2.0


	From config.js:

	module.exports = {
		app: {
			"OIDC_URL_URL": 'http://localhost:3000/openidconnect',
			...
	*/

	constructor(config) {
		
		// TODO: UPDATE api calls with microservices and subpaths 
		this.BaseURL = config.get('OIDC_URL');
		this.ApiURL = config.get('API_URL');

		if (this.ApiURL == null) {
			console.log("Provide config value API_URL");
			this.ApiURL = "/api"
		}
		// this.BaseURL = config.get('SEACATAUTH_URL');
		// if (this.BaseURL == null) {
		// 	// This is here for a backward compatibility
		// 	this.BaseURL = config.get('OIDC_URL'); // Odebrat posledni /openidconnect
		// 	if (this.BaseURL !== null) {
		// 		this.BaseURL = this.BaseURL.toString().replace("/openidconnect","");
		// 	}
		// }
		if (this.BaseURL == null) {
			// This is here for a backward compatibility
			this.BaseURL = config.get('seacat.auth.oidc_url');
			// if (this.BaseURL !== null) {
			// 	this.BaseURL = this.BaseURL.toString().replace("/openidconnect","");
			// }
		}
		if (this.BaseURL == null) {
			console.log("Provide config value seacat.auth.oidc_url");
			this.BaseURL = "/openidconnect";
			// this.BaseURL = "/";
		}
		this.Axios = axios.create({
			timeout: 10000,
			baseURL: this.BaseURL,
		});

		this.AxiosAPI = axios.create({baseURL:'/api'});

		const scope = config.get('seacat.auth.scope');
		this.Scope = scope ? scope : "openid";
		
		this.ClientId = "asab-webui-auth";
		this.ClientSecret = "TODO";
	}

	// This method will cause a navigation from the app to the OAuth2 login screen
	login(redirect_uri, force_login_prompt) {
		const params = new URLSearchParams({
			response_type: "code",
			scope: this.Scope,
			client_id: this.ClientId,
			redirect_uri: redirect_uri
		});
		if (force_login_prompt === true) {
			params.append("prompt", "login");
		}
		window.location.replace(this.BaseURL + "/authorize?" + params.toString());
		// window.location.replace(this.BaseURL + "/openidconnect/authorize?" + params.toString());
	}

	logout(access_token) {
		return this.Axios.get(
			// '/openidconnect/logout',
			'/logout',
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
		);
	}


	userinfo(access_token) {
		let headers = {}
		if (access_token != null) {
			headers.Authorization = 'Bearer ' + access_token;
		}
		return this.Axios.get('/userinfo', {headers: headers});
		// return this.Axios.get('/openidconnect/userinfo', {headers: headers});
	}


	token_authorization_code(authorization_code, redirect_uri) {
		const qs = new URLSearchParams({
			grant_type: "authorization_code",
			code: authorization_code,
			client_id: this.ClientId,
			client_secret: this.ClientSecret,
			redirect_uri: redirect_uri,
		});

		return this.Axios.post(
			// '/openidconnect/token',
			'/token',
			qs.toString()
		);
	}


	verify_access(tenant, access_token, resource) {
		let rsrc = resource ? resource : "tenant:access";
		return this.AxiosAPI.get(
			"/rbac/" + tenant + "/" + rsrc,
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
			)
	}


	get_tenants() {
		return this.AxiosAPI.get('/tenant')
	}

};


export class GoogleOAuth2Api {

	/*
	Google OAuth2 API is configured at Google API Console > Credentials > OAuth 2.0 Client IDs


	From config.js:

	module.exports = {
		app: {
			"google.oauth2.client_id": "<Google OAuth2 Client ID>.apps.googleusercontent.com",
			"google.oauth2.client_secret": "<Google OAuth2 Client secret>",
			...
	*/

	constructor(config) {
		this.Axios = axios.create({
			timeout: 10000,
		});

		const scope = config.get('google.oauth2.scope');
		this.ClientId = config.get('google.oauth2.client_id');
		this.ClientSecret = config.get('google.oauth2.client_secret');
		this.Scope = scope ? scope : "openid https://www.googleapis.com/auth/userinfo.profile";
	}

	// This method will cause a navigation from the app to the OAuth2 login screen
	login(redirect_uri) {
		const params = new URLSearchParams({
			response_type: "code",
			scope: this.Scope,
			client_id: this.ClientId,
			redirect_uri: redirect_uri
		});
		window.location.replace("https://accounts.google.com/o/oauth2/auth" + "?" + params.toString());
	}


	logout(access_token) {
		// There is no Google logout API URL, to our best knowledge
		return null;
	}

	userinfo(access_token) {
		const qs = new URLSearchParams({
			alt: "json",
			access_token: access_token,
		});

		return this.Axios.get(
			'https://www.googleapis.com/oauth2/v1/userinfo?' + qs.toString(),
		);
	}

	token_authorization_code(authorization_code, redirect_uri) {
		const qs = new URLSearchParams({
			grant_type: "authorization_code",
			code: authorization_code,
			client_id: this.ClientId,
			client_secret: this.ClientSecret,
			redirect_uri: redirect_uri,
		});

		return this.Axios.post(
			'https://oauth2.googleapis.com/token',
			qs.toString()
		);
	}
}

