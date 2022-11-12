<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

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
    A simple hook-based type-safe store for React with out-of-the-box browser persistence
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

A persistent storage abstraction for React backed by TypeScript.

**Features**

- Store and persist data to browser storage by default
- Declare default values and all types will be inferred automatically
- Share state across multiple components with a functional approach to store creation

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
   import createStore from "react-persist-store";

   // Types will be inferred from defaultStoreValues
   const defaultStoreValues = {
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
   // const store = createStore(defaultStoreValues, { storage: 'session', namespace: 'custom' });
   const store = createStore(defaultStoreValues);

   export const useUser = store("user")
   ```
3. Use the `hook` anywhere in your application
    ```ts
    import { useUser } from "./store"

    const Component = () => {
    // Hooks do not take arguments, and return only:
    // data - your data with types inferred from your store, or the generic you passed in
    // update - a function what takes a partial copy of data to update
    // clearAll - clear all state, including browser storage for this hook
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
