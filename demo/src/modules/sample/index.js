import HomeContainer from './containers/HomeContainer'
import Module from 'asab-webui/abc/Module';


export default class SampleModule extends Module {
    constructor(app, name){
        super(app, "SampleModule");
        app.Router.addRoute({ path: '/', exact: true, name: 'Sample Module', component: HomeContainer });
        app.Navigation.addItem({
			name: 'Sample Module',
			url: '/ca',
			icon: 'cil-shield-alt',
        });

        // Custom Brand Component in header
        const headerService = app.locateService("HeaderService");
        headerService.setBrandImages({alt: "ASAB Web UI"});
    }
}
