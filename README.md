<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![MIT License][react.js]][react-url]

<img alt="npm" src="https://img.shields.io/npm/v/react-persist-store">

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AndrewWalsh/react-persist-store">
    <img src="https://raw.githubusercontent.com/AndrewWalsh/react-persist-store/main/resources/logo.svg" alt="Logo">
  </a>

<h3 align="center">react-persist-store</h3>

  <p align="center">
    A reactive hook-based type-safe store for React with out-of-the-box browser persistence
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

Create your own hooks that share state. Initialise your store with default values, and type information will be inferred automatically to provide a type safe API.

**Features**

- **Persistence to browser storage**: data is persisted to local storage by default
- **Type safety**: type information is inferred from default values to provide full TypeScript integration
- **Reactive**: through [event emitters](https://nodejs.org/docs/latest/api/events.html) and [Reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) each component using a hook shares state. An update in one component using a hook will update another using the same hook
- **Simplicity**: does not require any component wrapping, or use of other abstractions such as the [Context API](https://reactjs.org/docs/context.html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

In `react-persist-hook` data is written to local storage by default. Types are inferred from the default values passed to the `createStore` function.

`createStore` returns another function that is called with a key at the top level of the store. This provides a `hook` function that is called without arguments.

### Installation

1. Install NPM package
   ```sh
   npm install react-persist-store
   ```
2. Set up your `Store` and create your `hook`

   ```ts
   import createStore, { Store } from "react-persist-store";

   // Types will be inferred from defaultValues
   const defaultValues: Store = {
     // Here user is a namespace to a particular Document store
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
   // The namespace is prepended to keys in browser storage to separate them from other state
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

<!-- USAGE -->

## Usage and How It Works

The library exports a default function which takes a type of `Store`. This is just an object of key strings that reference the hook namespace and `Document` types.

A `Document` is any object that can be serialised into JSON. That is, any data type that is one of `null`, `number`, `string`, `boolean`, or an `array` or `object` containing any combination of these.

This limitation is enforced, and this library is not suitable for storing data that is not serialisable.

```ts
import createStore, { Store, Document } from 'at-your-service'

const document: Document = { example: '' }
const defaultValues: Store = {
  namespaceName: document
}

const createHook = createStore(defaultValues);
```

You can create as many namespace names as you wish.

The next step is to create a hook. When you call `createHook` in the example above, a closure is created that contains an `event emitter`. This event emitter permits each component to share state, as when one component calls update an emitted event ensures other subscribed components follow.

The name that you pass to `createHook` is restricted to `keyof typeof defaultValues`. In other words, it has to be a key in the top level of the default values passed to `createStore`.

```ts
export useStore = createHook("namespaceName")
```

Each created hook is called without arguments. Once called, no further action is required on the part of the hook.

Unless disabled, the hook first hydrates state from browser storage. This gets is up to date with the current state as updates to state are synchronised with browser storage. If this does not exist, then state is initialised from the default values.

It then returns an object with three properties:

- **data**: is your (typed) data
- **update**: takes a partial or full copy of your data and updates it
- **clearAll**: clears browser state for the hook, and resets hook state for all users of the hook to the default values

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
