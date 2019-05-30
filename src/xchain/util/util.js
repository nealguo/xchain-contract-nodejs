const crypto = require('crypto');
const util = require('util');
const dateFormat = require('dateformat');

function newId() {
    return (new Date().getTime() + Math.random()) * 1000000;
}

function nowFormat() {
    let now = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
    return now.toString();
}

function txFormat(txId, invoke, contract, reads, writes) {
    return util.format("%d:%s:%s:%j:%j", txId, invoke, contract, reads, writes)
}

function sha256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

function toJson(obj) {
    try {
        return JSON.stringify(obj);
    } catch (e) {
        console.error("wrong when parse object json", e);
        return null;
    }
}

function parseJson(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error("wrong when parse json to object", e);
        return null;
    }
}

module.exports = {
    newId: newId,
    nowFormat: nowFormat,
    txFormat: txFormat,
    sha256: sha256,
    toJson: toJson,
    parseJson: parseJson,
};
