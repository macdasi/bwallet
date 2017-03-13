/**
 * Created by hadar.m on 13/03/2017.
 */
import { Action } from '@ngrx/store';
import { Block } from "../shared/objects/block";
import { ADD_BLOCK, addBlockAction } from "../actions/blockchain.actions";



export function blockchainReducer(state: Block[] = [], action: Action): Block[] {
    switch (action.type) {
        case ADD_BLOCK:
            return [
                ...state,
                (action as addBlockAction).block
            ];

        default:
            return state;
    }
}