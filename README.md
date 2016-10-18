![PostCSS-LH](http://i.imgur.com/a30mYsF.png)

# postcss-lh [![Build Status](https://travis-ci.org/jameskolce/postcss-lh.svg?branch=master)](https://travis-ci.org/jameskolce/postcss-lh)

PostCSS plugin that defines a `lh` unit based on the root line-height, used for vertical rhythm in a web layout.

You can find more information about vertical rhythm in this great article by Zell Liew: http://zellwk.com/blog/why-vertical-rhythms/

**Write this:**

```css
:root {
  font: 16px / 1.5 "Helvetica", "Arial", sans-serif;
}

section {
  margin-bottom: 1lh;
  padding-top: .5lh;
}
```

**And get this:**

```css
:root {
  font: 16px / 1.5 "Helvetica", "Arial", sans-serif;
}

section {
  margin-bottom: 1.5rem;
  padding-top: 0.75rem;
}
```

## Installation

`$ npm install postcss-lh`

## Usage

```JS
postcss([ require('postcss-lh') ])
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.

## Options

### `rootSelector`

- Type: `string`
- Default: `:root`

The selector where the line height is set. You can use `html` or `body` for example, but by default
it will use `:root`.

### `rhythmUnit`

- Type: `string`
- Default: `lh`

The unit to be used in your CSS.

### `lineHeight`

- Type: `number`
- Default: `1.5`

The default line height. Used **only** when a line height definition in the root element is not found.

## Acknowledgements

This project is based on [postcss-vertical-rhythm](https://github.com/markgoodyear/postcss-vertical-rhythm) by Mark Goodyear but
with several changes, including:

- Use of `lh` instead of `vr`.
- Transformation of `lh` units to `rem` instead of `px`.
- Support for root media queries. Thanks to the use of `rem` units.
- Support for both `font` (shorthand) and `line-height` declarations.
- This plugin omits `font` and `line-height` declarations inside **print** media queries.
- It looks for `:root` by default instead of `body`
- The codebase has been also optimized.

## License

MIT - James Kolce
