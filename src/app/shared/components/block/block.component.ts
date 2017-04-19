/**
 * Created by hadar.m on 06/03/2017.
 */
import {
    Component, Input, ChangeDetectionStrategy
} from '@angular/core';
import { Block } from "../../objects/block";
/**
 * This class represents the navigation bar component.
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'block',
    templateUrl: 'block.component.html'
})
export class BlockComponent {
    @Input()
    public block:Block;
}
