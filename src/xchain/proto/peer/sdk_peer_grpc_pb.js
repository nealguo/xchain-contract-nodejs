// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var peer_sdk_peer_pb = require('../peer/sdk_peer_pb.js');
var peer_contractID_pb = require('../peer/contractID_pb.js');

function serialize_peer_ContractSpec(arg) {
  if (!(arg instanceof peer_sdk_peer_pb.ContractSpec)) {
    throw new Error('Expected argument of type peer.ContractSpec');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_peer_ContractSpec(buffer_arg) {
  return peer_sdk_peer_pb.ContractSpec.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_peer_SdkPeerReply(arg) {
  if (!(arg instanceof peer_sdk_peer_pb.SdkPeerReply)) {
    throw new Error('Expected argument of type peer.SdkPeerReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_peer_SdkPeerReply(buffer_arg) {
  return peer_sdk_peer_pb.SdkPeerReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_peer_SdkPeerRequest(arg) {
  if (!(arg instanceof peer_sdk_peer_pb.SdkPeerRequest)) {
    throw new Error('Expected argument of type peer.SdkPeerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_peer_SdkPeerRequest(buffer_arg) {
  return peer_sdk_peer_pb.SdkPeerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SdkPeerServiceService = exports.SdkPeerServiceService = {
  initContract: {
    path: '/peer.SdkPeerService/initContract',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.ContractSpec,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_ContractSpec,
    requestDeserialize: deserialize_peer_ContractSpec,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  stopContract: {
    path: '/peer.SdkPeerService/stopContract',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  removeContract: {
    path: '/peer.SdkPeerService/removeContract',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  invoke: {
    path: '/peer.SdkPeerService/invoke',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  verificationTransaction: {
    path: '/peer.SdkPeerService/verificationTransaction',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  query: {
    path: '/peer.SdkPeerService/query',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  uploadFile: {
    path: '/peer.SdkPeerService/uploadFile',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  downloadFile: {
    path: '/peer.SdkPeerService/downloadFile',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  listGroups: {
    path: '/peer.SdkPeerService/listGroups',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
  getCerts: {
    path: '/peer.SdkPeerService/getCerts',
    requestStream: false,
    responseStream: false,
    requestType: peer_sdk_peer_pb.SdkPeerRequest,
    responseType: peer_sdk_peer_pb.SdkPeerReply,
    requestSerialize: serialize_peer_SdkPeerRequest,
    requestDeserialize: deserialize_peer_SdkPeerRequest,
    responseSerialize: serialize_peer_SdkPeerReply,
    responseDeserialize: deserialize_peer_SdkPeerReply,
  },
};

exports.SdkPeerServiceClient = grpc.makeGenericClientConstructor(SdkPeerServiceService);
