import { Block } from "../shared/objects/block";

/**
 * Created by hadar.m on 13/03/2017.
 */
export interface AppState {
    blockchain: Block[];
    peerId:string;
    remotePeerId:string[];
}