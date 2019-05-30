function Node(host, port) {
    this.host = host;
    this.port = port;
    this.getHost = function () {
        return this.host;
    };
    this.address = function () {
        return this.host + ":" + this.port;
    }
}

function Tls(tlsCertFilePath, tlsPrivateKeyPath) {
    this.tlsCertFilePath = tlsCertFilePath;
    this.tlsPrivateKeyPath = tlsPrivateKeyPath;
}

module.exports = {
    Node: Node,
    Tls: Tls
};





