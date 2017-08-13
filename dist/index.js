"use strict";
const postcss = require("postcss");
const getLineHeight_1 = require("./getLineHeight");
const lhToRem_1 = require("./lhToRem");
const defaults = {
    rootSelector: ':root',
    unit: 'lh',
    lineHeight: 1.5
};
module.exports = postcss.plugin('postcss-lh', (opts = defaults) => {
    const options = Object.assign(defaults, opts);
    return css => {
        const lineHeight = getLineHeight_1.default(css, options);
        const lhReg = new RegExp('\\d*\\.?\\d+' + options.unit, 'gi');
        css.replaceValues(lhReg, { fast: options.unit }, (val) => {
            return lhToRem_1.default(parseFloat(val), lineHeight);
        });
    };
});
