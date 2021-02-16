import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
// import ConfigDashboard from "./ConfigDashboard";
import ConfigEditor from "./ConfigEditor";
import TypeList from "./TypeList";

export default class ConfigModule extends Module {
	constructor(app, name) {
		super(app, "ASABConfigModule");
		this.App = app;
		this.Config = app.config;
		this.Navigation = app.Navigation;
		this.Router = app.Router;

		this.Router.addRoute({
			path: "/config",
			exact: true,
			name: "Configuration",
			component: TypeList,
		});

		this.Router.addRoute({
			path: "/config/:config_type/:config_name",
			exact: true,
			name: "Type",
			component: ConfigEditor,
		});


		this.Navigation.addItem({
			name: "Configuration",
			url: "/config",
			icon: 'cil-settings',
		});

	}
}
