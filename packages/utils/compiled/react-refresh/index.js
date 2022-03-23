(function () {
  'use strict';
  var e = {
    791: function (e, r, n) {
      if (process.env.NODE_ENV === 'production') {
        e.exports = n(45);
      } else {
        e.exports = n(215);
      }
    },
    215: function (e, r, n) {
      /** @license React vundefined
       * react-refresh-babel.development.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
      if (process.env.NODE_ENV !== 'production') {
        (function () {
          'use strict';
          function ReactFreshBabelPlugin(e) {
            var r =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            if (typeof e.env === 'function') {
              var a = e.env();
              if (a !== 'development' && !r.skipEnvCheck) {
                throw new Error(
                  'React Refresh Babel transform should only be enabled in development environment. ' +
                    'Instead, the environment is: "' +
                    a +
                    '". If you want to override this check, pass {skipEnvCheck: true} as plugin options.',
                );
              }
            }
            var i = e.types;
            var s = i.identifier(r.refreshReg || '$RefreshReg$');
            var o = i.identifier(r.refreshSig || '$RefreshSig$');
            var c = new Map();
            function createRegistration(e, r) {
              var n = e.scope.generateUidIdentifier('c');
              if (!c.has(e)) {
                c.set(e, []);
              }
              var a = c.get(e);
              a.push({ handle: n, persistentID: r });
              return n;
            }
            function isComponentishName(e) {
              return typeof e === 'string' && e[0] >= 'A' && e[0] <= 'Z';
            }
            function findInnerComponents(e, r, n) {
              var a = r.node;
              switch (a.type) {
                case 'Identifier': {
                  if (!isComponentishName(a.name)) {
                    return false;
                  }
                  n(e, a, null);
                  return true;
                }
                case 'FunctionDeclaration': {
                  n(e, a.id, null);
                  return true;
                }
                case 'ArrowFunctionExpression': {
                  if (a.body.type === 'ArrowFunctionExpression') {
                    return false;
                  }
                  n(e, a, r);
                  return true;
                }
                case 'FunctionExpression': {
                  n(e, a, r);
                  return true;
                }
                case 'CallExpression': {
                  var i = r.get('arguments');
                  if (i === undefined || i.length === 0) {
                    return false;
                  }
                  var s = r.get('callee');
                  switch (s.node.type) {
                    case 'MemberExpression':
                    case 'Identifier': {
                      var o = s.getSource();
                      var c = i[0];
                      var l = e + '$' + o;
                      var p = findInnerComponents(l, c, n);
                      if (!p) {
                        return false;
                      }
                      n(e, a, r);
                      return true;
                    }
                    default: {
                      return false;
                    }
                  }
                }
                case 'VariableDeclarator': {
                  var f = a.init;
                  if (f === null) {
                    return false;
                  }
                  var d = a.id.name;
                  if (!isComponentishName(d)) {
                    return false;
                  }
                  switch (f.type) {
                    case 'ArrowFunctionExpression':
                    case 'FunctionExpression':
                      break;
                    case 'CallExpression': {
                      var h = f.callee;
                      var v = h.type;
                      if (v === 'Import') {
                        return false;
                      } else if (v === 'Identifier') {
                        if (h.name.indexOf('require') === 0) {
                          return false;
                        } else if (h.name.indexOf('import') === 0) {
                          return false;
                        }
                      }
                      break;
                    }
                    case 'TaggedTemplateExpression':
                      break;
                    default:
                      return false;
                  }
                  var g = r.get('init');
                  var b = findInnerComponents(e, g, n);
                  if (b) {
                    return true;
                  }
                  var y = r.scope.getBinding(d);
                  if (y === undefined) {
                    return;
                  }
                  var E = false;
                  var k = y.referencePaths;
                  for (var _ = 0; _ < k.length; _++) {
                    var S = k[_];
                    if (
                      S.node &&
                      S.node.type !== 'JSXIdentifier' &&
                      S.node.type !== 'Identifier'
                    ) {
                      continue;
                    }
                    var P = S.parent;
                    if (P.type === 'JSXOpeningElement') {
                      E = true;
                    } else if (P.type === 'CallExpression') {
                      var R = P.callee;
                      var I = void 0;
                      switch (R.type) {
                        case 'Identifier':
                          I = R.name;
                          break;
                        case 'MemberExpression':
                          I = R.property.name;
                          break;
                      }
                      switch (I) {
                        case 'createElement':
                        case 'jsx':
                        case 'jsxDEV':
                        case 'jsxs':
                          E = true;
                          break;
                      }
                    }
                    if (E) {
                      n(e, f, g);
                      return true;
                    }
                  }
                }
              }
              return false;
            }
            function isBuiltinHook(e) {
              switch (e) {
                case 'useState':
                case 'React.useState':
                case 'useReducer':
                case 'React.useReducer':
                case 'useEffect':
                case 'React.useEffect':
                case 'useLayoutEffect':
                case 'React.useLayoutEffect':
                case 'useMemo':
                case 'React.useMemo':
                case 'useCallback':
                case 'React.useCallback':
                case 'useRef':
                case 'React.useRef':
                case 'useContext':
                case 'React.useContext':
                case 'useImperativeHandle':
                case 'React.useImperativeHandle':
                case 'useDebugValue':
                case 'React.useDebugValue':
                  return true;
                default:
                  return false;
              }
            }
            function getHookCallsSignature(e) {
              var r = h.get(e);
              if (r === undefined) {
                return null;
              }
              return {
                key: r
                  .map(function (e) {
                    return e.name + '{' + e.key + '}';
                  })
                  .join('\n'),
                customHooks: r
                  .filter(function (e) {
                    return !isBuiltinHook(e.name);
                  })
                  .map(function (e) {
                    return i.cloneDeep(e.callee);
                  }),
              };
            }
            var l = new WeakMap();
            function hasForceResetComment(e) {
              var r = e.hub.file;
              var n = l.get(r);
              if (n !== undefined) {
                return n;
              }
              n = false;
              var a = r.ast.comments;
              for (var i = 0; i < a.length; i++) {
                var s = a[i];
                if (s.value.indexOf('@refresh reset') !== -1) {
                  n = true;
                  break;
                }
              }
              l.set(r, n);
              return n;
            }
            function createArgumentsForSignature(e, a, s) {
              var o = a.key,
                c = a.customHooks;
              var l = hasForceResetComment(s.path);
              var p = [];
              c.forEach(function (e) {
                var r;
                switch (e.type) {
                  case 'MemberExpression':
                    if (e.object.type === 'Identifier') {
                      r = e.object.name;
                    }
                    break;
                  case 'Identifier':
                    r = e.name;
                    break;
                }
                if (s.hasBinding(r)) {
                  p.push(e);
                } else {
                  l = true;
                }
              });
              var f = o;
              if (true && !r.emitFullSignatures) {
                f = n(113).createHash('sha1').update(o).digest('base64');
              }
              var d = [e, i.stringLiteral(f)];
              if (l || p.length > 0) {
                d.push(i.booleanLiteral(l));
              }
              if (p.length > 0) {
                d.push(
                  i.functionExpression(
                    null,
                    [],
                    i.blockStatement([i.returnStatement(i.arrayExpression(p))]),
                  ),
                );
              }
              return d;
            }
            function findHOCCallPathsAbove(e) {
              var r = [];
              while (true) {
                if (!e) {
                  return r;
                }
                var n = e.parentPath;
                if (!n) {
                  return r;
                }
                if (
                  n.node.type === 'AssignmentExpression' &&
                  e.node === n.node.right
                ) {
                  e = n;
                  continue;
                }
                if (
                  n.node.type === 'CallExpression' &&
                  e.node !== n.node.callee
                ) {
                  r.push(n);
                  e = n;
                  continue;
                }
                return r;
              }
            }
            var p = new WeakSet();
            var f = new WeakSet();
            var d = new WeakSet();
            var h = new WeakMap();
            var v = {
              CallExpression: function (e) {
                var r = e.node;
                var n = r.callee;
                var a = null;
                switch (n.type) {
                  case 'Identifier':
                    a = n.name;
                    break;
                  case 'MemberExpression':
                    a = n.property.name;
                    break;
                }
                if (a === null || !/^use[A-Z]/.test(a)) {
                  return;
                }
                var i = e.scope.getFunctionParent();
                if (i === null) {
                  return;
                }
                var s = i.block;
                if (!h.has(s)) {
                  h.set(s, []);
                }
                var o = h.get(s);
                var c = '';
                if (e.parent.type === 'VariableDeclarator') {
                  c = e.parentPath.get('id').getSource();
                }
                var l = e.get('arguments');
                if (a === 'useState' && l.length > 0) {
                  c += '(' + l[0].getSource() + ')';
                } else if (a === 'useReducer' && l.length > 1) {
                  c += '(' + l[1].getSource() + ')';
                }
                o.push({ callee: e.node.callee, name: a, key: c });
              },
            };
            return {
              visitor: {
                ExportDefaultDeclaration: function (e) {
                  var r = e.node;
                  var n = r.declaration;
                  var a = e.get('declaration');
                  if (n.type !== 'CallExpression') {
                    return;
                  }
                  if (p.has(r)) {
                    return;
                  }
                  p.add(r);
                  var s = '%default%';
                  var o = e.parentPath;
                  findInnerComponents(s, a, function (e, r, n) {
                    if (n === null) {
                      return;
                    }
                    var a = createRegistration(o, e);
                    n.replaceWith(i.assignmentExpression('=', a, r));
                  });
                },
                FunctionDeclaration: {
                  enter: function (e) {
                    var r = e.node;
                    var n;
                    var a;
                    var s = '';
                    switch (e.parent.type) {
                      case 'Program':
                        a = e;
                        n = e.parentPath;
                        break;
                      case 'TSModuleBlock':
                        a = e;
                        n = a.parentPath.parentPath;
                        break;
                      case 'ExportNamedDeclaration':
                        a = e.parentPath;
                        n = a.parentPath;
                        break;
                      case 'ExportDefaultDeclaration':
                        a = e.parentPath;
                        n = a.parentPath;
                        break;
                      default:
                        return;
                    }
                    if (
                      e.parent.type === 'TSModuleBlock' ||
                      e.parent.type === 'ExportNamedDeclaration'
                    ) {
                      while (n.type !== 'Program') {
                        if (n.type === 'TSModuleDeclaration') {
                          if (
                            n.parentPath.type !== 'Program' &&
                            n.parentPath.type !== 'ExportNamedDeclaration'
                          ) {
                            return;
                          }
                          s = n.node.id.name + '$' + s;
                        }
                        n = n.parentPath;
                      }
                    }
                    var o = r.id;
                    if (o === null) {
                      return;
                    }
                    var c = o.name;
                    if (!isComponentishName(c)) {
                      return;
                    }
                    if (p.has(r)) {
                      return;
                    }
                    p.add(r);
                    var l = s + c;
                    findInnerComponents(l, e, function (e, r) {
                      var s = createRegistration(n, e);
                      a.insertAfter(
                        i.expressionStatement(
                          i.assignmentExpression('=', s, r),
                        ),
                      );
                    });
                  },
                  exit: function (e) {
                    var r = e.node;
                    var n = r.id;
                    if (n === null) {
                      return;
                    }
                    var a = getHookCallsSignature(r);
                    if (a === null) {
                      return;
                    }
                    if (f.has(r)) {
                      return;
                    }
                    f.add(r);
                    var s = e.scope.generateUidIdentifier('_s');
                    e.scope.parent.push({
                      id: s,
                      init: i.callExpression(o, []),
                    });
                    e.get('body').unshiftContainer(
                      'body',
                      i.expressionStatement(i.callExpression(s, [])),
                    );
                    var c = null;
                    e.find(function (e) {
                      if (e.parentPath.isBlock()) {
                        c = e;
                        return true;
                      }
                    });
                    if (c === null) {
                      return;
                    }
                    c.insertAfter(
                      i.expressionStatement(
                        i.callExpression(
                          s,
                          createArgumentsForSignature(n, a, c.scope),
                        ),
                      ),
                    );
                  },
                },
                'ArrowFunctionExpression|FunctionExpression': {
                  exit: function (e) {
                    var r = e.node;
                    var n = getHookCallsSignature(r);
                    if (n === null) {
                      return;
                    }
                    if (f.has(r)) {
                      return;
                    }
                    f.add(r);
                    var a = e.scope.generateUidIdentifier('_s');
                    e.scope.parent.push({
                      id: a,
                      init: i.callExpression(o, []),
                    });
                    if (e.node.body.type !== 'BlockStatement') {
                      e.node.body = i.blockStatement([
                        i.returnStatement(e.node.body),
                      ]);
                    }
                    e.get('body').unshiftContainer(
                      'body',
                      i.expressionStatement(i.callExpression(a, [])),
                    );
                    if (e.parent.type === 'VariableDeclarator') {
                      var s = null;
                      e.find(function (e) {
                        if (e.parentPath.isBlock()) {
                          s = e;
                          return true;
                        }
                      });
                      if (s === null) {
                        return;
                      }
                      s.insertAfter(
                        i.expressionStatement(
                          i.callExpression(
                            a,
                            createArgumentsForSignature(
                              e.parent.id,
                              n,
                              s.scope,
                            ),
                          ),
                        ),
                      );
                    } else {
                      var c = [e].concat(findHOCCallPathsAbove(e));
                      c.forEach(function (e) {
                        e.replaceWith(
                          i.callExpression(
                            a,
                            createArgumentsForSignature(e.node, n, e.scope),
                          ),
                        );
                      });
                    }
                  },
                },
                VariableDeclaration: function (e) {
                  var r = e.node;
                  var n;
                  var a;
                  var s = '';
                  switch (e.parent.type) {
                    case 'Program':
                      a = e;
                      n = e.parentPath;
                      break;
                    case 'TSModuleBlock':
                      a = e;
                      n = a.parentPath.parentPath;
                      break;
                    case 'ExportNamedDeclaration':
                      a = e.parentPath;
                      n = a.parentPath;
                      break;
                    case 'ExportDefaultDeclaration':
                      a = e.parentPath;
                      n = a.parentPath;
                      break;
                    default:
                      return;
                  }
                  if (
                    e.parent.type === 'TSModuleBlock' ||
                    e.parent.type === 'ExportNamedDeclaration'
                  ) {
                    while (n.type !== 'Program') {
                      if (n.type === 'TSModuleDeclaration') {
                        if (
                          n.parentPath.type !== 'Program' &&
                          n.parentPath.type !== 'ExportNamedDeclaration'
                        ) {
                          return;
                        }
                        s = n.node.id.name + '$' + s;
                      }
                      n = n.parentPath;
                    }
                  }
                  if (p.has(r)) {
                    return;
                  }
                  p.add(r);
                  var o = e.get('declarations');
                  if (o.length !== 1) {
                    return;
                  }
                  var c = o[0];
                  var l = c.node.id.name;
                  var f = s + l;
                  findInnerComponents(f, c, function (e, r, s) {
                    if (s === null) {
                      return;
                    }
                    var o = createRegistration(n, e);
                    if (s.parent.type === 'VariableDeclarator') {
                      a.insertAfter(
                        i.expressionStatement(
                          i.assignmentExpression('=', o, c.node.id),
                        ),
                      );
                    } else {
                      s.replaceWith(i.assignmentExpression('=', o, r));
                    }
                  });
                },
                Program: {
                  enter: function (e) {
                    e.traverse(v);
                  },
                  exit: function (e) {
                    var r = c.get(e);
                    if (r === undefined) {
                      return;
                    }
                    var n = e.node;
                    if (d.has(n)) {
                      return;
                    }
                    d.add(n);
                    c.delete(e);
                    var a = [];
                    e.pushContainer('body', i.variableDeclaration('var', a));
                    r.forEach(function (r) {
                      var n = r.handle,
                        o = r.persistentID;
                      e.pushContainer(
                        'body',
                        i.expressionStatement(
                          i.callExpression(s, [n, i.stringLiteral(o)]),
                        ),
                      );
                      a.push(i.variableDeclarator(n));
                    });
                  },
                },
              },
            };
          }
          e.exports = ReactFreshBabelPlugin;
        })();
      }
    },
    45: function (e, r, n) {
      /** @license React vundefined
       * react-refresh-babel.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
      e.exports = function (e) {
        function t(e, r) {
          var n = e.scope.generateUidIdentifier('c');
          c.has(e) || c.set(e, []);
          c.get(e).push({ handle: n, persistentID: r });
          return n;
        }
        function u(e) {
          return 'string' === typeof e && 'A' <= e[0] && 'Z' >= e[0];
        }
        function m(e, r, n) {
          var a = r.node;
          switch (a.type) {
            case 'Identifier':
              if (!u(a.name)) break;
              n(e, a, null);
              return !0;
            case 'FunctionDeclaration':
              return n(e, a.id, null), !0;
            case 'ArrowFunctionExpression':
              if ('ArrowFunctionExpression' === a.body.type) break;
              n(e, a, r);
              return !0;
            case 'FunctionExpression':
              return n(e, a, r), !0;
            case 'CallExpression':
              var i = r.get('arguments');
              if (void 0 === i || 0 === i.length) break;
              var s = r.get('callee');
              switch (s.node.type) {
                case 'MemberExpression':
                case 'Identifier':
                  s = s.getSource();
                  if (!m(e + '$' + s, i[0], n)) return !1;
                  n(e, a, r);
                  return !0;
                default:
                  return !1;
              }
            case 'VariableDeclarator':
              if (((i = a.init), null !== i && ((s = a.id.name), u(s)))) {
                switch (i.type) {
                  case 'ArrowFunctionExpression':
                  case 'FunctionExpression':
                    break;
                  case 'CallExpression':
                    a = i.callee;
                    var o = a.type;
                    if (
                      'Import' === o ||
                      ('Identifier' === o &&
                        (0 === a.name.indexOf('require') ||
                          0 === a.name.indexOf('import')))
                    )
                      return !1;
                    break;
                  case 'TaggedTemplateExpression':
                    break;
                  default:
                    return !1;
                }
                a = r.get('init');
                if (m(e, a, n)) return !0;
                s = r.scope.getBinding(s);
                if (void 0 === s) return;
                r = !1;
                s = s.referencePaths;
                for (o = 0; o < s.length; o++) {
                  var c = s[o];
                  if (
                    !c.node ||
                    'JSXIdentifier' === c.node.type ||
                    'Identifier' === c.node.type
                  ) {
                    c = c.parent;
                    if ('JSXOpeningElement' === c.type) r = !0;
                    else if ('CallExpression' === c.type) {
                      c = c.callee;
                      var l = void 0;
                      switch (c.type) {
                        case 'Identifier':
                          l = c.name;
                          break;
                        case 'MemberExpression':
                          l = c.property.name;
                      }
                      switch (l) {
                        case 'createElement':
                        case 'jsx':
                        case 'jsxDEV':
                        case 'jsxs':
                          r = !0;
                      }
                    }
                    if (r) return n(e, i, a), !0;
                  }
                }
              }
          }
          return !1;
        }
        function x(e) {
          e = h.get(e);
          return void 0 === e
            ? null
            : {
                key: e
                  .map(function (e) {
                    return e.name + '{' + e.key + '}';
                  })
                  .join('\n'),
                customHooks: e
                  .filter(function (e) {
                    e: switch (e.name) {
                      case 'useState':
                      case 'React.useState':
                      case 'useReducer':
                      case 'React.useReducer':
                      case 'useEffect':
                      case 'React.useEffect':
                      case 'useLayoutEffect':
                      case 'React.useLayoutEffect':
                      case 'useMemo':
                      case 'React.useMemo':
                      case 'useCallback':
                      case 'React.useCallback':
                      case 'useRef':
                      case 'React.useRef':
                      case 'useContext':
                      case 'React.useContext':
                      case 'useImperativeHandle':
                      case 'React.useImperativeHandle':
                      case 'useDebugValue':
                      case 'React.useDebugValue':
                        e = !0;
                        break e;
                      default:
                        e = !1;
                    }
                    return !e;
                  })
                  .map(function (e) {
                    return i.cloneDeep(e.callee);
                  }),
              };
        }
        function C(e) {
          e = e.hub.file;
          var r = l.get(e);
          if (void 0 !== r) return r;
          r = !1;
          for (var n = e.ast.comments, a = 0; a < n.length; a++)
            if (-1 !== n[a].value.indexOf('@refresh reset')) {
              r = !0;
              break;
            }
          l.set(e, r);
          return r;
        }
        function w(e, a, s) {
          var o = a.key;
          a = a.customHooks;
          var c = C(s.path),
            l = [];
          a.forEach(function (e) {
            switch (e.type) {
              case 'MemberExpression':
                if ('Identifier' === e.object.type) var r = e.object.name;
                break;
              case 'Identifier':
                r = e.name;
            }
            s.hasBinding(r) ? l.push(e) : (c = !0);
          });
          a = o;
          false ||
            r.emitFullSignatures ||
            (a = n(113).createHash('sha1').update(o).digest('base64'));
          e = [e, i.stringLiteral(a)];
          (c || 0 < l.length) && e.push(i.booleanLiteral(c));
          0 < l.length &&
            e.push(
              i.functionExpression(
                null,
                [],
                i.blockStatement([i.returnStatement(i.arrayExpression(l))]),
              ),
            );
          return e;
        }
        function D(e) {
          for (var r = []; ; ) {
            if (!e) return r;
            var n = e.parentPath;
            if (!n) return r;
            if (
              'AssignmentExpression' === n.node.type &&
              e.node === n.node.right
            )
              e = n;
            else if (
              'CallExpression' === n.node.type &&
              e.node !== n.node.callee
            )
              r.push(n), (e = n);
            else return r;
          }
        }
        var r =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if ('function' === typeof e.env) {
          var a = e.env();
          if ('development' !== a && !r.skipEnvCheck)
            throw Error(
              'React Refresh Babel transform should only be enabled in development environment. Instead, the environment is: "' +
                a +
                '". If you want to override this check, pass {skipEnvCheck: true} as plugin options.',
            );
        }
        var i = e.types,
          s = i.identifier(r.refreshReg || '$RefreshReg$'),
          o = i.identifier(r.refreshSig || '$RefreshSig$'),
          c = new Map(),
          l = new WeakMap(),
          p = new WeakSet(),
          f = new WeakSet(),
          d = new WeakSet(),
          h = new WeakMap(),
          v = {
            CallExpression: function (e) {
              var r = e.node.callee,
                n = null;
              switch (r.type) {
                case 'Identifier':
                  n = r.name;
                  break;
                case 'MemberExpression':
                  n = r.property.name;
              }
              if (
                null !== n &&
                /^use[A-Z]/.test(n) &&
                ((r = e.scope.getFunctionParent()), null !== r)
              ) {
                r = r.block;
                h.has(r) || h.set(r, []);
                r = h.get(r);
                var a = '';
                'VariableDeclarator' === e.parent.type &&
                  (a = e.parentPath.get('id').getSource());
                var i = e.get('arguments');
                'useState' === n && 0 < i.length
                  ? (a += '(' + i[0].getSource() + ')')
                  : 'useReducer' === n &&
                    1 < i.length &&
                    (a += '(' + i[1].getSource() + ')');
                r.push({ callee: e.node.callee, name: n, key: a });
              }
            },
          };
        return {
          visitor: {
            ExportDefaultDeclaration: function (e) {
              var r = e.node,
                n = r.declaration,
                a = e.get('declaration');
              if ('CallExpression' === n.type && !p.has(r)) {
                p.add(r);
                var s = e.parentPath;
                m('%default%', a, function (e, r, n) {
                  null !== n &&
                    ((e = t(s, e)),
                    n.replaceWith(i.assignmentExpression('=', e, r)));
                });
              }
            },
            FunctionDeclaration: {
              enter: function (e) {
                var r = e.node,
                  n = '';
                switch (e.parent.type) {
                  case 'Program':
                    var a = e;
                    var s = e.parentPath;
                    break;
                  case 'TSModuleBlock':
                    a = e;
                    s = a.parentPath.parentPath;
                    break;
                  case 'ExportNamedDeclaration':
                    a = e.parentPath;
                    s = a.parentPath;
                    break;
                  case 'ExportDefaultDeclaration':
                    a = e.parentPath;
                    s = a.parentPath;
                    break;
                  default:
                    return;
                }
                if (
                  'TSModuleBlock' === e.parent.type ||
                  'ExportNamedDeclaration' === e.parent.type
                )
                  for (; 'Program' !== s.type; ) {
                    if ('TSModuleDeclaration' === s.type) {
                      if (
                        'Program' !== s.parentPath.type &&
                        'ExportNamedDeclaration' !== s.parentPath.type
                      )
                        return;
                      n = s.node.id.name + '$' + n;
                    }
                    s = s.parentPath;
                  }
                var o = r.id;
                null !== o &&
                  ((o = o.name),
                  u(o) &&
                    !p.has(r) &&
                    (p.add(r),
                    m(n + o, e, function (e, r) {
                      e = t(s, e);
                      a.insertAfter(
                        i.expressionStatement(
                          i.assignmentExpression('=', e, r),
                        ),
                      );
                    })));
              },
              exit: function (e) {
                var r = e.node,
                  n = r.id;
                if (null !== n) {
                  var a = x(r);
                  if (null !== a && !f.has(r)) {
                    f.add(r);
                    r = e.scope.generateUidIdentifier('_s');
                    e.scope.parent.push({
                      id: r,
                      init: i.callExpression(o, []),
                    });
                    e.get('body').unshiftContainer(
                      'body',
                      i.expressionStatement(i.callExpression(r, [])),
                    );
                    var s = null;
                    e.find(function (e) {
                      if (e.parentPath.isBlock()) return (s = e), !0;
                    });
                    null !== s &&
                      s.insertAfter(
                        i.expressionStatement(
                          i.callExpression(r, w(n, a, s.scope)),
                        ),
                      );
                  }
                }
              },
            },
            'ArrowFunctionExpression|FunctionExpression': {
              exit: function (e) {
                var r = e.node,
                  n = x(r);
                if (null !== n && !f.has(r)) {
                  f.add(r);
                  var a = e.scope.generateUidIdentifier('_s');
                  e.scope.parent.push({ id: a, init: i.callExpression(o, []) });
                  'BlockStatement' !== e.node.body.type &&
                    (e.node.body = i.blockStatement([
                      i.returnStatement(e.node.body),
                    ]));
                  e.get('body').unshiftContainer(
                    'body',
                    i.expressionStatement(i.callExpression(a, [])),
                  );
                  if ('VariableDeclarator' === e.parent.type) {
                    var s = null;
                    e.find(function (e) {
                      if (e.parentPath.isBlock()) return (s = e), !0;
                    });
                    null !== s &&
                      s.insertAfter(
                        i.expressionStatement(
                          i.callExpression(a, w(e.parent.id, n, s.scope)),
                        ),
                      );
                  } else
                    [e].concat(D(e)).forEach(function (e) {
                      e.replaceWith(i.callExpression(a, w(e.node, n, e.scope)));
                    });
                }
              },
            },
            VariableDeclaration: function (e) {
              var r = e.node,
                n = '';
              switch (e.parent.type) {
                case 'Program':
                  var a = e;
                  var s = e.parentPath;
                  break;
                case 'TSModuleBlock':
                  a = e;
                  s = a.parentPath.parentPath;
                  break;
                case 'ExportNamedDeclaration':
                  a = e.parentPath;
                  s = a.parentPath;
                  break;
                case 'ExportDefaultDeclaration':
                  a = e.parentPath;
                  s = a.parentPath;
                  break;
                default:
                  return;
              }
              if (
                'TSModuleBlock' === e.parent.type ||
                'ExportNamedDeclaration' === e.parent.type
              )
                for (; 'Program' !== s.type; ) {
                  if ('TSModuleDeclaration' === s.type) {
                    if (
                      'Program' !== s.parentPath.type &&
                      'ExportNamedDeclaration' !== s.parentPath.type
                    )
                      return;
                    n = s.node.id.name + '$' + n;
                  }
                  s = s.parentPath;
                }
              if (
                !p.has(r) &&
                (p.add(r), (e = e.get('declarations')), 1 === e.length)
              ) {
                var o = e[0];
                m(n + o.node.id.name, o, function (e, r, n) {
                  null !== n &&
                    ((e = t(s, e)),
                    'VariableDeclarator' === n.parent.type
                      ? a.insertAfter(
                          i.expressionStatement(
                            i.assignmentExpression('=', e, o.node.id),
                          ),
                        )
                      : n.replaceWith(i.assignmentExpression('=', e, r)));
                });
              }
            },
            Program: {
              enter: function (e) {
                e.traverse(v);
              },
              exit: function (e) {
                var r = c.get(e);
                if (void 0 !== r) {
                  var n = e.node;
                  if (!d.has(n)) {
                    d.add(n);
                    c.delete(e);
                    var a = [];
                    e.pushContainer('body', i.variableDeclaration('var', a));
                    r.forEach(function (r) {
                      var n = r.handle;
                      e.pushContainer(
                        'body',
                        i.expressionStatement(
                          i.callExpression(s, [
                            n,
                            i.stringLiteral(r.persistentID),
                          ]),
                        ),
                      );
                      a.push(i.variableDeclarator(n));
                    });
                  }
                }
              },
            },
          },
        };
      };
    },
    113: function (e) {
      e.exports = require('crypto');
    },
  };
  var r = {};
  function __nccwpck_require__(n) {
    var a = r[n];
    if (a !== undefined) {
      return a.exports;
    }
    var i = (r[n] = { exports: {} });
    var s = true;
    try {
      e[n](i, i.exports, __nccwpck_require__);
      s = false;
    } finally {
      if (s) delete r[n];
    }
    return i.exports;
  }
  !(function () {
    __nccwpck_require__.n = function (e) {
      var r =
        e && e.__esModule
          ? function () {
              return e['default'];
            }
          : function () {
              return e;
            };
      __nccwpck_require__.d(r, { a: r });
      return r;
    };
  })();
  !(function () {
    __nccwpck_require__.d = function (e, r) {
      for (var n in r) {
        if (__nccwpck_require__.o(r, n) && !__nccwpck_require__.o(e, n)) {
          Object.defineProperty(e, n, { enumerable: true, get: r[n] });
        }
      }
    };
  })();
  !(function () {
    __nccwpck_require__.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    };
  })();
  !(function () {
    __nccwpck_require__.r = function (e) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(e, '__esModule', { value: true });
    };
  })();
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/';
  var n = {};
  !(function () {
    __nccwpck_require__.r(n);
    var e = __nccwpck_require__(791);
    var r = __nccwpck_require__.n(e);
    n['default'] = r();
  })();
  module.exports = n;
})();
