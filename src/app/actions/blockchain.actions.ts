import { Block } from "../shared/objects/block";
/**
 * Created by hadar.m on 13/03/2017.
 */
export const ADD_BLOCK = 'ADD_BLOCK';

export function addBlock(block:Block):addBlockAction {
    return { type: ADD_BLOCK, block:block };
}

export type addBlockAction = {
    type: string, block:Block
}