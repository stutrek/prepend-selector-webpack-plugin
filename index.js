var postcss = require('postcss');
var prependSelector = require('postcss-prepend-selector');

module.exports = class PrependSelectorPlugin {
    constructor (options) {
        this.options = options;
    }

    apply (compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            let cssFileNames = Object.keys(compilation.assets).filter(asset => asset.endsWith('.css'));

            let promises = cssFileNames.map(fileName => {
                let asset = compilation.assets[fileName];

                return postcss(prependSelector(this.options))
                .process(asset.source(), {from: fileName, to: fileName})
                .then(result => {
                    let newAsset = {
                        source: () => result.css,
                        size: () => result.css.length
                    };
                    compilation.assets[fileName] = newAsset;
                });
            });

            Promise.all(promises).then(() => {
                callback()
            });
        });
    }
}
