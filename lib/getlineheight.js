module.exports = (decl) => {
  if (decl.prop === 'font') {
    // Matches {$1:font-size}{$2:unit}/{$3:line-height}.
    const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/);

    // Return the line height
    return fontProps[3];
  }
  else {
    // If the property is 'line-height'
    return decl.value;
  }
};