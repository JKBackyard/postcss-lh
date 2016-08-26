module.exports = (css, opts) => {
  // All the line heights will be stored in this array
  const lineHeight = [];

  css.walkDecls((decl) => {
    // Check if the declaration is not inside the a print media query
    // if is the root selector
    if (decl.parent.parent &&
        decl.parent.parent.params !== 'print' &&
        decl.parent.selector === opts.rootSelector &&
        (decl.prop === 'font' || decl.prop === 'line-height')){

      if (decl.prop === 'font') {
        // Matches {$1:font-size}{$2:unit}/{$3:line-height}.
        const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/);

        // Do nothing if there is a font property but no line height defined
        if (!fontProps) {
          return;
        }

        // Return the line height
        lineHeight.push(fontProps[3]);
      }
      else {
        // If the property is 'line-height'
        lineHeight.push(decl.value);
      }
    }
  });

  // Return only the last result
  return lineHeight.pop();
};
