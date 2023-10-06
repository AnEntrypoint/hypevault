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

To use the project, you need to generate a root keypair and derive keys from it. The keys are managed in the 'gui/src/stores.js' and 'gui/src/seed.js' files.

## Server

The server is set up in the 'api/server.js' file. It uses the 'nodes.js' file to create a vault.

## Contributing

If you want to contribute to the project, you can submit issues and pull requests. Please follow the coding standards and guidelines provided in the 'CONTRIBUTING.md' file.

## License

For information on the project's license, see the 'LICENSE' file.
