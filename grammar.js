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
    source_file: $ => repeat(choice($._preproc, $._decl)),

    _preproc: $ => choice($.preproc_pkg, $.preproc_extern, $.preproc_load),

    preproc_pkg: $ => seq(
      choice($.package_imp, $.package_lib),
      '<',
      $.resolve,
      '>',
      optional(seq(
        'as',
        $.ident
      ))
    ),

    package_imp: $ => '#imp',
    package_lib: $ => '#lib',

    preproc_extern: $ => seq(
      '#extern',
      $.ident,
      $.const_decl,
      $.decl_param_list,
      optional(seq(
        '>>',
        $._type
      )),
    ),

    preproc_load: $ => seq(
      '#load',
      $.param_list
    ),

    resolve: $ => seq(
      $.ident,
      repeat(seq('::', $.ident))
    ),

    _expr: $ => choice(
      $.ident,
      $.num,
      $.func_call,
      $.string_lit,
      $.preproc_load
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

    param_list: $ => seq(
      '(',
      seq($._expr, repeat(seq(',', $._expr))),
      ')'
    ),

    scope: $ => seq(
      '{',
      repeat(choice($._preproc, $._decl, $.func_call)),
      '}'
    ),

    _type: $ => choice(
      $.prim_type,
      $._array_type,
      $.ident
    ),

    prim_type: $ => choice(
      'raw',
      'str',
      'char',
      'func',
      'i8',
      'i16',
      'i32',
      'i64',
      'i128',
      'u8',
      'u16',
      'u32',
      'u64',
      'u128',
      'bool',
      'f16',
      'f32',
      'f64',
      'f128'
    ),

    _array_type: $ => choice(
      $.slice_type,
      $.fixed_array_type,
      $.vector_type
    ),

    slice_type: $ => seq(
      '[]',
      $._type
    ),

    fixed_array_type: $ => seq(
      '[',
      choice($.num, '*'),
      ']',
      $._type
    ),

    vector_type: $ => seq(
      '[<',
      $.num,
      '>]',
      $._type
    ),

    func_call: $ => seq(
      $.resolve,
      $.param_list
    ),

    string_lit: $ => token(seq(
      '"',
      /([^"\\]|\\.)*/,
      '"'
    )),

    ident: $ => /[a-zA-Z_][a-zA-Z_0-9]*/,
    num: $ => /[0-9]+/
  }
});
