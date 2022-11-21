<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![MIT License][react.js]][react-url]

<div>
  <img alt="npm" src="https://github.com/AndrewWalsh/react-persist-store/actions/workflows/node.js.yml/badge.svg">

  <img alt="npm" src="https://img.shields.io/npm/v/react-persist-store">
</div>

<div>
  <a href="https://codeclimate.com/github/AndrewWalsh/react-persist-store/maintainability"><img src="https://api.codeclimate.com/v1/badges/65e4f98c2e583c6b7871/maintainability" /></a>

  <a href="https://codeclimate.com/github/AndrewWalsh/react-persist-store/test_coverage"><img src="https://api.codeclimate.com/v1/badges/65e4f98c2e583c6b7871/test_coverage" /></a>
</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AndrewWalsh/react-persist-store">
    <img src="https://raw.githubusercontent.com/AndrewWalsh/react-persist-store/main/resources/logo.svg" alt="Logo">
  </a>

<h3 align="center">react-persist-store</h3>

  <p align="center">
    ⚡ A persistent state management library for React. Create your own hooks that share data across components
    <br />
    <br />
    <br />
    <a href="https://andrewwalsh.github.io/react-persist-store/">View Demo</a>
    ·
    <a href="https://github.com/AndrewWalsh/react-persist-store/issues">Report Bug</a>
    ·
    <a href="https://www.npmjs.com/package/react-persist-store">View on npm</a>
  </p>
</div>

<br />
<br />

<!-- ABOUT THE PROJECT -->

Create your own hooks that share state. Initialise your store with default values and use an API that infers type information for you.

**Features**

- **Persistence**: data is serialised and persisted to local storage by default, and hydrated automatically
- **Type safety**: full TypeScript integration with type inference from default values
- **Reactive design**: state updates are shared across components
- **Simplicity**: does not require any component wrapping, or use of other abstractions such as the [Context API](https://reactjs.org/docs/context.html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

At a high level, it is generally suggested to create a `store.ts` file in which you set up your exported hook functions. Then these can be imported and used in components.

### Installation

1. Install NPM package
   ```sh
   npm install react-persist-store
   ```
2. Set up your `Store` and create your `hook`

   ```ts
   import createStore, { Store } from "react-persist-store";

   const defaultValues: Store = {
     user: {
       firstName: "",
       lastName: "",
       badges: [], // In TypeScript this is never[], you can change this behaviour with createStore<YourStoreType>(...)
     },
     posts: [
       /** ... */
     ],
   };

   // You can pass options to customise the type of storage, "local", "session", or false to disable persistence
   // const store = createStore(defaultValues, { storage: 'session', namespace: 'custom' });
   const createHook = createStore(defaultValues);

   export const useUser = createHook("user")
   ```
3. Use the `hook` anywhere in your application
    ```tsx
    import { useUser } from "./store"

    const Component = () => {
      // Hooks do not take arguments, and return only:
      //  data - your data with types inferred from your store, or the generic you passed in
      //  update - a function what takes a partial copy of data to update
      //  clearAll - clear all state, including browser storage for this hook
      const { data, update, clearAll } = useUser()
      const { firstName, lastName } = data
      const fullName = `${firstName}${lastName ? ' ' + lastName : ''}`
      return (
        <p>
          {fullName}
        </p>
      )
    }

    export default Component
    ````

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE AND HOW IT WORKS -->

## Usage and How It Works

The library exports a default function which takes a type of `Store`. This is just an object where keys are a namespace to a `Document`.

A `Document` is any object that can be serialised into JSON. That is, any data type that is one of `null`, `number`, `string`, `boolean`, or an `array` or `object` containing any combination of these.

This limitation is enforced, and this library is not suitable for storing data that is not serialisable.

When you call `createStore` you get back a function that can create hooks.

```ts
import createStore, { Store, Document } from 'at-your-service'

const document: Document = { example: '' }
const defaultValues: Store = {
  namespaceName: document
}

const createHook = createStore(defaultValues);
```

You can create as many namespace names as you wish. Each refers to a `Document` type.

The next step is to create hooks themselves. When you call `createHook` above, a closure is created that contains an `event emitter`. This event emitter is shared under the hood to users of the hook, and permits them to share updates to state.

The name that you pass to `createHook` is restricted to `keyof typeof defaultValues`. In other words, it has to be a key (a namespace name) in the top level of the default values passed to `createStore`.

```ts
export useStore = createHook("namespaceName")
```

Each created hook is called without arguments. Once called, no further action is required on the part of the hook.

Unless disabled, the hook first attempt to hydrate state from browser storage, based on its namespace name. This gets it up to date with the current state as updates to state are synchronised with browser storage. If this does not exist, then state is initialised from the default values.

It then returns an object with three properties:

- **data**: is your (typed) data
- **update**: takes a partial or full copy of your data and updates component state and local storage
- **clearAll**: clears browser state associated with the hook and resets data to the default value

```tsx
import { useUser } from "./<file_exporting_hook>"

const Component = () => {
  const { data, update, clearAll } = useUser()
  return <p>{data.example}</p>
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/AndrewWalsh/react-persist-store.svg?style=for-the-badge
[contributors-url]: https://github.com/AndrewWalsh/react-persist-store/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AndrewWalsh/react-persist-store.svg?style=for-the-badge
[forks-url]: https://github.com/AndrewWalsh/react-persist-store/network/members
[stars-shield]: https://img.shields.io/github/stars/AndrewWalsh/react-persist-store.svg?style=for-the-badge
[stars-url]: https://github.com/AndrewWalsh/react-persist-store/stargazers
[issues-shield]: https://img.shields.io/github/issues/AndrewWalsh/react-persist-store.svg?style=for-the-badge
[issues-url]: https://github.com/AndrewWalsh/react-persist-store/issues
[license-shield]: https://img.shields.io/github/license/AndrewWalsh/react-persist-store.svg?style=for-the-badge
[license-url]: https://github.com/AndrewWalsh/react-persist-store/blob/master/LICENSE
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
