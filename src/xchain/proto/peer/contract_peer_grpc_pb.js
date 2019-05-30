// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var peer_contract_peer_pb = require('../peer/contract_peer_pb.js');
var peer_contractID_pb = require('../peer/contractID_pb.js');

function serialize_peer_ContractPeerReply(arg) {
  if (!(arg instanceof peer_contract_peer_pb.ContractPeerReply)) {
    throw new Error('Expected argument of type peer.ContractPeerReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_peer_ContractPeerReply(buffer_arg) {
  return peer_contract_peer_pb.ContractPeerReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_peer_ContractPeerRequest(arg) {
  if (!(arg instanceof peer_contract_peer_pb.ContractPeerRequest)) {
    throw new Error('Expected argument of type peer.ContractPeerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_peer_ContractPeerRequest(buffer_arg) {
  return peer_contract_peer_pb.ContractPeerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContractPeerServiceService = exports.ContractPeerServiceService = {
  getState: {
    path: '/peer.ContractPeerService/getState',
    requestStream: false,
    responseStream: false,
    requestType: peer_contract_peer_pb.ContractPeerRequest,
    responseType: peer_contract_peer_pb.ContractPeerReply,
    requestSerialize: serialize_peer_ContractPeerRequest,
    requestDeserialize: deserialize_peer_ContractPeerRequest,
    responseSerialize: serialize_peer_ContractPeerReply,
    responseDeserialize: deserialize_peer_ContractPeerReply,
  },
};

exports.ContractPeerServiceClient = grpc.makeGenericClientConstructor(ContractPeerServiceService);
