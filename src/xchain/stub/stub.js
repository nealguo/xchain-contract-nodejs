const env = require("../config/env.js");
const client = require("../client/client.js");
const model = require("../model/model.js");
const util = require("../util/util.js");

function ContractStub(nodeId, tx) {
    this.nodeId = nodeId;
    this.tx = tx;
    this.InitTx = function (method, contract, channel) {
        this.tx.invoke = method;
        this.tx.contract = contract;
        this.tx.channelName = channel;
    };
    this.PrepareTxReads = function () {
        if (this.tx.writes == null) {
            return;
        }
        let read;
        let reads = [];
        for (let idx = 0; idx < this.tx.writes.length; idx++) {
            read = this.getTxRead(this.tx.writes[idx].key);
            if (read == null) {
                continue;
            }
            reads.push(read);
        }
        this.tx.reads = reads;
    };
    this.PrepareTxHash = function () {
        let reads = util.toJson(this.tx.reads);
        let writes = util.toJson(this.tx.writes);
        let info = util.txFormat(this.tx.txId, this.tx.invoke, this.tx.contract, reads, writes);
        this.tx.hash = util.sha256(info);
    };
    this.PutState = function (key, value) {
        this.modifyWrite(key.trim(), value.trim(), false);
    };
    this.DeleteState = function (key, value) {
        this.modifyWrite(key.trim(), "", true);
    };
    this.modifyWrite = function (key, value, del) {
        if (key === "") {
            return;
        }
        if (this.tx.writes == null) {
            this.tx.writes = [];
        }
        for (let idx = 0; idx < this.tx.writes.length; idx++) {
            if (this.tx.writes[idx].key === key) {
                this.tx.writes[idx].delete = del;
                this.tx.writes[idx].value = value;
                return;
            }
        }
        let w = new model.RwSetWrite;
        w.key = key;
        w.value = value;
        w.delete = del;
        w.collection = env.getContractID().getName();
        this.tx.writes.push(w);
    };
    this.GetState = function (key) {
        if (key === "") {
            console.log("Wrong when getting state, key is empty");
            return "";
        }
        let payload = client.getState(this.tx.channelName, this.nodeId, key);
        if (payload == null) {
            console.log("Wrong when getting state, key:%s", key);
            return "";
        }
        let state = util.parseJson(payload);
        if (state == null) {
            console.log("Wrong when deserializing json, payload:%s", payload);
            return "";
        }
        return state.value;
    };
    this.getTxRead = function (key) {
        if (key === "") {
            console.log("Wrong when getting tx read, key is empty");
            return null;
        }
        let payload = client.getState(this.tx.channelName, this.nodeId, key);
        if (payload == null) {
            console.log("Wrong when getting tx read, key:%s", key);
            return null;
        }
        let state = util.parseJson(payload);
        if (state == null) {
            console.log("Wrong when deserializing json, payload:%s", payload);
            return null;
        }
        let read = new model.RwSetRead;
        read.key = key;
        read.version = state.version;
        read.collection = env.getContractID().getName();
        return read;
    }
}

module.exports = {
    ContractStub: ContractStub
};