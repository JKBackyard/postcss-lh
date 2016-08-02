const postcss = require('postcss');
const getLineHeight = require('./lib/getLineHeight');
const lhToRem = require('./lib/lhToRem');

const defaults = {
  rootSelector: ':root',
  rhythmUnit: 'lh',
  lineHeight: 1.5
};

module.exports = postcss.plugin('postcss-lh', (opts = defaults) => {
  const options = Object.assign(defaults, opts)

  return (css) => {
    const lineHeight = getLineHeight(css, options) || options.lineHeight;
    const lhReg = new RegExp('\\d*\\.?\\d+' + options.rhythmUnit, 'gi');

    css.replaceValues(lhReg, {fast: options.rhythmUnit}, (val) => {
      return lhToRem(parseFloat(val), lineHeight);
    });
  };
});
