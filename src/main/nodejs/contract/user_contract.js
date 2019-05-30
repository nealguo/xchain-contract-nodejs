const reply = require("../../../xchain/reply/reply.js");
const stub = require("../../../xchain/stub/stub.js");
const model = require("../../../xchain/model/model.js");
const util = require("../../../xchain/util/util.js");
const env = require("../../../xchain/config/env.js");
const decimal = require("decimal.js");

var appId;

// 初始化合约的IDs
function init() {
    // TODO 用户需要关注的部分
    appId = "3606597710829453336";
    return (typeof (appId) !== "undefined" && appId.trim() !== "");
}

// 实现合约的对外接口
function invoke(call, callback) {
    // 参数检查
    if (call == null || callback == null) {
        console.error("empty params when calling Invoke of Contract");
        return;
    }

    let req = call.request;
    let method = req.getMethod();
    let channel = req.getChannelName();

    // 每次请求就创建一个stub，对应一个tx
    let tx = new model.Transaction();
    tx.txId = util.newId();
    let contract = new stub.ContractStub(appId, tx);
    contract.InitTx(method, env.getContractID().getName(), channel);

    // TODO 用户需要关注的部分
    let rep;
    switch (method) {
        case "initAccount": {
            rep = initAccount(req, contract);
            break;
        }
        case "queryAccount": {
            rep = queryAccount(req, contract);
            break;
        }
        case "querySingle": {
            rep = querySingle(req, contract);
            break;
        }
        case "transfer": {
            rep = transfer(req, contract);
            break;
        }
        case "enableOrDisable": {
            rep = enableOrDisable(req, contract);
            break;
        }
        default: {
            rep = reply.peerContractReplyError("Unsupported method " + method, req.getPeerIp());
            callback(null, rep);
            return;
        }
    }
    if (rep == null) {
        console.log("Wrong when calling %s of Contract", method);
        rep = reply.peerContractReplyError("Wrong when calling " + method, req.getPeerIp());
        callback(null, rep);
        return;
    }

    let rep2 = reply.handleReply(req, rep, contract);
    callback(null, rep2);
}

// 创建账户
function initAccount(req, contract) {
    // 检查参数
    let payload = req.getPayload();
    if (payload === "") {
        console.log("empty payload when calling " + req.getMethod());
        return null;
    }
    let params = util.parseJson(payload);
    if (params == null) {
        console.log("参数有误, payload:%s", payload);
        return reply.peerContractReplyError("参数有误", req.getPeerIp());
    }

    // 检查账户
    let key = params["key"];
    let state = contract.GetState(key);
    if (state !== "") {
        console.log("账户已存在, key:%s", key);
        return null;
    }

    // 创建帐户
    let balance = params["balance"];
    let now = util.nowFormat();
    let value = new Map();
    value["balance"] = balance;
    value["createTime"] = now;
    value["enable"] = true;
    value["lastOperate"] = now;

    let json = util.toJson(value);
    if (json == null) {
        console.log("账户初始化失败, key:%s", key);
        return reply.peerContractReplyError("账户初始化失败", req.getPeerIp());
    }
    contract.PutState(key, json);

    // 返回结果
    console.log("账户初始化成功, key:%s", key);
    return reply.peerContractReplySuccess("账户初始化成功", req.getPeerIp());
}

// 查询多个账户
function queryAccount(req, contract) {
    // 检查参数
    let payload = req.getPayload();
    if (payload === "") {
        console.log("empty payload when calling " + req.getMethod());
        return null;
    }
    let params = util.parseJson(payload);
    if (params == null) {
        console.log("参数有误, payload:%s", payload);
        return reply.peerContractReplyError("参数有误", req.getPeerIp());
    }

    // 查询多个账户
    let keys = params["keys"];
    let value = {};
    for (let idx = 0; idx < keys.length; idx++) {
        let key = keys[idx];
        value[key] = contract.GetState(key);
    }

    // 返回结果
    let result = util.toJson(value);
    if (result == null) {
        console.log("查询多个账户失败, keys:%j, result:%s", keys, result);
        return reply.peerContractReplyError("查询多个账户失败", req.getPeerIp());
    }
    console.log("查询多个账户成功, keys:%j, result:%s", keys, result);
    return reply.peerContractReplySuccess(result, req.getPeerIp());
}

