# @fatcherjs/middleware-parameter

<div align="center">
  <a href="https://codecov.io/github/fatcherjs/middleware-parameter" > 
    <img src="https://codecov.io/github/fatcherjs/middleware-parameter/graph/badge.svg?token=KG7N2RC406"/> 
 </a>
  <a href="https://www.jsdelivr.com/package/npm/@fatcherjs/middleware-parameter">
    <img src="https://data.jsdelivr.com/v1/package/npm/@fatcherjs/middleware-parameter/badge?style=rounded" alt="jsDelivr">
  </a>
  <a href="https://packagephobia.com/result?p=@fatcherjs/middleware-parameter">
    <img src="https://packagephobia.com/badge?p=@fatcherjs/middleware-parameter" alt="install size">
  </a>
  <a href="https://unpkg.com/@fatcherjs/middleware-parameter">
    <img src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-parameter" alt="Size">
  </a>
  <a href="https://npmjs.com/package/@fatcherjs/middleware-parameter">
    <img src="https://img.shields.io/npm/v/@fatcherjs/middleware-parameter.svg" alt="npm package">
  </a>
  <a href="https://github.com/fatcherjs/middleware-parameter/actions/workflows/ci.yml">
    <img src="https://github.com/fatcherjs/middleware-parameter/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status">
  </a>
</div>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-parameter
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-parameter/dist/index.min.js"></script>

<script>
  Fatcher.fatcher('url', {
    middlewares: [FatcherMiddlewareParameter],
    params: {
      foo: 'bar',
    },
  }).then(response => {
    console.log(response);
  });
</script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { parameter } from '@fatcherjs/middleware-parameter';

fatcher('https://foo.bar', {
  params: {
    foo: 'bar',
  },
  middlewares: [parameter],
}); // url is https://foo.bar?foo=bar
```

## Options

### serializer

```ts
import qs from 'qs;
import { fatcher } from 'fatcher';
import { parameter, Serializer } from '@fatcherjs/middleware-parameter';

const serializer: Serializer = (params) => qs.stringify(params);

fatcher('https://foo.bar', {
  params: {
    foo: 'bar',
  },
  serializer,
  middlewares: [parameter],
});
```

## License

[MIT](https://github.com/fatcherjs/middleware-parameter/blob/master/LICENSE)
