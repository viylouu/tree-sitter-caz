/**
 * @file a qop lang designed for games and systems programming
 * @author viylouu <viylouu@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "caz",

  extras: $ => [/\s/],

  rules: {
    source_file: $ => repeat(choice($.preproc_imp, $._expr)),

    _preproc: $ => choice($.preproc_imp),

    preproc_imp: $ => seq(
      /#imp/,
      '<',
      $.resolve,
      '>',
      optional(seq(
        'as',
        $.ident
      ))
    ),

    resolve: $ => seq(
      $.ident,
      repeat(seq('::', $.ident))
    ),

    _expr: $ => choice(
      $.ident,
      $.num
    ),

    ident: $ => /[a-zA-Z_][a-zA-Z_0-9]*/,
    num: $ => /[0-9]+/
  }
});
