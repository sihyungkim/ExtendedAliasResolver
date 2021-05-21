# ExtendedAliasResolver
Webpack Extended Alias Resolver Plugin

webpack.resolve.alias에서 `@assets`형식은 지원하나, `@/assets`와 같이 `/`가 포함된 key형식은 지원하지 않는다.   
그것을 지원하는 plugin이다.

```js

const path = require("path");
const ExtendedAliasResolver = require("./ExtendedAliasResolver");

module.exports = {
  configureWebpack: {
    resolve: {
      plugins: [
        new ExtendedAliasResolver({
          "@/assets": path.resolve(__dirname, "src/common/assets"),
          "@/components": path.resolve(__dirname, "src/common/components"),
          "@/layout": path.resolve(__dirname, "src/common/layout"),
        }),
      ],
    },
  },
};


```
