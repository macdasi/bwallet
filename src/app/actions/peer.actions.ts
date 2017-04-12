/**
 * Created by hadar.m on 05/04/2017.
 */
/**
 * Created by hadar.m on 13/03/2017.
 */
export const SET_PEER = 'SET_PEER';

export function setPeer(peerId):setPeerAction {
    return { type: SET_PEER, peerId : peerId };
}

export type setPeerAction = {
    type: string, peerId:string
}