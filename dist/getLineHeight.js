"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (css, opts) => {
    // Start with the default line-height
    let lineHeight = opts.lineHeight;
    // Walk over all the root selectors
    css.walkRules(opts.rootSelector, rule => {
        // Omit the process if the selector is inside a print media query
        if (rule.parent && rule.parent.params === 'print')
            return;
        // Walk over all the font or line-height properties
        rule.walkDecls(/font$|line-height/, decl => {
            // Matches {$1:font-size}{$2:unit}/{$3:line-height} when the property is 'font'
            const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/) || [];
            lineHeight = fontProps[3] || decl.value;
        });
    });
    return lineHeight;
};
