import { Directive, EventEmitter, HostBinding, HostListener, Output, ElementRef,  TemplateRef, ViewContainerRef, ContentChild, Input } from '@angular/core';
import { DraggableHelperDirective } from './draggable-helper.directive';


@Directive({
    selector: '[appDraggable]'
})
export class DraggableDirective {
    @HostBinding('class.draggable') draggable = true;
    @HostBinding('attr.touch-action') touchAction = 'none';

    @HostBinding('class.dragging') dragging = false;
    @Input('parentCanvas') parentCanvas: any;
    @Input('segmentType') segmentType: string;


    @Output('endDrag') endDrag: EventEmitter<any> = new EventEmitter<any>();
    @Output() dragStart = new EventEmitter<PointerEvent>();
    @Output() dragMove = new EventEmitter<PointerEvent>();
    @Output() dragEnd = new EventEmitter<PointerEvent>();

    @ContentChild(DraggableHelperDirective) helper: DraggableHelperDirective;


    constructor(public element: ElementRef) { }

    @HostListener('pointerdown', ['$event'])
    onPointerDown(event: PointerEvent): void {
        this.dragging = true;
        event.stopPropagation();
      
        this.dragStart.emit(event);
        this.helper.parentCanvasElementRef = this.parentCanvas;
        this.helper.parentElementRef = this.element;
        this.helper.segmentType = this.segmentType;
        this.helper.onDragStart(event);
    }

    @HostListener('document:pointermove', ['$event'])
    onPointerMove(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        this.dragMove.emit(event); 
        this.helper.onDragMove(event);
    }

    @HostListener('document:pointerup', ['$event'])
    onPointerUp(event: PointerEvent): void {
        if (!this.dragging) {
            return;
        }

        this.dragging = false;
        this.helper.onDragEnd();
        this.dragEnd.emit(event); 
        let dragObj = {
            segmentType: this.segmentType,
            position: {
                x: event.clientX,
                y: event.clientY
            }
        };

        this.endDrag.emit(dragObj);
       
    }
}
