/**
 * Created by hadar.m on 05/04/2017.
 */
import { dataConnection } from "../shared/objects/dataConnection";
/**
 * Created by hadar.m on 13/03/2017.
 */
export const SET_PEER = 'SET_PEER';
export  const ADD_REMOTE_PEER = 'ADD_REMOTE_PEER';

export function addRemoteConnection(conn:dataConnection):addRemoteConnectionAction {
    return { type: ADD_REMOTE_PEER, conn  : conn };
}

export function setPeer(peerId):setPeerAction {
    return { type: SET_PEER, peerId : peerId };
}

export type setPeerAction = {
    type: string, peerId:string
}

export type addRemoteConnectionAction = {
    type: string, conn:dataConnection
}

