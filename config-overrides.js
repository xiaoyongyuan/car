const {override, fixBabelImports, addLessLoader} = require('customize-cra');
process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#169274',
            "@table-header-bg": '#169274',
            "@table-header-color":'#fff',
            "@layout-header-background":'#169274',
            "@layout-header-color":'#fff',
        },
    }),
);