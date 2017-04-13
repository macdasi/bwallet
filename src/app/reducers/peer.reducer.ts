/**
 * Created by hadar.m on 13/03/2017.
 */
import { Action } from '@ngrx/store';
import { SET_PEER, ADD_REMOTE_PEER, setPeerAction, addRemoteConnectionAction } from "../actions/peer.actions";
import { peerData } from "../shared/objects/peerData";
import { dataConnection } from "../shared/objects/dataConnection";

export function peerReducer(state: peerData, action: Action): peerData {
    switch (action.type) {
        case ADD_REMOTE_PEER:
            let conn = (action as addRemoteConnectionAction).conn;
            if(state.remoteConnections != null && state.remoteConnections.length > 0){
                let exsits = state.remoteConnections.filter((item : dataConnection ) => {
                    return item.peer === conn.peer;
                });
                if(exsits != null && exsits.length > 0){
                    return state;
                }
            }
            return Object.assign({}, state, {
                remoteConnections: [
                    ...state.remoteConnections,
                    conn
                ]
            });

        case SET_PEER:
            return Object.assign({}, state, {
                peerId: (action as setPeerAction).peerId
            });
        default:
            return state;
    }
}