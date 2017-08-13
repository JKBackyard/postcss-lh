const test = require("tape");
const postcss = require('postcss');
const fs = require('fs');

const actual = (file) => {
  const css = fs.readFileSync(`test/fixtures/${file}.css`, 'utf8');

  return postcss([
    require('../dist/index')
  ]).process(css).css.replace(/\s+/g, '');
};

const expected = (file) => {
  return fs.readFileSync(`test/fixtures/${file}.expected.css`, 'utf8').replace(/\s+/g, '');
};

test('units', (t) => {
  t.equal(
    actual('test1'),
    expected('test1'),
    'should be transformed with a font declaration');

  t.equal(
    actual('test2'),
    expected('test2'),
    'should be transformed with a line-height declaration');

  t.end();
});
