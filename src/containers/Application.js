import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
	AppAside,
	AppBreadcrumb,
	AppFooter,
	AppHeader,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppSidebarNav,
} from '@coreui/react';
import Header from './Header';
import HeaderService from '../services/HeaderService';
import ReduxService from '../services/ReduxService';



class Application extends Component {

	constructor(props){
		super(props);
		this.Modules = [];
		this.Services = {};

		this.Config = new Config(__CONFIG__);
		this.Router = new Router();
		this.Navigation = new Navigation();

		// Core services
		this.HeaderService = new HeaderService(this, "HeaderService");
		this.ReduxService = new ReduxService(this, "ReduxService");

		// Instantiate modules
		for (var i in props.modules) {
			const module = new props.modules[i](this);
			this.Modules.push(module);
		}

		// Create store
		this.Store = Object.keys(this.ReduxService.Reducers).length > 0
					? createStore(combineReducers(this.ReduxService.Reducers))
					: createStore((state) => state)

		// Initialize service
		for (var i in this.Services) {
			this.Services[i].initialize();
		}

		// Initialize modules
		for (var i in this.Modules) {
			this.Modules[i].initialize();
		}

	}

	registerService(service) {
		if (service.Name in this.Services) {
			console.warn(`Service ${service.Name} is already registered.`);
			return;
		}
		this.Services[service.Name] = service;
	}

	locateService(name){
		if (!name in this.Services){
			console.warn(`Service ${name} doesn't exist.`);
			return null;
		}
		return this.Services[name];
	}

	render() {
		return (
			<Provider store={this.Store}>							
					<div className="app">
						<Switch>
							{this.Router.Routes.map((route, idx) => {
								return route.component ? (							
										<Route
											key={idx}
											path={`${route.path}`}
											exact={route.exact}
											name={route.name}
											render={props => (
												<React.Fragment>
													{/* {route.loginRequired && userSVC.currentUser && userSVC == null ? (
														<Redirect from="current-path" to="/login" />
													): null} */}
														
													{!route.hasNoHeader ? (
														<AppHeader fixed>
															<Header app={this}/>
														</AppHeader>
													) : null}

													<div className="app-body">

														{!route.hasNoSidebar ? (
															<AppSidebar fixed display="lg">
																<AppSidebarNav 
																	navConfig={this.Navigation.getItems()} 
																	{...this.props} 
																/>
																<AppSidebarFooter />
																<AppSidebarMinimizer />
															</AppSidebar>
														) : null}

														<main className="main">
															
															{!route.hasNoBreadcrumb ? (
																<AppBreadcrumb appRoutes={this.Router.Routes}/>
															) : null}
															
															<route.component {...props} />

														</main>
														<AppAside fixed>
														</AppAside>
													</div>

													{!route.hasNoFooter ? (
														<AppFooter>
															{this.props.footer ? this.props.footer : "Powered by TeskaLabs"}
														</AppFooter>
													) : null}
												</React.Fragment>
											)} 
										/>										
								) : (null);

							})}									
						</Switch>
					</div>

			</Provider>
		)
	}
}


class Config {
	constructor(app, defaults) {
		this._config = Object.assign({}, defaults);
	}

	addDefaults(defaults) {
		for (key in defaults) {
			if (key in this._config)
				continue
			this._config[key] = defaults[key];
		}
	}

	get(key) {
		return this._config[key];
	}
}


class Router {

    constructor(app){
        this.Routes = []
    }

    addRoute(route){
        /* Example route:
            {
                path: '/some/path', // Url path
                exact: true,        // Whether path must be matched exactly
                name: 'Some Name',  // Route name
                component: ReactComponent // Component to be rendered
            }
        */
        this.Routes.push(route);
    }
}

class Navigation {

    constructor(){
        this.Items = []
    }

    addItem(item){
		/* Example item:
            {
                path: '/some/path', // Url path
                exact: true,        // Whether path must be matched exactly
                name: 'Some Name',  // Route name
                component: ReactComponent // Component to be rendered
            }
        */
	//    console.log ("*************************** adding item")
	// 	if (item.children){
			
	// 		console.log (item.children)
	// 		for (var i in item.children){
	// 			console.log (item.children[i])
	// 			this.addItem (item.children[i])
	// 		}
	// 		console.log ("*************************** stika over")
	// 	}
        this.Items.push(item);
    }

    getItems() {
        return {
            items: this.Items
        }
    }
}

// export default withRouter(Application);
export default Application;