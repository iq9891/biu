(function(){var e={604:function(e){(function(t,n){true?e.exports=n():0})(this,(function(){"use strict";var e=function isMergeableObject(e){return isNonNullObject(e)&&!isSpecial(e)};function isNonNullObject(e){return!!e&&typeof e==="object"}function isSpecial(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||isReactElement(e)}var t=typeof Symbol==="function"&&Symbol.for;var n=t?Symbol.for("react.element"):60103;function isReactElement(e){return e.$$typeof===n}function emptyTarget(e){return Array.isArray(e)?[]:{}}function cloneIfNecessary(t,n){var s=n&&n.clone===true;return s&&e(t)?deepmerge(emptyTarget(t),t,n):t}function defaultArrayMerge(t,n,s){var i=t.slice();n.forEach((function(n,r){if(typeof i[r]==="undefined"){i[r]=cloneIfNecessary(n,s)}else if(e(n)){i[r]=deepmerge(t[r],n,s)}else if(t.indexOf(n)===-1){i.push(cloneIfNecessary(n,s))}}));return i}function mergeObject(t,n,s){var i={};if(e(t)){Object.keys(t).forEach((function(e){i[e]=cloneIfNecessary(t[e],s)}))}Object.keys(n).forEach((function(r){if(!e(n[r])||!t[r]){i[r]=cloneIfNecessary(n[r],s)}else{i[r]=deepmerge(t[r],n[r],s)}}));return i}function deepmerge(e,t,n){var s=Array.isArray(t);var i=Array.isArray(e);var r=n||{arrayMerge:defaultArrayMerge};var o=s===i;if(!o){return cloneIfNecessary(t,n)}else if(s){var u=r.arrayMerge||defaultArrayMerge;return u(e,t,n)}else{return mergeObject(e,t,n)}}deepmerge.all=function deepmergeAll(e,t){if(!Array.isArray(e)||e.length<2){throw new Error("first argument should be an array with at least two elements")}return e.reduce((function(e,n){return deepmerge(e,n,t)}))};var s=deepmerge;return s}))},832:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.arrayToString=void 0;const arrayToString=(e,t,n)=>{const s=e.map((function(e,s){const i=n(e,s);if(i===undefined)return String(i);return t+i.split("\n").join(`\n${t}`)})).join(t?",\n":",");const i=t&&s?"\n":"";return`[${i}${s}${i}]`};t.arrayToString=arrayToString},708:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.FunctionParser=t.dedentFunction=t.functionToString=t.USED_METHOD_KEY=void 0;const s=n(957);const i={" "(){}}[" "].toString().charAt(0)==='"';const r={Function:"function ",GeneratorFunction:"function* ",AsyncFunction:"async function ",AsyncGeneratorFunction:"async function* "};const o={Function:"",GeneratorFunction:"*",AsyncFunction:"async ",AsyncGeneratorFunction:"async *"};const u=new Set(("case delete else in instanceof new return throw typeof void "+", ; : + - ! ~ & | ^ * / % < > ? =").split(" "));t.USED_METHOD_KEY=new WeakSet;const functionToString=(e,n,s,i)=>{const r=typeof i==="string"?i:undefined;if(r!==undefined)t.USED_METHOD_KEY.add(e);return new FunctionParser(e,n,s,r).stringify()};t.functionToString=functionToString;function dedentFunction(e){let t;for(const n of e.split("\n").slice(1)){const s=/^[\s\t]+/.exec(n);if(!s)return e;const[i]=s;if(t===undefined)t=i;else if(i.length<t.length)t=i}return t?e.split(`\n${t}`).join("\n"):e}t.dedentFunction=dedentFunction;class FunctionParser{constructor(e,t,n,i){this.fn=e;this.indent=t;this.next=n;this.key=i;this.pos=0;this.hadKeyword=false;this.fnString=Function.prototype.toString.call(e);this.fnType=e.constructor.name;this.keyQuote=i===undefined?"":s.quoteKey(i,n);this.keyPrefix=i===undefined?"":`${this.keyQuote}:${t?" ":""}`;this.isMethodCandidate=i===undefined?false:this.fn.name===""||this.fn.name===i}stringify(){const e=this.tryParse();if(!e){return`${this.keyPrefix}void ${this.next(this.fnString)}`}return dedentFunction(e)}getPrefix(){if(this.isMethodCandidate&&!this.hadKeyword){return o[this.fnType]+this.keyQuote}return this.keyPrefix+r[this.fnType]}tryParse(){if(this.fnString[this.fnString.length-1]!=="}"){return this.keyPrefix+this.fnString}if(this.fn.name){const e=this.tryStrippingName();if(e)return e}const e=this.pos;if(this.consumeSyntax()==="class")return this.fnString;this.pos=e;if(this.tryParsePrefixTokens()){const e=this.tryStrippingName();if(e)return e;let t=this.pos;switch(this.consumeSyntax("WORD_LIKE")){case"WORD_LIKE":if(this.isMethodCandidate&&!this.hadKeyword){t=this.pos}case"()":if(this.fnString.substr(this.pos,2)==="=>"){return this.keyPrefix+this.fnString}this.pos=t;case'"':case"'":case"[]":return this.getPrefix()+this.fnString.substr(this.pos)}}}tryStrippingName(){if(i){return}let e=this.pos;const t=this.fnString.substr(this.pos,this.fn.name.length);if(t===this.fn.name){this.pos+=t.length;if(this.consumeSyntax()==="()"&&this.consumeSyntax()==="{}"&&this.pos===this.fnString.length){if(this.isMethodCandidate||!s.isValidVariableName(t)){e+=t.length}return this.getPrefix()+this.fnString.substr(e)}}this.pos=e}tryParsePrefixTokens(){let e=this.pos;this.hadKeyword=false;switch(this.fnType){case"AsyncFunction":if(this.consumeSyntax()!=="async")return false;e=this.pos;case"Function":if(this.consumeSyntax()==="function"){this.hadKeyword=true}else{this.pos=e}return true;case"AsyncGeneratorFunction":if(this.consumeSyntax()!=="async")return false;case"GeneratorFunction":let t=this.consumeSyntax();if(t==="function"){t=this.consumeSyntax();this.hadKeyword=true}return t==="*"}}consumeSyntax(e){const t=this.consumeMatch(/^(?:([A-Za-z_0-9$\xA0-\uFFFF]+)|=>|\+\+|\-\-|.)/);if(!t)return;const[n,s]=t;this.consumeWhitespace();if(s)return e||s;switch(n){case"(":return this.consumeSyntaxUntil("(",")");case"[":return this.consumeSyntaxUntil("[","]");case"{":return this.consumeSyntaxUntil("{","}");case"`":return this.consumeTemplate();case'"':return this.consumeRegExp(/^(?:[^\\"]|\\.)*"/,'"');case"'":return this.consumeRegExp(/^(?:[^\\']|\\.)*'/,"'")}return n}consumeSyntaxUntil(e,t){let n=true;for(;;){const s=this.consumeSyntax();if(s===t)return e+t;if(!s||s===")"||s==="]"||s==="}")return;if(s==="/"&&n&&this.consumeMatch(/^(?:\\.|[^\\\/\n[]|\[(?:\\.|[^\]])*\])+\/[a-z]*/)){n=false;this.consumeWhitespace()}else{n=u.has(s)}}}consumeMatch(e){const t=e.exec(this.fnString.substr(this.pos));if(t)this.pos+=t[0].length;return t}consumeRegExp(e,t){const n=e.exec(this.fnString.substr(this.pos));if(!n)return;this.pos+=n[0].length;this.consumeWhitespace();return t}consumeTemplate(){for(;;){this.consumeMatch(/^(?:[^`$\\]|\\.|\$(?!{))*/);if(this.fnString[this.pos]==="`"){this.pos++;this.consumeWhitespace();return"`"}if(this.fnString.substr(this.pos,2)==="${"){this.pos+=2;this.consumeWhitespace();if(this.consumeSyntaxUntil("{","}"))continue}return}}consumeWhitespace(){this.consumeMatch(/^(?:\s|\/\/.*|\/\*[^]*?\*\/)*/)}}t.FunctionParser=FunctionParser},251:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.stringify=void 0;const s=n(930);const i=n(957);const r=Symbol("root");function stringify(e,t,n,s={}){const o=typeof n==="string"?n:" ".repeat(n||0);const u=[];const a=new Set;const c=new Map;const l=new Map;let h=0;const{maxDepth:f=100,references:p=false,skipUndefinedProperties:d=false,maxValues:g=1e5}=s;const m=replacerToString(t);const onNext=(e,t)=>{if(++h>g)return;if(d&&e===undefined)return;if(u.length>f)return;if(t===undefined)return m(e,o,onNext,t);u.push(t);const n=y(e,t===r?undefined:t);u.pop();return n};const y=p?(e,t)=>{if(e!==null&&(typeof e==="object"||typeof e==="function"||typeof e==="symbol")){if(c.has(e)){l.set(u.slice(1),c.get(e));return m(undefined,o,onNext,t)}c.set(e,u.slice(1))}return m(e,o,onNext,t)}:(e,t)=>{if(a.has(e))return;a.add(e);const n=m(e,o,onNext,t);a.delete(e);return n};const b=onNext(e,r);if(l.size){const e=o?" ":"";const t=o?"\n":"";let n=`var x${e}=${e}${b};${t}`;for(const[s,r]of l.entries()){const o=i.stringifyPath(s,onNext);const u=i.stringifyPath(r,onNext);n+=`x${o}${e}=${e}x${u};${t}`}return`(function${e}()${e}{${t}${n}return x;${t}}())`}return b}t.stringify=stringify;function replacerToString(e){if(!e)return s.toString;return(t,n,i,r)=>e(t,n,(e=>s.toString(e,n,i,r)),r)}},233:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.objectToString=void 0;const s=n(957);const i=n(708);const r=n(832);const objectToString=(e,t,n,s)=>{if(typeof Buffer==="function"&&Buffer.isBuffer(e)){return`Buffer.from(${n(e.toString("base64"))}, 'base64')`}if(typeof global==="object"&&e===global){return globalToString(e,t,n,s)}const i=o[Object.prototype.toString.call(e)];return i?i(e,t,n,s):undefined};t.objectToString=objectToString;const rawObjectToString=(e,t,n,r)=>{const o=t?"\n":"";const u=t?" ":"";const a=Object.keys(e).reduce((function(r,o){const a=e[o];const c=n(a,o);if(c===undefined)return r;const l=c.split("\n").join(`\n${t}`);if(i.USED_METHOD_KEY.has(a)){r.push(`${t}${l}`);return r}r.push(`${t}${s.quoteKey(o,n)}:${u}${l}`);return r}),[]).join(`,${o}`);if(a==="")return"{}";return`{${o}${a}${o}}`};const globalToString=(e,t,n)=>`Function(${n("return this")})()`;const o={"[object Array]":r.arrayToString,"[object Object]":rawObjectToString,"[object Error]":(e,t,n)=>`new Error(${n(e.message)})`,"[object Date]":e=>`new Date(${e.getTime()})`,"[object String]":(e,t,n)=>`new String(${n(e.toString())})`,"[object Number]":e=>`new Number(${e})`,"[object Boolean]":e=>`new Boolean(${e})`,"[object Set]":(e,t,n)=>`new Set(${n(Array.from(e))})`,"[object Map]":(e,t,n)=>`new Map(${n(Array.from(e))})`,"[object RegExp]":String,"[object global]":globalToString,"[object Window]":globalToString}},957:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.stringifyPath=t.quoteKey=t.isValidVariableName=t.IS_VALID_IDENTIFIER=t.quoteString=void 0;const n=/[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;const s=new Map([["\b","\\b"],["\t","\\t"],["\n","\\n"],["\f","\\f"],["\r","\\r"],["'","\\'"],['"','\\"'],["\\","\\\\"]]);function escapeChar(e){return s.get(e)||`\\u${`0000${e.charCodeAt(0).toString(16)}`.slice(-4)}`}function quoteString(e){return`'${e.replace(n,escapeChar)}'`}t.quoteString=quoteString;const i=new Set(("break else new var case finally return void catch for switch while "+"continue function this with default if throw delete in try "+"do instanceof typeof abstract enum int short boolean export "+"interface static byte extends long super char final native synchronized "+"class float package throws const goto private transient debugger "+"implements protected volatile double import public let yield").split(" "));t.IS_VALID_IDENTIFIER=/^[A-Za-z_$][A-Za-z0-9_$]*$/;function isValidVariableName(e){return typeof e==="string"&&!i.has(e)&&t.IS_VALID_IDENTIFIER.test(e)}t.isValidVariableName=isValidVariableName;function quoteKey(e,t){return isValidVariableName(e)?e:t(e)}t.quoteKey=quoteKey;function stringifyPath(e,t){let n="";for(const s of e){if(isValidVariableName(s)){n+=`.${s}`}else{n+=`[${t(s)}]`}}return n}t.stringifyPath=stringifyPath},930:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.toString=void 0;const s=n(957);const i=n(233);const r=n(708);const o={string:s.quoteString,number:e=>Object.is(e,-0)?"-0":String(e),boolean:String,symbol:(e,t,n)=>{const s=Symbol.keyFor(e);if(s!==undefined)return`Symbol.for(${n(s)})`;return`Symbol(${n(e.description)})`},bigint:(e,t,n)=>`BigInt(${n(String(e))})`,undefined:String,object:i.objectToString,function:r.functionToString};const toString=(e,t,n,s)=>{if(e===null)return"null";return o[typeof e](e,t,n,s)};t.toString=toString},990:function(e){e.exports=class extends Function{constructor(){super();return new Proxy(this,{apply:(e,t,n)=>e.classCall(...n)})}classCall(){throw new Error("not implemented")}}},465:function(e,t,n){const s=n(579);const i=n(837);e.exports=s(i(Object))},622:function(e,t,n){const s=n(713);const i=n(837);e.exports=s(i(Object))},594:function(e,t,n){const s=n(990);const i=n(579);const r=n(837);const o=n(392);e.exports=o(i(r(s)))},198:function(e,t,n){const s=n(465);const i=n(594);const r=n(622);const o=n(488);const u=n(490);const a=n(967);const c=n(542);const l=n(109);const h=n(3);const f=n(755);const p=n(833);e.exports=class extends s{constructor(){super();this.entryPoints=new s(this);this.output=new a(this);this.module=new h(this);this.resolve=new o(this);this.resolveLoader=new u(this);this.optimization=new f(this);this.plugins=new s(this);this.devServer=new c(this);this.performance=new p(this);this.node=new i(this);this.extend(["context","mode","devtool","target","watch","watchOptions","externals","externalsType","externalsPresets","stats","experiments","amd","bail","cache","dependencies","ignoreWarnings","loader","parallelism","profile","recordsPath","recordsInputPath","recordsOutputPath","name","infrastructureLogging","snapshot"])}static toString(e,{verbose:t=false,configPrefix:s="config"}={}){const{stringify:i}=n(251);return i(e,((e,n,i)=>{if(e&&e.__pluginName){const t=`/* ${s}.${e.__pluginType}('${e.__pluginName}') */\n`;const n=e.__pluginPath?`(require(${i(e.__pluginPath)}))`:e.__pluginConstructorName;if(n){const s=i(e.__pluginArgs).slice(1,-1);return`${t}new ${n}(${s})`}return t+i(e.__pluginArgs&&e.__pluginArgs.length?{args:e.__pluginArgs}:{})}if(e&&e.__ruleNames){const t=e.__ruleTypes;const n=`/* ${s}.module${e.__ruleNames.map(((e,n)=>`.${t?t[n]:"rule"}('${e}')`)).join("")}${e.__useName?`.use('${e.__useName}')`:``} */\n`;return n+i(e)}if(e&&e.__expression){return e.__expression}if(typeof e==="function"){if(!t&&e.toString().length>100){return`function () { /* omitted long function */ }`}}return i(e)}),2)}entry(e){return this.entryPoints.getOrCompute(e,(()=>new r(this)))}plugin(e){return this.plugins.getOrCompute(e,(()=>new l(this,e)))}toConfig(){const e=this.entryPoints.entries()||{};const t=this.entries()||{};return this.clean(Object.assign(t,{node:this.node.entries(),output:this.output.entries(),resolve:this.resolve.toConfig(),resolveLoader:this.resolveLoader.toConfig(),devServer:this.devServer.toConfig(),module:this.module.toConfig(),optimization:this.optimization.toConfig(),plugins:this.plugins.values().map((e=>e.toConfig())),performance:this.performance.entries(),entry:Object.keys(e).reduce(((t,n)=>Object.assign(t,{[n]:e[n].values()})),{})}))}toString(t){return e.exports.toString(this.toConfig(),t)}merge(e={},t=[]){const n=["node","output","resolve","resolveLoader","devServer","optimization","performance","module"];if(!t.includes("entry")&&"entry"in e){Object.keys(e.entry).forEach((t=>this.entry(t).merge([].concat(e.entry[t]))))}if(!t.includes("plugin")&&"plugin"in e){Object.keys(e.plugin).forEach((t=>this.plugin(t).merge(e.plugin[t])))}n.forEach((n=>{if(!t.includes(n)&&n in e){this[n].merge(e[n])}}));return super.merge(e,[...t,...n,"entry","plugin"])}}},542:function(e,t,n){const s=n(465);const i=n(622);e.exports=class extends s{constructor(e){super(e);this.allowedHosts=new i(this);this.extend(["after","before","bonjour","clientLogLevel","compress","contentBase","contentBasePublicPath","disableHostCheck","filename","headers","historyApiFallback","host","hot","hotOnly","http2","https","index","injectClient","injectHot","inline","lazy","liveReload","mimeTypes","noInfo","onListening","open","openPage","overlay","pfx","pfxPassphrase","port","proxy","progress","public","publicPath","quiet","serveIndex","setup","socket","sockHost","sockPath","sockPort","staticOptions","stats","stdin","transportMode","useLocalIp","watchContentBase","watchOptions","writeToDisk"])}toConfig(){return this.clean({allowedHosts:this.allowedHosts.values(),...this.entries()||{}})}merge(e,t=[]){if(!t.includes("allowedHosts")&&"allowedHosts"in e){this.allowedHosts.merge(e.allowedHosts)}return super.merge(e,["allowedHosts"])}}},3:function(e,t,n){const s=n(465);const i=n(700);e.exports=class extends s{constructor(e){super(e);this.rules=new s(this);this.defaultRules=new s(this);this.generator=new s(this);this.parser=new s(this);this.extend(["noParse","unsafeCache","wrappedContextCritical","exprContextRegExp","wrappedContextRecursive","strictExportPresence","wrappedContextRegExp"])}defaultRule(e){return this.defaultRules.getOrCompute(e,(()=>new i(this,e,"defaultRule")))}rule(e){return this.rules.getOrCompute(e,(()=>new i(this,e,"rule")))}toConfig(){return this.clean(Object.assign(this.entries()||{},{defaultRules:this.defaultRules.values().map((e=>e.toConfig())),generator:this.generator.entries(),parser:this.parser.entries(),rules:this.rules.values().map((e=>e.toConfig()))}))}merge(e,t=[]){if(!t.includes("rule")&&"rule"in e){Object.keys(e.rule).forEach((t=>this.rule(t).merge(e.rule[t])))}if(!t.includes("defaultRule")&&"defaultRule"in e){Object.keys(e.defaultRule).forEach((t=>this.defaultRule(t).merge(e.defaultRule[t])))}return super.merge(e,["rule","defaultRule"])}}},755:function(e,t,n){const s=n(465);const i=n(594);const r=n(109);e.exports=class extends s{constructor(e){super(e);this.minimizers=new s(this);this.splitChunks=new i(this);this.extend(["minimize","runtimeChunk","emitOnErrors","moduleIds","chunkIds","nodeEnv","mangleWasmImports","removeAvailableModules","removeEmptyChunks","mergeDuplicateChunks","flagIncludedChunks","providedExports","usedExports","concatenateModules","sideEffects","portableRecords","mangleExports","innerGraph","realContentHash"])}minimizer(e){if(Array.isArray(e)){throw new Error("optimization.minimizer() no longer supports being passed an array. "+"Either switch to the new syntax (https://github.com/neutrinojs/webpack-chain#config-optimization-minimizers-adding) or downgrade to webpack-chain 4. "+"If using Vue this likely means a Vue plugin has not yet been updated to support Vue CLI 4+.")}return this.minimizers.getOrCompute(e,(()=>new r(this,e,"optimization.minimizer")))}toConfig(){return this.clean(Object.assign(this.entries()||{},{splitChunks:this.splitChunks.entries(),minimizer:this.minimizers.values().map((e=>e.toConfig()))}))}merge(e,t=[]){if(!t.includes("minimizer")&&"minimizer"in e){Object.keys(e.minimizer).forEach((t=>this.minimizer(t).merge(e.minimizer[t])))}return super.merge(e,[...t,"minimizer"])}}},97:function(e){e.exports=e=>class extends e{before(e){if(this.__after){throw new Error(`Unable to set .before(${JSON.stringify(e)}) with existing value for .after()`)}this.__before=e;return this}after(e){if(this.__before){throw new Error(`Unable to set .after(${JSON.stringify(e)}) with existing value for .before()`)}this.__after=e;return this}merge(e,t=[]){if(e.before){this.before(e.before)}if(e.after){this.after(e.after)}return super.merge(e,[...t,"before","after"])}}},967:function(e,t,n){const s=n(465);e.exports=class extends s{constructor(e){super(e);this.extend(["auxiliaryComment","charset","chunkFilename","chunkLoadTimeout","chunkLoadingGlobal","chunkLoading","chunkFormat","enabledChunkLoadingTypes","crossOriginLoading","devtoolFallbackModuleFilenameTemplate","devtoolModuleFilenameTemplate","devtoolNamespace","filename","assetModuleFilename","globalObject","uniqueName","hashDigest","hashDigestLength","hashFunction","hashSalt","hotUpdateChunkFilename","hotUpdateGlobal","hotUpdateMainFilename","library","libraryExport","libraryTarget","importFunctionName","path","pathinfo","publicPath","scriptType","sourceMapFilename","sourcePrefix","strictModuleErrorHandling","strictModuleExceptionHandling","umdNamedDefine","workerChunkLoading","enabledLibraryTypes","environment","compareBeforeEmit","wasmLoading","enabledWasmLoadingTypes","iife","module","clean"])}}},833:function(e,t,n){const s=n(594);e.exports=class extends s{constructor(e){super(e);this.extend(["assetFilter","hints","maxAssetSize","maxEntrypointSize"])}}},109:function(e,t,n){const s=n(465);const i=n(97);e.exports=i(class extends s{constructor(e,t,n="plugin"){super(e);this.name=t;this.type=n;this.extend(["init"]);this.init(((e,t=[])=>{if(typeof e==="function"){return new e(...t)}return e}))}use(e,t=[]){return this.set("plugin",e).set("args",t)}tap(e){if(!this.has("plugin")){throw new Error(`Cannot call .tap() on a plugin that has not yet been defined. Call ${this.type}('${this.name}').use(<Plugin>) first.`)}this.set("args",e(this.get("args")||[]));return this}set(e,t){if(e==="args"&&!Array.isArray(t)){throw new Error("args must be an array of arguments")}return super.set(e,t)}merge(e,t=[]){if("plugin"in e){this.set("plugin",e.plugin)}if("args"in e){this.set("args",e.args)}return super.merge(e,[...t,"args","plugin"])}toConfig(){const e=this.get("init");let t=this.get("plugin");const s=this.get("args");let i=null;if(t===undefined){throw new Error(`Invalid ${this.type} configuration: ${this.type}('${this.name}').use(<Plugin>) was not called to specify the plugin`)}if(typeof t==="string"){i=t;t=n(262)(i)}const r=t.__expression?`(${t.__expression})`:t.name;const o=e(t,s);Object.defineProperties(o,{__pluginName:{value:this.name},__pluginType:{value:this.type},__pluginArgs:{value:s},__pluginConstructorName:{value:r},__pluginPath:{value:i}});return o}})},488:function(e,t,n){const s=n(465);const i=n(622);const r=n(109);e.exports=class extends s{constructor(e){super(e);this.alias=new s(this);this.aliasFields=new i(this);this.descriptionFiles=new i(this);this.extensions=new i(this);this.mainFields=new i(this);this.mainFiles=new i(this);this.exportsFields=new i(this);this.importsFields=new i(this);this.restrictions=new i(this);this.roots=new i(this);this.modules=new i(this);this.plugins=new s(this);this.fallback=new s(this);this.byDependency=new s(this);this.extend(["cachePredicate","cacheWithContext","enforceExtension","symlinks","unsafeCache","preferRelative","preferAbsolute"])}plugin(e){return this.plugins.getOrCompute(e,(()=>new r(this,e,"resolve.plugin")))}toConfig(){return this.clean(Object.assign(this.entries()||{},{alias:this.alias.entries(),aliasFields:this.aliasFields.values(),descriptionFiles:this.descriptionFiles.values(),extensions:this.extensions.values(),mainFields:this.mainFields.values(),mainFiles:this.mainFiles.values(),modules:this.modules.values(),exportsFields:this.exportsFields.values(),importsFields:this.importsFields.values(),restrictions:this.restrictions.values(),roots:this.roots.values(),fallback:this.fallback.entries(),byDependency:this.byDependency.entries(),plugins:this.plugins.values().map((e=>e.toConfig()))}))}merge(e,t=[]){const n=["alias","aliasFields","descriptionFiles","extensions","mainFields","mainFiles","exportsFields","importsFields","restrictions","roots","modules"];if(!t.includes("plugin")&&"plugin"in e){Object.keys(e.plugin).forEach((t=>this.plugin(t).merge(e.plugin[t])))}n.forEach((n=>{if(!t.includes(n)&&n in e){this[n].merge(e[n])}}));return super.merge(e,[...t,...n,"plugin"])}}},490:function(e,t,n){const s=n(488);const i=n(622);e.exports=class extends s{constructor(e){super(e);this.modules=new i(this);this.moduleExtensions=new i(this);this.packageMains=new i(this)}toConfig(){return this.clean({modules:this.modules.values(),moduleExtensions:this.moduleExtensions.values(),packageMains:this.packageMains.values(),...super.toConfig()})}merge(e,t=[]){const n=["modules","moduleExtensions","packageMains"];n.forEach((n=>{if(!t.includes(n)&&n in e){this[n].merge(e[n])}}));return super.merge(e,[...t,...n])}}},700:function(e,t,n){const s=n(465);const i=n(622);const r=n(97);const o=n(393);const u=n(488);function toArray(e){return Array.isArray(e)?e:[e]}const a=r(class extends s{constructor(e,t,n="rule"){super(e);this.ruleName=t;this.names=[];this.ruleType=n;this.ruleTypes=[];let r=this;while(r instanceof a){this.names.unshift(r.ruleName);this.ruleTypes.unshift(r.ruleType);r=r.parent}this.uses=new s(this);this.include=new i(this);this.exclude=new i(this);this.rules=new s(this);this.oneOfs=new s(this);this.resolve=new u(this);this.resolve.extend(["fullySpecified"]);this.extend(["enforce","issuer","issuerLayer","layer","mimetype","parser","generator","resource","resourceQuery","sideEffects","test","type"])}use(e){return this.uses.getOrCompute(e,(()=>new o(this,e)))}rule(e){return this.rules.getOrCompute(e,(()=>new a(this,e,"rule")))}oneOf(e){return this.oneOfs.getOrCompute(e,(()=>new a(this,e,"oneOf")))}pre(){return this.enforce("pre")}post(){return this.enforce("post")}toConfig(){const e=this.clean(Object.assign(this.entries()||{},{include:this.include.values(),exclude:this.exclude.values(),rules:this.rules.values().map((e=>e.toConfig())),oneOf:this.oneOfs.values().map((e=>e.toConfig())),use:this.uses.values().map((e=>e.toConfig())),resolve:this.resolve.toConfig()}));Object.defineProperties(e,{__ruleNames:{value:this.names},__ruleTypes:{value:this.ruleTypes}});return e}merge(e,t=[]){if(!t.includes("include")&&"include"in e){this.include.merge(toArray(e.include))}if(!t.includes("exclude")&&"exclude"in e){this.exclude.merge(toArray(e.exclude))}if(!t.includes("use")&&"use"in e){Object.keys(e.use).forEach((t=>this.use(t).merge(e.use[t])))}if(!t.includes("rules")&&"rules"in e){Object.keys(e.rules).forEach((t=>this.rule(t).merge(e.rules[t])))}if(!t.includes("oneOf")&&"oneOf"in e){Object.keys(e.oneOf).forEach((t=>this.oneOf(t).merge(e.oneOf[t])))}if(!t.includes("resolve")&&"resolve"in e){this.resolve.merge(e.resolve)}if(!t.includes("test")&&"test"in e){this.test(e.test instanceof RegExp||typeof e.test==="function"?e.test:new RegExp(e.test))}return super.merge(e,[...t,"include","exclude","use","rules","oneOf","resolve","test"])}});e.exports=a},393:function(e,t,n){const s=n(604);const i=n(465);const r=n(97);e.exports=r(class extends i{constructor(e,t){super(e);this.name=t;this.extend(["loader","options"])}tap(e){this.options(e(this.get("options")));return this}merge(e,t=[]){if(!t.includes("loader")&&"loader"in e){this.loader(e.loader)}if(!t.includes("options")&&"options"in e){this.options(s(this.store.get("options")||{},e.options))}return super.merge(e,[...t,"loader","options"])}toConfig(){const e=this.clean(this.entries()||{});Object.defineProperties(e,{__useName:{value:this.name},__ruleNames:{value:this.parent&&this.parent.names},__ruleTypes:{value:this.parent&&this.parent.ruleTypes}});return e}})},837:function(e){e.exports=function createChainable(e){return class extends e{constructor(e){super();this.parent=e}batch(e){e(this);return this}end(){return this.parent}}}},579:function(e,t,n){const s=n(604);e.exports=function createMap(e){return class extends e{constructor(...e){super(...e);this.store=new Map}extend(e){this.shorthands=e;e.forEach((e=>{this[e]=t=>this.set(e,t)}));return this}clear(){this.store.clear();return this}delete(e){this.store.delete(e);return this}order(){const e=[...this.store].reduce(((e,[t,n])=>{e[t]=n;return e}),{});const t=Object.keys(e);const n=[...t];t.forEach((t=>{if(!e[t]){return}const{__before:s,__after:i}=e[t];if(s&&n.includes(s)){n.splice(n.indexOf(t),1);n.splice(n.indexOf(s),0,t)}else if(i&&n.includes(i)){n.splice(n.indexOf(t),1);n.splice(n.indexOf(i)+1,0,t)}}));return{entries:e,order:n}}entries(){const{entries:e,order:t}=this.order();if(t.length){return e}return undefined}values(){const{entries:e,order:t}=this.order();return t.map((t=>e[t]))}get(e){return this.store.get(e)}getOrCompute(e,t){if(!this.has(e)){this.set(e,t())}return this.get(e)}has(e){return this.store.has(e)}set(e,t){this.store.set(e,t);return this}merge(e,t=[]){Object.keys(e).forEach((n=>{if(t.includes(n)){return}const i=e[n];if(!Array.isArray(i)&&typeof i!=="object"||i===null||!this.has(n)){this.set(n,i)}else{this.set(n,s(this.get(n),i))}}));return this}clean(e){return Object.keys(e).reduce(((t,n)=>{const s=e[n];if(s===undefined){return t}if(Array.isArray(s)&&!s.length){return t}if(Object.prototype.toString.call(s)==="[object Object]"&&!Object.keys(s).length){return t}t[n]=s;return t}),{})}when(e,t=Function.prototype,n=Function.prototype){if(e){t(this)}else{n(this)}return this}}}},713:function(e){e.exports=function createSet(e){return class extends e{constructor(...e){super(...e);this.store=new Set}add(e){this.store.add(e);return this}prepend(e){this.store=new Set([e,...this.store]);return this}clear(){this.store.clear();return this}delete(e){this.store.delete(e);return this}values(){return[...this.store]}has(e){return this.store.has(e)}merge(e){this.store=new Set([...this.store,...e]);return this}when(e,t=Function.prototype,n=Function.prototype){if(e){t(this)}else{n(this)}return this}}}},392:function(e){e.exports=function createValue(e){return class extends e{constructor(...e){super(...e);this.value=undefined;this.useMap=true}set(...e){this.useMap=true;this.value=undefined;return super.set(...e)}clear(){this.value=undefined;return super.clear()}classCall(e){this.clear();this.useMap=false;this.value=e;return this.parent}entries(){if(this.useMap){return super.entries()}return this.value}values(){if(this.useMap){return super.values()}return this.value}}}},262:function(e){function webpackEmptyContext(e){var t=new Error("Cannot find module '"+e+"'");t.code="MODULE_NOT_FOUND";throw t}webpackEmptyContext.keys=function(){return[]};webpackEmptyContext.resolve=webpackEmptyContext;webpackEmptyContext.id=262;e.exports=webpackEmptyContext}};var t={};function __nccwpck_require__(n){var s=t[n];if(s!==undefined){return s.exports}var i=t[n]={exports:{}};var r=true;try{e[n].call(i.exports,i,i.exports,__nccwpck_require__);r=false}finally{if(r)delete t[n]}return i.exports}!function(){__nccwpck_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}();if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(198);module.exports=n})();