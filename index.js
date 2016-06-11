const postcss = require('postcss');
const getLineHeight = require('./lib/getLineHeight');
const lhToRem = require('./lib/lhToRem');

const defaults = {
  rootSelector: ':root',
  rhythmUnit: 'lh'
};

module.exports = postcss.plugin('postcss-vertical-rhythm', (opts = defaults) => {
  let lineHeight;

  return (css) => {
    css.walkDecls((decl) => {

      // Check if the declaration is not inside the a print media query
      // if is the root selector and if is a font property
      if (decl.parent.parent.params !== 'print' &&
          decl.parent.selector === opts.rootSelector &&
          (decl.prop === 'font' || decl.prop === 'line-height')) {

        // Get the line-height
        lineHeight = getLineHeight(decl);
      }

      // Check if this declaration has a rhythm unit on it
      if (~ decl.value.indexOf(opts.rhythmUnit)) {

        // RegExp to capture declaration value
        const regexp = new RegExp('\\d*\\.?\\d+' + opts.rhythmUnit, 'gi');

        // Replace the current declaration value with the transformed value
        decl.value = decl.value.replace(regexp, (val) => lhToRem(parseFloat(val), lineHeight));
      }
    });
  };
});
