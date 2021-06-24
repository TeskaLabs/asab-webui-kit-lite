import React, { Component } from 'react';
import Module from 'asab-webui/abc/Module';
import ConfigContainer from "./ConfigContainer";
import MicroservicesContainer from "./MicroservicesContainer";
import MicroserviceDetailContainer from "./MicroserviceDetailContainer";

export default class ConfigModule extends Module {
	constructor(app, name) {
		super(app, "ASABConfigModule");
		this.App = app;
		this.Config = app.config;
		this.Navigation = app.Navigation;
		this.Router = app.Router;

		this.Router.addRoute({
			path: "/config/svcs",
			exact: true,
			name: "Microservices",
			component: MicroservicesContainer,
		});

		this.Router.addRoute({
			path: "/config/svcs/:svcs_name",
			exact: true,
			name: "Microservice",
			component: MicroserviceDetailContainer,
		})

		this.Router.addRoute({
			path: "/config/:configType/:configName",
			exact: true,
			name: "Configuration",
			component: ConfigContainer,
		});

		this.Navigation.addItem({
			name: 'Maintenance',
			icon: 'cil-apps-settings',
			children: [
				{
					name: "Configuration",
					url: "/config/$/$",
					icon: 'cil-settings',
				},
				{
					name: "Microservices",
					url: "/config/svcs",
					icon: 'cil-list',
				}
			]
		});

	}
}
