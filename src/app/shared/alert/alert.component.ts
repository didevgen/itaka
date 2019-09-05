import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ita-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
    @Input() message: string;
    @Output() closed = new EventEmitter<string>();

    closedChild: string;

    onClose() {
        this.closed.emit('close');
    }
}
