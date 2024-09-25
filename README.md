# @wellcare/muot-ui
>
> UI là phải mượt
>

[![Build Status](https://ci.mhealthvn.com/api/badges/Wellcare/muot-ui/status.svg)](https://ci.mhealthvn.com/Wellcare/muot-ui)

We follow [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), this repo contain the `molecules` components. It is built from the `atomic` components of the existing tailwind UI frameworks, see [all atomic components here](./docs/atomic-components.md).

From the perspective of container/presentation or [container/view pattern](https://www.patterns.dev/vue/container-presentational), all the components in this repo fit with the `view layer`.

To build custom component, [refer this this guide](https://tailwind.primevue.org/guides/building-ui-library/).

### Test Coverage

| Statements                                                                         | Branches                                                                       | Functions                                                                        | Lines                                                                    |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-42.45%25-red.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-16.66%25-red.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-42.45%25-red.svg?style=flat) |

## Features
  - Follow Atomic Design
-   TailwindCSS
-   Components extended from PrimeVue (and other popular component libraries) 
-   Auto Imports, customizable prefix (default `w`)

## Quick setup

1. Add `@wellcare/muot-ui` dependency to your project

```bash
pnpm install @wellcare/muot-ui
```

2. Add `@wellcare/muot-ui` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    '@wellcare/muot-ui',
  ],
}
```

## Options

You can override the `@wellcare/muot-ui` defaults like this:

```js
// nuxt.config.js
import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
    modules: ['@wellcare/muot-ui'],
    'muot-ui': {
        prefix: 'w',
        level: 1
    },
})
```

## Development

1. Clone this repository
2. Install dependencies using `pnpm install`
3. Start development server using `pnpm dev`