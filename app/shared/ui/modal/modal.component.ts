import { Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'modal-dialog',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    animations: [
        trigger('modal', [
            state('in', style({ opacity: 1, transform: 'translateY(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateY(-100%)'
                }),
                animate('0.3s ease-in')
            ]),
            transition('* => void', [
                animate('0.3s 0.1s ease-out', style({
                    opacity: 0,
                    transform: 'translateY(-100%)'
                }))
            ])
        ])
    ]
})
export class ModalComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    public close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event : any) {
        event.target.innerWidth;
    }
}