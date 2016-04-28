import {Component, Input, EventEmitter} from 'angular2/core';
import {Output} from "angular2/core";

export interface TreeItem {
    id: string;
    label: string;
}

@Component({
    selector: 'tree',
    directives: [TreeCmp],
    template: `
        <ul>
            <li [class.is-leaf]="item.isLeaf()" *ngFor="#item of items">
                <label *ngIf="enableSelection" class="c-input c-checkbox"><input type="checkbox"><span class="c-indicator"></span></label>
                <button [disabled]="item.isLeaf()" (click)="toggle(item)" class="item-toggler">
                    <i [class.ion-ios-minus-empty]="item.isLeaf()"
                       [class.ion-ios-arrow-right]="!item.isLeaf() && !isExpanded(item)"
                       [class.ion-ios-arrow-down]="!item.isLeaf() && isExpanded(item)"></i>
                </button>
                <a class="highlight-target" [title]="item.label" (click)="onItemClicked(item)">
                    <i class="ion-ios-paper-outline"></i>
                    <span>{{item.label}}</span>
                    <button #btn class="item-menu-trigger" (click)="onItemOptionsClicked($event, btn, item)"><i class="ion-ios-more"></i></button>
                </a>
                <tree *ngIf="isExpanded(item)"
                      [items]="item.children"
                      [enableSelection]="enableSelection"
                      (itemExpanded)="onItemExpanded($event)"
                      (itemClicked)="onItemClicked($event)"></tree>
            </li>
        </ul>`
}) export class TreeCmp {

    private _expanded = {};

    @Input() items: Array<TreeItem>;
    @Input() enableSelection:boolean = false;

    @Output() itemExpanded = new EventEmitter();
    @Output() itemClicked = new EventEmitter();
    @Output() itemOptionsClicked = new EventEmitter();

    isExpanded(item: TreeItem) {
        return !!(this._expanded[item.id]);
    }

    toggle(item: TreeItem) {
        this._expanded[item.id] = !(!!this._expanded[item.id]);
        this.onItemExpanded(item);
    }

    onItemExpanded(item) {
        this.itemExpanded.emit(item);
    }

    onItemClicked(item) {
        this.itemClicked.emit(item);
    }

    onItemOptionsClicked(event, element, item) {
        this.itemOptionsClicked.emit(item);
    }

}


