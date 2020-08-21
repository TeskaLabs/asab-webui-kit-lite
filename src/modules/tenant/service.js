import Service from '../../abc/Service';
import Api from './api';
import {types} from './actions';

export default class TenantService extends Service {

	constructor(app, name="TenantService") {
		super(app, name);
		this.API = new Api(this.App.axiosCreate(''));
		this.App.addSplashScreenRequestor(this);
	}

	initialize() {
		// Extract a current tenant from a query string
		const search = window.location.search;
		const params = new URLSearchParams(search);
		var tenant_id = params.get('tenant');
		
		// Fetch tenants
		this.API.get_tenants()
		.then(response => {
			let payload = response.data; 

			if (tenant_id == null) {
				tenant_id = payload[0].id;
				window.location.replace('?tenant='+tenant_id+'#/');
				return;
			}

			// Find the current tenant in the list and extract its
			let x = payload.filter((item) => { return item.id == tenant_id } );
			if (x.length < 1) {
				this.App.addAlert("danger", "Invalid tenant :-(", 40000);
				return;
			}

			this.App.Store.dispatch({
				type: types.TENANTS_CHANGED,
				payload,
				current: x[0],
			});

			this.App.removeSplashScreenRequestor(this);
		})
		.catch((error) => {
			console.log(error);
			this.App.addAlert("danger", "Failed to load tenants.", 40000);
		});
	}
}
