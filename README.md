# @wellcare/nuxt3-module-chart

> Nơi huyền thoại được sinh ra 🚀

## Introduction

This is a starter kit for developing Nuxt 3 modules. It provides a basic structure and essential tools to help you quickly begin building your own Nuxt 3 module.

## Features

-   Basic Nuxt 3 module structure
-   TypeScript support
-   Built-in testing with Vitest
-   Auto-import components (customizable)
-   Integrated Tailwind CSS and PrimeVue 4 (optional)
-   ESLint and Prettier integration for code quality assurance
-   Basic sign in oidc with keycloak

## Quick Setup

1. Clone this repository
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Develop your module in the `src` directory

## Usage in a Nuxt Project

1. Add the module to your Nuxt project:
    ```bash
    pnpm add -D @wellcare/nuxt3-module-chart
    ```
2. Add the module to your `nuxt.config.ts`:
    ```js
    export default defineNuxtConfig({
        modules: ['@wellcare/nuxt3-module-chart'],
    })
    ```

## Configuration

You can configure the module by adding a `nuxt3-module-chart` object in your `nuxt.config.ts`:

```js
export default defineNuxtConfig({
    modules: ['@wellcare/nuxt3-module-chart'],
    'nuxt3-module-chart': {
        // Your options here
        prefix: 'custom',
        // ...
    },
})
```

## Development

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>`

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

[MIT License](LICENSE)
