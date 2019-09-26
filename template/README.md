# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
$ yarn
# serve with hot reload at localhost:9080
$ yarn dev
# build electron application for production
$ yarn build
{{#testing unit e2e}}
# run {{#unit}}unit{{/unit}}{{#unit}}{{#e2e}} & {{/e2e}}{{/unit}}{{#e2e}}end-to-end{{/e2e}} tests
yarn test
{{/testing}}
{{#if eslint}}
# lint all JS/Vue component files in `src/`
npm run lint
{{/if}}
```

## 自动更新配置

### 服务器配置

- 配置 `app-update.yml` url 字段
- 配置 `package.json` build.publish.url 字段

### 版本维护

#### 在新写功能时

- 在package.json中增加中版本号，如： 0.1.5 => 0.2.0
- 在package.json中修改版本的信息，

```json
...
"releaseInfo": {
  "releaseNotes": "新增订单基本配置,添加订单,订单收款功能,学科配置等功能"
},
...
```

#### 修复Bug时

- 在package.json中增加小版本号，如： 0.2.0 => 0.2.1
- 在package.json中修改版本的信息，

```json
...
"releaseInfo": {
  "releaseNotes": "修复Bugxxx"
},
...
```
