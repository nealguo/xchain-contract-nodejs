// 版本模型
function Version() {
    this.blockNum = 0;
    this.txNum = 0;
}

// 写集合模型
function RwSetWrite() {
    this.key = "";
    this.value = "";
    this.delete = false;
    this.collection = "";
    this.appHash = "";
}

// 读集合模型
function RwSetRead() {
    this.key = "";
    this.version = null;
    this.collection = "";
}

// 交易模型
function Transaction() {
    this.txId = 0;
    this.invoke = "";
    this.contract = "";
    this.writes = null;
    this.reads = null;
    this.version = null;
    this.channelName = "";
    this.offset = 0;
    this.hash = "";
}

// 合约调用后返回值对应的模型
function ResponseModel() {
    this.value = "";
    this.transaction = null;
}

// 存储在状态库中的状态的模型
function StateModel() {
    this.value = "";
    this.version = null;
}


module.exports = {
    RwSetWrite: RwSetWrite,
    RwSetRead: RwSetRead,
    Transaction: Transaction,
    ResponseModel: ResponseModel,
    StateModel: StateModel
};