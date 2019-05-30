const env = require("./config/env.js");
const config = require("./config/config.js");
const base = require("./base/contract_base.js");
const contract = require("../main/nodejs/contract/user_contract.js");

function main() {
    console.log("Env is preparing...");
    if (!env.prepare()) {
        console.error("Wrong when Env preparing");
        return;
    }

    console.log("Contract is initializing...");
    if (!contract.init()) {
        console.error("Wrong when initializing contract");
        return;
    }

    console.log("Server and Client is staring...");
    let server = new config.Node("0.0.0.0", env.getContractPort());
    let client = env.getPeerNode();
    if (!base.start(server, client)) {
        console.error("Wrong when starting server and client");
        return
    }

    console.log("--- Success, user contract is ready now ---");
}

main();