import { Directive, TemplateRef, ViewContainerRef, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy} from '@angular/core'; 
import { DraggableDirective } from './draggable.directive';
import { Overlay, OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CSegmentSelected } from '../../../components/unit-configuration/view-model/CSegmentSelected';
  
interface Boundaries {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}


export interface IPosition {
    x: number;
    y: number;
}
 
@Directive({
    selector: '[appDraggableHelper]',
    exportAs: 'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit, OnDestroy {

    private overlayRef: OverlayRef;
    private positionStrategy = new GlobalPositionStrategy();
    private boundaries: Boundaries;
    private position: IPosition = { x: 0, y: 0 };
    private startPosition: IPosition;
    private _parentCanvas: any;
    private _elementRef: ElementRef;
    private _segmentType: string;


    public set segmentType(segmentType: string) {
        this._segmentType = segmentType;
    }

    public set parentCanvasElementRef(elementRef: any) {
        this._parentCanvas = elementRef;
    }
    
    public set parentElementRef(elementRef: ElementRef) {
        this._elementRef = elementRef;
    }

    constructor( 
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay)
    {
 
        this.overlayRef = this.overlay.create({
            positionStrategy: this.positionStrategy
        });
    }

    ngOnInit(): void {   
        
    }

    ngOnDestroy(): void {
        this.overlayRef.dispose();
    }

    onDragMove(event: PointerEvent): void {

        if (!this.overlayRef.hasAttached()) {             
            this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
        }        

        this.position.x = event.clientX - this.startPosition.x;
        this.position.y = event.clientY - this.startPosition.y;

        let posX = 0;
        let posY = 0;

        posX = Math.max(this.boundaries.minX, this.position.x);
        posX = Math.min(this.boundaries.maxX, posX);
        posY = Math.max(this.boundaries.minY, this.position.y);
        posY = Math.min(this.boundaries.maxY, posY);

        this.positionStrategy.left(`${posX}px`);
        this.positionStrategy.top(`${posY}px`);        
        this.positionStrategy.apply();
 
    }

    onDragStart(event: PointerEvent): void {      
        const clientRect = this._elementRef.nativeElement.children[0].getBoundingClientRect();
        const viewRect: ClientRect = this._parentCanvas.getBoundingClientRect();

        this.startPosition = {
            x: event.clientX - clientRect.left,
            y: event.clientY - clientRect.top
        };
        //The percentage is due to pading of other elements
        this.boundaries = {
            minX: viewRect.left,
            maxX: viewRect.right - clientRect.width,
            minY: viewRect.top - (clientRect.height * 0.77),
            maxY: viewRect.bottom - (clientRect.height * 1.77)  
        };
        //Used to remove the kind of over segment cache;
        CSegmentSelected.resetSegmentMouseOver();
  
    }

    onDragEnd(): void {     
        this.overlayRef.detach();
    }
}
