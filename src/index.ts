import * as postcss from 'postcss';

import getLineHeight from './getLineHeight';
import lhToRem from './lhToRem';

interface Options {
    rootSelector: string,
    unit: string,
    lineHeight: number
}

const defaults = {
    rootSelector: ':root',
    unit: 'lh',
    lineHeight: 1.5
};

export = postcss.plugin('postcss-lh', (opts: Options = defaults) => {
    const options: Options = Object.assign({}, defaults, opts);

    return css => {
        const lineHeight: number = getLineHeight(css, options);
        const lhReg: RegExp = new RegExp('\\d*\\.?\\d+' + options.unit, 'gi');

        css.replaceValues(lhReg, { fast: options.unit }, (val) => {
            return lhToRem(parseFloat(val), lineHeight);
        });
    };
});
