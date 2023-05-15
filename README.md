# HOW I MAKE A PLAY FOR BLOB TRANSACTION WITH CELESTIA NETWORK(BLOCKSPACE RARE)
This project is a full-stack project that includes both frontend source code and backend source code to guide the construction of an interactive system and send Play For Blob transactions on the Celestia network.

First, if you're not familiar with what a Play For Blob transaction is, please refer to the following link: `https://docs.celestia.org/developers/node-tutorial/#submit-a-pfb-transaction`

Here's a summary of the process:

Prerequisites:

 * Run a Celestia network node (fullnode-lightnode)
 * Prepare the required parameters for a Play For Blob (PFB) transaction:
    * namespace_id
    * data
    * gas_limit
    * fee
    * Send a POST request to the running network node's port 26659 (http://localhost:26659/submit_pfb) and wait for the response.
Therefore, we need to prepare the following conditions:

 * Run a fullnode or lightnode for the Celestia network.
 * Have a faucet to obtain enough tokens to pay the PFB submission fee.
 * Build a backend system to act as an intermediary between the external frontend and the network node. It can also perform additional tasks like checking node parameters.
 * Build a frontend system to allow users to interact and create PFB transactions to gain a better understanding of this transaction type. Include links to external explorers for exploring the details of each transaction.

 Yo! We've got our goal, let's get started with the build.

## 1. Backend Server
 First, I will build the Backend system using the NodeJS framework. This is a platform that I am familiar with and is also beginner-friendly.

I plan to implement the following features for the Backend system:
 * Check the TIA token balance of the system wallet.
 * Check the node parameters (e.g., uptime score%) to ensure the node is functioning properly.
 * Encode user-inputted namespace and data into the required hexadecimal format for PFB.
 * Generate curl commands for users to create PFB transactions on their own nodes.
 * Retrieve a list of created PFB transactions.
For these features, I will need to build 5 controllers to handle the 5 types of requests. It is recommended to use clear and understandable names for each type.
For tasks that only require interaction with localhost (such as checking balances and node parameters), I will use axios for sending requests.
For encoding the namespace and data into the input format for PFB, we can use byte-to-hex conversion functions to execute the process.
For retrieving the transaction list, we will use a MySQL database to store successfully created transactions. Then, we can query the database to return the requested list.
Deployment steps:

 1. Change directory to ./backend
 2. Run `yarn` to install dependencies.
 3. Update your environment variables.
 4. Run backend by pm2 `pm2 start ecosystem.config.js && pm2 save`

## 2. Frontend
For the frontend, we will use ReactJS to build the user interface.

A small note is that Celestia is a network built on the Cosmos SDK, so we will use wallets like Keplr to manage tokens and transactions on it. Although we currently cannot directly send a PFB transaction from the Keplr wallet to the Celestia network, I still want to add the feature of connecting with Keplr as a prerequisite for future integration.

I will design our website with three main sections:

Information section: Display system wallet address, balance, logo, and introductory information.
User guidance section: Help users learn how to create a PFB transaction (Generate Command, Submit Transaction).
Exploration section: Explore the history of created PFB transactions.
We already have backend APIs to support querying the balance and creating command and submit transaction APIs.

For the transaction history section, we will use a Listview to display the transactions, and we will insert links to explore the details of each PFB transaction on Mintscan.

Finally, we will proceed with coding, optimize the user interface, and achieve the our goals.

Deployment steps:

 1. Change directory to ./frontend
 2. Run `yarn` to install dependencies.
 3. Update your environment variables.
 4. Run `yarn dev` for dev & `yarn build` for production enviroment.

Please experience the results we have achieved at: https://pfb.thinhpn.com/

Happy Coding!

