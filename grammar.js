/**
 * @file a qop lang designed for games and systems programming
 * @author viylouu <viylouu@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "caz",

  rules: {
    source_file: $ => "hello"
  }
});
