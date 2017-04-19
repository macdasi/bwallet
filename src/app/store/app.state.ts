import { Block } from "../shared/objects/block";
import { peerData } from "../shared/objects/peerData";

/**
 * Created by hadar.m on 13/03/2017.
 */
export interface AppState {
    blockchain: Block[];
    peerData:peerData;
}