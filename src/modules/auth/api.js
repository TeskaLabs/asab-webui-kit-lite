import axios from 'axios';

export class SeaCatAuthApi {

	/*
	SeaCat Auth Open ID Connect / OAuth2.0


	From config.js:

	module.exports = {
		app: {
			BASE_URL: 'http://localhost:3000',
			Microservice: '/api',
			Subpaths: {oidc: '/openidconnect', rbac: '/rbac'},
			...
	*/

	constructor(config) {

		this.BaseURL = config.get('BASE_URL');
		this.Microservice = config.get('Microservice');
		this.Subpaths = config.get('Subpaths');


		if (this.BaseURL == null) {
			// This is here for a backward compatibility
			this.BaseURL = config.get('seacat.auth.oidc_url');
		}

		if (this.BaseURL == null) {
			console.log("Provide config value BASE_URL");
			this.BaseURL = "";
		}

		if (this.Microservice == null) {
			console.log("Provide config value microservice");
			this.Microservice = "/api"
		}

		if (this.Subpaths == null) {
			console.log("Provide config value subpaths");
			this.Subpaths = {"oidc": "/openidconnect", "rbac": "/rbac"};
		}

		this.oidc = this.Subpaths.oidc ? this.Subpaths.oidc : '/openidconnect'; // Openidconnect
		this.rbac = this.Subpaths.rbac ? this.Subpaths.rbac : '/rbac'; // rbac

		this.Axios = axios.create({
			timeout: 10000,
			baseURL: this.BaseURL,
			// TODO: Prove the BaseURL setting and then implement the Axios as below
			// baseURL: this.BaseURL + this.Microservice + this.oidc,
		});

		// TODO: Prove the BaseURL setting and eventually remove AxiosTenants
		this.AxiosTenants = axios.create({baseURL: this.Microservice});

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
		window.location.replace(this.BaseURL + this.Microservice + this.oidc + "/authorize?" + params.toString());
	}

	logout(access_token) {
		return this.Axios.get(
			this.Microservice + this.oidc + '/logout',
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
		);
	}


	userinfo(access_token) {
		let headers = {}
		if (access_token != null) {
			headers.Authorization = 'Bearer ' + access_token;
		}
		return this.Axios.get(this.Microservice + this.oidc + '/userinfo', {headers: headers});
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
			this.Microservice + this.oidc + '/token',
			qs.toString()
		);
	}

	// Verify access to tenant
	verify_access(tenant, access_token, resource) {
		let rsrc = resource ? resource : "tenant:access";
		return this.AxiosTenants.get(
			this.rbac + "/" + tenant + "/" + rsrc,
			{ headers: { 'Authorization': 'Bearer ' + access_token }}
			)
		// TODO: Prove the BaseURL setting and then implement the Axios as below
		// return this.Axios.get(
		// 	this.Microservice + this.rbac + "/" + tenant + "/" + rsrc,
		// 	{ headers: { 'Authorization': 'Bearer ' + access_token }}
		// 	)
	}

	// Get tenants from database
	get_tenants(access_token) {
		return this.AxiosTenants.get('/tenant')
		// TODO: Prove the BaseURL setting and then implement the Axios as below
		// return this.Axios.get(this.Microservice + '/tenant')
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
