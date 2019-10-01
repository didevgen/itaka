import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ita-card-buttons',
    templateUrl: './card-buttons.component.html',
    styleUrls: ['./card-buttons.component.scss'],
})
export class CardButtonsComponent implements OnInit {
    @Input() likes: number;
    @Input() dislikes: number;
    constructor() {}
    ngOnInit(): void {
        this.likes === undefined ? (this.likes = 0) : (this.likes = this.likes);
        this.dislikes === undefined
            ? (this.dislikes = 0)
            : (this.dislikes = this.dislikes);
    }
}
