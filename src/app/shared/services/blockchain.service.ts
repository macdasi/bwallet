import { Injectable } from "@angular/core";
import { Block } from "../objects/block";
/**
 * Created by hadar.m on 06/03/2017.
 */

@Injectable()
export class blockchainService{
    public getGenesisBlock():Block{
        return new Block("0", "Genesis Block" , 1465154705 );
    }

    public generateNextBlock(previousHash:string ,
                             data : any ,
                             time: number
    ):Block{
        return new Block( previousHash  , data , time );
    }
}