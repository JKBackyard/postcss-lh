const test = require("tape");
const postcss = require('postcss');
const fs = require('fs');

const actual = () => {
  const css = fs.readFileSync('test/fixtures/verticalRhythm.css', 'utf8');

  return postcss([
    require('../')
  ]).process(css).css.replace(/\s+/g, '');
};

const expected = () => {
  return fs.readFileSync('test/fixtures/verticalRhythm.expected.css', 'utf8').replace(/\s+/g, '');
};

test('units', (t) => {
  t.equal(
    actual(),
    expected(),
    'should be transformed');

  t.end();
});
