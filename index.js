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
 * Gets the rhythm value.
 * @param  {Number} declValue
 * @param  {Number} lineHeight
 * @return {Number}
 */
const getRhythmValue = (declValue, lineHeight) => {
  return lineHeight * parseFloat(declValue) || 1;
};

module.exports = postcss.plugin('postcss-vertical-rhythm', (opts = { }) => {
  const rootSelector = opts.rootSelector || ':root';
  const rhythmUnit = opts.rhythmUnit || 'lh';
  let lineHeight;

  return (css) => {
    css.walkDecls((decl) => {

      // Check if the declaration is a 'font' property,
      // if it's inside the root selector and isn't inside a print media query
      if (decl.parent.parent.params !== 'print' &&
          decl.parent.selector === rootSelector &&
          decl.prop === 'font') {

        // Get the line-height of the declaration
        lineHeight = getLineHeight(decl);
      }

      // Check if this declaration has a rhythm unit on it
      if (~ decl.value.indexOf(rhythmUnit)) {

        // RegExp to capture declaration value
        const regexp = new RegExp('\\d*\\.?\\d+' + rhythmUnit, 'gi');

        // Replace the declaration value with the new unit value and append the 'rem' unit
        decl.value = decl.value.replace(regexp, ($1) => getRhythmValue($1, lineHeight) + 'rem');
      }
    });
  };
});
