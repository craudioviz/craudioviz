export default {
    name: 'PluginA',
    init: () => {
        console.log('PluginA initialized');
    },
    page: {
        path: '/plugin-a',
        component: () => import('./PluginAComponent'),
    },
};