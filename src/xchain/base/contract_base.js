const base = require("../proto/contract/peer_contract_grpc_pb.js");
const peer = require("../proto/peer/contract_peer_grpc_pb.js");
const grpc = require("grpc");
const fs = require("fs");

const config = require("../config/config.js");
const contract = require("../../main/nodejs/contract/user_contract");
const client = require("../client/client.js");

function start(server, remote) {
    // 初始化配置
    let tlsCertFilePath = "../../data/cert/tls/server.crt";
    let tlsPrivateKeyPath = "../../data/cert/tls/server.pem";
    let tls = new config.Tls(tlsCertFilePath, tlsPrivateKeyPath);

    // 启动服务端和客户端
    let actions = [];
    actions.push(startServer(server, tls));
    actions.push(startClient(remote, tls));
    Promise.all(actions);

    console.log("Succeeded to start Server and Client");
    return true;
}

// Start Server side of Contract
function startServer(node, tls) {
    // 监听指定地址和端口
    let addr = node.address();
    let server = new grpc.Server();

    // 添加PeerContractService服务
    server.addService(base.PeerContractServiceService, {invoke: contract.invoke});

    // 增加TLS并启动服务端
    let cert = fs.readFileSync(tls.tlsCertFilePath);
    let key = fs.readFileSync(tls.tlsPrivateKeyPath);
    server.bind(addr, grpc.ServerCredentials.createSsl(cert, [{private_key: key, cert_chain: cert}], false));
    server.start();

    console.log("Server started, listen on " + addr + " with TLS")
}

// Start Client and connect to Peer
function startClient(node, tls) {
    // 监听指定地址和端口
    let addr = node.address();

    // 增加TLS
    let cert = fs.readFileSync(tls.tlsCertFilePath);
    let key = fs.readFileSync(tls.tlsPrivateKeyPath);
    const options = {
        'grpc.ssl_target_name_override': 'localhost',
        'grpc.default_authority': 'localhost'
    };
    let c = new peer.ContractPeerServiceClient(addr, grpc.credentials.createSsl(cert, key, cert), options);

    // 初始化客户端
    client.setPeerClient(c);

    console.log("Client started, connected to " + addr + " With TLS")
}

module.exports = {
    start: start
};