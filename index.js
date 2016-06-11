const postcss = require('postcss');

/**
 * Gets the font declaration properties.
 * @param  {Object} decl
 * @return {number}
 */
const getLineHeight = (decl) => {

  // Matches {$1:font-size}{$2:unit}/{$3:line-height}.
  const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/);

  // Make sure font declaration is valid.
  if (!fontProps) {
    throw decl.error('Font declaration is invalid.');
  }

  // Return the line height
  return fontProps[3];
};

/**
 * Transform lh value to rem.
 * @param  {Number} val
 * @param  {Number} lineHeight
 * @return {string}
 */
const lhToRem = (val, lineHeight) => parseFloat((lineHeight * val).toFixed(3)) + 'rem';

module.exports = postcss.plugin('postcss-vertical-rhythm', (opts = { }) => {
  const rootSelector = opts.rootSelector || ':root';
  const rhythmUnit = opts.rhythmUnit || 'lh';
  let lineHeight;

  return (css) => {
    css.walkDecls((decl) => {

      // Check if the declaration is not inside the a print media query
      // if is the root selector and if is a font property
      if (decl.parent.parent.params !== 'print' &&
          decl.parent.selector === rootSelector &&
          decl.prop === 'font') {

        // Get the line-height
        lineHeight = getLineHeight(decl);
      }

      // Check if this declaration has a rhythm unit on it
      if (~ decl.value.indexOf(rhythmUnit)) {

        // RegExp to capture declaration value
        const regexp = new RegExp('\\d*\\.?\\d+' + rhythmUnit, 'gi');

        // Replace the current declaration value with the transformed value
        decl.value = decl.value.replace(regexp, (val) => lhToRem(parseFloat(val), lineHeight));
      }
    });
  };
});
