const pb = require("../proto/contract/peer_contract_pb.js");
const model = require("../model/model.js");
const util = require("../util/util.js");
const env = require("../config/env.js");
const Code = require("../config/constants.js");

function handleReply(req, reply, contract) {
    // 参数检查
    if (req == null || reply == null || contract == null) {
        return reply;
    }
    let code = reply.getCode();
    if (code !== Code.Success) {
        return reply;
    }

    // 准备读集合和交易哈希
    contract.PrepareTxReads();
    contract.PrepareTxHash();

    // 返回结果
    let resp = new model.ResponseModel();
    resp.value = reply.getPayload();
    resp.transaction = contract.tx;
    let payload = util.toJson(resp);
    if (payload == null) {
        return peerContractReplyError("wrong when parse response to json", req.getPeerIp());
    }
    return peerContractReplySuccess(payload, req.getPeerIp());
}

function peerContractReply(status, msg, payload, peerIp) {
    let reply = new pb.PeerContractReply();
    reply.setCode(status);
    reply.setMessage(msg);
    reply.setPayload(payload);
    let peerNode = env.getPeerNode();
    if (peerNode.getHost() === peerIp) {
        reply.setIsOriginal(true);
    } else {
        reply.setIsOriginal(false);
    }
    return reply;
}

function peerContractReplySuccess(payload, peerIp) {
    return peerContractReply(Code.Success, "success", payload, peerIp);
}

function peerContractReplyError(msg, peerIp) {
    return peerContractReply(Code.Error, msg, "payload", peerIp);
}

module.exports = {
    handleReply: handleReply,
    peerContractReplySuccess: peerContractReplySuccess,
    peerContractReplyError: peerContractReplyError
};