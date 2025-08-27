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
    source_file: $ => repeat(choice($._preproc, $._decl, $._expr)),

    _preproc: $ => choice($.preproc_imp),

    preproc_imp: $ => seq(
      '#imp',
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

    _decl: $ => choice(
      $.func_decl
    ),

    func_decl: $ => seq(
      $.ident,
      choice($.const_decl, $.mut_decl),
      $.decl_param_list,
      optional(seq(
        '>>',
        $._type
      )),
      $.scope
    ),

    const_decl: $ => choice(
      ':~',
      seq(
        ':',
        $._type,
        '~'
      )
    ),

    mut_decl: $ => choice(
      ':=',
      seq(
        ':',
        $._type,
        optional('='),
      )
    ),

    decl_param_list: $ => seq(
      '(',
      seq($.decl_param, repeat(seq(',', $.decl_param))),
      ')'
    ),

    decl_param: $ => seq(
      $.ident,
      $.mut_decl,
      optional($._expr)
    ),

    scope: $ => seq(
      '{',
      repeat(choice($._preproc, $._decl, $._expr)),
      '}'
    ),

    _type: $ => choice(
      $.prim_type
    ),

    prim_type: $ => choice(
      'raw',
      'str'
    ),

    ident: $ => /[a-zA-Z_][a-zA-Z_0-9]*/,
    num: $ => /[0-9]+/
  }
});
