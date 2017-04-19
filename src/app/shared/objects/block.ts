/**
 * Created by hadar.m on 06/03/2017.
 */
import * as CryptoJS from 'crypto-js';

export class Block {
    public hashPrevBlock:string;
    public hash:string;
    public time:number;
    public data:any;

    constructor( hashPrevBlock:string, data:any,time:number) {
        this.hashPrevBlock = hashPrevBlock;
        this.data = data;
        this.time = time;
        let timestamp = new Date().valueOf();
        let thisHash =  (CryptoJS as any).SHA256(hashPrevBlock + time + data).toString();
        this.time = timestamp;
        this.hash = thisHash;
    }
}