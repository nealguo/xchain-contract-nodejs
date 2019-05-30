const config = require("./config.js");
const contract = require("../proto/peer/contractID_pb");

var peerNode;
var contractPort;
var contractID;

function prepare() {
    // contract port
    let cPort = process.env.CONTRACT_PORT;
    if (typeof(cPort) == "undefined") {
        console.error("wrong port of Contract, CONTRACT_PORT is empty");
        return false;
    }
    contractPort = parseInt(cPort);

    // contract info
    contractID = new contract.ContractID();
    contractID.setPath(process.env.CONTRACT_PATH);
    contractID.setName(process.env.CONTRACT_NAME);
    contractID.setVersion(process.env.CONTRACT_VERSION);
    contractID.setType("2"); // 用户合约
    contractID.setLanguageType("4");// Node.js

    // peer info
    let peerHost = process.env.PEER_ADDRESS;
    if (typeof(peerHost) == "undefined") {
        peerHost = "127.0.0.1";
        console.log("Use 127.0.0.1 as Peer host");
    }
    let pPort = process.env.PEER_PORT;
    if (typeof(pPort) == "undefined") {
        pPort = "50051";
        console.log("Use 50051 as Peer port");
    }
    let peerPort = parseInt(pPort);
    peerNode = new config.Node(peerHost, peerPort);
    return true;
}

function getPeerNode() {
    return peerNode;
}

function getContractPort() {
    return contractPort;
}

function getContractID() {
    return contractID;
}

module.exports = {
    prepare: prepare,
    getPeerNode: getPeerNode,
    getContractPort: getContractPort,
    getContractID: getContractID
};