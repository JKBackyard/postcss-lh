const postcss = require('postcss');
const getLineHeight = require('./lib/getLineHeight');
const lhToRem = require('./lib/lhToRem');

const defaults = {
  rootSelector: ':root',
  rhythmUnit: 'lh',
  lineHeight: 1.5
};

module.exports = postcss.plugin('postcss-lh', (opts = defaults) => {
  return (css) => {
    const lineHeight = getLineHeight(css, opts) || opts.lineHeight;
    const lhReg = new RegExp('\\d*\\.?\\d+' + opts.rhythmUnit, 'gi');

    css.replaceValues(lhReg, {fast: opts.rhythmUnit}, (val) => {
      return lhToRem(parseFloat(val), lineHeight);
    });
  };
});
