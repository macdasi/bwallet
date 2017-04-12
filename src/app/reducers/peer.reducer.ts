/**
 * Created by hadar.m on 13/03/2017.
 */
import { Action } from '@ngrx/store';
import { SET_PEER, setPeerAction } from "../actions/peer.actions";

export function peerReducer(state: string = '', action: Action): string {
    switch (action.type) {
        case SET_PEER:
            return ((action as setPeerAction).peerId);
        default:
            return state;
    }
}