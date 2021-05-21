const path = require("path");

class ExtendedResolveAliasPlugin {
  constructor(alias = {}) {
    this.aliasMap = new Map(Object.entries(alias));
    this.aliasKeys = [...this.aliasMap.keys()];
  }
  apply(resolver) {
    resolver
      .getHook("resolve")
      .tapAsync(
        "ExtendedResolveAliasPlugin",
        (request, resolveContext, callback) => {
          const req = request.request;
          const matchedIndex = this.aliasKeys.findIndex((_key) =>
            req.startsWith(_key)
          );

          if (matchedIndex === -1) {
            return callback();
          }

          const alias = this.aliasKeys[matchedIndex];
          const restPath = req.replace(alias, "");
          const resolvePath = path.join(this.aliasMap.get(alias), restPath);
          const obj = Object.assign({}, request, {
            request: resolvePath,
          });

          return resolver.doResolve(
            resolver.ensureHook("resolve"),
            obj,
            null,
            resolveContext,
            callback
          );
        }
      );
  }
}

module.exports = ExtendedResolveAliasPlugin;
