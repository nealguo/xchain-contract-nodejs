// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_contract_peer_contract_pb = require('../../proto/contract/peer_contract_pb.js');

function serialize_contract_PeerContractReply(arg) {
  if (!(arg instanceof proto_contract_peer_contract_pb.PeerContractReply)) {
    throw new Error('Expected argument of type contract.PeerContractReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contract_PeerContractReply(buffer_arg) {
  return proto_contract_peer_contract_pb.PeerContractReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_contract_PeerContractRequest(arg) {
  if (!(arg instanceof proto_contract_peer_contract_pb.PeerContractRequest)) {
    throw new Error('Expected argument of type contract.PeerContractRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_contract_PeerContractRequest(buffer_arg) {
  return proto_contract_peer_contract_pb.PeerContractRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var PeerContractServiceService = exports.PeerContractServiceService = {
  invoke: {
    path: '/contract.PeerContractService/invoke',
    requestStream: false,
    responseStream: false,
    requestType: proto_contract_peer_contract_pb.PeerContractRequest,
    responseType: proto_contract_peer_contract_pb.PeerContractReply,
    requestSerialize: serialize_contract_PeerContractRequest,
    requestDeserialize: deserialize_contract_PeerContractRequest,
    responseSerialize: serialize_contract_PeerContractReply,
    responseDeserialize: deserialize_contract_PeerContractReply,
  },
};

exports.PeerContractServiceClient = grpc.makeGenericClientConstructor(PeerContractServiceService);
