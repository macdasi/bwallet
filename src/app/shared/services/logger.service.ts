/**
 * Created by hadar.m on 26/03/2017.
 */
import { Injectable } from "@angular/core";
/**
 * Created by hadar.m on 06/03/2017.
 */

@Injectable()
export class LoggerService{
    public trace(...args):void{
        var now = (window.performance.now() / 1000).toFixed(3);
        console.log(now + ': ', args);
    }
}
