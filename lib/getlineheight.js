module.exports = (decl) => {
  // Matches {$1:font-size}{$2:unit}/{$3:line-height}.
  const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/);

  // Make sure font declaration is valid.
  if (!fontProps) {
    throw decl.error('Font declaration is invalid.');
  }

  // Return the line height
  return fontProps[3];
};