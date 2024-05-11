import { type Plugin } from 'vue';
import { NAMESPACE } from './defaults';
import directive from './directive';
import bindRouter from './bind-router';
import type { PluginOptions } from './types';

const plugin: Plugin<PluginOptions> = {
  install: (app, { router, ...config }) => {
    const { namespace = NAMESPACE } = config;
    bindRouter(router, config);
    app.directive(namespace, directive(config));
  },
};

export default plugin;
