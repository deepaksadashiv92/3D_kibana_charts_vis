import 'plugins/vr_charts/vr_vis.less';
import 'plugins/vr_charts/vr_vis_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import vrVisTemplate from 'plugins/vr_charts/vr_vis.html';
import vrVisParamsTemplate from 'plugins/vr_charts/vr_vis_params.html';

// register the provider with the visTypes registry
require('ui/registry/vis_types').register(vrVisProvider);

require('../node_modules/c3/c3.css');

function vrVisProvider(Private) {
    var TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
    const Schemas = Private(VisSchemasProvider);
	
    return new TemplateVisType({
  		name: 'vrCharts',
  		title: 'Vio Rusu charts widget',
  		icon: 'fa-bicycle',
  		description: 'Just a sample visualization for checking threedc integration in kibana',
  		template: vrVisTemplate,
  		params: {
  			defaults: {
          		editorPanel: {},
          		enableZoom: false,

  			},
            editor: vrVisParamsTemplate
	    },     
      schemas: new Schemas([
            {
            group: 'metrics',
              name: 'metric',
              title: 'Y-axis metric',
              min: 1,
              max: 5,
              defaults: [ { type: 'count', schema: 'metric' } ],
              //aggFilter: ['count']      
            },
            {
                group: 'buckets',
                name: 'buckets',
                title: 'X-Axis',
                min: 1,
                max: 1,
                aggFilter: ['!geohash_grid']
            }
      ])

    });
}

// export the provider so that the visType can be required with Private()
export default vrVisProvider;
