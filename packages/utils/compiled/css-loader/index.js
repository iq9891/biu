(function () {
  var e = {
    2599: function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      class CssSyntaxError extends Error {
        constructor(e) {
          super(e);
          const { reason: t, line: r, column: s, file: n } = e;
          this.name = 'CssSyntaxError';
          this.message = `${this.name}\n\n`;
          if (typeof r !== 'undefined') {
            this.message += `(${r}:${s}) `;
          }
          this.message += n ? `${n} ` : '<css input> ';
          this.message += `${t}`;
          const o = e.showSourceCode();
          if (o) {
            this.message += `\n\n${o}\n`;
          }
          this.stack = false;
        }
      }
      t['default'] = CssSyntaxError;
    },
    914: function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      class Warning extends Error {
        constructor(e) {
          super(e);
          const { text: t, line: r, column: s } = e;
          this.name = 'Warning';
          this.message = `${this.name}\n\n`;
          if (typeof r !== 'undefined') {
            this.message += `(${r}:${s}) `;
          }
          this.message += `${t}`;
          this.stack = false;
        }
      }
      t['default'] = Warning;
    },
    1534: function (e, t, r) {
      'use strict';
      const s = r(634);
      e.exports = s.default;
      e.exports.defaultGetLocalIdent = r(6212).defaultGetLocalIdent;
    },
    634: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = loader;
      var s = _interopRequireDefault(r(977));
      var n = _interopRequireDefault(r(853));
      var o = r(1621);
      var i = _interopRequireDefault(r(2599));
      var a = _interopRequireDefault(r(914));
      var l = _interopRequireDefault(r(9943));
      var u = r(8869);
      var c = r(6212);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      async function loader(e, t, f) {
        const p = this.getOptions(l.default);
        const h = [];
        const d = this.async();
        let v;
        try {
          v = (0, c.normalizeOptions)(p, this);
        } catch (e) {
          d(e);
          return;
        }
        const m = [];
        const g = [];
        if ((0, c.shouldUseModulesPlugins)(v)) {
          h.push(...(0, c.getModulesPlugins)(v, this));
        }
        const _ = [];
        const y = [];
        let E = false;
        if (
          this._compilation &&
          this._compilation.options &&
          this._compilation.options.experiments &&
          this._compilation.options.experiments.buildHttp
        ) {
          E = true;
        }
        const b = v.esModule && Boolean('fsStartTime' in this._compiler);
        if ((0, c.shouldUseImportPlugin)(v)) {
          h.push(
            (0, u.importParser)({
              isSupportAbsoluteURL: false,
              isSupportDataURL: false,
              isCSSStyleSheet: v.exportType === 'css-style-sheet',
              loaderContext: this,
              imports: _,
              api: y,
              filter: v.import.filter,
              urlHandler: (e) =>
                (0, c.stringifyRequest)(
                  this,
                  (0, c.combineRequests)(
                    (0, c.getPreRequester)(this)(v.importLoaders),
                    e,
                  ),
                ),
            }),
          );
        }
        const w = [];
        if ((0, c.shouldUseURLPlugin)(v)) {
          const e = !v.esModule;
          h.push(
            (0, u.urlParser)({
              isSupportAbsoluteURL: E,
              isSupportDataURL: b,
              imports: w,
              replacements: m,
              context: this.context,
              rootContext: this.rootContext,
              filter: (0, c.getFilter)(v.url.filter, this.resourcePath),
              resolver: e
                ? this.getResolve({ mainFiles: [], extensions: [] })
                : undefined,
              urlHandler: (e) => (0, c.stringifyRequest)(this, e),
            }),
          );
        }
        const S = [];
        const O = [];
        const R = (0, c.shouldUseIcssPlugin)(v);
        if (R) {
          h.push(
            (0, u.icssParser)({
              loaderContext: this,
              imports: S,
              api: O,
              replacements: m,
              exports: g,
              urlHandler: (e) =>
                (0, c.stringifyRequest)(
                  this,
                  (0, c.combineRequests)(
                    (0, c.getPreRequester)(this)(v.importLoaders),
                    e,
                  ),
                ),
            }),
          );
        }
        if (f) {
          const { ast: t } = f;
          if (
            t &&
            t.type === 'postcss' &&
            (0, o.satisfies)(t.version, `^${n.default.version}`)
          ) {
            e = t.root;
          }
        }
        const { resourcePath: x } = this;
        let I;
        try {
          I = await (0, s.default)(h).process(e, {
            hideNothingWarning: true,
            from: x,
            to: x,
            map: v.sourceMap
              ? {
                  prev: t ? (0, c.normalizeSourceMap)(t, x) : null,
                  inline: false,
                  annotation: false,
                }
              : false,
          });
        } catch (e) {
          if (e.file) {
            this.addDependency(e.file);
          }
          d(e.name === 'CssSyntaxError' ? new i.default(e) : e);
          return;
        }
        for (const e of I.warnings()) {
          this.emitWarning(new a.default(e));
        }
        const T = []
          .concat(S.sort(c.sort))
          .concat(_.sort(c.sort))
          .concat(w.sort(c.sort));
        const P = [].concat(y.sort(c.sort)).concat(O.sort(c.sort));
        if (v.modules.exportOnlyLocals !== true) {
          T.unshift({
            type: 'api_import',
            importName: '___CSS_LOADER_API_IMPORT___',
            url: (0, c.stringifyRequest)(this, r.ab + 'api.js'),
          });
          if (v.sourceMap) {
            T.unshift({
              importName: '___CSS_LOADER_API_SOURCEMAP_IMPORT___',
              url: (0, c.stringifyRequest)(this, r.ab + 'sourceMaps.js'),
            });
          } else {
            T.unshift({
              importName: '___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___',
              url: (0, c.stringifyRequest)(this, r.ab + 'noSourceMaps.js'),
            });
          }
        }
        const A = (0, c.getImportCode)(T, v);
        let k;
        try {
          k = (0, c.getModuleCode)(I, P, m, v, this);
        } catch (e) {
          d(e);
          return;
        }
        const L = (0, c.getExportCode)(g, m, R, v);
        d(null, `${A}${k}${L}`);
      }
    },
    8869: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      Object.defineProperty(t, 'icssParser', {
        enumerable: true,
        get: function () {
          return n.default;
        },
      });
      Object.defineProperty(t, 'importParser', {
        enumerable: true,
        get: function () {
          return s.default;
        },
      });
      Object.defineProperty(t, 'urlParser', {
        enumerable: true,
        get: function () {
          return o.default;
        },
      });
      var s = _interopRequireDefault(r(6645));
      var n = _interopRequireDefault(r(5335));
      var o = _interopRequireDefault(r(1773));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    5335: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var s = r(8400);
      var n = r(6212);
      const plugin = (e = {}) => ({
        postcssPlugin: 'postcss-icss-parser',
        async OnceExit(t) {
          const r = Object.create(null);
          const { icssImports: o, icssExports: i } = (0, s.extractICSS)(t);
          const a = new Map();
          const l = [];
          const { loaderContext: u } = e;
          const c = u.getResolve({
            dependencyType: 'icss',
            conditionNames: ['style'],
            extensions: ['...'],
            mainFields: ['css', 'style', 'main', '...'],
            mainFiles: ['index', '...'],
            preferRelative: true,
          });
          for (const e in o) {
            const t = o[e];
            if (Object.keys(t).length === 0) {
              continue;
            }
            let r = e;
            let s = '';
            const i = r.split('!');
            if (i.length > 1) {
              r = i.pop();
              s = i.join('!');
            }
            const a = (0, n.requestify)(
              (0, n.normalizeUrl)(r, true),
              u.rootContext,
            );
            const doResolve = async () => {
              const e = await (0, n.resolveRequests)(c, u.context, [
                ...new Set([r, a]),
              ]);
              if (!e) {
                return;
              }
              return { url: e, prefix: s, tokens: t };
            };
            l.push(doResolve());
          }
          const f = await Promise.all(l);
          for (let t = 0; t <= f.length - 1; t++) {
            const s = f[t];
            if (!s) {
              continue;
            }
            const n = s.prefix ? `${s.prefix}!${s.url}` : s.url;
            const o = n;
            let i = a.get(o);
            if (!i) {
              i = `___CSS_LOADER_ICSS_IMPORT_${a.size}___`;
              a.set(o, i);
              e.imports.push({
                type: 'icss_import',
                importName: i,
                url: e.urlHandler(n),
                icss: true,
                index: t,
              });
              e.api.push({ importName: i, dedupe: true, index: t });
            }
            for (const [n, o] of Object.keys(s.tokens).entries()) {
              const a = `___CSS_LOADER_ICSS_IMPORT_${t}_REPLACEMENT_${n}___`;
              const l = s.tokens[o];
              r[o] = a;
              e.replacements.push({
                replacementName: a,
                importName: i,
                localName: l,
              });
            }
          }
          if (Object.keys(r).length > 0) {
            (0, s.replaceSymbols)(t, r);
          }
          for (const t of Object.keys(i)) {
            const n = (0, s.replaceValueSymbols)(i[t], r);
            e.exports.push({ name: t, value: n });
          }
        },
      });
      plugin.postcss = true;
      var o = plugin;
      t['default'] = o;
    },
    6645: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var s = _interopRequireDefault(r(933));
      var n = r(6212);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function parseNode(e, t, r) {
        if (e.parent.type !== 'root') {
          return;
        }
        if (e.raws && e.raws.afterName && e.raws.afterName.trim().length > 0) {
          const t = e.raws.afterName.lastIndexOf('/*');
          const r = e.raws.afterName
            .slice(t)
            .match(n.WEBPACK_IGNORE_COMMENT_REGEXP);
          if (r && r[2] === 'true') {
            return;
          }
        }
        const o = e.prev();
        if (o && o.type === 'comment') {
          const e = o.text.match(n.WEBPACK_IGNORE_COMMENT_REGEXP);
          if (e && e[2] === 'true') {
            return;
          }
        }
        if (e.nodes) {
          const t = new Error(
            "It looks like you didn't end your @import statement correctly. Child nodes are attached to it.",
          );
          t.node = e;
          throw t;
        }
        const i =
          e.raws && e.raws[t] && typeof e.raws[t].raw !== 'undefined'
            ? e.raws[t].raw
            : e[t];
        const { nodes: a } = (0, s.default)(i);
        if (
          a.length === 0 ||
          (a[0].type !== 'string' && a[0].type !== 'function')
        ) {
          const t = new Error(`Unable to find uri in "${e.toString()}"`);
          t.node = e;
          throw t;
        }
        let l;
        let u;
        if (a[0].type === 'string') {
          l = true;
          u = a[0].value;
        } else {
          if (a[0].value.toLowerCase() !== 'url') {
            const t = new Error(`Unable to find uri in "${e.toString()}"`);
            t.node = e;
            throw t;
          }
          l = a[0].nodes.length !== 0 && a[0].nodes[0].type === 'string';
          u = l ? a[0].nodes[0].value : s.default.stringify(a[0].nodes);
        }
        u = (0, n.normalizeUrl)(u, l);
        const { requestable: c, needResolve: f } = (0, n.isURLRequestable)(
          u,
          r,
        );
        let p;
        if (c && f) {
          const e = u.split('!');
          if (e.length > 1) {
            u = e.pop();
            p = e.join('!');
          }
        }
        if (u.trim().length === 0) {
          const t = new Error(`Unable to find uri in "${e.toString()}"`);
          t.node = e;
          throw t;
        }
        const h = a.slice(1);
        let d;
        let v;
        let m;
        if (h.length > 0) {
          let e = [];
          for (const t of h) {
            e.push(t);
            const r =
              t.type === 'function' && t.value.toLowerCase() === 'layer';
            const n = t.type === 'word' && t.value.toLowerCase() === 'layer';
            if (r || n) {
              if (r) {
                e.splice(e.length - 1, 1, ...t.nodes);
              } else {
                e.splice(e.length - 1, 1, {
                  type: 'string',
                  value: '',
                  unclosed: false,
                });
              }
              v = s.default.stringify(e).trim().toLowerCase();
              e = [];
            } else if (
              t.type === 'function' &&
              t.value.toLowerCase() === 'supports'
            ) {
              e.splice(e.length - 1, 1, ...t.nodes);
              d = s.default.stringify(e).trim().toLowerCase();
              e = [];
            }
          }
          if (e.length > 0) {
            m = s.default.stringify(e).trim().toLowerCase();
          }
        }
        return {
          atRule: e,
          prefix: p,
          url: u,
          layer: v,
          supports: d,
          media: m,
          requestable: c,
          needResolve: f,
        };
      }
      const plugin = (e = {}) => ({
        postcssPlugin: 'postcss-import-parser',
        prepare(t) {
          const r = [];
          return {
            AtRule: {
              import(s) {
                if (e.isCSSStyleSheet) {
                  e.loaderContext.emitError(
                    new Error(
                      s.error(
                        "'@import' rules are not allowed here and will not be processed",
                      ).message,
                    ),
                  );
                  return;
                }
                const { isSupportDataURL: n, isSupportAbsoluteURL: o } = e;
                let i;
                try {
                  i = parseNode(s, 'params', {
                    isSupportAbsoluteURL: o,
                    isSupportDataURL: n,
                  });
                } catch (e) {
                  t.warn(e.message, { node: e.node });
                }
                if (!i) {
                  return;
                }
                r.push(i);
              },
            },
            async OnceExit() {
              if (r.length === 0) {
                return;
              }
              const { loaderContext: t } = e;
              const s = t.getResolve({
                dependencyType: 'css',
                conditionNames: ['style'],
                mainFields: ['css', 'style', 'main', '...'],
                mainFiles: ['index', '...'],
                extensions: ['.css', '...'],
                preferRelative: true,
              });
              const o = await Promise.all(
                r.map(async (r) => {
                  const {
                    atRule: o,
                    requestable: i,
                    needResolve: a,
                    prefix: l,
                    url: u,
                    layer: c,
                    supports: f,
                    media: p,
                  } = r;
                  if (e.filter) {
                    const r = await e.filter(u, p, t.resourcePath, f, c);
                    if (!r) {
                      return;
                    }
                  }
                  if (a) {
                    const e = (0, n.requestify)(u, t.rootContext);
                    const r = await (0, n.resolveRequests)(s, t.context, [
                      ...new Set([e, u]),
                    ]);
                    if (!r) {
                      return;
                    }
                    if (r === t.resourcePath) {
                      o.remove();
                      return;
                    }
                    o.remove();
                    return {
                      url: r,
                      layer: c,
                      supports: f,
                      media: p,
                      prefix: l,
                      requestable: i,
                    };
                  }
                  o.remove();
                  return {
                    url: u,
                    layer: c,
                    supports: f,
                    media: p,
                    prefix: l,
                    requestable: i,
                  };
                }),
              );
              const i = new Map();
              for (let t = 0; t <= o.length - 1; t++) {
                const r = o[t];
                if (!r) {
                  continue;
                }
                const {
                  url: s,
                  requestable: n,
                  layer: a,
                  supports: l,
                  media: u,
                } = r;
                if (!n) {
                  e.api.push({
                    url: s,
                    layer: a,
                    supports: l,
                    media: u,
                    index: t,
                  });
                  continue;
                }
                const { prefix: c } = r;
                const f = c ? `${c}!${s}` : s;
                let p = i.get(f);
                if (!p) {
                  p = `___CSS_LOADER_AT_RULE_IMPORT_${i.size}___`;
                  i.set(f, p);
                  e.imports.push({
                    type: 'rule_import',
                    importName: p,
                    url: e.urlHandler(f),
                    index: t,
                  });
                }
                e.api.push({
                  importName: p,
                  layer: a,
                  supports: l,
                  media: u,
                  index: t,
                });
              }
            },
          };
        },
      });
      plugin.postcss = true;
      var o = plugin;
      t['default'] = o;
    },
    1773: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t['default'] = void 0;
      var s = _interopRequireDefault(r(933));
      var n = r(6212);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const o = /url/i;
      const i = /^(?:-webkit-)?image-set$/i;
      const a = /(?:url|(?:-webkit-)?image-set)\(/i;
      function getNodeFromUrlFunc(e) {
        return e.nodes && e.nodes[0];
      }
      function getWebpackIgnoreCommentValue(e, t, r) {
        if (e === 0 && typeof r !== 'undefined') {
          return r;
        }
        let s = t[e - 1];
        if (!s) {
          return;
        }
        if (s.type === 'space') {
          if (!t[e - 2]) {
            return;
          }
          s = t[e - 2];
        }
        if (s.type !== 'comment') {
          return;
        }
        const o = s.value.match(n.WEBPACK_IGNORE_COMMENT_REGEXP);
        return o && o[2] === 'true';
      }
      function shouldHandleURL(e, t, r, s) {
        if (e.length === 0) {
          r.warn(`Unable to find uri in '${t.toString()}'`, { node: t });
          return { requestable: false, needResolve: false };
        }
        return (0, n.isURLRequestable)(e, s);
      }
      function parseDeclaration(e, t, r, l) {
        if (!a.test(e[t])) {
          return;
        }
        const u = (0, s.default)(
          e.raws && e.raws.value && e.raws.value.raw ? e.raws.value.raw : e[t],
        );
        let c;
        if (e.raws && e.raws.between) {
          const t = e.raws.between.lastIndexOf('/*');
          const r = e.raws.between
            .slice(t)
            .match(n.WEBPACK_IGNORE_COMMENT_REGEXP);
          if (r) {
            c = r[2] === 'true';
          }
        }
        let f = false;
        const p = e.prev();
        if (p && p.type === 'comment') {
          const e = p.text.match(n.WEBPACK_IGNORE_COMMENT_REGEXP);
          if (e) {
            f = e[2] === 'true';
          }
        }
        let h;
        const d = [];
        u.walk((t, a, p) => {
          if (t.type !== 'function') {
            return;
          }
          if (o.test(t.value)) {
            h = getWebpackIgnoreCommentValue(a, p, c);
            if ((f && typeof h === 'undefined') || h) {
              if (h) {
                h = undefined;
              }
              return;
            }
            const { nodes: o } = t;
            const i = o.length !== 0 && o[0].type === 'string';
            let v = i ? o[0].value : s.default.stringify(o);
            v = (0, n.normalizeUrl)(v, i);
            const { requestable: m, needResolve: g } = shouldHandleURL(
              v,
              e,
              r,
              l,
            );
            if (!m) {
              return false;
            }
            const _ = v.split('!');
            let y;
            if (_.length > 1) {
              v = _.pop();
              y = _.join('!');
            }
            d.push({
              declaration: e,
              parsed: u,
              node: getNodeFromUrlFunc(t),
              prefix: y,
              url: v,
              needQuotes: false,
              needResolve: g,
            });
            return false;
          } else if (i.test(t.value)) {
            for (const [i, a] of t.nodes.entries()) {
              const { type: c, value: p } = a;
              if (c === 'function' && o.test(p)) {
                h = getWebpackIgnoreCommentValue(i, t.nodes);
                if ((f && typeof h === 'undefined') || h) {
                  if (h) {
                    h = undefined;
                  }
                  continue;
                }
                const { nodes: o } = a;
                const c = o.length !== 0 && o[0].type === 'string';
                let p = c ? o[0].value : s.default.stringify(o);
                p = (0, n.normalizeUrl)(p, c);
                const { requestable: v, needResolve: m } = shouldHandleURL(
                  p,
                  e,
                  r,
                  l,
                );
                if (!v) {
                  return false;
                }
                const g = p.split('!');
                let _;
                if (g.length > 1) {
                  p = g.pop();
                  _ = g.join('!');
                }
                d.push({
                  declaration: e,
                  parsed: u,
                  node: getNodeFromUrlFunc(a),
                  prefix: _,
                  url: p,
                  needQuotes: false,
                  needResolve: m,
                });
              } else if (c === 'string') {
                h = getWebpackIgnoreCommentValue(i, t.nodes);
                if ((f && typeof h === 'undefined') || h) {
                  if (h) {
                    h = undefined;
                  }
                  continue;
                }
                let s = (0, n.normalizeUrl)(p, true);
                const { requestable: o, needResolve: c } = shouldHandleURL(
                  s,
                  e,
                  r,
                  l,
                );
                if (!o) {
                  return false;
                }
                const v = s.split('!');
                let m;
                if (v.length > 1) {
                  s = v.pop();
                  m = v.join('!');
                }
                d.push({
                  declaration: e,
                  parsed: u,
                  node: a,
                  prefix: m,
                  url: s,
                  needQuotes: true,
                  needResolve: c,
                });
              }
            }
            return false;
          }
        });
        return d;
      }
      const plugin = (e = {}) => ({
        postcssPlugin: 'postcss-url-parser',
        prepare(t) {
          const s = [];
          return {
            Declaration(r) {
              const { isSupportDataURL: n, isSupportAbsoluteURL: o } = e;
              const i = parseDeclaration(r, 'value', t, {
                isSupportDataURL: n,
                isSupportAbsoluteURL: o,
              });
              if (!i) {
                return;
              }
              s.push(...i);
            },
            async OnceExit() {
              if (s.length === 0) {
                return;
              }
              const t = await Promise.all(
                s.map(async (t) => {
                  const { url: r, needResolve: s } = t;
                  if (e.filter) {
                    const t = await e.filter(r);
                    if (!t) {
                      return;
                    }
                  }
                  if (!s) {
                    return t;
                  }
                  const o = r.split(/(\?)?#/);
                  const [i, a, l] = o;
                  let u = a ? '?' : '';
                  u += l ? `#${l}` : '';
                  const { resolver: c, rootContext: f } = e;
                  const p = (0, n.requestify)(i, f, Boolean(c));
                  if (!c) {
                    return { ...t, url: p, hash: u };
                  }
                  const h = await (0, n.resolveRequests)(c, e.context, [
                    ...new Set([p, r]),
                  ]);
                  if (!h) {
                    return;
                  }
                  return { ...t, url: h, hash: u };
                }),
              );
              const o = new Map();
              const i = new Map();
              let a = false;
              for (let s = 0; s <= t.length - 1; s++) {
                const n = t[s];
                if (!n) {
                  continue;
                }
                if (!a) {
                  e.imports.push({
                    type: 'get_url_import',
                    importName: '___CSS_LOADER_GET_URL_IMPORT___',
                    url: e.urlHandler(r.ab + 'getUrl.js'),
                    index: -1,
                  });
                  a = true;
                }
                const { url: l, prefix: u } = n;
                const c = u ? `${u}!${l}` : l;
                let f = o.get(c);
                if (!f) {
                  f = `___CSS_LOADER_URL_IMPORT_${o.size}___`;
                  o.set(c, f);
                  e.imports.push({
                    type: 'url',
                    importName: f,
                    url: e.resolver ? e.urlHandler(c) : JSON.stringify(c),
                    index: s,
                  });
                }
                const { hash: p, needQuotes: h } = n;
                const d = JSON.stringify({ newUrl: c, hash: p, needQuotes: h });
                let v = i.get(d);
                if (!v) {
                  v = `___CSS_LOADER_URL_REPLACEMENT_${i.size}___`;
                  i.set(d, v);
                  e.replacements.push({
                    replacementName: v,
                    importName: f,
                    hash: p,
                    needQuotes: h,
                  });
                }
                n.node.type = 'word';
                n.node.value = v;
                n.declaration.value = n.parsed.toString();
              }
            },
          };
        },
      });
      plugin.postcss = true;
      var l = plugin;
      t['default'] = l;
    },
    6212: function (e, t, r) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: true });
      t.WEBPACK_IGNORE_COMMENT_REGEXP = void 0;
      t.camelCase = camelCase;
      t.combineRequests = combineRequests;
      t.defaultGetLocalIdent = defaultGetLocalIdent;
      t.getExportCode = getExportCode;
      t.getFilter = getFilter;
      t.getImportCode = getImportCode;
      t.getModuleCode = getModuleCode;
      t.getModulesOptions = getModulesOptions;
      t.getModulesPlugins = getModulesPlugins;
      t.getPreRequester = getPreRequester;
      t.isDataUrl = isDataUrl;
      t.isURLRequestable = isURLRequestable;
      t.normalizeOptions = normalizeOptions;
      t.normalizeSourceMap = normalizeSourceMap;
      t.normalizeUrl = normalizeUrl;
      t.requestify = requestify;
      t.resolveRequests = resolveRequests;
      t.shouldUseIcssPlugin = shouldUseIcssPlugin;
      t.shouldUseImportPlugin = shouldUseImportPlugin;
      t.shouldUseModulesPlugins = shouldUseModulesPlugins;
      t.shouldUseURLPlugin = shouldUseURLPlugin;
      t.sort = sort;
      t.stringifyRequest = stringifyRequest;
      var s = r(7310);
      var n = _interopRequireDefault(r(1017));
      var o = _interopRequireDefault(r(3952));
      var i = _interopRequireDefault(r(8315));
      var a = _interopRequireDefault(r(2815));
      var l = _interopRequireDefault(r(3365));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const u = /webpackIgnore:(\s+)?(true|false)/;
      t.WEBPACK_IGNORE_COMMENT_REGEXP = u;
      const c = /^\.\.?[/\\]/;
      function isAbsolutePath(e) {
        return n.default.posix.isAbsolute(e) || n.default.win32.isAbsolute(e);
      }
      function isRelativePath(e) {
        return c.test(e);
      }
      function stringifyRequest(e, t) {
        if (
          typeof e.utils !== 'undefined' &&
          typeof e.utils.contextify === 'function'
        ) {
          return JSON.stringify(
            e.utils.contextify(e.context || e.rootContext, t),
          );
        }
        const r = t.split('!');
        const { context: s } = e;
        return JSON.stringify(
          r
            .map((e) => {
              const t = e.match(/^(.*?)(\?.*)/);
              const r = t ? t[2] : '';
              let o = t ? t[1] : e;
              if (isAbsolutePath(o) && s) {
                o = n.default.relative(s, o);
                if (isAbsolutePath(o)) {
                  return o + r;
                }
                if (isRelativePath(o) === false) {
                  o = `./${o}`;
                }
              }
              return o.replace(/\\/g, '/') + r;
            })
            .join('!'),
        );
      }
      const f = /^[a-z]:[/\\]|^\\\\/i;
      const p = /^[^?]*~/;
      function urlToRequest(e, t) {
        let r;
        if (f.test(e)) {
          r = e;
        } else if (typeof t !== 'undefined' && /^\//.test(e)) {
          r = t + e;
        } else if (/^\.\.?\//.test(e)) {
          r = e;
        } else {
          r = `./${e}`;
        }
        if (p.test(r)) {
          r = r.replace(p, '');
        }
        return r;
      }
      const h = /[ -,.\/:-@[\]\^`{-~]/;
      const d = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
      const preserveCamelCase = (e) => {
        let t = e;
        let r = false;
        let s = false;
        let n = false;
        for (let e = 0; e < t.length; e++) {
          const o = t[e];
          if (r && /[\p{Lu}]/u.test(o)) {
            t = `${t.slice(0, e)}-${t.slice(e)}`;
            r = false;
            n = s;
            s = true;
            e += 1;
          } else if (s && n && /[\p{Ll}]/u.test(o)) {
            t = `${t.slice(0, e - 1)}-${t.slice(e - 1)}`;
            n = s;
            s = false;
            r = true;
          } else {
            r = o.toLowerCase() === o && o.toUpperCase() !== o;
            n = s;
            s = o.toUpperCase() === o && o.toLowerCase() !== o;
          }
        }
        return t;
      };
      function camelCase(e) {
        let t = e.trim();
        if (t.length === 0) {
          return '';
        }
        if (t.length === 1) {
          return t.toLowerCase();
        }
        const r = t !== t.toLowerCase();
        if (r) {
          t = preserveCamelCase(t);
        }
        return t
          .replace(/^[_.\- ]+/, '')
          .toLowerCase()
          .replace(/[_.\- ]+([\p{Alpha}\p{N}_]|$)/gu, (e, t) => t.toUpperCase())
          .replace(/\d+([\p{Alpha}\p{N}_]|$)/gu, (e) => e.toUpperCase());
      }
      function escape(e) {
        let t = '';
        let r = 0;
        while (r < e.length) {
          const s = e.charAt(r++);
          let n;
          if (/[\t\n\f\r\x0B]/.test(s)) {
            const e = s.charCodeAt();
            n = `\\${e.toString(16).toUpperCase()} `;
          } else if (s === '\\' || h.test(s)) {
            n = `\\${s}`;
          } else {
            n = s;
          }
          t += n;
        }
        const s = e.charAt(0);
        if (/^-[-\d]/.test(t)) {
          t = `\\-${t.slice(1)}`;
        } else if (/\d/.test(s)) {
          t = `\\3${s} ${t.slice(1)}`;
        }
        t = t.replace(d, (e, t, r) => {
          if (t && t.length % 2) {
            return e;
          }
          return (t || '') + r;
        });
        return t;
      }
      function gobbleHex(e) {
        const t = e.toLowerCase();
        let r = '';
        let s = false;
        for (let e = 0; e < 6 && t[e] !== undefined; e++) {
          const n = t.charCodeAt(e);
          const o = (n >= 97 && n <= 102) || (n >= 48 && n <= 57);
          s = n === 32;
          if (!o) {
            break;
          }
          r += t[e];
        }
        if (r.length === 0) {
          return undefined;
        }
        const n = parseInt(r, 16);
        const o = n >= 55296 && n <= 57343;
        if (o || n === 0 || n > 1114111) {
          return ['�', r.length + (s ? 1 : 0)];
        }
        return [String.fromCodePoint(n), r.length + (s ? 1 : 0)];
      }
      const v = /\\/;
      function unescape(e) {
        const t = v.test(e);
        if (!t) {
          return e;
        }
        let r = '';
        for (let t = 0; t < e.length; t++) {
          if (e[t] === '\\') {
            const s = gobbleHex(e.slice(t + 1, t + 7));
            if (s !== undefined) {
              r += s[0];
              t += s[1];
              continue;
            }
            if (e[t + 1] === '\\') {
              r += '\\';
              t += 1;
              continue;
            }
            if (e.length === t + 1) {
              r += e[t];
            }
            continue;
          }
          r += e[t];
        }
        return r;
      }
      function normalizePath(e) {
        return n.default.sep === '\\' ? e.replace(/\\/g, '/') : e;
      }
      const m = /[<>:"/\\|?*]/g;
      const g = /[\u0000-\u001f\u0080-\u009f]/g;
      function escapeLocalIdent(e) {
        return escape(
          e
            .replace(/^((-?[0-9])|--)/, '_$1')
            .replace(m, '-')
            .replace(g, '-')
            .replace(/\./g, '-'),
        );
      }
      function defaultGetLocalIdent(e, t, r, s) {
        const { context: o, hashSalt: i, hashStrategy: a } = s;
        const { resourcePath: l } = e;
        const u = normalizePath(n.default.relative(o, l));
        s.content =
          a === 'minimal-subset' && /\[local\]/.test(t) ? u : `${u}\0${r}`;
        let { hashFunction: c, hashDigest: f, hashDigestLength: p } = s;
        const h = t.match(
          /\[(?:([^:\]]+):)?(?:(hash|contenthash|fullhash))(?::([a-z]+\d*))?(?::(\d+))?\]/i,
        );
        if (h) {
          const e = h[2] || c;
          c = h[1] || c;
          f = h[3] || f;
          p = h[4] || p;
          t = t.replace(
            /\[(?:([^:\]]+):)?(?:hash|contenthash|fullhash)(?::([a-z]+\d*))?(?::(\d+))?\]/gi,
            () => (e === 'fullhash' ? '[fullhash]' : '[contenthash]'),
          );
        }
        let d = '';
        for (let t = 0; d.length < p; t++) {
          const r =
            e.utils && typeof e.utils.createHash === 'function'
              ? e.utils.createHash(c)
              : e._compiler.webpack.util.createHash(c);
          if (i) {
            r.update(i);
          }
          const n = Buffer.allocUnsafe(4);
          n.writeUInt32LE(t);
          r.update(n);
          r.update(Buffer.from(s.content, 'utf8'));
          d = (d + r.digest(f))
            .replace(/^\d+/, '')
            .replace(/\//g, '_')
            .replace(/[^A-Za-z0-9_]+/g, '')
            .slice(0, p);
        }
        const v = n.default.extname(l);
        const m = n.default.basename(l);
        const g = m.slice(0, m.length - v.length);
        const _ = {
          filename: n.default.relative(o, l),
          contentHash: d,
          chunk: { name: g, hash: d, contentHash: d },
        };
        let y = e._compilation.getPath(t, _);
        if (/\[folder\]/gi.test(y)) {
          const e = n.default.dirname(l);
          let t = normalizePath(n.default.relative(o, `${e + n.default.sep}_`));
          t = t.substr(0, t.length - 1);
          let r = '';
          if (t.length > 1) {
            r = n.default.basename(t);
          }
          y = y.replace(/\[folder\]/gi, () => r);
        }
        if (s.regExp) {
          const e = l.match(s.regExp);
          if (e) {
            e.forEach((e, t) => {
              y = y.replace(new RegExp(`\\[${t}\\]`, 'ig'), e);
            });
          }
        }
        return y;
      }
      function fixedEncodeURIComponent(e) {
        return e.replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
      }
      function isDataUrl(e) {
        if (/^data:/i.test(e)) {
          return true;
        }
        return false;
      }
      const _ = /^[A-Z]:[/\\]|^\\\\/i;
      function normalizeUrl(e, t) {
        let r = e
          .replace(/^( |\t\n|\r\n|\r|\f)*/g, '')
          .replace(/( |\t\n|\r\n|\r|\f)*$/g, '');
        if (t && /\\(\n|\r\n|\r|\f)/.test(r)) {
          r = r.replace(/\\(\n|\r\n|\r|\f)/g, '');
        }
        if (_.test(e)) {
          try {
            r = decodeURI(r);
          } catch (e) {}
          return r;
        }
        r = unescape(r);
        if (isDataUrl(e)) {
          return fixedEncodeURIComponent(r);
        }
        try {
          r = decodeURI(r);
        } catch (e) {}
        return r;
      }
      function requestify(e, t, r = true) {
        if (r) {
          if (/^file:/i.test(e)) {
            return (0, s.fileURLToPath)(e);
          }
          return e.charAt(0) === '/' ? urlToRequest(e, t) : urlToRequest(e);
        }
        if (e.charAt(0) === '/' || /^file:/i.test(e)) {
          return e;
        }
        if (p.test(e)) {
          return e.replace(p, '');
        }
        return e;
      }
      function getFilter(e, t) {
        return (...r) => {
          if (typeof e === 'function') {
            return e(...r, t);
          }
          return true;
        };
      }
      function getValidLocalName(e, t) {
        const r = t(e);
        return Array.isArray(r) ? r[0] : r;
      }
      const y = /\.module(s)?\.\w+$/i;
      const E = /\.icss\.\w+$/i;
      function getModulesOptions(e, t, r) {
        if (typeof e.modules === 'boolean' && e.modules === false) {
          return false;
        }
        const s = (r._module && r._module.matchResource) || r.resourcePath;
        let n;
        let o;
        if (typeof e.modules === 'undefined') {
          o = {};
          n = true;
        } else if (typeof e.modules === 'boolean') {
          o = {};
        } else if (typeof e.modules === 'string') {
          o = { mode: e.modules };
        } else {
          o = e.modules;
          ({ auto: n } = o);
        }
        const { outputOptions: i } = r._compilation;
        const a = t === 'css-style-sheet' || t === 'string';
        const l = {
          auto: n,
          mode: 'local',
          exportGlobals: false,
          localIdentName: '[hash:base64]',
          localIdentContext: r.rootContext,
          localIdentHashSalt: i.hashSalt,
          localIdentHashFunction: i.hashFunction,
          localIdentHashDigest: i.hashDigest,
          localIdentHashDigestLength: i.hashDigestLength,
          localIdentRegExp: undefined,
          getLocalIdent: undefined,
          namedExport: a || false,
          exportLocalsConvention:
            (o.namedExport === true || a) &&
            typeof o.exportLocalsConvention === 'undefined'
              ? 'camelCaseOnly'
              : 'asIs',
          exportOnlyLocals: false,
          ...o,
        };
        let u;
        if (typeof l.exportLocalsConvention === 'string') {
          u = l.exportLocalsConvention;
          l.exportLocalsConvention = (e) => {
            switch (u) {
              case 'camelCase': {
                return [e, camelCase(e)];
              }
              case 'camelCaseOnly': {
                return camelCase(e);
              }
              case 'dashes': {
                return [e, dashesCamelCase(e)];
              }
              case 'dashesOnly': {
                return dashesCamelCase(e);
              }
              case 'asIs':
              default:
                return e;
            }
          };
        }
        if (typeof l.auto === 'boolean') {
          const e = l.auto && y.test(s);
          let t;
          if (!e) {
            t = E.test(s);
            if (t) {
              l.mode = 'icss';
            }
          }
          if (!e && !t) {
            return false;
          }
        } else if (l.auto instanceof RegExp) {
          const e = l.auto.test(s);
          if (!e) {
            return false;
          }
        } else if (typeof l.auto === 'function') {
          const e = l.auto(s);
          if (!e) {
            return false;
          }
        }
        if (typeof l.mode === 'function') {
          l.mode = l.mode(r.resourcePath);
        }
        if (a) {
          if (e.esModule === false) {
            throw new Error(
              "The 'exportType' option with the 'css-style-sheet' or 'string' value requires the 'esModules' option to be enabled",
            );
          }
          if (l.namedExport === false) {
            throw new Error(
              "The 'exportType' option with the 'css-style-sheet' or 'string' value requires the 'modules.namedExport' option to be enabled",
            );
          }
        }
        if (l.namedExport === true) {
          if (e.esModule === false) {
            throw new Error(
              "The 'modules.namedExport' option requires the 'esModules' option to be enabled",
            );
          }
          if (
            typeof u === 'string' &&
            u !== 'camelCaseOnly' &&
            u !== 'dashesOnly'
          ) {
            throw new Error(
              'The "modules.namedExport" option requires the "modules.exportLocalsConvention" option to be "camelCaseOnly" or "dashesOnly"',
            );
          }
        }
        return l;
      }
      function normalizeOptions(e, t) {
        const r = typeof e.exportType === 'undefined' ? 'array' : e.exportType;
        const s = getModulesOptions(e, r, t);
        return {
          url: typeof e.url === 'undefined' ? true : e.url,
          import: typeof e.import === 'undefined' ? true : e.import,
          modules: s,
          sourceMap:
            typeof e.sourceMap === 'boolean' ? e.sourceMap : t.sourceMap,
          importLoaders:
            typeof e.importLoaders === 'string'
              ? parseInt(e.importLoaders, 10)
              : e.importLoaders,
          esModule: typeof e.esModule === 'undefined' ? true : e.esModule,
          exportType: r,
        };
      }
      function shouldUseImportPlugin(e) {
        if (e.modules.exportOnlyLocals) {
          return false;
        }
        if (typeof e.import === 'boolean') {
          return e.import;
        }
        return true;
      }
      function shouldUseURLPlugin(e) {
        if (e.modules.exportOnlyLocals) {
          return false;
        }
        if (typeof e.url === 'boolean') {
          return e.url;
        }
        return true;
      }
      function shouldUseModulesPlugins(e) {
        if (typeof e.modules === 'boolean' && e.modules === false) {
          return false;
        }
        return e.modules.mode !== 'icss';
      }
      function shouldUseIcssPlugin(e) {
        return Boolean(e.modules);
      }
      function getModulesPlugins(e, t) {
        const {
          mode: r,
          getLocalIdent: s,
          localIdentName: n,
          localIdentContext: u,
          localIdentHashSalt: c,
          localIdentHashFunction: f,
          localIdentHashDigest: p,
          localIdentHashDigestLength: h,
          localIdentRegExp: d,
          hashStrategy: v,
        } = e.modules;
        let m = [];
        try {
          m = [
            o.default,
            (0, i.default)({ mode: r }),
            (0, a.default)(),
            (0, l.default)({
              generateScopedName(e) {
                let r;
                if (typeof s !== 'undefined') {
                  r = s(t, n, unescape(e), {
                    context: u,
                    hashSalt: c,
                    hashFunction: f,
                    hashDigest: p,
                    hashDigestLength: h,
                    hashStrategy: v,
                    regExp: d,
                  });
                }
                if (typeof r === 'undefined' || r === null) {
                  r = defaultGetLocalIdent(t, n, unescape(e), {
                    context: u,
                    hashSalt: c,
                    hashFunction: f,
                    hashDigest: p,
                    hashDigestLength: h,
                    hashStrategy: v,
                    regExp: d,
                  });
                  return escapeLocalIdent(r).replace(/\\\[local\\]/gi, e);
                }
                return escapeLocalIdent(r);
              },
              exportGlobals: e.modules.exportGlobals,
            }),
          ];
        } catch (e) {
          t.emitError(e);
        }
        return m;
      }
      const b = /^[a-z0-9+\-.]+:/i;
      function getURLType(e) {
        if (e[0] === '/') {
          if (e[1] === '/') {
            return 'scheme-relative';
          }
          return 'path-absolute';
        }
        if (f.test(e)) {
          return 'path-absolute';
        }
        return b.test(e) ? 'absolute' : 'path-relative';
      }
      function normalizeSourceMap(e, t) {
        let r = e;
        if (typeof r === 'string') {
          r = JSON.parse(r);
        }
        delete r.file;
        const { sourceRoot: s } = r;
        delete r.sourceRoot;
        if (r.sources) {
          r.sources = r.sources.map((e) => {
            if (e.indexOf('<') === 0) {
              return e;
            }
            const r = getURLType(e);
            if (r === 'path-relative' || r === 'path-absolute') {
              const o =
                r === 'path-relative' && s
                  ? n.default.resolve(s, normalizePath(e))
                  : normalizePath(e);
              return n.default.relative(n.default.dirname(t), o);
            }
            return e;
          });
        }
        return r;
      }
      function getPreRequester({ loaders: e, loaderIndex: t }) {
        const r = Object.create(null);
        return (s) => {
          if (r[s]) {
            return r[s];
          }
          if (s === false) {
            r[s] = '';
          } else {
            const n = e
              .slice(t, t + 1 + (typeof s !== 'number' ? 0 : s))
              .map((e) => e.request)
              .join('!');
            r[s] = `-!${n}!`;
          }
          return r[s];
        };
      }
      function getImportCode(e, t) {
        let r = '';
        for (const s of e) {
          const { importName: e, url: n, icss: o, type: i } = s;
          if (t.esModule) {
            if (o && t.modules.namedExport) {
              r += `import ${
                t.modules.exportOnlyLocals ? '' : `${e}, `
              }* as ${e}_NAMED___ from ${n};\n`;
            } else {
              r +=
                i === 'url'
                  ? `var ${e} = new URL(${n}, import.meta.url);\n`
                  : `import ${e} from ${n};\n`;
            }
          } else {
            r += `var ${e} = require(${n});\n`;
          }
        }
        return r ? `// Imports\n${r}` : '';
      }
      function normalizeSourceMapForRuntime(e, t) {
        const r = e ? e.toJSON() : null;
        if (r) {
          delete r.file;
          if (
            t._compilation &&
            t._compilation.options &&
            t._compilation.options.devtool &&
            t._compilation.options.devtool.includes('nosources')
          ) {
            delete r.sourcesContent;
          }
          r.sourceRoot = '';
          r.sources = r.sources.map((e) => {
            if (e.indexOf('<') === 0) {
              return e;
            }
            const r = getURLType(e);
            if (r !== 'path-relative') {
              return e;
            }
            const s = n.default.dirname(t.resourcePath);
            const o = n.default.resolve(s, e);
            const i = normalizePath(n.default.relative(t.rootContext, o));
            return `webpack://./${i}`;
          });
        }
        return JSON.stringify(r);
      }
      function printParams(e, t, r, s) {
        let n = '';
        if (typeof s !== 'undefined') {
          n = `, ${JSON.stringify(s)}`;
        }
        if (typeof r !== 'undefined') {
          n = `, ${JSON.stringify(r)}${n}`;
        } else if (n.length > 0) {
          n = `, undefined${n}`;
        }
        if (t) {
          n = `, true${n}`;
        } else if (n.length > 0) {
          n = `, false${n}`;
        }
        if (e) {
          n = `${JSON.stringify(e)}${n}`;
        } else if (n.length > 0) {
          n = `""${n}`;
        }
        return n;
      }
      function getModuleCode(e, t, r, s, n) {
        if (s.modules.exportOnlyLocals === true) {
          return '';
        }
        let o = '';
        if (s.sourceMap) {
          const t = e.map;
          o = `,${normalizeSourceMapForRuntime(t, n)}`;
        }
        let i = JSON.stringify(e.css);
        let a = `var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(${
          s.sourceMap
            ? '___CSS_LOADER_API_SOURCEMAP_IMPORT___'
            : '___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___'
        });\n`;
        for (const e of t) {
          const { url: t, layer: r, supports: s, media: n, dedupe: o } = e;
          if (t) {
            const e = printParams(n, undefined, s, r);
            a += `___CSS_LOADER_EXPORT___.push([module.id, ${JSON.stringify(
              `@import url(${t});`,
            )}${e.length > 0 ? `, ${e}` : ''}]);\n`;
          } else {
            const t = printParams(n, o, s, r);
            a += `___CSS_LOADER_EXPORT___.i(${e.importName}${
              t.length > 0 ? `, ${t}` : ''
            });\n`;
          }
        }
        for (const e of r) {
          const { replacementName: t, importName: r, localName: n } = e;
          if (n) {
            i = i.replace(new RegExp(t, 'g'), () =>
              s.modules.namedExport
                ? `" + ${r}_NAMED___[${JSON.stringify(
                    getValidLocalName(n, s.modules.exportLocalsConvention),
                  )}] + "`
                : `" + ${r}.locals[${JSON.stringify(n)}] + "`,
            );
          } else {
            const { hash: s, needQuotes: n } = e;
            const o = []
              .concat(s ? [`hash: ${JSON.stringify(s)}`] : [])
              .concat(n ? 'needQuotes: true' : []);
            const l = o.length > 0 ? `, { ${o.join(', ')} }` : '';
            a += `var ${t} = ___CSS_LOADER_GET_URL_IMPORT___(${r}${l});\n`;
            i = i.replace(new RegExp(t, 'g'), () => `" + ${t} + "`);
          }
        }
        return `${a}// Module\n___CSS_LOADER_EXPORT___.push([module.id, ${i}, ""${o}]);\n`;
      }
      function dashesCamelCase(e) {
        return e.replace(/-+(\w)/g, (e, t) => t.toUpperCase());
      }
      function getExportCode(e, t, r, s) {
        let n = '// Exports\n';
        if (r) {
          let r = '';
          const addExportToLocalsCode = (e, t) => {
            const n = Array.isArray(e) ? new Set(e) : new Set([e]);
            for (const e of n) {
              if (s.modules.namedExport) {
                r += `export var ${e} = ${JSON.stringify(t)};\n`;
              } else {
                if (r) {
                  r += `,\n`;
                }
                r += `\t${JSON.stringify(e)}: ${JSON.stringify(t)}`;
              }
            }
          };
          for (const { name: t, value: r } of e) {
            addExportToLocalsCode(s.modules.exportLocalsConvention(t), r);
          }
          for (const e of t) {
            const { replacementName: t, localName: n } = e;
            if (n) {
              const { importName: o } = e;
              r = r.replace(new RegExp(t, 'g'), () => {
                if (s.modules.namedExport) {
                  return `" + ${o}_NAMED___[${JSON.stringify(
                    getValidLocalName(n, s.modules.exportLocalsConvention),
                  )}] + "`;
                } else if (s.modules.exportOnlyLocals) {
                  return `" + ${o}[${JSON.stringify(n)}] + "`;
                }
                return `" + ${o}.locals[${JSON.stringify(n)}] + "`;
              });
            } else {
              r = r.replace(new RegExp(t, 'g'), () => `" + ${t} + "`);
            }
          }
          if (s.modules.exportOnlyLocals) {
            n += s.modules.namedExport
              ? r
              : `${
                  s.esModule ? 'export default' : 'module.exports ='
                } {\n${r}\n};\n`;
            return n;
          }
          n += s.modules.namedExport
            ? r
            : `___CSS_LOADER_EXPORT___.locals = {${r ? `\n${r}\n` : ''}};\n`;
        }
        const o = s.exportType === 'css-style-sheet';
        if (o) {
          n += 'var ___CSS_LOADER_STYLE_SHEET___ = new CSSStyleSheet();\n';
          n +=
            '___CSS_LOADER_STYLE_SHEET___.replaceSync(___CSS_LOADER_EXPORT___.toString());\n';
        }
        let i;
        switch (s.exportType) {
          case 'string':
            i = '___CSS_LOADER_EXPORT___.toString()';
            break;
          case 'css-style-sheet':
            i = '___CSS_LOADER_STYLE_SHEET___';
            break;
          default:
          case 'array':
            i = '___CSS_LOADER_EXPORT___';
            break;
        }
        n += `${s.esModule ? 'export default' : 'module.exports ='} ${i};\n`;
        return n;
      }
      async function resolveRequests(e, t, r) {
        return e(t, r[0])
          .then((e) => e)
          .catch((s) => {
            const [, ...n] = r;
            if (n.length === 0) {
              throw s;
            }
            return resolveRequests(e, t, n);
          });
      }
      function isURLRequestable(e, t = {}) {
        if (/^\/\//.test(e)) {
          return { requestable: false, needResolve: false };
        }
        if (/^#/.test(e)) {
          return { requestable: false, needResolve: false };
        }
        if (isDataUrl(e) && t.isSupportDataURL) {
          try {
            decodeURIComponent(e);
          } catch (e) {
            return { requestable: false, needResolve: false };
          }
          return { requestable: true, needResolve: false };
        }
        if (/^file:/i.test(e)) {
          return { requestable: true, needResolve: true };
        }
        if (/^[a-z][a-z0-9+.-]*:/i.test(e) && !_.test(e)) {
          if (t.isSupportAbsoluteURL && /^https?:/i.test(e)) {
            return { requestable: true, needResolve: false };
          }
          return { requestable: false, needResolve: false };
        }
        return { requestable: true, needResolve: true };
      }
      function sort(e, t) {
        return e.index - t.index;
      }
      function combineRequests(e, t) {
        const r = t.indexOf('!=!');
        return r !== -1 ? t.slice(0, r + 3) + e + t.slice(r + 3) : e + t;
      }
    },
    9419: function (e) {
      'use strict';
      /*! https://mths.be/cssesc v3.0.0 by @mathias */ var t = {};
      var r = t.hasOwnProperty;
      var s = function merge(e, t) {
        if (!e) {
          return t;
        }
        var s = {};
        for (var n in t) {
          s[n] = r.call(e, n) ? e[n] : t[n];
        }
        return s;
      };
      var n = /[ -,\.\/:-@\[-\^`\{-~]/;
      var o = /[ -,\.\/:-@\[\]\^`\{-~]/;
      var i = /['"\\]/;
      var a = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
      var l = function cssesc(e, t) {
        t = s(t, cssesc.options);
        if (t.quotes != 'single' && t.quotes != 'double') {
          t.quotes = 'single';
        }
        var r = t.quotes == 'double' ? '"' : "'";
        var i = t.isIdentifier;
        var l = e.charAt(0);
        var u = '';
        var c = 0;
        var f = e.length;
        while (c < f) {
          var p = e.charAt(c++);
          var h = p.charCodeAt();
          var d = void 0;
          if (h < 32 || h > 126) {
            if (h >= 55296 && h <= 56319 && c < f) {
              var v = e.charCodeAt(c++);
              if ((v & 64512) == 56320) {
                h = ((h & 1023) << 10) + (v & 1023) + 65536;
              } else {
                c--;
              }
            }
            d = '\\' + h.toString(16).toUpperCase() + ' ';
          } else {
            if (t.escapeEverything) {
              if (n.test(p)) {
                d = '\\' + p;
              } else {
                d = '\\' + h.toString(16).toUpperCase() + ' ';
              }
            } else if (/[\t\n\f\r\x0B]/.test(p)) {
              d = '\\' + h.toString(16).toUpperCase() + ' ';
            } else if (
              p == '\\' ||
              (!i && ((p == '"' && r == p) || (p == "'" && r == p))) ||
              (i && o.test(p))
            ) {
              d = '\\' + p;
            } else {
              d = p;
            }
          }
          u += d;
        }
        if (i) {
          if (/^-[-\d]/.test(u)) {
            u = '\\-' + u.slice(1);
          } else if (/\d/.test(l)) {
            u = '\\3' + l + ' ' + u.slice(1);
          }
        }
        u = u.replace(a, function (e, t, r) {
          if (t && t.length % 2) {
            return e;
          }
          return (t || '') + r;
        });
        if (!i && t.wrap) {
          return r + u + r;
        }
        return u;
      };
      l.options = {
        escapeEverything: false,
        isIdentifier: false,
        quotes: 'single',
        wrap: false,
      };
      l.version = '3.0.0';
      e.exports = l;
    },
    9135: function (e) {
      const createImports = (e, t, r = 'rule') =>
        Object.keys(e).map((s) => {
          const n = e[s];
          const o = Object.keys(n).map((e) =>
            t.decl({ prop: e, value: n[e], raws: { before: '\n  ' } }),
          );
          const i = o.length > 0;
          const a =
            r === 'rule'
              ? t.rule({
                  selector: `:import('${s}')`,
                  raws: { after: i ? '\n' : '' },
                })
              : t.atRule({
                  name: 'icss-import',
                  params: `'${s}'`,
                  raws: { after: i ? '\n' : '' },
                });
          if (i) {
            a.append(o);
          }
          return a;
        });
      const createExports = (e, t, r = 'rule') => {
        const s = Object.keys(e).map((r) =>
          t.decl({ prop: r, value: e[r], raws: { before: '\n  ' } }),
        );
        if (s.length === 0) {
          return [];
        }
        const n =
          r === 'rule'
            ? t.rule({ selector: `:export`, raws: { after: '\n' } })
            : t.atRule({ name: 'icss-export', raws: { after: '\n' } });
        n.append(s);
        return [n];
      };
      const createICSSRules = (e, t, r, s) => [
        ...createImports(e, r, s),
        ...createExports(t, r, s),
      ];
      e.exports = createICSSRules;
    },
    3288: function (e) {
      const t = /^:import\(("[^"]*"|'[^']*'|[^"']+)\)$/;
      const r = /^("[^"]*"|'[^']*'|[^"']+)$/;
      const getDeclsObject = (e) => {
        const t = {};
        e.walkDecls((e) => {
          const r = e.raws.before ? e.raws.before.trim() : '';
          t[r + e.prop] = e.value;
        });
        return t;
      };
      const extractICSS = (e, s = true, n = 'auto') => {
        const o = {};
        const i = {};
        function addImports(e, t) {
          const r = t.replace(/'|"/g, '');
          o[r] = Object.assign(o[r] || {}, getDeclsObject(e));
          if (s) {
            e.remove();
          }
        }
        function addExports(e) {
          Object.assign(i, getDeclsObject(e));
          if (s) {
            e.remove();
          }
        }
        e.each((e) => {
          if (e.type === 'rule' && n !== 'at-rule') {
            if (e.selector.slice(0, 7) === ':import') {
              const r = t.exec(e.selector);
              if (r) {
                addImports(e, r[1]);
              }
            }
            if (e.selector === ':export') {
              addExports(e);
            }
          }
          if (e.type === 'atrule' && n !== 'rule') {
            if (e.name === 'icss-import') {
              const t = r.exec(e.params);
              if (t) {
                addImports(e, t[1]);
              }
            }
            if (e.name === 'icss-export') {
              addExports(e);
            }
          }
        });
        return { icssImports: o, icssExports: i };
      };
      e.exports = extractICSS;
    },
    8400: function (e, t, r) {
      const s = r(504);
      const n = r(9769);
      const o = r(3288);
      const i = r(9135);
      e.exports = {
        replaceValueSymbols: s,
        replaceSymbols: n,
        extractICSS: o,
        createICSSRules: i,
      };
    },
    9769: function (e, t, r) {
      const s = r(504);
      const replaceSymbols = (e, t) => {
        e.walk((e) => {
          if (e.type === 'decl' && e.value) {
            e.value = s(e.value.toString(), t);
          } else if (e.type === 'rule' && e.selector) {
            e.selector = s(e.selector.toString(), t);
          } else if (e.type === 'atrule' && e.params) {
            e.params = s(e.params.toString(), t);
          }
        });
      };
      e.exports = replaceSymbols;
    },
    504: function (e) {
      const t = /[$]?[\w-]+/g;
      const replaceValueSymbols = (e, r) => {
        let s;
        while ((s = t.exec(e))) {
          const n = r[s[0]];
          if (n) {
            e = e.slice(0, s.index) + n + e.slice(t.lastIndex);
            t.lastIndex -= s[0].length - n.length;
          }
        }
        return e;
      };
      e.exports = replaceValueSymbols;
    },
    155: function (e, t, r) {
      'use strict';
      const s = r(7190);
      const n = Symbol('max');
      const o = Symbol('length');
      const i = Symbol('lengthCalculator');
      const a = Symbol('allowStale');
      const l = Symbol('maxAge');
      const u = Symbol('dispose');
      const c = Symbol('noDisposeOnSet');
      const f = Symbol('lruList');
      const p = Symbol('cache');
      const h = Symbol('updateAgeOnGet');
      const naiveLength = () => 1;
      class LRUCache {
        constructor(e) {
          if (typeof e === 'number') e = { max: e };
          if (!e) e = {};
          if (e.max && (typeof e.max !== 'number' || e.max < 0))
            throw new TypeError('max must be a non-negative number');
          const t = (this[n] = e.max || Infinity);
          const r = e.length || naiveLength;
          this[i] = typeof r !== 'function' ? naiveLength : r;
          this[a] = e.stale || false;
          if (e.maxAge && typeof e.maxAge !== 'number')
            throw new TypeError('maxAge must be a number');
          this[l] = e.maxAge || 0;
          this[u] = e.dispose;
          this[c] = e.noDisposeOnSet || false;
          this[h] = e.updateAgeOnGet || false;
          this.reset();
        }
        set max(e) {
          if (typeof e !== 'number' || e < 0)
            throw new TypeError('max must be a non-negative number');
          this[n] = e || Infinity;
          trim(this);
        }
        get max() {
          return this[n];
        }
        set allowStale(e) {
          this[a] = !!e;
        }
        get allowStale() {
          return this[a];
        }
        set maxAge(e) {
          if (typeof e !== 'number')
            throw new TypeError('maxAge must be a non-negative number');
          this[l] = e;
          trim(this);
        }
        get maxAge() {
          return this[l];
        }
        set lengthCalculator(e) {
          if (typeof e !== 'function') e = naiveLength;
          if (e !== this[i]) {
            this[i] = e;
            this[o] = 0;
            this[f].forEach((e) => {
              e.length = this[i](e.value, e.key);
              this[o] += e.length;
            });
          }
          trim(this);
        }
        get lengthCalculator() {
          return this[i];
        }
        get length() {
          return this[o];
        }
        get itemCount() {
          return this[f].length;
        }
        rforEach(e, t) {
          t = t || this;
          for (let r = this[f].tail; r !== null; ) {
            const s = r.prev;
            forEachStep(this, e, r, t);
            r = s;
          }
        }
        forEach(e, t) {
          t = t || this;
          for (let r = this[f].head; r !== null; ) {
            const s = r.next;
            forEachStep(this, e, r, t);
            r = s;
          }
        }
        keys() {
          return this[f].toArray().map((e) => e.key);
        }
        values() {
          return this[f].toArray().map((e) => e.value);
        }
        reset() {
          if (this[u] && this[f] && this[f].length) {
            this[f].forEach((e) => this[u](e.key, e.value));
          }
          this[p] = new Map();
          this[f] = new s();
          this[o] = 0;
        }
        dump() {
          return this[f]
            .map((e) =>
              isStale(this, e)
                ? false
                : { k: e.key, v: e.value, e: e.now + (e.maxAge || 0) },
            )
            .toArray()
            .filter((e) => e);
        }
        dumpLru() {
          return this[f];
        }
        set(e, t, r) {
          r = r || this[l];
          if (r && typeof r !== 'number')
            throw new TypeError('maxAge must be a number');
          const s = r ? Date.now() : 0;
          const a = this[i](t, e);
          if (this[p].has(e)) {
            if (a > this[n]) {
              del(this, this[p].get(e));
              return false;
            }
            const i = this[p].get(e);
            const l = i.value;
            if (this[u]) {
              if (!this[c]) this[u](e, l.value);
            }
            l.now = s;
            l.maxAge = r;
            l.value = t;
            this[o] += a - l.length;
            l.length = a;
            this.get(e);
            trim(this);
            return true;
          }
          const h = new Entry(e, t, a, s, r);
          if (h.length > this[n]) {
            if (this[u]) this[u](e, t);
            return false;
          }
          this[o] += h.length;
          this[f].unshift(h);
          this[p].set(e, this[f].head);
          trim(this);
          return true;
        }
        has(e) {
          if (!this[p].has(e)) return false;
          const t = this[p].get(e).value;
          return !isStale(this, t);
        }
        get(e) {
          return get(this, e, true);
        }
        peek(e) {
          return get(this, e, false);
        }
        pop() {
          const e = this[f].tail;
          if (!e) return null;
          del(this, e);
          return e.value;
        }
        del(e) {
          del(this, this[p].get(e));
        }
        load(e) {
          this.reset();
          const t = Date.now();
          for (let r = e.length - 1; r >= 0; r--) {
            const s = e[r];
            const n = s.e || 0;
            if (n === 0) this.set(s.k, s.v);
            else {
              const e = n - t;
              if (e > 0) {
                this.set(s.k, s.v, e);
              }
            }
          }
        }
        prune() {
          this[p].forEach((e, t) => get(this, t, false));
        }
      }
      const get = (e, t, r) => {
        const s = e[p].get(t);
        if (s) {
          const t = s.value;
          if (isStale(e, t)) {
            del(e, s);
            if (!e[a]) return undefined;
          } else {
            if (r) {
              if (e[h]) s.value.now = Date.now();
              e[f].unshiftNode(s);
            }
          }
          return t.value;
        }
      };
      const isStale = (e, t) => {
        if (!t || (!t.maxAge && !e[l])) return false;
        const r = Date.now() - t.now;
        return t.maxAge ? r > t.maxAge : e[l] && r > e[l];
      };
      const trim = (e) => {
        if (e[o] > e[n]) {
          for (let t = e[f].tail; e[o] > e[n] && t !== null; ) {
            const r = t.prev;
            del(e, t);
            t = r;
          }
        }
      };
      const del = (e, t) => {
        if (t) {
          const r = t.value;
          if (e[u]) e[u](r.key, r.value);
          e[o] -= r.length;
          e[p].delete(r.key);
          e[f].removeNode(t);
        }
      };
      class Entry {
        constructor(e, t, r, s, n) {
          this.key = e;
          this.value = t;
          this.length = r;
          this.now = s;
          this.maxAge = n || 0;
        }
      }
      const forEachStep = (e, t, r, s) => {
        let n = r.value;
        if (isStale(e, n)) {
          del(e, r);
          if (!e[a]) n = undefined;
        }
        if (n) t.call(s, n.value, n.key, e);
      };
      e.exports = LRUCache;
    },
    2815: function (e, t, r) {
      const s = r(5389);
      const n = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
      const o = /^:import\((?:"([^"]+)"|'([^']+)')\)/;
      const i = 1;
      function addImportToGraph(e, t, r, s) {
        const n = t + '_' + 'siblings';
        const o = t + '_' + e;
        if (s[o] !== i) {
          if (!Array.isArray(s[n])) {
            s[n] = [];
          }
          const t = s[n];
          if (Array.isArray(r[e])) {
            r[e] = r[e].concat(t);
          } else {
            r[e] = t.slice();
          }
          s[o] = i;
          t.push(e);
        }
      }
      e.exports = (e = {}) => {
        let t = 0;
        const r =
          typeof e.createImportedName !== 'function'
            ? (e) => `i__imported_${e.replace(/\W/g, '_')}_${t++}`
            : e.createImportedName;
        const i = e.failOnWrongOrder;
        return {
          postcssPlugin: 'postcss-modules-extract-imports',
          prepare() {
            const e = {};
            const t = {};
            const a = {};
            const l = {};
            const u = {};
            return {
              Once(c, f) {
                c.walkRules((r) => {
                  const s = o.exec(r.selector);
                  if (s) {
                    const [, n, o] = s;
                    const i = n || o;
                    addImportToGraph(i, 'root', e, t);
                    a[i] = r;
                  }
                });
                c.walkDecls(/^composes$/, (s) => {
                  const o = s.value.match(n);
                  if (!o) {
                    return;
                  }
                  let i;
                  let [, a, c, f, p] = o;
                  if (p) {
                    i = a.split(/\s+/).map((e) => `global(${e})`);
                  } else {
                    const n = c || f;
                    let o = s.parent;
                    let p = '';
                    while (o.type !== 'root') {
                      p = o.parent.index(o) + '_' + p;
                      o = o.parent;
                    }
                    const { selector: h } = s.parent;
                    const d = `_${p}${h}`;
                    addImportToGraph(n, d, e, t);
                    l[n] = s;
                    u[n] = u[n] || {};
                    i = a.split(/\s+/).map((e) => {
                      if (!u[n][e]) {
                        u[n][e] = r(e, n);
                      }
                      return u[n][e];
                    });
                  }
                  s.value = i.join(' ');
                });
                const p = s(e, i);
                if (p instanceof Error) {
                  const e = p.nodes.find((e) => l.hasOwnProperty(e));
                  const t = l[e];
                  throw t.error(
                    'Failed to resolve order of composed modules ' +
                      p.nodes.map((e) => '`' + e + '`').join(', ') +
                      '.',
                    {
                      plugin: 'postcss-modules-extract-imports',
                      word: 'composes',
                    },
                  );
                }
                let h;
                p.forEach((e) => {
                  const t = u[e];
                  let r = a[e];
                  if (!r && t) {
                    r = f.rule({
                      selector: `:import("${e}")`,
                      raws: { after: '\n' },
                    });
                    if (h) {
                      c.insertAfter(h, r);
                    } else {
                      c.prepend(r);
                    }
                  }
                  h = r;
                  if (!t) {
                    return;
                  }
                  Object.keys(t).forEach((e) => {
                    r.append(
                      f.decl({
                        value: e,
                        prop: t[e],
                        raws: { before: '\n  ' },
                      }),
                    );
                  });
                });
              },
            };
          },
        };
      };
      e.exports.postcss = true;
    },
    5389: function (e) {
      const t = 2;
      const r = 1;
      function createError(e, t) {
        const r = new Error("Nondeterministic import's order");
        const s = t[e];
        const n = s.find((r) => t[r].indexOf(e) > -1);
        r.nodes = [e, n];
        return r;
      }
      function walkGraph(e, s, n, o, i) {
        if (n[e] === t) {
          return;
        }
        if (n[e] === r) {
          if (i) {
            return createError(e, s);
          }
          return;
        }
        n[e] = r;
        const a = s[e];
        const l = a.length;
        for (let e = 0; e < l; ++e) {
          const t = walkGraph(a[e], s, n, o, i);
          if (t instanceof Error) {
            return t;
          }
        }
        n[e] = t;
        o.push(e);
      }
      function topologicalSort(e, t) {
        const r = [];
        const s = {};
        const n = Object.keys(e);
        const o = n.length;
        for (let i = 0; i < o; ++i) {
          const o = walkGraph(n[i], e, s, r, t);
          if (o instanceof Error) {
            return o;
          }
        }
        return r;
      }
      e.exports = topologicalSort;
    },
    8315: function (e, t, r) {
      'use strict';
      const s = r(4517);
      const n = r(933);
      const { extractICSS: o } = r(8400);
      const isSpacing = (e) => e.type === 'combinator' && e.value === ' ';
      function normalizeNodeArray(e) {
        const t = [];
        e.forEach((e) => {
          if (Array.isArray(e)) {
            normalizeNodeArray(e).forEach((e) => {
              t.push(e);
            });
          } else if (e) {
            t.push(e);
          }
        });
        if (t.length > 0 && isSpacing(t[t.length - 1])) {
          t.pop();
        }
        return t;
      }
      function localizeNode(e, t, r) {
        const transform = (e, t) => {
          if (t.ignoreNextSpacing && !isSpacing(e)) {
            throw new Error('Missing whitespace after ' + t.ignoreNextSpacing);
          }
          if (t.enforceNoSpacing && isSpacing(e)) {
            throw new Error('Missing whitespace before ' + t.enforceNoSpacing);
          }
          let n;
          switch (e.type) {
            case 'root': {
              let r;
              t.hasPureGlobals = false;
              n = e.nodes.map((s) => {
                const n = {
                  global: t.global,
                  lastWasSpacing: true,
                  hasLocals: false,
                  explicit: false,
                };
                s = transform(s, n);
                if (typeof r === 'undefined') {
                  r = n.global;
                } else if (r !== n.global) {
                  throw new Error(
                    'Inconsistent rule global/local result in rule "' +
                      e +
                      '" (multiple selectors must result in the same mode for the rule)',
                  );
                }
                if (!n.hasLocals) {
                  t.hasPureGlobals = true;
                }
                return s;
              });
              t.global = r;
              e.nodes = normalizeNodeArray(n);
              break;
            }
            case 'selector': {
              n = e.map((e) => transform(e, t));
              e = e.clone();
              e.nodes = normalizeNodeArray(n);
              break;
            }
            case 'combinator': {
              if (isSpacing(e)) {
                if (t.ignoreNextSpacing) {
                  t.ignoreNextSpacing = false;
                  t.lastWasSpacing = false;
                  t.enforceNoSpacing = false;
                  return null;
                }
                t.lastWasSpacing = true;
                return e;
              }
              break;
            }
            case 'pseudo': {
              let r;
              const o = !!e.length;
              const i = e.value === ':local' || e.value === ':global';
              const a = e.value === ':import' || e.value === ':export';
              if (a) {
                t.hasLocals = true;
              } else if (o) {
                if (i) {
                  if (e.nodes.length === 0) {
                    throw new Error(`${e.value}() can't be empty`);
                  }
                  if (t.inside) {
                    throw new Error(
                      `A ${e.value} is not allowed inside of a ${t.inside}(...)`,
                    );
                  }
                  r = {
                    global: e.value === ':global',
                    inside: e.value,
                    hasLocals: false,
                    explicit: true,
                  };
                  n = e
                    .map((e) => transform(e, r))
                    .reduce((e, t) => e.concat(t.nodes), []);
                  if (n.length) {
                    const { before: t, after: r } = e.spaces;
                    const s = n[0];
                    const o = n[n.length - 1];
                    s.spaces = { before: t, after: s.spaces.after };
                    o.spaces = { before: o.spaces.before, after: r };
                  }
                  e = n;
                  break;
                } else {
                  r = {
                    global: t.global,
                    inside: t.inside,
                    lastWasSpacing: true,
                    hasLocals: false,
                    explicit: t.explicit,
                  };
                  n = e.map((e) => transform(e, r));
                  e = e.clone();
                  e.nodes = normalizeNodeArray(n);
                  if (r.hasLocals) {
                    t.hasLocals = true;
                  }
                }
                break;
              } else if (i) {
                if (t.inside) {
                  throw new Error(
                    `A ${e.value} is not allowed inside of a ${t.inside}(...)`,
                  );
                }
                const r = !!e.spaces.before;
                t.ignoreNextSpacing = t.lastWasSpacing ? e.value : false;
                t.enforceNoSpacing = t.lastWasSpacing ? false : e.value;
                t.global = e.value === ':global';
                t.explicit = true;
                return r ? s.combinator({ value: ' ' }) : null;
              }
              break;
            }
            case 'id':
            case 'class': {
              if (!e.value) {
                throw new Error('Invalid class or id selector syntax');
              }
              if (t.global) {
                break;
              }
              const n = r.has(e.value);
              const o = n && t.explicit;
              if (!n || o) {
                const r = e.clone();
                r.spaces = { before: '', after: '' };
                e = s.pseudo({ value: ':local', nodes: [r], spaces: e.spaces });
                t.hasLocals = true;
              }
              break;
            }
          }
          t.lastWasSpacing = false;
          t.ignoreNextSpacing = false;
          t.enforceNoSpacing = false;
          return e;
        };
        const n = { global: t === 'global', hasPureGlobals: false };
        n.selector = s((e) => {
          transform(e, n);
        }).processSync(e, { updateSelector: false, lossless: true });
        return n;
      }
      function localizeDeclNode(e, t) {
        switch (e.type) {
          case 'word':
            if (t.localizeNextItem) {
              if (!t.localAliasMap.has(e.value)) {
                e.value = ':local(' + e.value + ')';
                t.localizeNextItem = false;
              }
            }
            break;
          case 'function':
            if (
              t.options &&
              t.options.rewriteUrl &&
              e.value.toLowerCase() === 'url'
            ) {
              e.nodes.map((e) => {
                if (e.type !== 'string' && e.type !== 'word') {
                  return;
                }
                let r = t.options.rewriteUrl(t.global, e.value);
                switch (e.type) {
                  case 'string':
                    if (e.quote === "'") {
                      r = r.replace(/(\\)/g, '\\$1').replace(/'/g, "\\'");
                    }
                    if (e.quote === '"') {
                      r = r.replace(/(\\)/g, '\\$1').replace(/"/g, '\\"');
                    }
                    break;
                  case 'word':
                    r = r.replace(/("|'|\)|\\)/g, '\\$1');
                    break;
                }
                e.value = r;
              });
            }
            break;
        }
        return e;
      }
      function isWordAFunctionArgument(e, t) {
        return t ? t.nodes.some((t) => t.sourceIndex === e.sourceIndex) : false;
      }
      function localizeDeclarationValues(e, t, r) {
        const s = n(t.value);
        s.walk((t, s, n) => {
          const o = {
            options: r.options,
            global: r.global,
            localizeNextItem: e && !r.global,
            localAliasMap: r.localAliasMap,
          };
          n[s] = localizeDeclNode(t, o);
        });
        t.value = s.toString();
      }
      function localizeDeclaration(e, t) {
        const r = /animation$/i.test(e.prop);
        if (r) {
          const r = /^-?[_a-z][_a-z0-9-]*$/i;
          const s = {
            $alternate: 1,
            '$alternate-reverse': 1,
            $backwards: 1,
            $both: 1,
            $ease: 1,
            '$ease-in': 1,
            '$ease-in-out': 1,
            '$ease-out': 1,
            $forwards: 1,
            $infinite: 1,
            $linear: 1,
            $none: Infinity,
            $normal: 1,
            $paused: 1,
            $reverse: 1,
            $running: 1,
            '$step-end': 1,
            '$step-start': 1,
            $initial: Infinity,
            $inherit: Infinity,
            $unset: Infinity,
          };
          const o = false;
          let i = {};
          let a = null;
          const l = n(e.value).walk((e) => {
            if (e.type === 'div') {
              i = {};
            }
            if (e.type === 'function' && e.value.toLowerCase() === 'steps') {
              a = e;
            }
            const n =
              e.type === 'word' && !isWordAFunctionArgument(e, a)
                ? e.value.toLowerCase()
                : null;
            let l = false;
            if (!o && n && r.test(n)) {
              if ('$' + n in s) {
                i['$' + n] = '$' + n in i ? i['$' + n] + 1 : 0;
                l = i['$' + n] >= s['$' + n];
              } else {
                l = true;
              }
            }
            const u = {
              options: t.options,
              global: t.global,
              localizeNextItem: l && !t.global,
              localAliasMap: t.localAliasMap,
            };
            return localizeDeclNode(e, u);
          });
          e.value = l.toString();
          return;
        }
        const s = /animation(-name)?$/i.test(e.prop);
        if (s) {
          return localizeDeclarationValues(true, e, t);
        }
        const o = /url\(/i.test(e.value);
        if (o) {
          return localizeDeclarationValues(false, e, t);
        }
      }
      e.exports = (e = {}) => {
        if (
          e &&
          e.mode &&
          e.mode !== 'global' &&
          e.mode !== 'local' &&
          e.mode !== 'pure'
        ) {
          throw new Error(
            'options.mode must be either "global", "local" or "pure" (default "local")',
          );
        }
        const t = e && e.mode === 'pure';
        const r = e && e.mode === 'global';
        return {
          postcssPlugin: 'postcss-modules-local-by-default',
          prepare() {
            const s = new Map();
            return {
              Once(n) {
                const { icssImports: i } = o(n, false);
                Object.keys(i).forEach((e) => {
                  Object.keys(i[e]).forEach((t) => {
                    s.set(t, i[e][t]);
                  });
                });
                n.walkAtRules((n) => {
                  if (/keyframes$/i.test(n.name)) {
                    const o = /^\s*:global\s*\((.+)\)\s*$/.exec(n.params);
                    const i = /^\s*:local\s*\((.+)\)\s*$/.exec(n.params);
                    let a = r;
                    if (o) {
                      if (t) {
                        throw n.error(
                          '@keyframes :global(...) is not allowed in pure mode',
                        );
                      }
                      n.params = o[1];
                      a = true;
                    } else if (i) {
                      n.params = i[0];
                      a = false;
                    } else if (!r) {
                      if (n.params && !s.has(n.params)) {
                        n.params = ':local(' + n.params + ')';
                      }
                    }
                    n.walkDecls((t) => {
                      localizeDeclaration(t, {
                        localAliasMap: s,
                        options: e,
                        global: a,
                      });
                    });
                  } else if (n.nodes) {
                    n.nodes.forEach((t) => {
                      if (t.type === 'decl') {
                        localizeDeclaration(t, {
                          localAliasMap: s,
                          options: e,
                          global: r,
                        });
                      }
                    });
                  }
                });
                n.walkRules((r) => {
                  if (
                    r.parent &&
                    r.parent.type === 'atrule' &&
                    /keyframes$/i.test(r.parent.name)
                  ) {
                    return;
                  }
                  const n = localizeNode(r, e.mode, s);
                  n.options = e;
                  n.localAliasMap = s;
                  if (t && n.hasPureGlobals) {
                    throw r.error(
                      'Selector "' +
                        r.selector +
                        '" is not pure ' +
                        '(pure selectors must contain at least one local class or id)',
                    );
                  }
                  r.selector = n.selector;
                  if (r.nodes) {
                    r.nodes.forEach((e) => localizeDeclaration(e, n));
                  }
                });
              },
            };
          },
        };
      };
      e.exports.postcss = true;
    },
    3365: function (e, t, r) {
      'use strict';
      const s = r(4517);
      const n = Object.prototype.hasOwnProperty;
      function getSingleLocalNamesForComposes(e) {
        return e.nodes.map((t) => {
          if (t.type !== 'selector' || t.nodes.length !== 1) {
            throw new Error(
              `composition is only allowed when selector is single :local class name not in "${e}"`,
            );
          }
          t = t.nodes[0];
          if (
            t.type !== 'pseudo' ||
            t.value !== ':local' ||
            t.nodes.length !== 1
          ) {
            throw new Error(
              'composition is only allowed when selector is single :local class name not in "' +
                e +
                '", "' +
                t +
                '" is weird',
            );
          }
          t = t.first;
          if (t.type !== 'selector' || t.length !== 1) {
            throw new Error(
              'composition is only allowed when selector is single :local class name not in "' +
                e +
                '", "' +
                t +
                '" is weird',
            );
          }
          t = t.first;
          if (t.type !== 'class') {
            throw new Error(
              'composition is only allowed when selector is single :local class name not in "' +
                e +
                '", "' +
                t +
                '" is weird',
            );
          }
          return t.value;
        });
      }
      const o = '[\\x20\\t\\r\\n\\f]';
      const i = new RegExp('\\\\([\\da-f]{1,6}' + o + '?|(' + o + ')|.)', 'ig');
      function unescape(e) {
        return e.replace(i, (e, t, r) => {
          const s = '0x' + t - 65536;
          return s !== s || r
            ? t
            : s < 0
            ? String.fromCharCode(s + 65536)
            : String.fromCharCode((s >> 10) | 55296, (s & 1023) | 56320);
        });
      }
      const plugin = (e = {}) => {
        const t = (e && e.generateScopedName) || plugin.generateScopedName;
        const r = (e && e.generateExportEntry) || plugin.generateExportEntry;
        const o = e && e.exportGlobals;
        return {
          postcssPlugin: 'postcss-modules-scope',
          Once(e, { rule: i }) {
            const a = Object.create(null);
            function exportScopedName(s, n) {
              const o = t(n ? n : s, e.source.input.from, e.source.input.css);
              const i = r(
                n ? n : s,
                o,
                e.source.input.from,
                e.source.input.css,
              );
              const { key: l, value: u } = i;
              a[l] = a[l] || [];
              if (a[l].indexOf(u) < 0) {
                a[l].push(u);
              }
              return o;
            }
            function localizeNode(e) {
              switch (e.type) {
                case 'selector':
                  e.nodes = e.map(localizeNode);
                  return e;
                case 'class':
                  return s.className({
                    value: exportScopedName(
                      e.value,
                      e.raws && e.raws.value ? e.raws.value : null,
                    ),
                  });
                case 'id': {
                  return s.id({
                    value: exportScopedName(
                      e.value,
                      e.raws && e.raws.value ? e.raws.value : null,
                    ),
                  });
                }
              }
              throw new Error(
                `${e.type} ("${e}") is not allowed in a :local block`,
              );
            }
            function traverseNode(e) {
              switch (e.type) {
                case 'pseudo':
                  if (e.value === ':local') {
                    if (e.nodes.length !== 1) {
                      throw new Error('Unexpected comma (",") in :local block');
                    }
                    const t = localizeNode(e.first, e.spaces);
                    t.first.spaces = e.spaces;
                    const r = e.next();
                    if (
                      r &&
                      r.type === 'combinator' &&
                      r.value === ' ' &&
                      /\\[A-F0-9]{1,6}$/.test(t.last.value)
                    ) {
                      t.last.spaces.after = ' ';
                    }
                    e.replaceWith(t);
                    return;
                  }
                case 'root':
                case 'selector': {
                  e.each(traverseNode);
                  break;
                }
                case 'id':
                case 'class':
                  if (o) {
                    a[e.value] = [e.value];
                  }
                  break;
              }
              return e;
            }
            const l = {};
            e.walkRules(/^:import\(.+\)$/, (e) => {
              e.walkDecls((e) => {
                l[e.prop] = true;
              });
            });
            e.walkRules((e) => {
              let t = s().astSync(e);
              e.selector = traverseNode(t.clone()).toString();
              e.walkDecls(/composes|compose-with/i, (e) => {
                const r = getSingleLocalNamesForComposes(t);
                const s = e.value.split(/\s+/);
                s.forEach((t) => {
                  const s = /^global\(([^)]+)\)$/.exec(t);
                  if (s) {
                    r.forEach((e) => {
                      a[e].push(s[1]);
                    });
                  } else if (n.call(l, t)) {
                    r.forEach((e) => {
                      a[e].push(t);
                    });
                  } else if (n.call(a, t)) {
                    r.forEach((e) => {
                      a[t].forEach((t) => {
                        a[e].push(t);
                      });
                    });
                  } else {
                    throw e.error(
                      `referenced class name "${t}" in ${e.prop} not found`,
                    );
                  }
                });
                e.remove();
              });
              e.walkDecls((e) => {
                if (!/:local\s*\((.+?)\)/.test(e.value)) {
                  return;
                }
                let t = e.value.split(/(,|'[^']*'|"[^"]*")/);
                t = t.map((e, r) => {
                  if (r === 0 || t[r - 1] === ',') {
                    let t = e;
                    const r = /:local\s*\((.+?)\)/.exec(e);
                    if (r) {
                      const e = r.input;
                      const s = r[0];
                      const n = r[1];
                      const o = exportScopedName(n);
                      t = e.replace(s, o);
                    } else {
                      return e;
                    }
                    return t;
                  } else {
                    return e;
                  }
                });
                e.value = t.join('');
              });
            });
            e.walkAtRules(/keyframes$/i, (e) => {
              const t = /^\s*:local\s*\((.+?)\)\s*$/.exec(e.params);
              if (!t) {
                return;
              }
              e.params = exportScopedName(t[1]);
            });
            const u = Object.keys(a);
            if (u.length > 0) {
              const t = i({ selector: ':export' });
              u.forEach((e) =>
                t.append({
                  prop: e,
                  value: a[e].join(' '),
                  raws: { before: '\n  ' },
                }),
              );
              e.append(t);
            }
          },
        };
      };
      plugin.postcss = true;
      plugin.generateScopedName = function (e, t) {
        const r = t
          .replace(/\.[^./\\]+$/, '')
          .replace(/[\W_]+/g, '_')
          .replace(/^_|_$/g, '');
        return `_${r}__${e}`.trim();
      };
      plugin.generateExportEntry = function (e, t) {
        return { key: unescape(e), value: unescape(t) };
      };
      e.exports = plugin;
    },
    3952: function (e, t, r) {
      'use strict';
      const s = r(8400);
      const n = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;
      const o = /(?:\s+|^)([\w-]+):?(.*?)$/;
      const i = /^([\w-]+)(?:\s+as\s+([\w-]+))?/;
      e.exports = (e) => {
        let t = 0;
        const r =
          (e && e.createImportedName) ||
          ((e) => `i__const_${e.replace(/\W/g, '_')}_${t++}`);
        return {
          postcssPlugin: 'postcss-modules-values',
          prepare(e) {
            const t = [];
            const a = {};
            return {
              Once(l, u) {
                l.walkAtRules(/value/i, (l) => {
                  const u = l.params.match(n);
                  if (u) {
                    let [, e, s] = u;
                    if (a[s]) {
                      s = a[s];
                    }
                    const n = e
                      .replace(/^\(\s*([\s\S]+)\s*\)$/, '$1')
                      .split(/\s*,\s*/)
                      .map((e) => {
                        const t = i.exec(e);
                        if (t) {
                          const [, e, s = e] = t;
                          const n = r(s);
                          a[s] = n;
                          return { theirName: e, importedName: n };
                        } else {
                          throw new Error(
                            `@import statement "${e}" is invalid!`,
                          );
                        }
                      });
                    t.push({ path: s, imports: n });
                    l.remove();
                    return;
                  }
                  if (l.params.indexOf('@value') !== -1) {
                    e.warn('Invalid value definition: ' + l.params);
                  }
                  let [, c, f] = `${l.params}${l.raws.between}`.match(o);
                  const p = f.replace(/\/\*((?!\*\/).*?)\*\//g, '');
                  if (p.length === 0) {
                    e.warn('Invalid value definition: ' + l.params);
                    l.remove();
                    return;
                  }
                  let h = /^\s+$/.test(p);
                  if (!h) {
                    f = f.trim();
                  }
                  a[c] = s.replaceValueSymbols(f, a);
                  l.remove();
                });
                if (!Object.keys(a).length) {
                  return;
                }
                s.replaceSymbols(l, a);
                const c = Object.keys(a).map((e) =>
                  u.decl({ value: a[e], prop: e, raws: { before: '\n  ' } }),
                );
                if (c.length > 0) {
                  const e = u.rule({
                    selector: ':export',
                    raws: { after: '\n' },
                  });
                  e.append(c);
                  l.prepend(e);
                }
                t.reverse().forEach(({ path: e, imports: t }) => {
                  const r = u.rule({
                    selector: `:import(${e})`,
                    raws: { after: '\n' },
                  });
                  t.forEach(({ theirName: e, importedName: t }) => {
                    r.append({ value: e, prop: t, raws: { before: '\n  ' } });
                  });
                  l.prepend(r);
                });
              },
            };
          },
        };
      };
      e.exports.postcss = true;
    },
    4517: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(2538));
      var n = _interopRequireWildcard(r(7153));
      function _getRequireWildcardCache() {
        if (typeof WeakMap !== 'function') return null;
        var e = new WeakMap();
        _getRequireWildcardCache = function _getRequireWildcardCache() {
          return e;
        };
        return e;
      }
      function _interopRequireWildcard(e) {
        if (e && e.__esModule) {
          return e;
        }
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) {
          return { default: e };
        }
        var t = _getRequireWildcardCache();
        if (t && t.has(e)) {
          return t.get(e);
        }
        var r = {};
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var o = s ? Object.getOwnPropertyDescriptor(e, n) : null;
            if (o && (o.get || o.set)) {
              Object.defineProperty(r, n, o);
            } else {
              r[n] = e[n];
            }
          }
        }
        r['default'] = e;
        if (t) {
          t.set(e, r);
        }
        return r;
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var o = function parser(e) {
        return new s['default'](e);
      };
      Object.assign(o, n);
      delete o.__esModule;
      var i = o;
      t['default'] = i;
      e.exports = t.default;
    },
    1724: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(3383));
      var n = _interopRequireDefault(r(7372));
      var o = _interopRequireDefault(r(8836));
      var i = _interopRequireDefault(r(6226));
      var a = _interopRequireDefault(r(855));
      var l = _interopRequireDefault(r(5379));
      var u = _interopRequireDefault(r(4291));
      var c = _interopRequireDefault(r(2766));
      var f = _interopRequireWildcard(r(4482));
      var p = _interopRequireDefault(r(5504));
      var h = _interopRequireDefault(r(2582));
      var d = _interopRequireDefault(r(3101));
      var v = _interopRequireDefault(r(8059));
      var m = _interopRequireWildcard(r(5090));
      var g = _interopRequireWildcard(r(9200));
      var _ = _interopRequireWildcard(r(5950));
      var y = r(4892);
      var E, b;
      function _getRequireWildcardCache() {
        if (typeof WeakMap !== 'function') return null;
        var e = new WeakMap();
        _getRequireWildcardCache = function _getRequireWildcardCache() {
          return e;
        };
        return e;
      }
      function _interopRequireWildcard(e) {
        if (e && e.__esModule) {
          return e;
        }
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) {
          return { default: e };
        }
        var t = _getRequireWildcardCache();
        if (t && t.has(e)) {
          return t.get(e);
        }
        var r = {};
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var o = s ? Object.getOwnPropertyDescriptor(e, n) : null;
            if (o && (o.get || o.set)) {
              Object.defineProperty(r, n, o);
            } else {
              r[n] = e[n];
            }
          }
        }
        r['default'] = e;
        if (t) {
          t.set(e, r);
        }
        return r;
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      var w =
        ((E = {}),
        (E[g.space] = true),
        (E[g.cr] = true),
        (E[g.feed] = true),
        (E[g.newline] = true),
        (E[g.tab] = true),
        E);
      var S = Object.assign({}, w, ((b = {}), (b[g.comment] = true), b));
      function tokenStart(e) {
        return { line: e[m.FIELDS.START_LINE], column: e[m.FIELDS.START_COL] };
      }
      function tokenEnd(e) {
        return { line: e[m.FIELDS.END_LINE], column: e[m.FIELDS.END_COL] };
      }
      function getSource(e, t, r, s) {
        return { start: { line: e, column: t }, end: { line: r, column: s } };
      }
      function getTokenSource(e) {
        return getSource(
          e[m.FIELDS.START_LINE],
          e[m.FIELDS.START_COL],
          e[m.FIELDS.END_LINE],
          e[m.FIELDS.END_COL],
        );
      }
      function getTokenSourceSpan(e, t) {
        if (!e) {
          return undefined;
        }
        return getSource(
          e[m.FIELDS.START_LINE],
          e[m.FIELDS.START_COL],
          t[m.FIELDS.END_LINE],
          t[m.FIELDS.END_COL],
        );
      }
      function unescapeProp(e, t) {
        var r = e[t];
        if (typeof r !== 'string') {
          return;
        }
        if (r.indexOf('\\') !== -1) {
          (0, y.ensureObject)(e, 'raws');
          e[t] = (0, y.unesc)(r);
          if (e.raws[t] === undefined) {
            e.raws[t] = r;
          }
        }
        return e;
      }
      function indexesOf(e, t) {
        var r = -1;
        var s = [];
        while ((r = e.indexOf(t, r + 1)) !== -1) {
          s.push(r);
        }
        return s;
      }
      function uniqs() {
        var e = Array.prototype.concat.apply([], arguments);
        return e.filter(function (t, r) {
          return r === e.indexOf(t);
        });
      }
      var O = (function () {
        function Parser(e, t) {
          if (t === void 0) {
            t = {};
          }
          this.rule = e;
          this.options = Object.assign({ lossy: false, safe: false }, t);
          this.position = 0;
          this.css =
            typeof this.rule === 'string' ? this.rule : this.rule.selector;
          this.tokens = (0, m['default'])({
            css: this.css,
            error: this._errorGenerator(),
            safe: this.options.safe,
          });
          var r = getTokenSourceSpan(
            this.tokens[0],
            this.tokens[this.tokens.length - 1],
          );
          this.root = new s['default']({ source: r });
          this.root.errorGenerator = this._errorGenerator();
          var o = new n['default']({
            source: { start: { line: 1, column: 1 } },
          });
          this.root.append(o);
          this.current = o;
          this.loop();
        }
        var e = Parser.prototype;
        e._errorGenerator = function _errorGenerator() {
          var e = this;
          return function (t, r) {
            if (typeof e.rule === 'string') {
              return new Error(t);
            }
            return e.rule.error(t, r);
          };
        };
        e.attribute = function attribute() {
          var e = [];
          var t = this.currToken;
          this.position++;
          while (
            this.position < this.tokens.length &&
            this.currToken[m.FIELDS.TYPE] !== g.closeSquare
          ) {
            e.push(this.currToken);
            this.position++;
          }
          if (this.currToken[m.FIELDS.TYPE] !== g.closeSquare) {
            return this.expected(
              'closing square bracket',
              this.currToken[m.FIELDS.START_POS],
            );
          }
          var r = e.length;
          var s = {
            source: getSource(t[1], t[2], this.currToken[3], this.currToken[4]),
            sourceIndex: t[m.FIELDS.START_POS],
          };
          if (r === 1 && !~[g.word].indexOf(e[0][m.FIELDS.TYPE])) {
            return this.expected('attribute', e[0][m.FIELDS.START_POS]);
          }
          var n = 0;
          var o = '';
          var i = '';
          var a = null;
          var l = false;
          while (n < r) {
            var u = e[n];
            var c = this.content(u);
            var p = e[n + 1];
            switch (u[m.FIELDS.TYPE]) {
              case g.space:
                l = true;
                if (this.options.lossy) {
                  break;
                }
                if (a) {
                  (0, y.ensureObject)(s, 'spaces', a);
                  var h = s.spaces[a].after || '';
                  s.spaces[a].after = h + c;
                  var d =
                    (0, y.getProp)(s, 'raws', 'spaces', a, 'after') || null;
                  if (d) {
                    s.raws.spaces[a].after = d + c;
                  }
                } else {
                  o = o + c;
                  i = i + c;
                }
                break;
              case g.asterisk:
                if (p[m.FIELDS.TYPE] === g.equals) {
                  s.operator = c;
                  a = 'operator';
                } else if ((!s.namespace || (a === 'namespace' && !l)) && p) {
                  if (o) {
                    (0, y.ensureObject)(s, 'spaces', 'attribute');
                    s.spaces.attribute.before = o;
                    o = '';
                  }
                  if (i) {
                    (0, y.ensureObject)(s, 'raws', 'spaces', 'attribute');
                    s.raws.spaces.attribute.before = o;
                    i = '';
                  }
                  s.namespace = (s.namespace || '') + c;
                  var v = (0, y.getProp)(s, 'raws', 'namespace') || null;
                  if (v) {
                    s.raws.namespace += c;
                  }
                  a = 'namespace';
                }
                l = false;
                break;
              case g.dollar:
                if (a === 'value') {
                  var _ = (0, y.getProp)(s, 'raws', 'value');
                  s.value += '$';
                  if (_) {
                    s.raws.value = _ + '$';
                  }
                  break;
                }
              case g.caret:
                if (p[m.FIELDS.TYPE] === g.equals) {
                  s.operator = c;
                  a = 'operator';
                }
                l = false;
                break;
              case g.combinator:
                if (c === '~' && p[m.FIELDS.TYPE] === g.equals) {
                  s.operator = c;
                  a = 'operator';
                }
                if (c !== '|') {
                  l = false;
                  break;
                }
                if (p[m.FIELDS.TYPE] === g.equals) {
                  s.operator = c;
                  a = 'operator';
                } else if (!s.namespace && !s.attribute) {
                  s.namespace = true;
                }
                l = false;
                break;
              case g.word:
                if (
                  p &&
                  this.content(p) === '|' &&
                  e[n + 2] &&
                  e[n + 2][m.FIELDS.TYPE] !== g.equals &&
                  !s.operator &&
                  !s.namespace
                ) {
                  s.namespace = c;
                  a = 'namespace';
                } else if (!s.attribute || (a === 'attribute' && !l)) {
                  if (o) {
                    (0, y.ensureObject)(s, 'spaces', 'attribute');
                    s.spaces.attribute.before = o;
                    o = '';
                  }
                  if (i) {
                    (0, y.ensureObject)(s, 'raws', 'spaces', 'attribute');
                    s.raws.spaces.attribute.before = i;
                    i = '';
                  }
                  s.attribute = (s.attribute || '') + c;
                  var E = (0, y.getProp)(s, 'raws', 'attribute') || null;
                  if (E) {
                    s.raws.attribute += c;
                  }
                  a = 'attribute';
                } else if (
                  (!s.value && s.value !== '') ||
                  (a === 'value' && !l)
                ) {
                  var b = (0, y.unesc)(c);
                  var w = (0, y.getProp)(s, 'raws', 'value') || '';
                  var S = s.value || '';
                  s.value = S + b;
                  s.quoteMark = null;
                  if (b !== c || w) {
                    (0, y.ensureObject)(s, 'raws');
                    s.raws.value = (w || S) + c;
                  }
                  a = 'value';
                } else {
                  var O = c === 'i' || c === 'I';
                  if ((s.value || s.value === '') && (s.quoteMark || l)) {
                    s.insensitive = O;
                    if (!O || c === 'I') {
                      (0, y.ensureObject)(s, 'raws');
                      s.raws.insensitiveFlag = c;
                    }
                    a = 'insensitive';
                    if (o) {
                      (0, y.ensureObject)(s, 'spaces', 'insensitive');
                      s.spaces.insensitive.before = o;
                      o = '';
                    }
                    if (i) {
                      (0, y.ensureObject)(s, 'raws', 'spaces', 'insensitive');
                      s.raws.spaces.insensitive.before = i;
                      i = '';
                    }
                  } else if (s.value || s.value === '') {
                    a = 'value';
                    s.value += c;
                    if (s.raws.value) {
                      s.raws.value += c;
                    }
                  }
                }
                l = false;
                break;
              case g.str:
                if (!s.attribute || !s.operator) {
                  return this.error(
                    'Expected an attribute followed by an operator preceding the string.',
                    { index: u[m.FIELDS.START_POS] },
                  );
                }
                var R = (0, f.unescapeValue)(c),
                  x = R.unescaped,
                  I = R.quoteMark;
                s.value = x;
                s.quoteMark = I;
                a = 'value';
                (0, y.ensureObject)(s, 'raws');
                s.raws.value = c;
                l = false;
                break;
              case g.equals:
                if (!s.attribute) {
                  return this.expected('attribute', u[m.FIELDS.START_POS], c);
                }
                if (s.value) {
                  return this.error(
                    'Unexpected "=" found; an operator was already defined.',
                    { index: u[m.FIELDS.START_POS] },
                  );
                }
                s.operator = s.operator ? s.operator + c : c;
                a = 'operator';
                l = false;
                break;
              case g.comment:
                if (a) {
                  if (
                    l ||
                    (p && p[m.FIELDS.TYPE] === g.space) ||
                    a === 'insensitive'
                  ) {
                    var T = (0, y.getProp)(s, 'spaces', a, 'after') || '';
                    var P =
                      (0, y.getProp)(s, 'raws', 'spaces', a, 'after') || T;
                    (0, y.ensureObject)(s, 'raws', 'spaces', a);
                    s.raws.spaces[a].after = P + c;
                  } else {
                    var A = s[a] || '';
                    var k = (0, y.getProp)(s, 'raws', a) || A;
                    (0, y.ensureObject)(s, 'raws');
                    s.raws[a] = k + c;
                  }
                } else {
                  i = i + c;
                }
                break;
              default:
                return this.error('Unexpected "' + c + '" found.', {
                  index: u[m.FIELDS.START_POS],
                });
            }
            n++;
          }
          unescapeProp(s, 'attribute');
          unescapeProp(s, 'namespace');
          this.newNode(new f['default'](s));
          this.position++;
        };
        e.parseWhitespaceEquivalentTokens =
          function parseWhitespaceEquivalentTokens(e) {
            if (e < 0) {
              e = this.tokens.length;
            }
            var t = this.position;
            var r = [];
            var s = '';
            var n = undefined;
            do {
              if (w[this.currToken[m.FIELDS.TYPE]]) {
                if (!this.options.lossy) {
                  s += this.content();
                }
              } else if (this.currToken[m.FIELDS.TYPE] === g.comment) {
                var o = {};
                if (s) {
                  o.before = s;
                  s = '';
                }
                n = new i['default']({
                  value: this.content(),
                  source: getTokenSource(this.currToken),
                  sourceIndex: this.currToken[m.FIELDS.START_POS],
                  spaces: o,
                });
                r.push(n);
              }
            } while (++this.position < e);
            if (s) {
              if (n) {
                n.spaces.after = s;
              } else if (!this.options.lossy) {
                var a = this.tokens[t];
                var l = this.tokens[this.position - 1];
                r.push(
                  new u['default']({
                    value: '',
                    source: getSource(
                      a[m.FIELDS.START_LINE],
                      a[m.FIELDS.START_COL],
                      l[m.FIELDS.END_LINE],
                      l[m.FIELDS.END_COL],
                    ),
                    sourceIndex: a[m.FIELDS.START_POS],
                    spaces: { before: s, after: '' },
                  }),
                );
              }
            }
            return r;
          };
        e.convertWhitespaceNodesToSpace =
          function convertWhitespaceNodesToSpace(e, t) {
            var r = this;
            if (t === void 0) {
              t = false;
            }
            var s = '';
            var n = '';
            e.forEach(function (e) {
              var o = r.lossySpace(e.spaces.before, t);
              var i = r.lossySpace(e.rawSpaceBefore, t);
              s += o + r.lossySpace(e.spaces.after, t && o.length === 0);
              n +=
                o +
                e.value +
                r.lossySpace(e.rawSpaceAfter, t && i.length === 0);
            });
            if (n === s) {
              n = undefined;
            }
            var o = { space: s, rawSpace: n };
            return o;
          };
        e.isNamedCombinator = function isNamedCombinator(e) {
          if (e === void 0) {
            e = this.position;
          }
          return (
            this.tokens[e + 0] &&
            this.tokens[e + 0][m.FIELDS.TYPE] === g.slash &&
            this.tokens[e + 1] &&
            this.tokens[e + 1][m.FIELDS.TYPE] === g.word &&
            this.tokens[e + 2] &&
            this.tokens[e + 2][m.FIELDS.TYPE] === g.slash
          );
        };
        e.namedCombinator = function namedCombinator() {
          if (this.isNamedCombinator()) {
            var e = this.content(this.tokens[this.position + 1]);
            var t = (0, y.unesc)(e).toLowerCase();
            var r = {};
            if (t !== e) {
              r.value = '/' + e + '/';
            }
            var s = new h['default']({
              value: '/' + t + '/',
              source: getSource(
                this.currToken[m.FIELDS.START_LINE],
                this.currToken[m.FIELDS.START_COL],
                this.tokens[this.position + 2][m.FIELDS.END_LINE],
                this.tokens[this.position + 2][m.FIELDS.END_COL],
              ),
              sourceIndex: this.currToken[m.FIELDS.START_POS],
              raws: r,
            });
            this.position = this.position + 3;
            return s;
          } else {
            this.unexpected();
          }
        };
        e.combinator = function combinator() {
          var e = this;
          if (this.content() === '|') {
            return this.namespace();
          }
          var t = this.locateNextMeaningfulToken(this.position);
          if (t < 0 || this.tokens[t][m.FIELDS.TYPE] === g.comma) {
            var r = this.parseWhitespaceEquivalentTokens(t);
            if (r.length > 0) {
              var s = this.current.last;
              if (s) {
                var n = this.convertWhitespaceNodesToSpace(r),
                  o = n.space,
                  i = n.rawSpace;
                if (i !== undefined) {
                  s.rawSpaceAfter += i;
                }
                s.spaces.after += o;
              } else {
                r.forEach(function (t) {
                  return e.newNode(t);
                });
              }
            }
            return;
          }
          var a = this.currToken;
          var l = undefined;
          if (t > this.position) {
            l = this.parseWhitespaceEquivalentTokens(t);
          }
          var u;
          if (this.isNamedCombinator()) {
            u = this.namedCombinator();
          } else if (this.currToken[m.FIELDS.TYPE] === g.combinator) {
            u = new h['default']({
              value: this.content(),
              source: getTokenSource(this.currToken),
              sourceIndex: this.currToken[m.FIELDS.START_POS],
            });
            this.position++;
          } else if (w[this.currToken[m.FIELDS.TYPE]]) {
          } else if (!l) {
            this.unexpected();
          }
          if (u) {
            if (l) {
              var c = this.convertWhitespaceNodesToSpace(l),
                f = c.space,
                p = c.rawSpace;
              u.spaces.before = f;
              u.rawSpaceBefore = p;
            }
          } else {
            var d = this.convertWhitespaceNodesToSpace(l, true),
              v = d.space,
              _ = d.rawSpace;
            if (!_) {
              _ = v;
            }
            var y = {};
            var E = { spaces: {} };
            if (v.endsWith(' ') && _.endsWith(' ')) {
              y.before = v.slice(0, v.length - 1);
              E.spaces.before = _.slice(0, _.length - 1);
            } else if (v.startsWith(' ') && _.startsWith(' ')) {
              y.after = v.slice(1);
              E.spaces.after = _.slice(1);
            } else {
              E.value = _;
            }
            u = new h['default']({
              value: ' ',
              source: getTokenSourceSpan(a, this.tokens[this.position - 1]),
              sourceIndex: a[m.FIELDS.START_POS],
              spaces: y,
              raws: E,
            });
          }
          if (this.currToken && this.currToken[m.FIELDS.TYPE] === g.space) {
            u.spaces.after = this.optionalSpace(this.content());
            this.position++;
          }
          return this.newNode(u);
        };
        e.comma = function comma() {
          if (this.position === this.tokens.length - 1) {
            this.root.trailingComma = true;
            this.position++;
            return;
          }
          this.current._inferEndPosition();
          var e = new n['default']({
            source: { start: tokenStart(this.tokens[this.position + 1]) },
          });
          this.current.parent.append(e);
          this.current = e;
          this.position++;
        };
        e.comment = function comment() {
          var e = this.currToken;
          this.newNode(
            new i['default']({
              value: this.content(),
              source: getTokenSource(e),
              sourceIndex: e[m.FIELDS.START_POS],
            }),
          );
          this.position++;
        };
        e.error = function error(e, t) {
          throw this.root.error(e, t);
        };
        e.missingBackslash = function missingBackslash() {
          return this.error('Expected a backslash preceding the semicolon.', {
            index: this.currToken[m.FIELDS.START_POS],
          });
        };
        e.missingParenthesis = function missingParenthesis() {
          return this.expected(
            'opening parenthesis',
            this.currToken[m.FIELDS.START_POS],
          );
        };
        e.missingSquareBracket = function missingSquareBracket() {
          return this.expected(
            'opening square bracket',
            this.currToken[m.FIELDS.START_POS],
          );
        };
        e.unexpected = function unexpected() {
          return this.error(
            "Unexpected '" +
              this.content() +
              "'. Escaping special characters with \\ may help.",
            this.currToken[m.FIELDS.START_POS],
          );
        };
        e.namespace = function namespace() {
          var e = (this.prevToken && this.content(this.prevToken)) || true;
          if (this.nextToken[m.FIELDS.TYPE] === g.word) {
            this.position++;
            return this.word(e);
          } else if (this.nextToken[m.FIELDS.TYPE] === g.asterisk) {
            this.position++;
            return this.universal(e);
          }
        };
        e.nesting = function nesting() {
          if (this.nextToken) {
            var e = this.content(this.nextToken);
            if (e === '|') {
              this.position++;
              return;
            }
          }
          var t = this.currToken;
          this.newNode(
            new d['default']({
              value: this.content(),
              source: getTokenSource(t),
              sourceIndex: t[m.FIELDS.START_POS],
            }),
          );
          this.position++;
        };
        e.parentheses = function parentheses() {
          var e = this.current.last;
          var t = 1;
          this.position++;
          if (e && e.type === _.PSEUDO) {
            var r = new n['default']({
              source: { start: tokenStart(this.tokens[this.position - 1]) },
            });
            var s = this.current;
            e.append(r);
            this.current = r;
            while (this.position < this.tokens.length && t) {
              if (this.currToken[m.FIELDS.TYPE] === g.openParenthesis) {
                t++;
              }
              if (this.currToken[m.FIELDS.TYPE] === g.closeParenthesis) {
                t--;
              }
              if (t) {
                this.parse();
              } else {
                this.current.source.end = tokenEnd(this.currToken);
                this.current.parent.source.end = tokenEnd(this.currToken);
                this.position++;
              }
            }
            this.current = s;
          } else {
            var o = this.currToken;
            var i = '(';
            var a;
            while (this.position < this.tokens.length && t) {
              if (this.currToken[m.FIELDS.TYPE] === g.openParenthesis) {
                t++;
              }
              if (this.currToken[m.FIELDS.TYPE] === g.closeParenthesis) {
                t--;
              }
              a = this.currToken;
              i += this.parseParenthesisToken(this.currToken);
              this.position++;
            }
            if (e) {
              e.appendToPropertyAndEscape('value', i, i);
            } else {
              this.newNode(
                new u['default']({
                  value: i,
                  source: getSource(
                    o[m.FIELDS.START_LINE],
                    o[m.FIELDS.START_COL],
                    a[m.FIELDS.END_LINE],
                    a[m.FIELDS.END_COL],
                  ),
                  sourceIndex: o[m.FIELDS.START_POS],
                }),
              );
            }
          }
          if (t) {
            return this.expected(
              'closing parenthesis',
              this.currToken[m.FIELDS.START_POS],
            );
          }
        };
        e.pseudo = function pseudo() {
          var e = this;
          var t = '';
          var r = this.currToken;
          while (this.currToken && this.currToken[m.FIELDS.TYPE] === g.colon) {
            t += this.content();
            this.position++;
          }
          if (!this.currToken) {
            return this.expected(
              ['pseudo-class', 'pseudo-element'],
              this.position - 1,
            );
          }
          if (this.currToken[m.FIELDS.TYPE] === g.word) {
            this.splitWord(false, function (s, n) {
              t += s;
              e.newNode(
                new c['default']({
                  value: t,
                  source: getTokenSourceSpan(r, e.currToken),
                  sourceIndex: r[m.FIELDS.START_POS],
                }),
              );
              if (
                n > 1 &&
                e.nextToken &&
                e.nextToken[m.FIELDS.TYPE] === g.openParenthesis
              ) {
                e.error('Misplaced parenthesis.', {
                  index: e.nextToken[m.FIELDS.START_POS],
                });
              }
            });
          } else {
            return this.expected(
              ['pseudo-class', 'pseudo-element'],
              this.currToken[m.FIELDS.START_POS],
            );
          }
        };
        e.space = function space() {
          var e = this.content();
          if (
            this.position === 0 ||
            this.prevToken[m.FIELDS.TYPE] === g.comma ||
            this.prevToken[m.FIELDS.TYPE] === g.openParenthesis ||
            this.current.nodes.every(function (e) {
              return e.type === 'comment';
            })
          ) {
            this.spaces = this.optionalSpace(e);
            this.position++;
          } else if (
            this.position === this.tokens.length - 1 ||
            this.nextToken[m.FIELDS.TYPE] === g.comma ||
            this.nextToken[m.FIELDS.TYPE] === g.closeParenthesis
          ) {
            this.current.last.spaces.after = this.optionalSpace(e);
            this.position++;
          } else {
            this.combinator();
          }
        };
        e.string = function string() {
          var e = this.currToken;
          this.newNode(
            new u['default']({
              value: this.content(),
              source: getTokenSource(e),
              sourceIndex: e[m.FIELDS.START_POS],
            }),
          );
          this.position++;
        };
        e.universal = function universal(e) {
          var t = this.nextToken;
          if (t && this.content(t) === '|') {
            this.position++;
            return this.namespace();
          }
          var r = this.currToken;
          this.newNode(
            new p['default']({
              value: this.content(),
              source: getTokenSource(r),
              sourceIndex: r[m.FIELDS.START_POS],
            }),
            e,
          );
          this.position++;
        };
        e.splitWord = function splitWord(e, t) {
          var r = this;
          var s = this.nextToken;
          var n = this.content();
          while (
            s &&
            ~[g.dollar, g.caret, g.equals, g.word].indexOf(s[m.FIELDS.TYPE])
          ) {
            this.position++;
            var i = this.content();
            n += i;
            if (i.lastIndexOf('\\') === i.length - 1) {
              var u = this.nextToken;
              if (u && u[m.FIELDS.TYPE] === g.space) {
                n += this.requiredSpace(this.content(u));
                this.position++;
              }
            }
            s = this.nextToken;
          }
          var c = indexesOf(n, '.').filter(function (e) {
            var t = n[e - 1] === '\\';
            var r = /^\d+\.\d+%$/.test(n);
            return !t && !r;
          });
          var f = indexesOf(n, '#').filter(function (e) {
            return n[e - 1] !== '\\';
          });
          var p = indexesOf(n, '#{');
          if (p.length) {
            f = f.filter(function (e) {
              return !~p.indexOf(e);
            });
          }
          var h = (0, v['default'])(uniqs([0].concat(c, f)));
          h.forEach(function (s, i) {
            var u = h[i + 1] || n.length;
            var p = n.slice(s, u);
            if (i === 0 && t) {
              return t.call(r, p, h.length);
            }
            var d;
            var v = r.currToken;
            var g = v[m.FIELDS.START_POS] + h[i];
            var _ = getSource(v[1], v[2] + s, v[3], v[2] + (u - 1));
            if (~c.indexOf(s)) {
              var y = { value: p.slice(1), source: _, sourceIndex: g };
              d = new o['default'](unescapeProp(y, 'value'));
            } else if (~f.indexOf(s)) {
              var E = { value: p.slice(1), source: _, sourceIndex: g };
              d = new a['default'](unescapeProp(E, 'value'));
            } else {
              var b = { value: p, source: _, sourceIndex: g };
              unescapeProp(b, 'value');
              d = new l['default'](b);
            }
            r.newNode(d, e);
            e = null;
          });
          this.position++;
        };
        e.word = function word(e) {
          var t = this.nextToken;
          if (t && this.content(t) === '|') {
            this.position++;
            return this.namespace();
          }
          return this.splitWord(e);
        };
        e.loop = function loop() {
          while (this.position < this.tokens.length) {
            this.parse(true);
          }
          this.current._inferEndPosition();
          return this.root;
        };
        e.parse = function parse(e) {
          switch (this.currToken[m.FIELDS.TYPE]) {
            case g.space:
              this.space();
              break;
            case g.comment:
              this.comment();
              break;
            case g.openParenthesis:
              this.parentheses();
              break;
            case g.closeParenthesis:
              if (e) {
                this.missingParenthesis();
              }
              break;
            case g.openSquare:
              this.attribute();
              break;
            case g.dollar:
            case g.caret:
            case g.equals:
            case g.word:
              this.word();
              break;
            case g.colon:
              this.pseudo();
              break;
            case g.comma:
              this.comma();
              break;
            case g.asterisk:
              this.universal();
              break;
            case g.ampersand:
              this.nesting();
              break;
            case g.slash:
            case g.combinator:
              this.combinator();
              break;
            case g.str:
              this.string();
              break;
            case g.closeSquare:
              this.missingSquareBracket();
            case g.semicolon:
              this.missingBackslash();
            default:
              this.unexpected();
          }
        };
        e.expected = function expected(e, t, r) {
          if (Array.isArray(e)) {
            var s = e.pop();
            e = e.join(', ') + ' or ' + s;
          }
          var n = /^[aeiou]/.test(e[0]) ? 'an' : 'a';
          if (!r) {
            return this.error('Expected ' + n + ' ' + e + '.', { index: t });
          }
          return this.error(
            'Expected ' + n + ' ' + e + ', found "' + r + '" instead.',
            { index: t },
          );
        };
        e.requiredSpace = function requiredSpace(e) {
          return this.options.lossy ? ' ' : e;
        };
        e.optionalSpace = function optionalSpace(e) {
          return this.options.lossy ? '' : e;
        };
        e.lossySpace = function lossySpace(e, t) {
          if (this.options.lossy) {
            return t ? ' ' : '';
          } else {
            return e;
          }
        };
        e.parseParenthesisToken = function parseParenthesisToken(e) {
          var t = this.content(e);
          if (e[m.FIELDS.TYPE] === g.space) {
            return this.requiredSpace(t);
          } else {
            return t;
          }
        };
        e.newNode = function newNode(e, t) {
          if (t) {
            if (/^ +$/.test(t)) {
              if (!this.options.lossy) {
                this.spaces = (this.spaces || '') + t;
              }
              t = true;
            }
            e.namespace = t;
            unescapeProp(e, 'namespace');
          }
          if (this.spaces) {
            e.spaces.before = this.spaces;
            this.spaces = '';
          }
          return this.current.append(e);
        };
        e.content = function content(e) {
          if (e === void 0) {
            e = this.currToken;
          }
          return this.css.slice(e[m.FIELDS.START_POS], e[m.FIELDS.END_POS]);
        };
        e.locateNextMeaningfulToken = function locateNextMeaningfulToken(e) {
          if (e === void 0) {
            e = this.position + 1;
          }
          var t = e;
          while (t < this.tokens.length) {
            if (S[this.tokens[t][m.FIELDS.TYPE]]) {
              t++;
              continue;
            } else {
              return t;
            }
          }
          return -1;
        };
        _createClass(Parser, [
          {
            key: 'currToken',
            get: function get() {
              return this.tokens[this.position];
            },
          },
          {
            key: 'nextToken',
            get: function get() {
              return this.tokens[this.position + 1];
            },
          },
          {
            key: 'prevToken',
            get: function get() {
              return this.tokens[this.position - 1];
            },
          },
        ]);
        return Parser;
      })();
      t['default'] = O;
      e.exports = t.default;
    },
    2538: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(1724));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var n = (function () {
        function Processor(e, t) {
          this.func = e || function noop() {};
          this.funcRes = null;
          this.options = t;
        }
        var e = Processor.prototype;
        e._shouldUpdateSelector = function _shouldUpdateSelector(e, t) {
          if (t === void 0) {
            t = {};
          }
          var r = Object.assign({}, this.options, t);
          if (r.updateSelector === false) {
            return false;
          } else {
            return typeof e !== 'string';
          }
        };
        e._isLossy = function _isLossy(e) {
          if (e === void 0) {
            e = {};
          }
          var t = Object.assign({}, this.options, e);
          if (t.lossless === false) {
            return true;
          } else {
            return false;
          }
        };
        e._root = function _root(e, t) {
          if (t === void 0) {
            t = {};
          }
          var r = new s['default'](e, this._parseOptions(t));
          return r.root;
        };
        e._parseOptions = function _parseOptions(e) {
          return { lossy: this._isLossy(e) };
        };
        e._run = function _run(e, t) {
          var r = this;
          if (t === void 0) {
            t = {};
          }
          return new Promise(function (s, n) {
            try {
              var o = r._root(e, t);
              Promise.resolve(r.func(o))
                .then(function (s) {
                  var n = undefined;
                  if (r._shouldUpdateSelector(e, t)) {
                    n = o.toString();
                    e.selector = n;
                  }
                  return { transform: s, root: o, string: n };
                })
                .then(s, n);
            } catch (e) {
              n(e);
              return;
            }
          });
        };
        e._runSync = function _runSync(e, t) {
          if (t === void 0) {
            t = {};
          }
          var r = this._root(e, t);
          var s = this.func(r);
          if (s && typeof s.then === 'function') {
            throw new Error(
              'Selector processor returned a promise to a synchronous call.',
            );
          }
          var n = undefined;
          if (t.updateSelector && typeof e !== 'string') {
            n = r.toString();
            e.selector = n;
          }
          return { transform: s, root: r, string: n };
        };
        e.ast = function ast(e, t) {
          return this._run(e, t).then(function (e) {
            return e.root;
          });
        };
        e.astSync = function astSync(e, t) {
          return this._runSync(e, t).root;
        };
        e.transform = function transform(e, t) {
          return this._run(e, t).then(function (e) {
            return e.transform;
          });
        };
        e.transformSync = function transformSync(e, t) {
          return this._runSync(e, t).transform;
        };
        e.process = function process(e, t) {
          return this._run(e, t).then(function (e) {
            return e.string || e.root.toString();
          });
        };
        e.processSync = function processSync(e, t) {
          var r = this._runSync(e, t);
          return r.string || r.root.toString();
        };
        return Processor;
      })();
      t['default'] = n;
      e.exports = t.default;
    },
    4482: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t.unescapeValue = unescapeValue;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(9419));
      var n = _interopRequireDefault(r(7306));
      var o = _interopRequireDefault(r(6084));
      var i = r(5950);
      var a;
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var l = r(6758);
      var u = /^('|")([^]*)\1$/;
      var c = l(function () {},
      'Assigning an attribute a value containing characters that might need to be escaped is deprecated. ' + 'Call attribute.setValue() instead.');
      var f = l(function () {},
      'Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.');
      var p = l(function () {},
      'Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.');
      function unescapeValue(e) {
        var t = false;
        var r = null;
        var s = e;
        var o = s.match(u);
        if (o) {
          r = o[1];
          s = o[2];
        }
        s = (0, n['default'])(s);
        if (s !== e) {
          t = true;
        }
        return { deprecatedUsage: t, unescaped: s, quoteMark: r };
      }
      function handleDeprecatedContructorOpts(e) {
        if (e.quoteMark !== undefined) {
          return e;
        }
        if (e.value === undefined) {
          return e;
        }
        p();
        var t = unescapeValue(e.value),
          r = t.quoteMark,
          s = t.unescaped;
        if (!e.raws) {
          e.raws = {};
        }
        if (e.raws.value === undefined) {
          e.raws.value = e.value;
        }
        e.value = s;
        e.quoteMark = r;
        return e;
      }
      var h = (function (e) {
        _inheritsLoose(Attribute, e);
        function Attribute(t) {
          var r;
          if (t === void 0) {
            t = {};
          }
          r = e.call(this, handleDeprecatedContructorOpts(t)) || this;
          r.type = i.ATTRIBUTE;
          r.raws = r.raws || {};
          Object.defineProperty(r.raws, 'unquoted', {
            get: l(function () {
              return r.value;
            }, 'attr.raws.unquoted is deprecated. Call attr.value instead.'),
            set: l(function () {
              return r.value;
            }, 'Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.'),
          });
          r._constructed = true;
          return r;
        }
        var t = Attribute.prototype;
        t.getQuotedValue = function getQuotedValue(e) {
          if (e === void 0) {
            e = {};
          }
          var t = this._determineQuoteMark(e);
          var r = d[t];
          var n = (0, s['default'])(this._value, r);
          return n;
        };
        t._determineQuoteMark = function _determineQuoteMark(e) {
          return e.smart ? this.smartQuoteMark(e) : this.preferredQuoteMark(e);
        };
        t.setValue = function setValue(e, t) {
          if (t === void 0) {
            t = {};
          }
          this._value = e;
          this._quoteMark = this._determineQuoteMark(t);
          this._syncRawValue();
        };
        t.smartQuoteMark = function smartQuoteMark(e) {
          var t = this.value;
          var r = t.replace(/[^']/g, '').length;
          var n = t.replace(/[^"]/g, '').length;
          if (r + n === 0) {
            var o = (0, s['default'])(t, { isIdentifier: true });
            if (o === t) {
              return Attribute.NO_QUOTE;
            } else {
              var i = this.preferredQuoteMark(e);
              if (i === Attribute.NO_QUOTE) {
                var a = this.quoteMark || e.quoteMark || Attribute.DOUBLE_QUOTE;
                var l = d[a];
                var u = (0, s['default'])(t, l);
                if (u.length < o.length) {
                  return a;
                }
              }
              return i;
            }
          } else if (n === r) {
            return this.preferredQuoteMark(e);
          } else if (n < r) {
            return Attribute.DOUBLE_QUOTE;
          } else {
            return Attribute.SINGLE_QUOTE;
          }
        };
        t.preferredQuoteMark = function preferredQuoteMark(e) {
          var t = e.preferCurrentQuoteMark ? this.quoteMark : e.quoteMark;
          if (t === undefined) {
            t = e.preferCurrentQuoteMark ? e.quoteMark : this.quoteMark;
          }
          if (t === undefined) {
            t = Attribute.DOUBLE_QUOTE;
          }
          return t;
        };
        t._syncRawValue = function _syncRawValue() {
          var e = (0, s['default'])(this._value, d[this.quoteMark]);
          if (e === this._value) {
            if (this.raws) {
              delete this.raws.value;
            }
          } else {
            this.raws.value = e;
          }
        };
        t._handleEscapes = function _handleEscapes(e, t) {
          if (this._constructed) {
            var r = (0, s['default'])(t, { isIdentifier: true });
            if (r !== t) {
              this.raws[e] = r;
            } else {
              delete this.raws[e];
            }
          }
        };
        t._spacesFor = function _spacesFor(e) {
          var t = { before: '', after: '' };
          var r = this.spaces[e] || {};
          var s = (this.raws.spaces && this.raws.spaces[e]) || {};
          return Object.assign(t, r, s);
        };
        t._stringFor = function _stringFor(e, t, r) {
          if (t === void 0) {
            t = e;
          }
          if (r === void 0) {
            r = defaultAttrConcat;
          }
          var s = this._spacesFor(t);
          return r(this.stringifyProperty(e), s);
        };
        t.offsetOf = function offsetOf(e) {
          var t = 1;
          var r = this._spacesFor('attribute');
          t += r.before.length;
          if (e === 'namespace' || e === 'ns') {
            return this.namespace ? t : -1;
          }
          if (e === 'attributeNS') {
            return t;
          }
          t += this.namespaceString.length;
          if (this.namespace) {
            t += 1;
          }
          if (e === 'attribute') {
            return t;
          }
          t += this.stringifyProperty('attribute').length;
          t += r.after.length;
          var s = this._spacesFor('operator');
          t += s.before.length;
          var n = this.stringifyProperty('operator');
          if (e === 'operator') {
            return n ? t : -1;
          }
          t += n.length;
          t += s.after.length;
          var o = this._spacesFor('value');
          t += o.before.length;
          var i = this.stringifyProperty('value');
          if (e === 'value') {
            return i ? t : -1;
          }
          t += i.length;
          t += o.after.length;
          var a = this._spacesFor('insensitive');
          t += a.before.length;
          if (e === 'insensitive') {
            return this.insensitive ? t : -1;
          }
          return -1;
        };
        t.toString = function toString() {
          var e = this;
          var t = [this.rawSpaceBefore, '['];
          t.push(this._stringFor('qualifiedAttribute', 'attribute'));
          if (this.operator && (this.value || this.value === '')) {
            t.push(this._stringFor('operator'));
            t.push(this._stringFor('value'));
            t.push(
              this._stringFor(
                'insensitiveFlag',
                'insensitive',
                function (t, r) {
                  if (
                    t.length > 0 &&
                    !e.quoted &&
                    r.before.length === 0 &&
                    !(e.spaces.value && e.spaces.value.after)
                  ) {
                    r.before = ' ';
                  }
                  return defaultAttrConcat(t, r);
                },
              ),
            );
          }
          t.push(']');
          t.push(this.rawSpaceAfter);
          return t.join('');
        };
        _createClass(Attribute, [
          {
            key: 'quoted',
            get: function get() {
              var e = this.quoteMark;
              return e === "'" || e === '"';
            },
            set: function set(e) {
              f();
            },
          },
          {
            key: 'quoteMark',
            get: function get() {
              return this._quoteMark;
            },
            set: function set(e) {
              if (!this._constructed) {
                this._quoteMark = e;
                return;
              }
              if (this._quoteMark !== e) {
                this._quoteMark = e;
                this._syncRawValue();
              }
            },
          },
          {
            key: 'qualifiedAttribute',
            get: function get() {
              return this.qualifiedName(this.raws.attribute || this.attribute);
            },
          },
          {
            key: 'insensitiveFlag',
            get: function get() {
              return this.insensitive ? 'i' : '';
            },
          },
          {
            key: 'value',
            get: function get() {
              return this._value;
            },
            set: function set(e) {
              if (this._constructed) {
                var t = unescapeValue(e),
                  r = t.deprecatedUsage,
                  s = t.unescaped,
                  n = t.quoteMark;
                if (r) {
                  c();
                }
                if (s === this._value && n === this._quoteMark) {
                  return;
                }
                this._value = s;
                this._quoteMark = n;
                this._syncRawValue();
              } else {
                this._value = e;
              }
            },
          },
          {
            key: 'attribute',
            get: function get() {
              return this._attribute;
            },
            set: function set(e) {
              this._handleEscapes('attribute', e);
              this._attribute = e;
            },
          },
        ]);
        return Attribute;
      })(o['default']);
      t['default'] = h;
      h.NO_QUOTE = null;
      h.SINGLE_QUOTE = "'";
      h.DOUBLE_QUOTE = '"';
      var d =
        ((a = {
          "'": { quotes: 'single', wrap: true },
          '"': { quotes: 'double', wrap: true },
        }),
        (a[null] = { isIdentifier: true }),
        a);
      function defaultAttrConcat(e, t) {
        return '' + t.before + e + t.after;
      }
    },
    8836: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(9419));
      var n = r(4892);
      var o = _interopRequireDefault(r(314));
      var i = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var a = (function (e) {
        _inheritsLoose(ClassName, e);
        function ClassName(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = i.CLASS;
          r._constructed = true;
          return r;
        }
        var t = ClassName.prototype;
        t.valueToString = function valueToString() {
          return '.' + e.prototype.valueToString.call(this);
        };
        _createClass(ClassName, [
          {
            key: 'value',
            get: function get() {
              return this._value;
            },
            set: function set(e) {
              if (this._constructed) {
                var t = (0, s['default'])(e, { isIdentifier: true });
                if (t !== e) {
                  (0, n.ensureObject)(this, 'raws');
                  this.raws.value = t;
                } else if (this.raws) {
                  delete this.raws.value;
                }
              }
              this._value = e;
            },
          },
        ]);
        return ClassName;
      })(o['default']);
      t['default'] = a;
      e.exports = t.default;
    },
    2582: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(314));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Combinator, e);
        function Combinator(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.COMBINATOR;
          return r;
        }
        return Combinator;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    6226: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(314));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Comment, e);
        function Comment(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.COMMENT;
          return r;
        }
        return Comment;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    7328: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t.universal =
        t.tag =
        t.string =
        t.selector =
        t.root =
        t.pseudo =
        t.nesting =
        t.id =
        t.comment =
        t.combinator =
        t.className =
        t.attribute =
          void 0;
      var s = _interopRequireDefault(r(4482));
      var n = _interopRequireDefault(r(8836));
      var o = _interopRequireDefault(r(2582));
      var i = _interopRequireDefault(r(6226));
      var a = _interopRequireDefault(r(855));
      var l = _interopRequireDefault(r(3101));
      var u = _interopRequireDefault(r(2766));
      var c = _interopRequireDefault(r(3383));
      var f = _interopRequireDefault(r(7372));
      var p = _interopRequireDefault(r(4291));
      var h = _interopRequireDefault(r(5379));
      var d = _interopRequireDefault(r(5504));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var v = function attribute(e) {
        return new s['default'](e);
      };
      t.attribute = v;
      var m = function className(e) {
        return new n['default'](e);
      };
      t.className = m;
      var g = function combinator(e) {
        return new o['default'](e);
      };
      t.combinator = g;
      var _ = function comment(e) {
        return new i['default'](e);
      };
      t.comment = _;
      var y = function id(e) {
        return new a['default'](e);
      };
      t.id = y;
      var E = function nesting(e) {
        return new l['default'](e);
      };
      t.nesting = E;
      var b = function pseudo(e) {
        return new u['default'](e);
      };
      t.pseudo = b;
      var w = function root(e) {
        return new c['default'](e);
      };
      t.root = w;
      var S = function selector(e) {
        return new f['default'](e);
      };
      t.selector = S;
      var O = function string(e) {
        return new p['default'](e);
      };
      t.string = O;
      var R = function tag(e) {
        return new h['default'](e);
      };
      t.tag = R;
      var x = function universal(e) {
        return new d['default'](e);
      };
      t.universal = x;
    },
    7387: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(314));
      var n = _interopRequireWildcard(r(5950));
      function _getRequireWildcardCache() {
        if (typeof WeakMap !== 'function') return null;
        var e = new WeakMap();
        _getRequireWildcardCache = function _getRequireWildcardCache() {
          return e;
        };
        return e;
      }
      function _interopRequireWildcard(e) {
        if (e && e.__esModule) {
          return e;
        }
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) {
          return { default: e };
        }
        var t = _getRequireWildcardCache();
        if (t && t.has(e)) {
          return t.get(e);
        }
        var r = {};
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var o = s ? Object.getOwnPropertyDescriptor(e, n) : null;
            if (o && (o.get || o.set)) {
              Object.defineProperty(r, n, o);
            } else {
              r[n] = e[n];
            }
          }
        }
        r['default'] = e;
        if (t) {
          t.set(e, r);
        }
        return r;
      }
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _createForOfIteratorHelperLoose(e, t) {
        var r;
        if (typeof Symbol === 'undefined' || e[Symbol.iterator] == null) {
          if (
            Array.isArray(e) ||
            (r = _unsupportedIterableToArray(e)) ||
            (t && e && typeof e.length === 'number')
          ) {
            if (r) e = r;
            var s = 0;
            return function () {
              if (s >= e.length) return { done: true };
              return { done: false, value: e[s++] };
            };
          }
          throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        r = e[Symbol.iterator]();
        return r.next.bind(r);
      }
      function _unsupportedIterableToArray(e, t) {
        if (!e) return;
        if (typeof e === 'string') return _arrayLikeToArray(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        if (r === 'Object' && e.constructor) r = e.constructor.name;
        if (r === 'Map' || r === 'Set') return Array.from(e);
        if (
          r === 'Arguments' ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
        )
          return _arrayLikeToArray(e, t);
      }
      function _arrayLikeToArray(e, t) {
        if (t == null || t > e.length) t = e.length;
        for (var r = 0, s = new Array(t); r < t; r++) {
          s[r] = e[r];
        }
        return s;
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Container, e);
        function Container(t) {
          var r;
          r = e.call(this, t) || this;
          if (!r.nodes) {
            r.nodes = [];
          }
          return r;
        }
        var t = Container.prototype;
        t.append = function append(e) {
          e.parent = this;
          this.nodes.push(e);
          return this;
        };
        t.prepend = function prepend(e) {
          e.parent = this;
          this.nodes.unshift(e);
          return this;
        };
        t.at = function at(e) {
          return this.nodes[e];
        };
        t.index = function index(e) {
          if (typeof e === 'number') {
            return e;
          }
          return this.nodes.indexOf(e);
        };
        t.removeChild = function removeChild(e) {
          e = this.index(e);
          this.at(e).parent = undefined;
          this.nodes.splice(e, 1);
          var t;
          for (var r in this.indexes) {
            t = this.indexes[r];
            if (t >= e) {
              this.indexes[r] = t - 1;
            }
          }
          return this;
        };
        t.removeAll = function removeAll() {
          for (
            var e = _createForOfIteratorHelperLoose(this.nodes), t;
            !(t = e()).done;

          ) {
            var r = t.value;
            r.parent = undefined;
          }
          this.nodes = [];
          return this;
        };
        t.empty = function empty() {
          return this.removeAll();
        };
        t.insertAfter = function insertAfter(e, t) {
          t.parent = this;
          var r = this.index(e);
          this.nodes.splice(r + 1, 0, t);
          t.parent = this;
          var s;
          for (var n in this.indexes) {
            s = this.indexes[n];
            if (r <= s) {
              this.indexes[n] = s + 1;
            }
          }
          return this;
        };
        t.insertBefore = function insertBefore(e, t) {
          t.parent = this;
          var r = this.index(e);
          this.nodes.splice(r, 0, t);
          t.parent = this;
          var s;
          for (var n in this.indexes) {
            s = this.indexes[n];
            if (s <= r) {
              this.indexes[n] = s + 1;
            }
          }
          return this;
        };
        t._findChildAtPosition = function _findChildAtPosition(e, t) {
          var r = undefined;
          this.each(function (s) {
            if (s.atPosition) {
              var n = s.atPosition(e, t);
              if (n) {
                r = n;
                return false;
              }
            } else if (s.isAtPosition(e, t)) {
              r = s;
              return false;
            }
          });
          return r;
        };
        t.atPosition = function atPosition(e, t) {
          if (this.isAtPosition(e, t)) {
            return this._findChildAtPosition(e, t) || this;
          } else {
            return undefined;
          }
        };
        t._inferEndPosition = function _inferEndPosition() {
          if (this.last && this.last.source && this.last.source.end) {
            this.source = this.source || {};
            this.source.end = this.source.end || {};
            Object.assign(this.source.end, this.last.source.end);
          }
        };
        t.each = function each(e) {
          if (!this.lastEach) {
            this.lastEach = 0;
          }
          if (!this.indexes) {
            this.indexes = {};
          }
          this.lastEach++;
          var t = this.lastEach;
          this.indexes[t] = 0;
          if (!this.length) {
            return undefined;
          }
          var r, s;
          while (this.indexes[t] < this.length) {
            r = this.indexes[t];
            s = e(this.at(r), r);
            if (s === false) {
              break;
            }
            this.indexes[t] += 1;
          }
          delete this.indexes[t];
          if (s === false) {
            return false;
          }
        };
        t.walk = function walk(e) {
          return this.each(function (t, r) {
            var s = e(t, r);
            if (s !== false && t.length) {
              s = t.walk(e);
            }
            if (s === false) {
              return false;
            }
          });
        };
        t.walkAttributes = function walkAttributes(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.ATTRIBUTE) {
              return e.call(t, r);
            }
          });
        };
        t.walkClasses = function walkClasses(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.CLASS) {
              return e.call(t, r);
            }
          });
        };
        t.walkCombinators = function walkCombinators(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.COMBINATOR) {
              return e.call(t, r);
            }
          });
        };
        t.walkComments = function walkComments(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.COMMENT) {
              return e.call(t, r);
            }
          });
        };
        t.walkIds = function walkIds(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.ID) {
              return e.call(t, r);
            }
          });
        };
        t.walkNesting = function walkNesting(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.NESTING) {
              return e.call(t, r);
            }
          });
        };
        t.walkPseudos = function walkPseudos(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.PSEUDO) {
              return e.call(t, r);
            }
          });
        };
        t.walkTags = function walkTags(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.TAG) {
              return e.call(t, r);
            }
          });
        };
        t.walkUniversals = function walkUniversals(e) {
          var t = this;
          return this.walk(function (r) {
            if (r.type === n.UNIVERSAL) {
              return e.call(t, r);
            }
          });
        };
        t.split = function split(e) {
          var t = this;
          var r = [];
          return this.reduce(function (s, n, o) {
            var i = e.call(t, n);
            r.push(n);
            if (i) {
              s.push(r);
              r = [];
            } else if (o === t.length - 1) {
              s.push(r);
            }
            return s;
          }, []);
        };
        t.map = function map(e) {
          return this.nodes.map(e);
        };
        t.reduce = function reduce(e, t) {
          return this.nodes.reduce(e, t);
        };
        t.every = function every(e) {
          return this.nodes.every(e);
        };
        t.some = function some(e) {
          return this.nodes.some(e);
        };
        t.filter = function filter(e) {
          return this.nodes.filter(e);
        };
        t.sort = function sort(e) {
          return this.nodes.sort(e);
        };
        t.toString = function toString() {
          return this.map(String).join('');
        };
        _createClass(Container, [
          {
            key: 'first',
            get: function get() {
              return this.at(0);
            },
          },
          {
            key: 'last',
            get: function get() {
              return this.at(this.length - 1);
            },
          },
          {
            key: 'length',
            get: function get() {
              return this.nodes.length;
            },
          },
        ]);
        return Container;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    7267: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t.isNode = isNode;
      t.isPseudoElement = isPseudoElement;
      t.isPseudoClass = isPseudoClass;
      t.isContainer = isContainer;
      t.isNamespace = isNamespace;
      t.isUniversal =
        t.isTag =
        t.isString =
        t.isSelector =
        t.isRoot =
        t.isPseudo =
        t.isNesting =
        t.isIdentifier =
        t.isComment =
        t.isCombinator =
        t.isClassName =
        t.isAttribute =
          void 0;
      var s = r(5950);
      var n;
      var o =
        ((n = {}),
        (n[s.ATTRIBUTE] = true),
        (n[s.CLASS] = true),
        (n[s.COMBINATOR] = true),
        (n[s.COMMENT] = true),
        (n[s.ID] = true),
        (n[s.NESTING] = true),
        (n[s.PSEUDO] = true),
        (n[s.ROOT] = true),
        (n[s.SELECTOR] = true),
        (n[s.STRING] = true),
        (n[s.TAG] = true),
        (n[s.UNIVERSAL] = true),
        n);
      function isNode(e) {
        return typeof e === 'object' && o[e.type];
      }
      function isNodeType(e, t) {
        return isNode(t) && t.type === e;
      }
      var i = isNodeType.bind(null, s.ATTRIBUTE);
      t.isAttribute = i;
      var a = isNodeType.bind(null, s.CLASS);
      t.isClassName = a;
      var l = isNodeType.bind(null, s.COMBINATOR);
      t.isCombinator = l;
      var u = isNodeType.bind(null, s.COMMENT);
      t.isComment = u;
      var c = isNodeType.bind(null, s.ID);
      t.isIdentifier = c;
      var f = isNodeType.bind(null, s.NESTING);
      t.isNesting = f;
      var p = isNodeType.bind(null, s.PSEUDO);
      t.isPseudo = p;
      var h = isNodeType.bind(null, s.ROOT);
      t.isRoot = h;
      var d = isNodeType.bind(null, s.SELECTOR);
      t.isSelector = d;
      var v = isNodeType.bind(null, s.STRING);
      t.isString = v;
      var m = isNodeType.bind(null, s.TAG);
      t.isTag = m;
      var g = isNodeType.bind(null, s.UNIVERSAL);
      t.isUniversal = g;
      function isPseudoElement(e) {
        return (
          p(e) &&
          e.value &&
          (e.value.startsWith('::') ||
            e.value.toLowerCase() === ':before' ||
            e.value.toLowerCase() === ':after')
        );
      }
      function isPseudoClass(e) {
        return p(e) && !isPseudoElement(e);
      }
      function isContainer(e) {
        return !!(isNode(e) && e.walk);
      }
      function isNamespace(e) {
        return i(e) || m(e);
      }
    },
    855: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(314));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(ID, e);
        function ID(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.ID;
          return r;
        }
        var t = ID.prototype;
        t.valueToString = function valueToString() {
          return '#' + e.prototype.valueToString.call(this);
        };
        return ID;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    7153: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      var s = r(5950);
      Object.keys(s).forEach(function (e) {
        if (e === 'default' || e === '__esModule') return;
        if (e in t && t[e] === s[e]) return;
        t[e] = s[e];
      });
      var n = r(7328);
      Object.keys(n).forEach(function (e) {
        if (e === 'default' || e === '__esModule') return;
        if (e in t && t[e] === n[e]) return;
        t[e] = n[e];
      });
      var o = r(7267);
      Object.keys(o).forEach(function (e) {
        if (e === 'default' || e === '__esModule') return;
        if (e in t && t[e] === o[e]) return;
        t[e] = o[e];
      });
    },
    6084: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(9419));
      var n = r(4892);
      var o = _interopRequireDefault(r(314));
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var i = (function (e) {
        _inheritsLoose(Namespace, e);
        function Namespace() {
          return e.apply(this, arguments) || this;
        }
        var t = Namespace.prototype;
        t.qualifiedName = function qualifiedName(e) {
          if (this.namespace) {
            return this.namespaceString + '|' + e;
          } else {
            return e;
          }
        };
        t.valueToString = function valueToString() {
          return this.qualifiedName(e.prototype.valueToString.call(this));
        };
        _createClass(Namespace, [
          {
            key: 'namespace',
            get: function get() {
              return this._namespace;
            },
            set: function set(e) {
              if (e === true || e === '*' || e === '&') {
                this._namespace = e;
                if (this.raws) {
                  delete this.raws.namespace;
                }
                return;
              }
              var t = (0, s['default'])(e, { isIdentifier: true });
              this._namespace = e;
              if (t !== e) {
                (0, n.ensureObject)(this, 'raws');
                this.raws.namespace = t;
              } else if (this.raws) {
                delete this.raws.namespace;
              }
            },
          },
          {
            key: 'ns',
            get: function get() {
              return this._namespace;
            },
            set: function set(e) {
              this.namespace = e;
            },
          },
          {
            key: 'namespaceString',
            get: function get() {
              if (this.namespace) {
                var e = this.stringifyProperty('namespace');
                if (e === true) {
                  return '';
                } else {
                  return e;
                }
              } else {
                return '';
              }
            },
          },
        ]);
        return Namespace;
      })(o['default']);
      t['default'] = i;
      e.exports = t.default;
    },
    3101: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(314));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Nesting, e);
        function Nesting(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.NESTING;
          r.value = '&';
          return r;
        }
        return Nesting;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    314: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = r(4892);
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      var n = function cloneNode(e, t) {
        if (typeof e !== 'object' || e === null) {
          return e;
        }
        var r = new e.constructor();
        for (var s in e) {
          if (!e.hasOwnProperty(s)) {
            continue;
          }
          var n = e[s];
          var o = typeof n;
          if (s === 'parent' && o === 'object') {
            if (t) {
              r[s] = t;
            }
          } else if (n instanceof Array) {
            r[s] = n.map(function (e) {
              return cloneNode(e, r);
            });
          } else {
            r[s] = cloneNode(n, r);
          }
        }
        return r;
      };
      var o = (function () {
        function Node(e) {
          if (e === void 0) {
            e = {};
          }
          Object.assign(this, e);
          this.spaces = this.spaces || {};
          this.spaces.before = this.spaces.before || '';
          this.spaces.after = this.spaces.after || '';
        }
        var e = Node.prototype;
        e.remove = function remove() {
          if (this.parent) {
            this.parent.removeChild(this);
          }
          this.parent = undefined;
          return this;
        };
        e.replaceWith = function replaceWith() {
          if (this.parent) {
            for (var e in arguments) {
              this.parent.insertBefore(this, arguments[e]);
            }
            this.remove();
          }
          return this;
        };
        e.next = function next() {
          return this.parent.at(this.parent.index(this) + 1);
        };
        e.prev = function prev() {
          return this.parent.at(this.parent.index(this) - 1);
        };
        e.clone = function clone(e) {
          if (e === void 0) {
            e = {};
          }
          var t = n(this);
          for (var r in e) {
            t[r] = e[r];
          }
          return t;
        };
        e.appendToPropertyAndEscape = function appendToPropertyAndEscape(
          e,
          t,
          r,
        ) {
          if (!this.raws) {
            this.raws = {};
          }
          var s = this[e];
          var n = this.raws[e];
          this[e] = s + t;
          if (n || r !== t) {
            this.raws[e] = (n || s) + r;
          } else {
            delete this.raws[e];
          }
        };
        e.setPropertyAndEscape = function setPropertyAndEscape(e, t, r) {
          if (!this.raws) {
            this.raws = {};
          }
          this[e] = t;
          this.raws[e] = r;
        };
        e.setPropertyWithoutEscape = function setPropertyWithoutEscape(e, t) {
          this[e] = t;
          if (this.raws) {
            delete this.raws[e];
          }
        };
        e.isAtPosition = function isAtPosition(e, t) {
          if (this.source && this.source.start && this.source.end) {
            if (this.source.start.line > e) {
              return false;
            }
            if (this.source.end.line < e) {
              return false;
            }
            if (this.source.start.line === e && this.source.start.column > t) {
              return false;
            }
            if (this.source.end.line === e && this.source.end.column < t) {
              return false;
            }
            return true;
          }
          return undefined;
        };
        e.stringifyProperty = function stringifyProperty(e) {
          return (this.raws && this.raws[e]) || this[e];
        };
        e.valueToString = function valueToString() {
          return String(this.stringifyProperty('value'));
        };
        e.toString = function toString() {
          return [
            this.rawSpaceBefore,
            this.valueToString(),
            this.rawSpaceAfter,
          ].join('');
        };
        _createClass(Node, [
          {
            key: 'rawSpaceBefore',
            get: function get() {
              var e = this.raws && this.raws.spaces && this.raws.spaces.before;
              if (e === undefined) {
                e = this.spaces && this.spaces.before;
              }
              return e || '';
            },
            set: function set(e) {
              (0, s.ensureObject)(this, 'raws', 'spaces');
              this.raws.spaces.before = e;
            },
          },
          {
            key: 'rawSpaceAfter',
            get: function get() {
              var e = this.raws && this.raws.spaces && this.raws.spaces.after;
              if (e === undefined) {
                e = this.spaces.after;
              }
              return e || '';
            },
            set: function set(e) {
              (0, s.ensureObject)(this, 'raws', 'spaces');
              this.raws.spaces.after = e;
            },
          },
        ]);
        return Node;
      })();
      t['default'] = o;
      e.exports = t.default;
    },
    2766: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(7387));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Pseudo, e);
        function Pseudo(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.PSEUDO;
          return r;
        }
        var t = Pseudo.prototype;
        t.toString = function toString() {
          var e = this.length ? '(' + this.map(String).join(',') + ')' : '';
          return [
            this.rawSpaceBefore,
            this.stringifyProperty('value'),
            e,
            this.rawSpaceAfter,
          ].join('');
        };
        return Pseudo;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    3383: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(7387));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
          var s = t[r];
          s.enumerable = s.enumerable || false;
          s.configurable = true;
          if ('value' in s) s.writable = true;
          Object.defineProperty(e, s.key, s);
        }
      }
      function _createClass(e, t, r) {
        if (t) _defineProperties(e.prototype, t);
        if (r) _defineProperties(e, r);
        return e;
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Root, e);
        function Root(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.ROOT;
          return r;
        }
        var t = Root.prototype;
        t.toString = function toString() {
          var e = this.reduce(function (e, t) {
            e.push(String(t));
            return e;
          }, []).join(',');
          return this.trailingComma ? e + ',' : e;
        };
        t.error = function error(e, t) {
          if (this._error) {
            return this._error(e, t);
          } else {
            return new Error(e);
          }
        };
        _createClass(Root, [
          {
            key: 'errorGenerator',
            set: function set(e) {
              this._error = e;
            },
          },
        ]);
        return Root;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    7372: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(7387));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Selector, e);
        function Selector(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.SELECTOR;
          return r;
        }
        return Selector;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    4291: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(314));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(String, e);
        function String(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.STRING;
          return r;
        }
        return String;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    5379: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(6084));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Tag, e);
        function Tag(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.TAG;
          return r;
        }
        return Tag;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    5950: function (e, t) {
      'use strict';
      t.__esModule = true;
      t.UNIVERSAL =
        t.ATTRIBUTE =
        t.CLASS =
        t.COMBINATOR =
        t.COMMENT =
        t.ID =
        t.NESTING =
        t.PSEUDO =
        t.ROOT =
        t.SELECTOR =
        t.STRING =
        t.TAG =
          void 0;
      var r = 'tag';
      t.TAG = r;
      var s = 'string';
      t.STRING = s;
      var n = 'selector';
      t.SELECTOR = n;
      var o = 'root';
      t.ROOT = o;
      var i = 'pseudo';
      t.PSEUDO = i;
      var a = 'nesting';
      t.NESTING = a;
      var l = 'id';
      t.ID = l;
      var u = 'comment';
      t.COMMENT = u;
      var c = 'combinator';
      t.COMBINATOR = c;
      var f = 'class';
      t.CLASS = f;
      var p = 'attribute';
      t.ATTRIBUTE = p;
      var h = 'universal';
      t.UNIVERSAL = h;
    },
    5504: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = void 0;
      var s = _interopRequireDefault(r(6084));
      var n = r(5950);
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function _inheritsLoose(e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        _setPrototypeOf(e, t);
      }
      function _setPrototypeOf(e, t) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(e, t) {
            e.__proto__ = t;
            return e;
          };
        return _setPrototypeOf(e, t);
      }
      var o = (function (e) {
        _inheritsLoose(Universal, e);
        function Universal(t) {
          var r;
          r = e.call(this, t) || this;
          r.type = n.UNIVERSAL;
          r.value = '*';
          return r;
        }
        return Universal;
      })(s['default']);
      t['default'] = o;
      e.exports = t.default;
    },
    8059: function (e, t) {
      'use strict';
      t.__esModule = true;
      t['default'] = sortAscending;
      function sortAscending(e) {
        return e.sort(function (e, t) {
          return e - t;
        });
      }
      e.exports = t.default;
    },
    9200: function (e, t) {
      'use strict';
      t.__esModule = true;
      t.combinator =
        t.word =
        t.comment =
        t.str =
        t.tab =
        t.newline =
        t.feed =
        t.cr =
        t.backslash =
        t.bang =
        t.slash =
        t.doubleQuote =
        t.singleQuote =
        t.space =
        t.greaterThan =
        t.pipe =
        t.equals =
        t.plus =
        t.caret =
        t.tilde =
        t.dollar =
        t.closeSquare =
        t.openSquare =
        t.closeParenthesis =
        t.openParenthesis =
        t.semicolon =
        t.colon =
        t.comma =
        t.at =
        t.asterisk =
        t.ampersand =
          void 0;
      var r = 38;
      t.ampersand = r;
      var s = 42;
      t.asterisk = s;
      var n = 64;
      t.at = n;
      var o = 44;
      t.comma = o;
      var i = 58;
      t.colon = i;
      var a = 59;
      t.semicolon = a;
      var l = 40;
      t.openParenthesis = l;
      var u = 41;
      t.closeParenthesis = u;
      var c = 91;
      t.openSquare = c;
      var f = 93;
      t.closeSquare = f;
      var p = 36;
      t.dollar = p;
      var h = 126;
      t.tilde = h;
      var d = 94;
      t.caret = d;
      var v = 43;
      t.plus = v;
      var m = 61;
      t.equals = m;
      var g = 124;
      t.pipe = g;
      var _ = 62;
      t.greaterThan = _;
      var y = 32;
      t.space = y;
      var E = 39;
      t.singleQuote = E;
      var b = 34;
      t.doubleQuote = b;
      var w = 47;
      t.slash = w;
      var S = 33;
      t.bang = S;
      var O = 92;
      t.backslash = O;
      var R = 13;
      t.cr = R;
      var x = 12;
      t.feed = x;
      var I = 10;
      t.newline = I;
      var T = 9;
      t.tab = T;
      var P = E;
      t.str = P;
      var A = -1;
      t.comment = A;
      var k = -2;
      t.word = k;
      var L = -3;
      t.combinator = L;
    },
    5090: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t['default'] = tokenize;
      t.FIELDS = void 0;
      var s = _interopRequireWildcard(r(9200));
      var n, o;
      function _getRequireWildcardCache() {
        if (typeof WeakMap !== 'function') return null;
        var e = new WeakMap();
        _getRequireWildcardCache = function _getRequireWildcardCache() {
          return e;
        };
        return e;
      }
      function _interopRequireWildcard(e) {
        if (e && e.__esModule) {
          return e;
        }
        if (e === null || (typeof e !== 'object' && typeof e !== 'function')) {
          return { default: e };
        }
        var t = _getRequireWildcardCache();
        if (t && t.has(e)) {
          return t.get(e);
        }
        var r = {};
        var s = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            var o = s ? Object.getOwnPropertyDescriptor(e, n) : null;
            if (o && (o.get || o.set)) {
              Object.defineProperty(r, n, o);
            } else {
              r[n] = e[n];
            }
          }
        }
        r['default'] = e;
        if (t) {
          t.set(e, r);
        }
        return r;
      }
      var i =
        ((n = {}),
        (n[s.tab] = true),
        (n[s.newline] = true),
        (n[s.cr] = true),
        (n[s.feed] = true),
        n);
      var a =
        ((o = {}),
        (o[s.space] = true),
        (o[s.tab] = true),
        (o[s.newline] = true),
        (o[s.cr] = true),
        (o[s.feed] = true),
        (o[s.ampersand] = true),
        (o[s.asterisk] = true),
        (o[s.bang] = true),
        (o[s.comma] = true),
        (o[s.colon] = true),
        (o[s.semicolon] = true),
        (o[s.openParenthesis] = true),
        (o[s.closeParenthesis] = true),
        (o[s.openSquare] = true),
        (o[s.closeSquare] = true),
        (o[s.singleQuote] = true),
        (o[s.doubleQuote] = true),
        (o[s.plus] = true),
        (o[s.pipe] = true),
        (o[s.tilde] = true),
        (o[s.greaterThan] = true),
        (o[s.equals] = true),
        (o[s.dollar] = true),
        (o[s.caret] = true),
        (o[s.slash] = true),
        o);
      var l = {};
      var u = '0123456789abcdefABCDEF';
      for (var c = 0; c < u.length; c++) {
        l[u.charCodeAt(c)] = true;
      }
      function consumeWord(e, t) {
        var r = t;
        var n;
        do {
          n = e.charCodeAt(r);
          if (a[n]) {
            return r - 1;
          } else if (n === s.backslash) {
            r = consumeEscape(e, r) + 1;
          } else {
            r++;
          }
        } while (r < e.length);
        return r - 1;
      }
      function consumeEscape(e, t) {
        var r = t;
        var n = e.charCodeAt(r + 1);
        if (i[n]) {
        } else if (l[n]) {
          var o = 0;
          do {
            r++;
            o++;
            n = e.charCodeAt(r + 1);
          } while (l[n] && o < 6);
          if (o < 6 && n === s.space) {
            r++;
          }
        } else {
          r++;
        }
        return r;
      }
      var f = {
        TYPE: 0,
        START_LINE: 1,
        START_COL: 2,
        END_LINE: 3,
        END_COL: 4,
        START_POS: 5,
        END_POS: 6,
      };
      t.FIELDS = f;
      function tokenize(e) {
        var t = [];
        var r = e.css.valueOf();
        var n = r,
          o = n.length;
        var i = -1;
        var a = 1;
        var l = 0;
        var u = 0;
        var c, f, p, h, d, v, m, g, _, y, E, b, w;
        function unclosed(t, s) {
          if (e.safe) {
            r += s;
            _ = r.length - 1;
          } else {
            throw e.error('Unclosed ' + t, a, l - i, l);
          }
        }
        while (l < o) {
          c = r.charCodeAt(l);
          if (c === s.newline) {
            i = l;
            a += 1;
          }
          switch (c) {
            case s.space:
            case s.tab:
            case s.newline:
            case s.cr:
            case s.feed:
              _ = l;
              do {
                _ += 1;
                c = r.charCodeAt(_);
                if (c === s.newline) {
                  i = _;
                  a += 1;
                }
              } while (
                c === s.space ||
                c === s.newline ||
                c === s.tab ||
                c === s.cr ||
                c === s.feed
              );
              w = s.space;
              h = a;
              p = _ - i - 1;
              u = _;
              break;
            case s.plus:
            case s.greaterThan:
            case s.tilde:
            case s.pipe:
              _ = l;
              do {
                _ += 1;
                c = r.charCodeAt(_);
              } while (
                c === s.plus ||
                c === s.greaterThan ||
                c === s.tilde ||
                c === s.pipe
              );
              w = s.combinator;
              h = a;
              p = l - i;
              u = _;
              break;
            case s.asterisk:
            case s.ampersand:
            case s.bang:
            case s.comma:
            case s.equals:
            case s.dollar:
            case s.caret:
            case s.openSquare:
            case s.closeSquare:
            case s.colon:
            case s.semicolon:
            case s.openParenthesis:
            case s.closeParenthesis:
              _ = l;
              w = c;
              h = a;
              p = l - i;
              u = _ + 1;
              break;
            case s.singleQuote:
            case s.doubleQuote:
              b = c === s.singleQuote ? "'" : '"';
              _ = l;
              do {
                d = false;
                _ = r.indexOf(b, _ + 1);
                if (_ === -1) {
                  unclosed('quote', b);
                }
                v = _;
                while (r.charCodeAt(v - 1) === s.backslash) {
                  v -= 1;
                  d = !d;
                }
              } while (d);
              w = s.str;
              h = a;
              p = l - i;
              u = _ + 1;
              break;
            default:
              if (c === s.slash && r.charCodeAt(l + 1) === s.asterisk) {
                _ = r.indexOf('*/', l + 2) + 1;
                if (_ === 0) {
                  unclosed('comment', '*/');
                }
                f = r.slice(l, _ + 1);
                g = f.split('\n');
                m = g.length - 1;
                if (m > 0) {
                  y = a + m;
                  E = _ - g[m].length;
                } else {
                  y = a;
                  E = i;
                }
                w = s.comment;
                a = y;
                h = y;
                p = _ - E;
              } else if (c === s.slash) {
                _ = l;
                w = c;
                h = a;
                p = l - i;
                u = _ + 1;
              } else {
                _ = consumeWord(r, l);
                w = s.word;
                h = a;
                p = _ - i;
              }
              u = _ + 1;
              break;
          }
          t.push([w, a, l - i, h, p, l, u]);
          if (E) {
            i = E;
            E = null;
          }
          l = u;
        }
        return t;
      }
    },
    1392: function (e, t) {
      'use strict';
      t.__esModule = true;
      t['default'] = ensureObject;
      function ensureObject(e) {
        for (
          var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1;
          s < t;
          s++
        ) {
          r[s - 1] = arguments[s];
        }
        while (r.length > 0) {
          var n = r.shift();
          if (!e[n]) {
            e[n] = {};
          }
          e = e[n];
        }
      }
      e.exports = t.default;
    },
    4763: function (e, t) {
      'use strict';
      t.__esModule = true;
      t['default'] = getProp;
      function getProp(e) {
        for (
          var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1;
          s < t;
          s++
        ) {
          r[s - 1] = arguments[s];
        }
        while (r.length > 0) {
          var n = r.shift();
          if (!e[n]) {
            return undefined;
          }
          e = e[n];
        }
        return e;
      }
      e.exports = t.default;
    },
    4892: function (e, t, r) {
      'use strict';
      t.__esModule = true;
      t.stripComments = t.ensureObject = t.getProp = t.unesc = void 0;
      var s = _interopRequireDefault(r(7306));
      t.unesc = s['default'];
      var n = _interopRequireDefault(r(4763));
      t.getProp = n['default'];
      var o = _interopRequireDefault(r(1392));
      t.ensureObject = o['default'];
      var i = _interopRequireDefault(r(2474));
      t.stripComments = i['default'];
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    2474: function (e, t) {
      'use strict';
      t.__esModule = true;
      t['default'] = stripComments;
      function stripComments(e) {
        var t = '';
        var r = e.indexOf('/*');
        var s = 0;
        while (r >= 0) {
          t = t + e.slice(s, r);
          var n = e.indexOf('*/', r + 2);
          if (n < 0) {
            return t;
          }
          s = n + 2;
          r = e.indexOf('/*', s);
        }
        t = t + e.slice(s);
        return t;
      }
      e.exports = t.default;
    },
    7306: function (e, t) {
      'use strict';
      t.__esModule = true;
      t['default'] = unesc;
      function gobbleHex(e) {
        var t = e.toLowerCase();
        var r = '';
        var s = false;
        for (var n = 0; n < 6 && t[n] !== undefined; n++) {
          var o = t.charCodeAt(n);
          var i = (o >= 97 && o <= 102) || (o >= 48 && o <= 57);
          s = o === 32;
          if (!i) {
            break;
          }
          r += t[n];
        }
        if (r.length === 0) {
          return undefined;
        }
        var a = parseInt(r, 16);
        var l = a >= 55296 && a <= 57343;
        if (l || a === 0 || a > 1114111) {
          return ['�', r.length + (s ? 1 : 0)];
        }
        return [String.fromCodePoint(a), r.length + (s ? 1 : 0)];
      }
      var r = /\\/;
      function unesc(e) {
        var t = r.test(e);
        if (!t) {
          return e;
        }
        var s = '';
        for (var n = 0; n < e.length; n++) {
          if (e[n] === '\\') {
            var o = gobbleHex(e.slice(n + 1, n + 7));
            if (o !== undefined) {
              s += o[0];
              n += o[1];
              continue;
            }
            if (e[n + 1] === '\\') {
              s += '\\';
              n++;
              continue;
            }
            if (e.length === n + 1) {
              s += e[n];
            }
            continue;
          }
          s += e[n];
        }
        return s;
      }
      e.exports = t.default;
    },
    933: function (e, t, r) {
      var s = r(5507);
      var n = r(7492);
      var o = r(2625);
      function ValueParser(e) {
        if (this instanceof ValueParser) {
          this.nodes = s(e);
          return this;
        }
        return new ValueParser(e);
      }
      ValueParser.prototype.toString = function () {
        return Array.isArray(this.nodes) ? o(this.nodes) : '';
      };
      ValueParser.prototype.walk = function (e, t) {
        n(this.nodes, e, t);
        return this;
      };
      ValueParser.unit = r(8754);
      ValueParser.walk = n;
      ValueParser.stringify = o;
      e.exports = ValueParser;
    },
    5507: function (e) {
      var t = '('.charCodeAt(0);
      var r = ')'.charCodeAt(0);
      var s = "'".charCodeAt(0);
      var n = '"'.charCodeAt(0);
      var o = '\\'.charCodeAt(0);
      var i = '/'.charCodeAt(0);
      var a = ','.charCodeAt(0);
      var l = ':'.charCodeAt(0);
      var u = '*'.charCodeAt(0);
      var c = 'u'.charCodeAt(0);
      var f = 'U'.charCodeAt(0);
      var p = '+'.charCodeAt(0);
      var h = /^[a-f0-9?-]+$/i;
      e.exports = function (e) {
        var d = [];
        var v = e;
        var m, g, _, y, E, b, w, S;
        var O = 0;
        var R = v.charCodeAt(O);
        var x = v.length;
        var I = [{ nodes: d }];
        var T = 0;
        var P;
        var A = '';
        var k = '';
        var L = '';
        while (O < x) {
          if (R <= 32) {
            m = O;
            do {
              m += 1;
              R = v.charCodeAt(m);
            } while (R <= 32);
            y = v.slice(O, m);
            _ = d[d.length - 1];
            if (R === r && T) {
              L = y;
            } else if (_ && _.type === 'div') {
              _.after = y;
              _.sourceEndIndex += y.length;
            } else if (
              R === a ||
              R === l ||
              (R === i &&
                v.charCodeAt(m + 1) !== u &&
                (!P || (P && P.type === 'function' && P.value !== 'calc')))
            ) {
              k = y;
            } else {
              d.push({
                type: 'space',
                sourceIndex: O,
                sourceEndIndex: m,
                value: y,
              });
            }
            O = m;
          } else if (R === s || R === n) {
            m = O;
            g = R === s ? "'" : '"';
            y = { type: 'string', sourceIndex: O, quote: g };
            do {
              E = false;
              m = v.indexOf(g, m + 1);
              if (~m) {
                b = m;
                while (v.charCodeAt(b - 1) === o) {
                  b -= 1;
                  E = !E;
                }
              } else {
                v += g;
                m = v.length - 1;
                y.unclosed = true;
              }
            } while (E);
            y.value = v.slice(O + 1, m);
            y.sourceEndIndex = y.unclosed ? m : m + 1;
            d.push(y);
            O = m + 1;
            R = v.charCodeAt(O);
          } else if (R === i && v.charCodeAt(O + 1) === u) {
            m = v.indexOf('*/', O);
            y = { type: 'comment', sourceIndex: O, sourceEndIndex: m + 2 };
            if (m === -1) {
              y.unclosed = true;
              m = v.length;
              y.sourceEndIndex = m;
            }
            y.value = v.slice(O + 2, m);
            d.push(y);
            O = m + 2;
            R = v.charCodeAt(O);
          } else if (
            (R === i || R === u) &&
            P &&
            P.type === 'function' &&
            P.value === 'calc'
          ) {
            y = v[O];
            d.push({
              type: 'word',
              sourceIndex: O - k.length,
              sourceEndIndex: O + y.length,
              value: y,
            });
            O += 1;
            R = v.charCodeAt(O);
          } else if (R === i || R === a || R === l) {
            y = v[O];
            d.push({
              type: 'div',
              sourceIndex: O - k.length,
              sourceEndIndex: O + y.length,
              value: y,
              before: k,
              after: '',
            });
            k = '';
            O += 1;
            R = v.charCodeAt(O);
          } else if (t === R) {
            m = O;
            do {
              m += 1;
              R = v.charCodeAt(m);
            } while (R <= 32);
            S = O;
            y = {
              type: 'function',
              sourceIndex: O - A.length,
              value: A,
              before: v.slice(S + 1, m),
            };
            O = m;
            if (A === 'url' && R !== s && R !== n) {
              m -= 1;
              do {
                E = false;
                m = v.indexOf(')', m + 1);
                if (~m) {
                  b = m;
                  while (v.charCodeAt(b - 1) === o) {
                    b -= 1;
                    E = !E;
                  }
                } else {
                  v += ')';
                  m = v.length - 1;
                  y.unclosed = true;
                }
              } while (E);
              w = m;
              do {
                w -= 1;
                R = v.charCodeAt(w);
              } while (R <= 32);
              if (S < w) {
                if (O !== w + 1) {
                  y.nodes = [
                    {
                      type: 'word',
                      sourceIndex: O,
                      sourceEndIndex: w + 1,
                      value: v.slice(O, w + 1),
                    },
                  ];
                } else {
                  y.nodes = [];
                }
                if (y.unclosed && w + 1 !== m) {
                  y.after = '';
                  y.nodes.push({
                    type: 'space',
                    sourceIndex: w + 1,
                    sourceEndIndex: m,
                    value: v.slice(w + 1, m),
                  });
                } else {
                  y.after = v.slice(w + 1, m);
                  y.sourceEndIndex = m;
                }
              } else {
                y.after = '';
                y.nodes = [];
              }
              O = m + 1;
              y.sourceEndIndex = y.unclosed ? m : O;
              R = v.charCodeAt(O);
              d.push(y);
            } else {
              T += 1;
              y.after = '';
              y.sourceEndIndex = O + 1;
              d.push(y);
              I.push(y);
              d = y.nodes = [];
              P = y;
            }
            A = '';
          } else if (r === R && T) {
            O += 1;
            R = v.charCodeAt(O);
            P.after = L;
            P.sourceEndIndex += L.length;
            L = '';
            T -= 1;
            I[I.length - 1].sourceEndIndex = O;
            I.pop();
            P = I[T];
            d = P.nodes;
          } else {
            m = O;
            do {
              if (R === o) {
                m += 1;
              }
              m += 1;
              R = v.charCodeAt(m);
            } while (
              m < x &&
              !(
                R <= 32 ||
                R === s ||
                R === n ||
                R === a ||
                R === l ||
                R === i ||
                R === t ||
                (R === u && P && P.type === 'function' && P.value === 'calc') ||
                (R === i && P.type === 'function' && P.value === 'calc') ||
                (R === r && T)
              )
            );
            y = v.slice(O, m);
            if (t === R) {
              A = y;
            } else if (
              (c === y.charCodeAt(0) || f === y.charCodeAt(0)) &&
              p === y.charCodeAt(1) &&
              h.test(y.slice(2))
            ) {
              d.push({
                type: 'unicode-range',
                sourceIndex: O,
                sourceEndIndex: m,
                value: y,
              });
            } else {
              d.push({
                type: 'word',
                sourceIndex: O,
                sourceEndIndex: m,
                value: y,
              });
            }
            O = m;
          }
        }
        for (O = I.length - 1; O; O -= 1) {
          I[O].unclosed = true;
          I[O].sourceEndIndex = v.length;
        }
        return I[0].nodes;
      };
    },
    2625: function (e) {
      function stringifyNode(e, t) {
        var r = e.type;
        var s = e.value;
        var n;
        var o;
        if (t && (o = t(e)) !== undefined) {
          return o;
        } else if (r === 'word' || r === 'space') {
          return s;
        } else if (r === 'string') {
          n = e.quote || '';
          return n + s + (e.unclosed ? '' : n);
        } else if (r === 'comment') {
          return '/*' + s + (e.unclosed ? '' : '*/');
        } else if (r === 'div') {
          return (e.before || '') + s + (e.after || '');
        } else if (Array.isArray(e.nodes)) {
          n = stringify(e.nodes, t);
          if (r !== 'function') {
            return n;
          }
          return (
            s +
            '(' +
            (e.before || '') +
            n +
            (e.after || '') +
            (e.unclosed ? '' : ')')
          );
        }
        return s;
      }
      function stringify(e, t) {
        var r, s;
        if (Array.isArray(e)) {
          r = '';
          for (s = e.length - 1; ~s; s -= 1) {
            r = stringifyNode(e[s], t) + r;
          }
          return r;
        }
        return stringifyNode(e, t);
      }
      e.exports = stringify;
    },
    8754: function (e) {
      var t = '-'.charCodeAt(0);
      var r = '+'.charCodeAt(0);
      var s = '.'.charCodeAt(0);
      var n = 'e'.charCodeAt(0);
      var o = 'E'.charCodeAt(0);
      function likeNumber(e) {
        var n = e.charCodeAt(0);
        var o;
        if (n === r || n === t) {
          o = e.charCodeAt(1);
          if (o >= 48 && o <= 57) {
            return true;
          }
          var i = e.charCodeAt(2);
          if (o === s && i >= 48 && i <= 57) {
            return true;
          }
          return false;
        }
        if (n === s) {
          o = e.charCodeAt(1);
          if (o >= 48 && o <= 57) {
            return true;
          }
          return false;
        }
        if (n >= 48 && n <= 57) {
          return true;
        }
        return false;
      }
      e.exports = function (e) {
        var i = 0;
        var a = e.length;
        var l;
        var u;
        var c;
        if (a === 0 || !likeNumber(e)) {
          return false;
        }
        l = e.charCodeAt(i);
        if (l === r || l === t) {
          i++;
        }
        while (i < a) {
          l = e.charCodeAt(i);
          if (l < 48 || l > 57) {
            break;
          }
          i += 1;
        }
        l = e.charCodeAt(i);
        u = e.charCodeAt(i + 1);
        if (l === s && u >= 48 && u <= 57) {
          i += 2;
          while (i < a) {
            l = e.charCodeAt(i);
            if (l < 48 || l > 57) {
              break;
            }
            i += 1;
          }
        }
        l = e.charCodeAt(i);
        u = e.charCodeAt(i + 1);
        c = e.charCodeAt(i + 2);
        if (
          (l === n || l === o) &&
          ((u >= 48 && u <= 57) || ((u === r || u === t) && c >= 48 && c <= 57))
        ) {
          i += u === r || u === t ? 3 : 2;
          while (i < a) {
            l = e.charCodeAt(i);
            if (l < 48 || l > 57) {
              break;
            }
            i += 1;
          }
        }
        return { number: e.slice(0, i), unit: e.slice(i) };
      };
    },
    7492: function (e) {
      e.exports = function walk(e, t, r) {
        var s, n, o, i;
        for (s = 0, n = e.length; s < n; s += 1) {
          o = e[s];
          if (!r) {
            i = t(o, s, e);
          }
          if (i !== false && o.type === 'function' && Array.isArray(o.nodes)) {
            walk(o.nodes, t, r);
          }
          if (r) {
            t(o, s, e);
          }
        }
      };
    },
    9782: function (e, t, r) {
      const s = Symbol('SemVer ANY');
      class Comparator {
        static get ANY() {
          return s;
        }
        constructor(e, t) {
          t = n(t);
          if (e instanceof Comparator) {
            if (e.loose === !!t.loose) {
              return e;
            } else {
              e = e.value;
            }
          }
          l('comparator', e, t);
          this.options = t;
          this.loose = !!t.loose;
          this.parse(e);
          if (this.semver === s) {
            this.value = '';
          } else {
            this.value = this.operator + this.semver.version;
          }
          l('comp', this);
        }
        parse(e) {
          const t = this.options.loose ? o[i.COMPARATORLOOSE] : o[i.COMPARATOR];
          const r = e.match(t);
          if (!r) {
            throw new TypeError(`Invalid comparator: ${e}`);
          }
          this.operator = r[1] !== undefined ? r[1] : '';
          if (this.operator === '=') {
            this.operator = '';
          }
          if (!r[2]) {
            this.semver = s;
          } else {
            this.semver = new u(r[2], this.options.loose);
          }
        }
        toString() {
          return this.value;
        }
        test(e) {
          l('Comparator.test', e, this.options.loose);
          if (this.semver === s || e === s) {
            return true;
          }
          if (typeof e === 'string') {
            try {
              e = new u(e, this.options);
            } catch (e) {
              return false;
            }
          }
          return a(e, this.operator, this.semver, this.options);
        }
        intersects(e, t) {
          if (!(e instanceof Comparator)) {
            throw new TypeError('a Comparator is required');
          }
          if (!t || typeof t !== 'object') {
            t = { loose: !!t, includePrerelease: false };
          }
          if (this.operator === '') {
            if (this.value === '') {
              return true;
            }
            return new c(e.value, t).test(this.value);
          } else if (e.operator === '') {
            if (e.value === '') {
              return true;
            }
            return new c(this.value, t).test(e.semver);
          }
          const r =
            (this.operator === '>=' || this.operator === '>') &&
            (e.operator === '>=' || e.operator === '>');
          const s =
            (this.operator === '<=' || this.operator === '<') &&
            (e.operator === '<=' || e.operator === '<');
          const n = this.semver.version === e.semver.version;
          const o =
            (this.operator === '>=' || this.operator === '<=') &&
            (e.operator === '>=' || e.operator === '<=');
          const i =
            a(this.semver, '<', e.semver, t) &&
            (this.operator === '>=' || this.operator === '>') &&
            (e.operator === '<=' || e.operator === '<');
          const l =
            a(this.semver, '>', e.semver, t) &&
            (this.operator === '<=' || this.operator === '<') &&
            (e.operator === '>=' || e.operator === '>');
          return r || s || (n && o) || i || l;
        }
      }
      e.exports = Comparator;
      const n = r(8724);
      const { re: o, t: i } = r(466);
      const a = r(8451);
      const l = r(5137);
      const u = r(1646);
      const c = r(8209);
    },
    8209: function (e, t, r) {
      class Range {
        constructor(e, t) {
          t = o(t);
          if (e instanceof Range) {
            if (
              e.loose === !!t.loose &&
              e.includePrerelease === !!t.includePrerelease
            ) {
              return e;
            } else {
              return new Range(e.raw, t);
            }
          }
          if (e instanceof i) {
            this.raw = e.value;
            this.set = [[e]];
            this.format();
            return this;
          }
          this.options = t;
          this.loose = !!t.loose;
          this.includePrerelease = !!t.includePrerelease;
          this.raw = e;
          this.set = e
            .split(/\s*\|\|\s*/)
            .map((e) => this.parseRange(e.trim()))
            .filter((e) => e.length);
          if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${e}`);
          }
          if (this.set.length > 1) {
            const e = this.set[0];
            this.set = this.set.filter((e) => !isNullSet(e[0]));
            if (this.set.length === 0) this.set = [e];
            else if (this.set.length > 1) {
              for (const e of this.set) {
                if (e.length === 1 && isAny(e[0])) {
                  this.set = [e];
                  break;
                }
              }
            }
          }
          this.format();
        }
        format() {
          this.range = this.set
            .map((e) => e.join(' ').trim())
            .join('||')
            .trim();
          return this.range;
        }
        toString() {
          return this.range;
        }
        parseRange(e) {
          e = e.trim();
          const t = Object.keys(this.options).join(',');
          const r = `parseRange:${t}:${e}`;
          const s = n.get(r);
          if (s) return s;
          const o = this.options.loose;
          const l = o ? u[c.HYPHENRANGELOOSE] : u[c.HYPHENRANGE];
          e = e.replace(l, hyphenReplace(this.options.includePrerelease));
          a('hyphen replace', e);
          e = e.replace(u[c.COMPARATORTRIM], f);
          a('comparator trim', e, u[c.COMPARATORTRIM]);
          e = e.replace(u[c.TILDETRIM], p);
          e = e.replace(u[c.CARETTRIM], h);
          e = e.split(/\s+/).join(' ');
          const d = o ? u[c.COMPARATORLOOSE] : u[c.COMPARATOR];
          const v = e
            .split(' ')
            .map((e) => parseComparator(e, this.options))
            .join(' ')
            .split(/\s+/)
            .map((e) => replaceGTE0(e, this.options))
            .filter(this.options.loose ? (e) => !!e.match(d) : () => true)
            .map((e) => new i(e, this.options));
          const m = v.length;
          const g = new Map();
          for (const e of v) {
            if (isNullSet(e)) return [e];
            g.set(e.value, e);
          }
          if (g.size > 1 && g.has('')) g.delete('');
          const _ = [...g.values()];
          n.set(r, _);
          return _;
        }
        intersects(e, t) {
          if (!(e instanceof Range)) {
            throw new TypeError('a Range is required');
          }
          return this.set.some(
            (r) =>
              isSatisfiable(r, t) &&
              e.set.some(
                (e) =>
                  isSatisfiable(e, t) &&
                  r.every((r) => e.every((e) => r.intersects(e, t))),
              ),
          );
        }
        test(e) {
          if (!e) {
            return false;
          }
          if (typeof e === 'string') {
            try {
              e = new l(e, this.options);
            } catch (e) {
              return false;
            }
          }
          for (let t = 0; t < this.set.length; t++) {
            if (testSet(this.set[t], e, this.options)) {
              return true;
            }
          }
          return false;
        }
      }
      e.exports = Range;
      const s = r(155);
      const n = new s({ max: 1e3 });
      const o = r(8724);
      const i = r(9782);
      const a = r(5137);
      const l = r(1646);
      const {
        re: u,
        t: c,
        comparatorTrimReplace: f,
        tildeTrimReplace: p,
        caretTrimReplace: h,
      } = r(466);
      const isNullSet = (e) => e.value === '<0.0.0-0';
      const isAny = (e) => e.value === '';
      const isSatisfiable = (e, t) => {
        let r = true;
        const s = e.slice();
        let n = s.pop();
        while (r && s.length) {
          r = s.every((e) => n.intersects(e, t));
          n = s.pop();
        }
        return r;
      };
      const parseComparator = (e, t) => {
        a('comp', e, t);
        e = replaceCarets(e, t);
        a('caret', e);
        e = replaceTildes(e, t);
        a('tildes', e);
        e = replaceXRanges(e, t);
        a('xrange', e);
        e = replaceStars(e, t);
        a('stars', e);
        return e;
      };
      const isX = (e) => !e || e.toLowerCase() === 'x' || e === '*';
      const replaceTildes = (e, t) =>
        e
          .trim()
          .split(/\s+/)
          .map((e) => replaceTilde(e, t))
          .join(' ');
      const replaceTilde = (e, t) => {
        const r = t.loose ? u[c.TILDELOOSE] : u[c.TILDE];
        return e.replace(r, (t, r, s, n, o) => {
          a('tilde', e, t, r, s, n, o);
          let i;
          if (isX(r)) {
            i = '';
          } else if (isX(s)) {
            i = `>=${r}.0.0 <${+r + 1}.0.0-0`;
          } else if (isX(n)) {
            i = `>=${r}.${s}.0 <${r}.${+s + 1}.0-0`;
          } else if (o) {
            a('replaceTilde pr', o);
            i = `>=${r}.${s}.${n}-${o} <${r}.${+s + 1}.0-0`;
          } else {
            i = `>=${r}.${s}.${n} <${r}.${+s + 1}.0-0`;
          }
          a('tilde return', i);
          return i;
        });
      };
      const replaceCarets = (e, t) =>
        e
          .trim()
          .split(/\s+/)
          .map((e) => replaceCaret(e, t))
          .join(' ');
      const replaceCaret = (e, t) => {
        a('caret', e, t);
        const r = t.loose ? u[c.CARETLOOSE] : u[c.CARET];
        const s = t.includePrerelease ? '-0' : '';
        return e.replace(r, (t, r, n, o, i) => {
          a('caret', e, t, r, n, o, i);
          let l;
          if (isX(r)) {
            l = '';
          } else if (isX(n)) {
            l = `>=${r}.0.0${s} <${+r + 1}.0.0-0`;
          } else if (isX(o)) {
            if (r === '0') {
              l = `>=${r}.${n}.0${s} <${r}.${+n + 1}.0-0`;
            } else {
              l = `>=${r}.${n}.0${s} <${+r + 1}.0.0-0`;
            }
          } else if (i) {
            a('replaceCaret pr', i);
            if (r === '0') {
              if (n === '0') {
                l = `>=${r}.${n}.${o}-${i} <${r}.${n}.${+o + 1}-0`;
              } else {
                l = `>=${r}.${n}.${o}-${i} <${r}.${+n + 1}.0-0`;
              }
            } else {
              l = `>=${r}.${n}.${o}-${i} <${+r + 1}.0.0-0`;
            }
          } else {
            a('no pr');
            if (r === '0') {
              if (n === '0') {
                l = `>=${r}.${n}.${o}${s} <${r}.${n}.${+o + 1}-0`;
              } else {
                l = `>=${r}.${n}.${o}${s} <${r}.${+n + 1}.0-0`;
              }
            } else {
              l = `>=${r}.${n}.${o} <${+r + 1}.0.0-0`;
            }
          }
          a('caret return', l);
          return l;
        });
      };
      const replaceXRanges = (e, t) => {
        a('replaceXRanges', e, t);
        return e
          .split(/\s+/)
          .map((e) => replaceXRange(e, t))
          .join(' ');
      };
      const replaceXRange = (e, t) => {
        e = e.trim();
        const r = t.loose ? u[c.XRANGELOOSE] : u[c.XRANGE];
        return e.replace(r, (r, s, n, o, i, l) => {
          a('xRange', e, r, s, n, o, i, l);
          const u = isX(n);
          const c = u || isX(o);
          const f = c || isX(i);
          const p = f;
          if (s === '=' && p) {
            s = '';
          }
          l = t.includePrerelease ? '-0' : '';
          if (u) {
            if (s === '>' || s === '<') {
              r = '<0.0.0-0';
            } else {
              r = '*';
            }
          } else if (s && p) {
            if (c) {
              o = 0;
            }
            i = 0;
            if (s === '>') {
              s = '>=';
              if (c) {
                n = +n + 1;
                o = 0;
                i = 0;
              } else {
                o = +o + 1;
                i = 0;
              }
            } else if (s === '<=') {
              s = '<';
              if (c) {
                n = +n + 1;
              } else {
                o = +o + 1;
              }
            }
            if (s === '<') l = '-0';
            r = `${s + n}.${o}.${i}${l}`;
          } else if (c) {
            r = `>=${n}.0.0${l} <${+n + 1}.0.0-0`;
          } else if (f) {
            r = `>=${n}.${o}.0${l} <${n}.${+o + 1}.0-0`;
          }
          a('xRange return', r);
          return r;
        });
      };
      const replaceStars = (e, t) => {
        a('replaceStars', e, t);
        return e.trim().replace(u[c.STAR], '');
      };
      const replaceGTE0 = (e, t) => {
        a('replaceGTE0', e, t);
        return e
          .trim()
          .replace(u[t.includePrerelease ? c.GTE0PRE : c.GTE0], '');
      };
      const hyphenReplace = (e) => (t, r, s, n, o, i, a, l, u, c, f, p, h) => {
        if (isX(s)) {
          r = '';
        } else if (isX(n)) {
          r = `>=${s}.0.0${e ? '-0' : ''}`;
        } else if (isX(o)) {
          r = `>=${s}.${n}.0${e ? '-0' : ''}`;
        } else if (i) {
          r = `>=${r}`;
        } else {
          r = `>=${r}${e ? '-0' : ''}`;
        }
        if (isX(u)) {
          l = '';
        } else if (isX(c)) {
          l = `<${+u + 1}.0.0-0`;
        } else if (isX(f)) {
          l = `<${u}.${+c + 1}.0-0`;
        } else if (p) {
          l = `<=${u}.${c}.${f}-${p}`;
        } else if (e) {
          l = `<${u}.${c}.${+f + 1}-0`;
        } else {
          l = `<=${l}`;
        }
        return `${r} ${l}`.trim();
      };
      const testSet = (e, t, r) => {
        for (let r = 0; r < e.length; r++) {
          if (!e[r].test(t)) {
            return false;
          }
        }
        if (t.prerelease.length && !r.includePrerelease) {
          for (let r = 0; r < e.length; r++) {
            a(e[r].semver);
            if (e[r].semver === i.ANY) {
              continue;
            }
            if (e[r].semver.prerelease.length > 0) {
              const s = e[r].semver;
              if (
                s.major === t.major &&
                s.minor === t.minor &&
                s.patch === t.patch
              ) {
                return true;
              }
            }
          }
          return false;
        }
        return true;
      };
    },
    1646: function (e, t, r) {
      const s = r(5137);
      const { MAX_LENGTH: n, MAX_SAFE_INTEGER: o } = r(7814);
      const { re: i, t: a } = r(466);
      const l = r(8724);
      const { compareIdentifiers: u } = r(1666);
      class SemVer {
        constructor(e, t) {
          t = l(t);
          if (e instanceof SemVer) {
            if (
              e.loose === !!t.loose &&
              e.includePrerelease === !!t.includePrerelease
            ) {
              return e;
            } else {
              e = e.version;
            }
          } else if (typeof e !== 'string') {
            throw new TypeError(`Invalid Version: ${e}`);
          }
          if (e.length > n) {
            throw new TypeError(`version is longer than ${n} characters`);
          }
          s('SemVer', e, t);
          this.options = t;
          this.loose = !!t.loose;
          this.includePrerelease = !!t.includePrerelease;
          const r = e.trim().match(t.loose ? i[a.LOOSE] : i[a.FULL]);
          if (!r) {
            throw new TypeError(`Invalid Version: ${e}`);
          }
          this.raw = e;
          this.major = +r[1];
          this.minor = +r[2];
          this.patch = +r[3];
          if (this.major > o || this.major < 0) {
            throw new TypeError('Invalid major version');
          }
          if (this.minor > o || this.minor < 0) {
            throw new TypeError('Invalid minor version');
          }
          if (this.patch > o || this.patch < 0) {
            throw new TypeError('Invalid patch version');
          }
          if (!r[4]) {
            this.prerelease = [];
          } else {
            this.prerelease = r[4].split('.').map((e) => {
              if (/^[0-9]+$/.test(e)) {
                const t = +e;
                if (t >= 0 && t < o) {
                  return t;
                }
              }
              return e;
            });
          }
          this.build = r[5] ? r[5].split('.') : [];
          this.format();
        }
        format() {
          this.version = `${this.major}.${this.minor}.${this.patch}`;
          if (this.prerelease.length) {
            this.version += `-${this.prerelease.join('.')}`;
          }
          return this.version;
        }
        toString() {
          return this.version;
        }
        compare(e) {
          s('SemVer.compare', this.version, this.options, e);
          if (!(e instanceof SemVer)) {
            if (typeof e === 'string' && e === this.version) {
              return 0;
            }
            e = new SemVer(e, this.options);
          }
          if (e.version === this.version) {
            return 0;
          }
          return this.compareMain(e) || this.comparePre(e);
        }
        compareMain(e) {
          if (!(e instanceof SemVer)) {
            e = new SemVer(e, this.options);
          }
          return (
            u(this.major, e.major) ||
            u(this.minor, e.minor) ||
            u(this.patch, e.patch)
          );
        }
        comparePre(e) {
          if (!(e instanceof SemVer)) {
            e = new SemVer(e, this.options);
          }
          if (this.prerelease.length && !e.prerelease.length) {
            return -1;
          } else if (!this.prerelease.length && e.prerelease.length) {
            return 1;
          } else if (!this.prerelease.length && !e.prerelease.length) {
            return 0;
          }
          let t = 0;
          do {
            const r = this.prerelease[t];
            const n = e.prerelease[t];
            s('prerelease compare', t, r, n);
            if (r === undefined && n === undefined) {
              return 0;
            } else if (n === undefined) {
              return 1;
            } else if (r === undefined) {
              return -1;
            } else if (r === n) {
              continue;
            } else {
              return u(r, n);
            }
          } while (++t);
        }
        compareBuild(e) {
          if (!(e instanceof SemVer)) {
            e = new SemVer(e, this.options);
          }
          let t = 0;
          do {
            const r = this.build[t];
            const n = e.build[t];
            s('prerelease compare', t, r, n);
            if (r === undefined && n === undefined) {
              return 0;
            } else if (n === undefined) {
              return 1;
            } else if (r === undefined) {
              return -1;
            } else if (r === n) {
              continue;
            } else {
              return u(r, n);
            }
          } while (++t);
        }
        inc(e, t) {
          switch (e) {
            case 'premajor':
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor = 0;
              this.major++;
              this.inc('pre', t);
              break;
            case 'preminor':
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor++;
              this.inc('pre', t);
              break;
            case 'prepatch':
              this.prerelease.length = 0;
              this.inc('patch', t);
              this.inc('pre', t);
              break;
            case 'prerelease':
              if (this.prerelease.length === 0) {
                this.inc('patch', t);
              }
              this.inc('pre', t);
              break;
            case 'major':
              if (
                this.minor !== 0 ||
                this.patch !== 0 ||
                this.prerelease.length === 0
              ) {
                this.major++;
              }
              this.minor = 0;
              this.patch = 0;
              this.prerelease = [];
              break;
            case 'minor':
              if (this.patch !== 0 || this.prerelease.length === 0) {
                this.minor++;
              }
              this.patch = 0;
              this.prerelease = [];
              break;
            case 'patch':
              if (this.prerelease.length === 0) {
                this.patch++;
              }
              this.prerelease = [];
              break;
            case 'pre':
              if (this.prerelease.length === 0) {
                this.prerelease = [0];
              } else {
                let e = this.prerelease.length;
                while (--e >= 0) {
                  if (typeof this.prerelease[e] === 'number') {
                    this.prerelease[e]++;
                    e = -2;
                  }
                }
                if (e === -1) {
                  this.prerelease.push(0);
                }
              }
              if (t) {
                if (this.prerelease[0] === t) {
                  if (isNaN(this.prerelease[1])) {
                    this.prerelease = [t, 0];
                  }
                } else {
                  this.prerelease = [t, 0];
                }
              }
              break;
            default:
              throw new Error(`invalid increment argument: ${e}`);
          }
          this.format();
          this.raw = this.version;
          return this;
        }
      }
      e.exports = SemVer;
    },
    5082: function (e, t, r) {
      const s = r(2743);
      const clean = (e, t) => {
        const r = s(e.trim().replace(/^[=v]+/, ''), t);
        return r ? r.version : null;
      };
      e.exports = clean;
    },
    8451: function (e, t, r) {
      const s = r(8344);
      const n = r(6352);
      const o = r(138);
      const i = r(6382);
      const a = r(4876);
      const l = r(2826);
      const cmp = (e, t, r, u) => {
        switch (t) {
          case '===':
            if (typeof e === 'object') e = e.version;
            if (typeof r === 'object') r = r.version;
            return e === r;
          case '!==':
            if (typeof e === 'object') e = e.version;
            if (typeof r === 'object') r = r.version;
            return e !== r;
          case '':
          case '=':
          case '==':
            return s(e, r, u);
          case '!=':
            return n(e, r, u);
          case '>':
            return o(e, r, u);
          case '>=':
            return i(e, r, u);
          case '<':
            return a(e, r, u);
          case '<=':
            return l(e, r, u);
          default:
            throw new TypeError(`Invalid operator: ${t}`);
        }
      };
      e.exports = cmp;
    },
    1102: function (e, t, r) {
      const s = r(1646);
      const n = r(2743);
      const { re: o, t: i } = r(466);
      const coerce = (e, t) => {
        if (e instanceof s) {
          return e;
        }
        if (typeof e === 'number') {
          e = String(e);
        }
        if (typeof e !== 'string') {
          return null;
        }
        t = t || {};
        let r = null;
        if (!t.rtl) {
          r = e.match(o[i.COERCE]);
        } else {
          let t;
          while (
            (t = o[i.COERCERTL].exec(e)) &&
            (!r || r.index + r[0].length !== e.length)
          ) {
            if (!r || t.index + t[0].length !== r.index + r[0].length) {
              r = t;
            }
            o[i.COERCERTL].lastIndex = t.index + t[1].length + t[2].length;
          }
          o[i.COERCERTL].lastIndex = -1;
        }
        if (r === null) return null;
        return n(`${r[2]}.${r[3] || '0'}.${r[4] || '0'}`, t);
      };
      e.exports = coerce;
    },
    371: function (e, t, r) {
      const s = r(1646);
      const compareBuild = (e, t, r) => {
        const n = new s(e, r);
        const o = new s(t, r);
        return n.compare(o) || n.compareBuild(o);
      };
      e.exports = compareBuild;
    },
    7580: function (e, t, r) {
      const s = r(9538);
      const compareLoose = (e, t) => s(e, t, true);
      e.exports = compareLoose;
    },
    9538: function (e, t, r) {
      const s = r(1646);
      const compare = (e, t, r) => new s(e, r).compare(new s(t, r));
      e.exports = compare;
    },
    8052: function (e, t, r) {
      const s = r(2743);
      const n = r(8344);
      const diff = (e, t) => {
        if (n(e, t)) {
          return null;
        } else {
          const r = s(e);
          const n = s(t);
          const o = r.prerelease.length || n.prerelease.length;
          const i = o ? 'pre' : '';
          const a = o ? 'prerelease' : '';
          for (const e in r) {
            if (e === 'major' || e === 'minor' || e === 'patch') {
              if (r[e] !== n[e]) {
                return i + e;
              }
            }
          }
          return a;
        }
      };
      e.exports = diff;
    },
    8344: function (e, t, r) {
      const s = r(9538);
      const eq = (e, t, r) => s(e, t, r) === 0;
      e.exports = eq;
    },
    138: function (e, t, r) {
      const s = r(9538);
      const gt = (e, t, r) => s(e, t, r) > 0;
      e.exports = gt;
    },
    6382: function (e, t, r) {
      const s = r(9538);
      const gte = (e, t, r) => s(e, t, r) >= 0;
      e.exports = gte;
    },
    6495: function (e, t, r) {
      const s = r(1646);
      const inc = (e, t, r, n) => {
        if (typeof r === 'string') {
          n = r;
          r = undefined;
        }
        try {
          return new s(e, r).inc(t, n).version;
        } catch (e) {
          return null;
        }
      };
      e.exports = inc;
    },
    4876: function (e, t, r) {
      const s = r(9538);
      const lt = (e, t, r) => s(e, t, r) < 0;
      e.exports = lt;
    },
    2826: function (e, t, r) {
      const s = r(9538);
      const lte = (e, t, r) => s(e, t, r) <= 0;
      e.exports = lte;
    },
    3560: function (e, t, r) {
      const s = r(1646);
      const major = (e, t) => new s(e, t).major;
      e.exports = major;
    },
    2092: function (e, t, r) {
      const s = r(1646);
      const minor = (e, t) => new s(e, t).minor;
      e.exports = minor;
    },
    6352: function (e, t, r) {
      const s = r(9538);
      const neq = (e, t, r) => s(e, t, r) !== 0;
      e.exports = neq;
    },
    2743: function (e, t, r) {
      const { MAX_LENGTH: s } = r(7814);
      const { re: n, t: o } = r(466);
      const i = r(1646);
      const a = r(8724);
      const parse = (e, t) => {
        t = a(t);
        if (e instanceof i) {
          return e;
        }
        if (typeof e !== 'string') {
          return null;
        }
        if (e.length > s) {
          return null;
        }
        const r = t.loose ? n[o.LOOSE] : n[o.FULL];
        if (!r.test(e)) {
          return null;
        }
        try {
          return new i(e, t);
        } catch (e) {
          return null;
        }
      };
      e.exports = parse;
    },
    5677: function (e, t, r) {
      const s = r(1646);
      const patch = (e, t) => new s(e, t).patch;
      e.exports = patch;
    },
    7298: function (e, t, r) {
      const s = r(2743);
      const prerelease = (e, t) => {
        const r = s(e, t);
        return r && r.prerelease.length ? r.prerelease : null;
      };
      e.exports = prerelease;
    },
    8764: function (e, t, r) {
      const s = r(9538);
      const rcompare = (e, t, r) => s(t, e, r);
      e.exports = rcompare;
    },
    9926: function (e, t, r) {
      const s = r(371);
      const rsort = (e, t) => e.sort((e, r) => s(r, e, t));
      e.exports = rsort;
    },
    5377: function (e, t, r) {
      const s = r(8209);
      const satisfies = (e, t, r) => {
        try {
          t = new s(t, r);
        } catch (e) {
          return false;
        }
        return t.test(e);
      };
      e.exports = satisfies;
    },
    2714: function (e, t, r) {
      const s = r(371);
      const sort = (e, t) => e.sort((e, r) => s(e, r, t));
      e.exports = sort;
    },
    9118: function (e, t, r) {
      const s = r(2743);
      const valid = (e, t) => {
        const r = s(e, t);
        return r ? r.version : null;
      };
      e.exports = valid;
    },
    1621: function (e, t, r) {
      const s = r(466);
      e.exports = {
        re: s.re,
        src: s.src,
        tokens: s.t,
        SEMVER_SPEC_VERSION: r(7814).SEMVER_SPEC_VERSION,
        SemVer: r(1646),
        compareIdentifiers: r(1666).compareIdentifiers,
        rcompareIdentifiers: r(1666).rcompareIdentifiers,
        parse: r(2743),
        valid: r(9118),
        clean: r(5082),
        inc: r(6495),
        diff: r(8052),
        major: r(3560),
        minor: r(2092),
        patch: r(5677),
        prerelease: r(7298),
        compare: r(9538),
        rcompare: r(8764),
        compareLoose: r(7580),
        compareBuild: r(371),
        sort: r(2714),
        rsort: r(9926),
        gt: r(138),
        lt: r(4876),
        eq: r(8344),
        neq: r(6352),
        gte: r(6382),
        lte: r(2826),
        cmp: r(8451),
        coerce: r(1102),
        Comparator: r(9782),
        Range: r(8209),
        satisfies: r(5377),
        toComparators: r(3716),
        maxSatisfying: r(4621),
        minSatisfying: r(5143),
        minVersion: r(9383),
        validRange: r(8147),
        outside: r(2191),
        gtr: r(1341),
        ltr: r(4215),
        intersects: r(5660),
        simplifyRange: r(6309),
        subset: r(4696),
      };
    },
    7814: function (e) {
      const t = '2.0.0';
      const r = 256;
      const s = Number.MAX_SAFE_INTEGER || 9007199254740991;
      const n = 16;
      e.exports = {
        SEMVER_SPEC_VERSION: t,
        MAX_LENGTH: r,
        MAX_SAFE_INTEGER: s,
        MAX_SAFE_COMPONENT_LENGTH: n,
      };
    },
    5137: function (e) {
      const t =
        typeof process === 'object' &&
        process.env &&
        process.env.NODE_DEBUG &&
        /\bsemver\b/i.test(process.env.NODE_DEBUG)
          ? (...e) => console.error('SEMVER', ...e)
          : () => {};
      e.exports = t;
    },
    1666: function (e) {
      const t = /^[0-9]+$/;
      const compareIdentifiers = (e, r) => {
        const s = t.test(e);
        const n = t.test(r);
        if (s && n) {
          e = +e;
          r = +r;
        }
        return e === r ? 0 : s && !n ? -1 : n && !s ? 1 : e < r ? -1 : 1;
      };
      const rcompareIdentifiers = (e, t) => compareIdentifiers(t, e);
      e.exports = {
        compareIdentifiers: compareIdentifiers,
        rcompareIdentifiers: rcompareIdentifiers,
      };
    },
    8724: function (e) {
      const t = ['includePrerelease', 'loose', 'rtl'];
      const parseOptions = (e) =>
        !e
          ? {}
          : typeof e !== 'object'
          ? { loose: true }
          : t
              .filter((t) => e[t])
              .reduce((e, t) => {
                e[t] = true;
                return e;
              }, {});
      e.exports = parseOptions;
    },
    466: function (e, t, r) {
      const { MAX_SAFE_COMPONENT_LENGTH: s } = r(7814);
      const n = r(5137);
      t = e.exports = {};
      const o = (t.re = []);
      const i = (t.src = []);
      const a = (t.t = {});
      let l = 0;
      const createToken = (e, t, r) => {
        const s = l++;
        n(s, t);
        a[e] = s;
        i[s] = t;
        o[s] = new RegExp(t, r ? 'g' : undefined);
      };
      createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
      createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');
      createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');
      createToken(
        'MAINVERSION',
        `(${i[a.NUMERICIDENTIFIER]})\\.` +
          `(${i[a.NUMERICIDENTIFIER]})\\.` +
          `(${i[a.NUMERICIDENTIFIER]})`,
      );
      createToken(
        'MAINVERSIONLOOSE',
        `(${i[a.NUMERICIDENTIFIERLOOSE]})\\.` +
          `(${i[a.NUMERICIDENTIFIERLOOSE]})\\.` +
          `(${i[a.NUMERICIDENTIFIERLOOSE]})`,
      );
      createToken(
        'PRERELEASEIDENTIFIER',
        `(?:${i[a.NUMERICIDENTIFIER]}|${i[a.NONNUMERICIDENTIFIER]})`,
      );
      createToken(
        'PRERELEASEIDENTIFIERLOOSE',
        `(?:${i[a.NUMERICIDENTIFIERLOOSE]}|${i[a.NONNUMERICIDENTIFIER]})`,
      );
      createToken(
        'PRERELEASE',
        `(?:-(${i[a.PRERELEASEIDENTIFIER]}(?:\\.${
          i[a.PRERELEASEIDENTIFIER]
        })*))`,
      );
      createToken(
        'PRERELEASELOOSE',
        `(?:-?(${i[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${
          i[a.PRERELEASEIDENTIFIERLOOSE]
        })*))`,
      );
      createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');
      createToken(
        'BUILD',
        `(?:\\+(${i[a.BUILDIDENTIFIER]}(?:\\.${i[a.BUILDIDENTIFIER]})*))`,
      );
      createToken(
        'FULLPLAIN',
        `v?${i[a.MAINVERSION]}${i[a.PRERELEASE]}?${i[a.BUILD]}?`,
      );
      createToken('FULL', `^${i[a.FULLPLAIN]}$`);
      createToken(
        'LOOSEPLAIN',
        `[v=\\s]*${i[a.MAINVERSIONLOOSE]}${i[a.PRERELEASELOOSE]}?${
          i[a.BUILD]
        }?`,
      );
      createToken('LOOSE', `^${i[a.LOOSEPLAIN]}$`);
      createToken('GTLT', '((?:<|>)?=?)');
      createToken(
        'XRANGEIDENTIFIERLOOSE',
        `${i[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`,
      );
      createToken('XRANGEIDENTIFIER', `${i[a.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken(
        'XRANGEPLAIN',
        `[v=\\s]*(${i[a.XRANGEIDENTIFIER]})` +
          `(?:\\.(${i[a.XRANGEIDENTIFIER]})` +
          `(?:\\.(${i[a.XRANGEIDENTIFIER]})` +
          `(?:${i[a.PRERELEASE]})?${i[a.BUILD]}?` +
          `)?)?`,
      );
      createToken(
        'XRANGEPLAINLOOSE',
        `[v=\\s]*(${i[a.XRANGEIDENTIFIERLOOSE]})` +
          `(?:\\.(${i[a.XRANGEIDENTIFIERLOOSE]})` +
          `(?:\\.(${i[a.XRANGEIDENTIFIERLOOSE]})` +
          `(?:${i[a.PRERELEASELOOSE]})?${i[a.BUILD]}?` +
          `)?)?`,
      );
      createToken('XRANGE', `^${i[a.GTLT]}\\s*${i[a.XRANGEPLAIN]}$`);
      createToken('XRANGELOOSE', `^${i[a.GTLT]}\\s*${i[a.XRANGEPLAINLOOSE]}$`);
      createToken(
        'COERCE',
        `${'(^|[^\\d])' + '(\\d{1,'}${s}})` +
          `(?:\\.(\\d{1,${s}}))?` +
          `(?:\\.(\\d{1,${s}}))?` +
          `(?:$|[^\\d])`,
      );
      createToken('COERCERTL', i[a.COERCE], true);
      createToken('LONETILDE', '(?:~>?)');
      createToken('TILDETRIM', `(\\s*)${i[a.LONETILDE]}\\s+`, true);
      t.tildeTrimReplace = '$1~';
      createToken('TILDE', `^${i[a.LONETILDE]}${i[a.XRANGEPLAIN]}$`);
      createToken('TILDELOOSE', `^${i[a.LONETILDE]}${i[a.XRANGEPLAINLOOSE]}$`);
      createToken('LONECARET', '(?:\\^)');
      createToken('CARETTRIM', `(\\s*)${i[a.LONECARET]}\\s+`, true);
      t.caretTrimReplace = '$1^';
      createToken('CARET', `^${i[a.LONECARET]}${i[a.XRANGEPLAIN]}$`);
      createToken('CARETLOOSE', `^${i[a.LONECARET]}${i[a.XRANGEPLAINLOOSE]}$`);
      createToken(
        'COMPARATORLOOSE',
        `^${i[a.GTLT]}\\s*(${i[a.LOOSEPLAIN]})$|^$`,
      );
      createToken('COMPARATOR', `^${i[a.GTLT]}\\s*(${i[a.FULLPLAIN]})$|^$`);
      createToken(
        'COMPARATORTRIM',
        `(\\s*)${i[a.GTLT]}\\s*(${i[a.LOOSEPLAIN]}|${i[a.XRANGEPLAIN]})`,
        true,
      );
      t.comparatorTrimReplace = '$1$2$3';
      createToken(
        'HYPHENRANGE',
        `^\\s*(${i[a.XRANGEPLAIN]})` +
          `\\s+-\\s+` +
          `(${i[a.XRANGEPLAIN]})` +
          `\\s*$`,
      );
      createToken(
        'HYPHENRANGELOOSE',
        `^\\s*(${i[a.XRANGEPLAINLOOSE]})` +
          `\\s+-\\s+` +
          `(${i[a.XRANGEPLAINLOOSE]})` +
          `\\s*$`,
      );
      createToken('STAR', '(<|>)?=?\\s*\\*');
      createToken('GTE0', '^\\s*>=\\s*0.0.0\\s*$');
      createToken('GTE0PRE', '^\\s*>=\\s*0.0.0-0\\s*$');
    },
    1341: function (e, t, r) {
      const s = r(2191);
      const gtr = (e, t, r) => s(e, t, '>', r);
      e.exports = gtr;
    },
    5660: function (e, t, r) {
      const s = r(8209);
      const intersects = (e, t, r) => {
        e = new s(e, r);
        t = new s(t, r);
        return e.intersects(t);
      };
      e.exports = intersects;
    },
    4215: function (e, t, r) {
      const s = r(2191);
      const ltr = (e, t, r) => s(e, t, '<', r);
      e.exports = ltr;
    },
    4621: function (e, t, r) {
      const s = r(1646);
      const n = r(8209);
      const maxSatisfying = (e, t, r) => {
        let o = null;
        let i = null;
        let a = null;
        try {
          a = new n(t, r);
        } catch (e) {
          return null;
        }
        e.forEach((e) => {
          if (a.test(e)) {
            if (!o || i.compare(e) === -1) {
              o = e;
              i = new s(o, r);
            }
          }
        });
        return o;
      };
      e.exports = maxSatisfying;
    },
    5143: function (e, t, r) {
      const s = r(1646);
      const n = r(8209);
      const minSatisfying = (e, t, r) => {
        let o = null;
        let i = null;
        let a = null;
        try {
          a = new n(t, r);
        } catch (e) {
          return null;
        }
        e.forEach((e) => {
          if (a.test(e)) {
            if (!o || i.compare(e) === 1) {
              o = e;
              i = new s(o, r);
            }
          }
        });
        return o;
      };
      e.exports = minSatisfying;
    },
    9383: function (e, t, r) {
      const s = r(1646);
      const n = r(8209);
      const o = r(138);
      const minVersion = (e, t) => {
        e = new n(e, t);
        let r = new s('0.0.0');
        if (e.test(r)) {
          return r;
        }
        r = new s('0.0.0-0');
        if (e.test(r)) {
          return r;
        }
        r = null;
        for (let t = 0; t < e.set.length; ++t) {
          const n = e.set[t];
          let i = null;
          n.forEach((e) => {
            const t = new s(e.semver.version);
            switch (e.operator) {
              case '>':
                if (t.prerelease.length === 0) {
                  t.patch++;
                } else {
                  t.prerelease.push(0);
                }
                t.raw = t.format();
              case '':
              case '>=':
                if (!i || o(t, i)) {
                  i = t;
                }
                break;
              case '<':
              case '<=':
                break;
              default:
                throw new Error(`Unexpected operation: ${e.operator}`);
            }
          });
          if (i && (!r || o(r, i))) r = i;
        }
        if (r && e.test(r)) {
          return r;
        }
        return null;
      };
      e.exports = minVersion;
    },
    2191: function (e, t, r) {
      const s = r(1646);
      const n = r(9782);
      const { ANY: o } = n;
      const i = r(8209);
      const a = r(5377);
      const l = r(138);
      const u = r(4876);
      const c = r(2826);
      const f = r(6382);
      const outside = (e, t, r, p) => {
        e = new s(e, p);
        t = new i(t, p);
        let h, d, v, m, g;
        switch (r) {
          case '>':
            h = l;
            d = c;
            v = u;
            m = '>';
            g = '>=';
            break;
          case '<':
            h = u;
            d = f;
            v = l;
            m = '<';
            g = '<=';
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (a(e, t, p)) {
          return false;
        }
        for (let r = 0; r < t.set.length; ++r) {
          const s = t.set[r];
          let i = null;
          let a = null;
          s.forEach((e) => {
            if (e.semver === o) {
              e = new n('>=0.0.0');
            }
            i = i || e;
            a = a || e;
            if (h(e.semver, i.semver, p)) {
              i = e;
            } else if (v(e.semver, a.semver, p)) {
              a = e;
            }
          });
          if (i.operator === m || i.operator === g) {
            return false;
          }
          if ((!a.operator || a.operator === m) && d(e, a.semver)) {
            return false;
          } else if (a.operator === g && v(e, a.semver)) {
            return false;
          }
        }
        return true;
      };
      e.exports = outside;
    },
    6309: function (e, t, r) {
      const s = r(5377);
      const n = r(9538);
      e.exports = (e, t, r) => {
        const o = [];
        let i = null;
        let a = null;
        const l = e.sort((e, t) => n(e, t, r));
        for (const e of l) {
          const n = s(e, t, r);
          if (n) {
            a = e;
            if (!i) i = e;
          } else {
            if (a) {
              o.push([i, a]);
            }
            a = null;
            i = null;
          }
        }
        if (i) o.push([i, null]);
        const u = [];
        for (const [e, t] of o) {
          if (e === t) u.push(e);
          else if (!t && e === l[0]) u.push('*');
          else if (!t) u.push(`>=${e}`);
          else if (e === l[0]) u.push(`<=${t}`);
          else u.push(`${e} - ${t}`);
        }
        const c = u.join(' || ');
        const f = typeof t.raw === 'string' ? t.raw : String(t);
        return c.length < f.length ? c : t;
      };
    },
    4696: function (e, t, r) {
      const s = r(8209);
      const n = r(9782);
      const { ANY: o } = n;
      const i = r(5377);
      const a = r(9538);
      const subset = (e, t, r = {}) => {
        if (e === t) return true;
        e = new s(e, r);
        t = new s(t, r);
        let n = false;
        e: for (const s of e.set) {
          for (const e of t.set) {
            const t = simpleSubset(s, e, r);
            n = n || t !== null;
            if (t) continue e;
          }
          if (n) return false;
        }
        return true;
      };
      const simpleSubset = (e, t, r) => {
        if (e === t) return true;
        if (e.length === 1 && e[0].semver === o) {
          if (t.length === 1 && t[0].semver === o) return true;
          else if (r.includePrerelease) e = [new n('>=0.0.0-0')];
          else e = [new n('>=0.0.0')];
        }
        if (t.length === 1 && t[0].semver === o) {
          if (r.includePrerelease) return true;
          else t = [new n('>=0.0.0')];
        }
        const s = new Set();
        let l, u;
        for (const t of e) {
          if (t.operator === '>' || t.operator === '>=') l = higherGT(l, t, r);
          else if (t.operator === '<' || t.operator === '<=')
            u = lowerLT(u, t, r);
          else s.add(t.semver);
        }
        if (s.size > 1) return null;
        let c;
        if (l && u) {
          c = a(l.semver, u.semver, r);
          if (c > 0) return null;
          else if (c === 0 && (l.operator !== '>=' || u.operator !== '<='))
            return null;
        }
        for (const e of s) {
          if (l && !i(e, String(l), r)) return null;
          if (u && !i(e, String(u), r)) return null;
          for (const s of t) {
            if (!i(e, String(s), r)) return false;
          }
          return true;
        }
        let f, p;
        let h, d;
        let v =
          u && !r.includePrerelease && u.semver.prerelease.length
            ? u.semver
            : false;
        let m =
          l && !r.includePrerelease && l.semver.prerelease.length
            ? l.semver
            : false;
        if (
          v &&
          v.prerelease.length === 1 &&
          u.operator === '<' &&
          v.prerelease[0] === 0
        ) {
          v = false;
        }
        for (const e of t) {
          d = d || e.operator === '>' || e.operator === '>=';
          h = h || e.operator === '<' || e.operator === '<=';
          if (l) {
            if (m) {
              if (
                e.semver.prerelease &&
                e.semver.prerelease.length &&
                e.semver.major === m.major &&
                e.semver.minor === m.minor &&
                e.semver.patch === m.patch
              ) {
                m = false;
              }
            }
            if (e.operator === '>' || e.operator === '>=') {
              f = higherGT(l, e, r);
              if (f === e && f !== l) return false;
            } else if (l.operator === '>=' && !i(l.semver, String(e), r))
              return false;
          }
          if (u) {
            if (v) {
              if (
                e.semver.prerelease &&
                e.semver.prerelease.length &&
                e.semver.major === v.major &&
                e.semver.minor === v.minor &&
                e.semver.patch === v.patch
              ) {
                v = false;
              }
            }
            if (e.operator === '<' || e.operator === '<=') {
              p = lowerLT(u, e, r);
              if (p === e && p !== u) return false;
            } else if (u.operator === '<=' && !i(u.semver, String(e), r))
              return false;
          }
          if (!e.operator && (u || l) && c !== 0) return false;
        }
        if (l && h && !u && c !== 0) return false;
        if (u && d && !l && c !== 0) return false;
        if (m || v) return false;
        return true;
      };
      const higherGT = (e, t, r) => {
        if (!e) return t;
        const s = a(e.semver, t.semver, r);
        return s > 0
          ? e
          : s < 0
          ? t
          : t.operator === '>' && e.operator === '>='
          ? t
          : e;
      };
      const lowerLT = (e, t, r) => {
        if (!e) return t;
        const s = a(e.semver, t.semver, r);
        return s < 0
          ? e
          : s > 0
          ? t
          : t.operator === '<' && e.operator === '<='
          ? t
          : e;
      };
      e.exports = subset;
    },
    3716: function (e, t, r) {
      const s = r(8209);
      const toComparators = (e, t) =>
        new s(e, t).set.map((e) =>
          e
            .map((e) => e.value)
            .join(' ')
            .trim()
            .split(' '),
        );
      e.exports = toComparators;
    },
    8147: function (e, t, r) {
      const s = r(8209);
      const validRange = (e, t) => {
        try {
          return new s(e, t).range || '*';
        } catch (e) {
          return null;
        }
      };
      e.exports = validRange;
    },
    6758: function (e, t, r) {
      e.exports = r(3837).deprecate;
    },
    5464: function (e) {
      'use strict';
      e.exports = function (e) {
        e.prototype[Symbol.iterator] = function* () {
          for (let e = this.head; e; e = e.next) {
            yield e.value;
          }
        };
      };
    },
    7190: function (e, t, r) {
      'use strict';
      e.exports = Yallist;
      Yallist.Node = Node;
      Yallist.create = Yallist;
      function Yallist(e) {
        var t = this;
        if (!(t instanceof Yallist)) {
          t = new Yallist();
        }
        t.tail = null;
        t.head = null;
        t.length = 0;
        if (e && typeof e.forEach === 'function') {
          e.forEach(function (e) {
            t.push(e);
          });
        } else if (arguments.length > 0) {
          for (var r = 0, s = arguments.length; r < s; r++) {
            t.push(arguments[r]);
          }
        }
        return t;
      }
      Yallist.prototype.removeNode = function (e) {
        if (e.list !== this) {
          throw new Error('removing node which does not belong to this list');
        }
        var t = e.next;
        var r = e.prev;
        if (t) {
          t.prev = r;
        }
        if (r) {
          r.next = t;
        }
        if (e === this.head) {
          this.head = t;
        }
        if (e === this.tail) {
          this.tail = r;
        }
        e.list.length--;
        e.next = null;
        e.prev = null;
        e.list = null;
        return t;
      };
      Yallist.prototype.unshiftNode = function (e) {
        if (e === this.head) {
          return;
        }
        if (e.list) {
          e.list.removeNode(e);
        }
        var t = this.head;
        e.list = this;
        e.next = t;
        if (t) {
          t.prev = e;
        }
        this.head = e;
        if (!this.tail) {
          this.tail = e;
        }
        this.length++;
      };
      Yallist.prototype.pushNode = function (e) {
        if (e === this.tail) {
          return;
        }
        if (e.list) {
          e.list.removeNode(e);
        }
        var t = this.tail;
        e.list = this;
        e.prev = t;
        if (t) {
          t.next = e;
        }
        this.tail = e;
        if (!this.head) {
          this.head = e;
        }
        this.length++;
      };
      Yallist.prototype.push = function () {
        for (var e = 0, t = arguments.length; e < t; e++) {
          push(this, arguments[e]);
        }
        return this.length;
      };
      Yallist.prototype.unshift = function () {
        for (var e = 0, t = arguments.length; e < t; e++) {
          unshift(this, arguments[e]);
        }
        return this.length;
      };
      Yallist.prototype.pop = function () {
        if (!this.tail) {
          return undefined;
        }
        var e = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
          this.tail.next = null;
        } else {
          this.head = null;
        }
        this.length--;
        return e;
      };
      Yallist.prototype.shift = function () {
        if (!this.head) {
          return undefined;
        }
        var e = this.head.value;
        this.head = this.head.next;
        if (this.head) {
          this.head.prev = null;
        } else {
          this.tail = null;
        }
        this.length--;
        return e;
      };
      Yallist.prototype.forEach = function (e, t) {
        t = t || this;
        for (var r = this.head, s = 0; r !== null; s++) {
          e.call(t, r.value, s, this);
          r = r.next;
        }
      };
      Yallist.prototype.forEachReverse = function (e, t) {
        t = t || this;
        for (var r = this.tail, s = this.length - 1; r !== null; s--) {
          e.call(t, r.value, s, this);
          r = r.prev;
        }
      };
      Yallist.prototype.get = function (e) {
        for (var t = 0, r = this.head; r !== null && t < e; t++) {
          r = r.next;
        }
        if (t === e && r !== null) {
          return r.value;
        }
      };
      Yallist.prototype.getReverse = function (e) {
        for (var t = 0, r = this.tail; r !== null && t < e; t++) {
          r = r.prev;
        }
        if (t === e && r !== null) {
          return r.value;
        }
      };
      Yallist.prototype.map = function (e, t) {
        t = t || this;
        var r = new Yallist();
        for (var s = this.head; s !== null; ) {
          r.push(e.call(t, s.value, this));
          s = s.next;
        }
        return r;
      };
      Yallist.prototype.mapReverse = function (e, t) {
        t = t || this;
        var r = new Yallist();
        for (var s = this.tail; s !== null; ) {
          r.push(e.call(t, s.value, this));
          s = s.prev;
        }
        return r;
      };
      Yallist.prototype.reduce = function (e, t) {
        var r;
        var s = this.head;
        if (arguments.length > 1) {
          r = t;
        } else if (this.head) {
          s = this.head.next;
          r = this.head.value;
        } else {
          throw new TypeError('Reduce of empty list with no initial value');
        }
        for (var n = 0; s !== null; n++) {
          r = e(r, s.value, n);
          s = s.next;
        }
        return r;
      };
      Yallist.prototype.reduceReverse = function (e, t) {
        var r;
        var s = this.tail;
        if (arguments.length > 1) {
          r = t;
        } else if (this.tail) {
          s = this.tail.prev;
          r = this.tail.value;
        } else {
          throw new TypeError('Reduce of empty list with no initial value');
        }
        for (var n = this.length - 1; s !== null; n--) {
          r = e(r, s.value, n);
          s = s.prev;
        }
        return r;
      };
      Yallist.prototype.toArray = function () {
        var e = new Array(this.length);
        for (var t = 0, r = this.head; r !== null; t++) {
          e[t] = r.value;
          r = r.next;
        }
        return e;
      };
      Yallist.prototype.toArrayReverse = function () {
        var e = new Array(this.length);
        for (var t = 0, r = this.tail; r !== null; t++) {
          e[t] = r.value;
          r = r.prev;
        }
        return e;
      };
      Yallist.prototype.slice = function (e, t) {
        t = t || this.length;
        if (t < 0) {
          t += this.length;
        }
        e = e || 0;
        if (e < 0) {
          e += this.length;
        }
        var r = new Yallist();
        if (t < e || t < 0) {
          return r;
        }
        if (e < 0) {
          e = 0;
        }
        if (t > this.length) {
          t = this.length;
        }
        for (var s = 0, n = this.head; n !== null && s < e; s++) {
          n = n.next;
        }
        for (; n !== null && s < t; s++, n = n.next) {
          r.push(n.value);
        }
        return r;
      };
      Yallist.prototype.sliceReverse = function (e, t) {
        t = t || this.length;
        if (t < 0) {
          t += this.length;
        }
        e = e || 0;
        if (e < 0) {
          e += this.length;
        }
        var r = new Yallist();
        if (t < e || t < 0) {
          return r;
        }
        if (e < 0) {
          e = 0;
        }
        if (t > this.length) {
          t = this.length;
        }
        for (var s = this.length, n = this.tail; n !== null && s > t; s--) {
          n = n.prev;
        }
        for (; n !== null && s > e; s--, n = n.prev) {
          r.push(n.value);
        }
        return r;
      };
      Yallist.prototype.splice = function (e, t, ...r) {
        if (e > this.length) {
          e = this.length - 1;
        }
        if (e < 0) {
          e = this.length + e;
        }
        for (var s = 0, n = this.head; n !== null && s < e; s++) {
          n = n.next;
        }
        var o = [];
        for (var s = 0; n && s < t; s++) {
          o.push(n.value);
          n = this.removeNode(n);
        }
        if (n === null) {
          n = this.tail;
        }
        if (n !== this.head && n !== this.tail) {
          n = n.prev;
        }
        for (var s = 0; s < r.length; s++) {
          n = insert(this, n, r[s]);
        }
        return o;
      };
      Yallist.prototype.reverse = function () {
        var e = this.head;
        var t = this.tail;
        for (var r = e; r !== null; r = r.prev) {
          var s = r.prev;
          r.prev = r.next;
          r.next = s;
        }
        this.head = t;
        this.tail = e;
        return this;
      };
      function insert(e, t, r) {
        var s =
          t === e.head ? new Node(r, null, t, e) : new Node(r, t, t.next, e);
        if (s.next === null) {
          e.tail = s;
        }
        if (s.prev === null) {
          e.head = s;
        }
        e.length++;
        return s;
      }
      function push(e, t) {
        e.tail = new Node(t, e.tail, null, e);
        if (!e.head) {
          e.head = e.tail;
        }
        e.length++;
      }
      function unshift(e, t) {
        e.head = new Node(t, null, e.head, e);
        if (!e.tail) {
          e.tail = e.head;
        }
        e.length++;
      }
      function Node(e, t, r, s) {
        if (!(this instanceof Node)) {
          return new Node(e, t, r, s);
        }
        this.list = s;
        this.value = e;
        if (t) {
          t.next = this;
          this.prev = t;
        } else {
          this.prev = null;
        }
        if (r) {
          r.prev = this;
          this.next = r;
        } else {
          this.next = null;
        }
      }
      try {
        r(5464)(Yallist);
      } catch (e) {}
    },
    1017: function (e) {
      'use strict';
      e.exports = require('path');
    },
    977: function (e) {
      'use strict';
      e.exports = require('postcss');
    },
    7310: function (e) {
      'use strict';
      e.exports = require('url');
    },
    3837: function (e) {
      'use strict';
      e.exports = require('util');
    },
    9943: function (e) {
      'use strict';
      e.exports = JSON.parse(
        '{"title":"CSS Loader options","additionalProperties":false,"properties":{"url":{"description":"Allows to enables/disables `url()`/`image-set()` functions handling.","link":"https://github.com/webpack-contrib/css-loader#url","anyOf":[{"type":"boolean"},{"type":"object","properties":{"filter":{"instanceof":"Function"}},"additionalProperties":false}]},"import":{"description":"Allows to enables/disables `@import` at-rules handling.","link":"https://github.com/webpack-contrib/css-loader#import","anyOf":[{"type":"boolean"},{"type":"object","properties":{"filter":{"instanceof":"Function"}},"additionalProperties":false}]},"modules":{"description":"Allows to enable/disable CSS Modules or ICSS and setup configuration.","link":"https://github.com/webpack-contrib/css-loader#modules","anyOf":[{"type":"boolean"},{"enum":["local","global","pure","icss"]},{"type":"object","additionalProperties":false,"properties":{"auto":{"description":"Allows auto enable CSS modules based on filename.","link":"https://github.com/webpack-contrib/css-loader#auto","anyOf":[{"instanceof":"RegExp"},{"instanceof":"Function"},{"type":"boolean"}]},"mode":{"description":"Setup `mode` option.","link":"https://github.com/webpack-contrib/css-loader#mode","anyOf":[{"enum":["local","global","pure","icss"]},{"instanceof":"Function"}]},"localIdentName":{"description":"Allows to configure the generated local ident name.","link":"https://github.com/webpack-contrib/css-loader#localidentname","type":"string","minLength":1},"localIdentContext":{"description":"Allows to redefine basic loader context for local ident name.","link":"https://github.com/webpack-contrib/css-loader#localidentcontext","type":"string","minLength":1},"localIdentHashSalt":{"description":"Allows to add custom hash to generate more unique classes.","link":"https://github.com/webpack-contrib/css-loader#localidenthashsalt","type":"string","minLength":1},"localIdentHashFunction":{"description":"Allows to specify hash function to generate classes.","link":"https://github.com/webpack-contrib/css-loader#localidenthashfunction","type":"string","minLength":1},"localIdentHashDigest":{"description":"Allows to specify hash digest to generate classes.","link":"https://github.com/webpack-contrib/css-loader#localidenthashdigest","type":"string","minLength":1},"localIdentHashDigestLength":{"description":"Allows to specify hash digest length to generate classes.","link":"https://github.com/webpack-contrib/css-loader#localidenthashdigestlength","type":"number"},"hashStrategy":{"description":"Allows to specify should localName be used when computing the hash.","link":"https://github.com/webpack-contrib/css-loader#hashstrategy","enum":["resource-path-and-local-name","minimal-subset"]},"localIdentRegExp":{"description":"Allows to specify custom RegExp for local ident name.","link":"https://github.com/webpack-contrib/css-loader#localidentregexp","anyOf":[{"type":"string","minLength":1},{"instanceof":"RegExp"}]},"getLocalIdent":{"description":"Allows to specify a function to generate the classname.","link":"https://github.com/webpack-contrib/css-loader#getlocalident","instanceof":"Function"},"namedExport":{"description":"Enables/disables ES modules named export for locals.","link":"https://github.com/webpack-contrib/css-loader#namedexport","type":"boolean"},"exportGlobals":{"description":"Allows to export names from global class or id, so you can use that as local name.","link":"https://github.com/webpack-contrib/css-loader#exportglobals","type":"boolean"},"exportLocalsConvention":{"description":"Style of exported classnames.","link":"https://github.com/webpack-contrib/css-loader#localsconvention","anyOf":[{"enum":["asIs","camelCase","camelCaseOnly","dashes","dashesOnly"]},{"instanceof":"Function"}]},"exportOnlyLocals":{"description":"Export only locals.","link":"https://github.com/webpack-contrib/css-loader#exportonlylocals","type":"boolean"}}}]},"sourceMap":{"description":"Allows to enable/disable source maps.","link":"https://github.com/webpack-contrib/css-loader#sourcemap","type":"boolean"},"importLoaders":{"description":"Allows enables/disables or setups number of loaders applied before CSS loader for `@import`/CSS Modules and ICSS imports.","link":"https://github.com/webpack-contrib/css-loader#importloaders","anyOf":[{"type":"boolean"},{"type":"string"},{"type":"integer"}]},"esModule":{"description":"Use the ES modules syntax.","link":"https://github.com/webpack-contrib/css-loader#esmodule","type":"boolean"},"exportType":{"description":"Allows exporting styles as array with modules, string or constructable stylesheet (i.e. `CSSStyleSheet`).","link":"https://github.com/webpack-contrib/css-loader#exporttype","enum":["array","string","css-style-sheet"]}},"type":"object"}',
      );
    },
    853: function (e) {
      'use strict';
      e.exports = JSON.parse(
        '{"name":"postcss","version":"8.4.12","description":"Tool for transforming styles with JS plugins","engines":{"node":"^10 || ^12 || >=14"},"exports":{".":{"require":"./lib/postcss.js","import":"./lib/postcss.mjs","types":"./lib/postcss.d.ts"},"./lib/at-rule":"./lib/at-rule.js","./lib/comment":"./lib/comment.js","./lib/container":"./lib/container.js","./lib/css-syntax-error":"./lib/css-syntax-error.js","./lib/declaration":"./lib/declaration.js","./lib/fromJSON":"./lib/fromJSON.js","./lib/input":"./lib/input.js","./lib/lazy-result":"./lib/lazy-result.js","./lib/no-work-result":"./lib/no-work-result.js","./lib/list":"./lib/list.js","./lib/map-generator":"./lib/map-generator.js","./lib/node":"./lib/node.js","./lib/parse":"./lib/parse.js","./lib/parser":"./lib/parser.js","./lib/postcss":"./lib/postcss.js","./lib/previous-map":"./lib/previous-map.js","./lib/processor":"./lib/processor.js","./lib/result":"./lib/result.js","./lib/root":"./lib/root.js","./lib/rule":"./lib/rule.js","./lib/stringifier":"./lib/stringifier.js","./lib/stringify":"./lib/stringify.js","./lib/symbols":"./lib/symbols.js","./lib/terminal-highlight":"./lib/terminal-highlight.js","./lib/tokenize":"./lib/tokenize.js","./lib/warn-once":"./lib/warn-once.js","./lib/warning":"./lib/warning.js","./package.json":"./package.json"},"main":"./lib/postcss.js","types":"./lib/postcss.d.ts","keywords":["css","postcss","rework","preprocessor","parser","source map","transform","manipulation","transpiler"],"funding":[{"type":"opencollective","url":"https://opencollective.com/postcss/"},{"type":"tidelift","url":"https://tidelift.com/funding/github/npm/postcss"}],"author":"Andrey Sitnik <andrey@sitnik.ru>","license":"MIT","homepage":"https://postcss.org/","repository":"postcss/postcss","bugs":{"url":"https://github.com/postcss/postcss/issues"},"dependencies":{"nanoid":"^3.3.1","picocolors":"^1.0.0","source-map-js":"^1.0.2"},"browser":{"./lib/terminal-highlight":false,"source-map-js":false,"path":false,"url":false,"fs":false}}',
      );
    },
  };
  var t = {};
  function __nccwpck_require__(r) {
    var s = t[r];
    if (s !== undefined) {
      return s.exports;
    }
    var n = (t[r] = { exports: {} });
    var o = true;
    try {
      e[r](n, n.exports, __nccwpck_require__);
      o = false;
    } finally {
      if (o) delete t[r];
    }
    return n.exports;
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/';
  var r = __nccwpck_require__(1534);
  module.exports = r;
})();
