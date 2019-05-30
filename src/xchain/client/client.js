const pb = require("../proto/peer/contract_peer_pb");
const env = require("../config/env.js");
const deasync = require('deasync');

var peerClient;

function setPeerClient(client) {
    peerClient = client;
}

function getState(channel, nodeId, key) {
    let req = new pb.ContractPeerRequest();
    req.setContractId(env.getContractID());
    req.setKey(key);
    req.setNodeId(nodeId);
    req.setChannelName(channel);

    let sync = true;
    let retries = 0;
    let state = null;
    peerClient.getState(req, function (err, resp) {
        if (err) {
            console.error("Wrong when getting state, req:%j, err:%j", req, err);
            sync = false;
            return;
        }
        state = resp.getPayload();
        sync = false;
    });
    while (sync && retries < 10) {
        // 同步等待，避免线程阻塞和CPU过高
        deasync.sleep(100);
        retries++;
    }

    if (state === "") {
        state = null;
    }
    return state;
}

module.exports = {
    setPeerClient: setPeerClient,
    getState: getState
};