// 查询单个账户
function querySingle(req, contract) {
    // 检查参数
    let payload = req.getPayload();
    if (payload === "") {
        console.log("empty payload when calling " + req.getMethod());
        return null;
    }
    let params = util.parseJson(payload);
    if (params == null) {
        console.log("参数有误, payload:%s", payload);
        return reply.peerContractReplyError("参数有误", req.getPeerIp());
    }

    // 查询单个账户
    let key = params["key"];
    let state = contract.GetState(key);

    // 检查参数
    console.log("查询单个账户成功, key:%s, state:%s", key, state);
    return reply.peerContractReplySuccess(state, req.getPeerIp());
}

// 转账
function transfer(req, contract) {
    // 检查参数
    let payload = req.getPayload();
    if (payload === "") {
        console.log("empty payload when calling " + req.getMethod());
        return null;
    }
    let params = util.parseJson(payload);
    if (params == null) {
        console.log("参数有误, payload:%s", payload);
        return reply.peerContractReplyError("参数有误", req.getPeerIp());
    }

    // 检查A账户
    let keyA = params["keyA"];
    let stateA = contract.GetState(keyA);
    if (stateA === "") {
        console.log("A账户不存在, keyA:%s", keyA);
        return null;
    }
    let valueA = util.parseJson(stateA);
    let enable = valueA["enable"];
    if (!enable) {
        console.log("A账户已禁用, keyA:%s", keyA);
        return null;
    }
    let balanceA = new decimal.Decimal(valueA["balance"]);
    let amount = new decimal.Decimal(params["amount"]);
    if (balanceA.lessThan(amount)) {
        console.log("A账户余额不足, keyA:%s", keyA);
        return null;
    }

    // 检查B账户
    let keyB = params["keyB"];
    let stateB = contract.GetState(keyB);
    if (stateB === "") {
        console.log("B账户不存在, keyB:%s", keyB);
        return null;
    }

    // 转账
    let now = util.nowFormat();
    valueA["balance"] = balanceA.sub(amount).toNumber();
    valueA["lastOperate"] = now;
    let jsonA = util.toJson(valueA);
    if (jsonA == null) {
        console.log("转账失败, keyA:%s, stateA:%s", keyA, stateA);
        return reply.peerContractReplyError("转账失败", req.getPeerIp());
    }
    let valueB = util.parseJson(stateB);
    let balanceB = new decimal.Decimal(valueB["balance"]);
    valueB["balance"] = balanceB.plus(amount).toNumber();
    valueB["lastOperate"] = now;
    let jsonB = util.toJson(valueB);
    if (jsonB == null) {
        console.log("转账失败, keyB:%s, stateB:%s", keyB, stateB);
        return reply.peerContractReplyError("转账失败", req.getPeerIp());
    }
    contract.PutState(keyA, jsonA);
    contract.PutState(keyB, jsonB);

    // 返回结果
    console.log("转账成功, keyA:%s, stateA:%s, keyB:%s, stateB:%s", keyA, stateA, keyB, stateB);
    return reply.peerContractReplySuccess("转账成功", req.getPeerIp());
}

// 启用或禁用
function enableOrDisable(req, contract) {
    // 检查参数
    let payload = req.getPayload();
    if (payload === "") {
        console.log("empty payload when calling " + req.getMethod());
        return null;
    }
    let params = util.parseJson(payload);
    if (params == null) {
        console.log("参数有误, payload:%s", payload);
        return reply.peerContractReplyError("参数有误", req.getPeerIp());
    }

    // 检查账户
    let key = params["key"];
    let state = contract.GetState(key);
    if (state === "") {
        console.log("账户不存在, key:%s", key);
        return null;
    }

    // 启用或禁用账户
    let value = util.parseJson(state);
    let enable = value["enable"];
    let now = util.nowFormat();
    value["enable"] = !enable;
    value["lastOperate"] = now;
    let json = util.toJson(value);
    if (json == null) {
        console.log("操作失败, key:%s", key);
        return reply.peerContractReplyError("操作失败", req.getPeerIp());
    }
    contract.PutState(key, json);

    // 返回结果
    let msg;
    if (enable) {
        msg = "禁用成功"
    } else {
        msg = "启用成功"
    }
    console.log("msg:%s, key:%s", msg, key);
    return reply.peerContractReplySuccess(msg, req.getPeerIp());
}

module.exports = {
    init: init,
    invoke: invoke
};