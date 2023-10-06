# hypevault

Hypevault is a SvelteKit vault for key management and remote server management. It allows a remote server to install modules that can then provide to a decentralized network of computers as RPC calls. The project stores a root keypair from which it can derive multiple keys. The keys have multiple hosts that advertise that they're responding to that key. Each host has multiple modules (called nodes) that can have their installations triggered from the vault.

## Prerequisites

Before setting up the project, you need to have the following software installed on your machine:

- Node.js
- npm

## Setup

To set up the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies by running `npm install`.
4. Start the development server by running `npm run dev`.

## Usage

To use the project, you first need to generate a root keypair. This can be done by using the `generateRootKeypair` function in the 'gui/src/seed.js' file. The function will return a root keypair which can be stored for later use.

Once you have a root keypair, you can derive keys from it. This is done by using the `deriveKeys` function in the 'gui/src/stores.js' file. The function takes the root keypair as an argument and returns a set of derived keys.

## Server

The server is set up in the 'api/server.js' file. To set up the server, you need to run the `setupServer` function in the 'api/server.js' file. The function takes the derived keys as an argument and sets up the server to use these keys.

The 'nodes.js' file is used to create a vault. To create a vault, you need to run the `createVault` function in the 'nodes.js' file. The function takes the derived keys as an argument and creates a vault that can be used to store and manage the keys.

## Contributing

If you want to contribute to the project, you can submit issues and pull requests. Please follow the coding standards and guidelines provided in the 'CONTRIBUTING.md' file.

## License

For information on the project's license, see the 'LICENSE' file.
