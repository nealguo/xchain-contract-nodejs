// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_orderer_sdk_orderer_pb = require('../../proto/orderer/sdk_orderer_pb.js');

function serialize_orderer_SdkOrdererReply(arg) {
  if (!(arg instanceof proto_orderer_sdk_orderer_pb.SdkOrdererReply)) {
    throw new Error('Expected argument of type orderer.SdkOrdererReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderer_SdkOrdererReply(buffer_arg) {
  return proto_orderer_sdk_orderer_pb.SdkOrdererReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderer_SdkOrdererRequest(arg) {
  if (!(arg instanceof proto_orderer_sdk_orderer_pb.SdkOrdererRequest)) {
    throw new Error('Expected argument of type orderer.SdkOrdererRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderer_SdkOrdererRequest(buffer_arg) {
  return proto_orderer_sdk_orderer_pb.SdkOrdererRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var SdkOrdererServiceService = exports.SdkOrdererServiceService = {
  // 将交易发给order排序落地
  sendTransaction: {
    path: '/orderer.SdkOrdererService/sendTransaction',
    requestStream: false,
    responseStream: false,
    requestType: proto_orderer_sdk_orderer_pb.SdkOrdererRequest,
    responseType: proto_orderer_sdk_orderer_pb.SdkOrdererReply,
    requestSerialize: serialize_orderer_SdkOrdererRequest,
    requestDeserialize: deserialize_orderer_SdkOrdererRequest,
    responseSerialize: serialize_orderer_SdkOrdererReply,
    responseDeserialize: deserialize_orderer_SdkOrdererReply,
  },
};

exports.SdkOrdererServiceClient = grpc.makeGenericClientConstructor(SdkOrdererServiceService);
