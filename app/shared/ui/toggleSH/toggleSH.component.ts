import {
    Component,
    ElementRef,
    Input,
    Output,
    HostListener,
    AfterViewInit,
    forwardRef,
    SimpleChanges,
    NgZone,
    EventEmitter,
    ViewChild,
    OnDestroy
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from "@angular/forms";

const callback = () => {
};

const CUSTOM_INPUT: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSHComponent),
    multi: true
};

@Component({
    selector: 'toggleSH',
    providers: [CUSTOM_INPUT],
    templateUrl : './toggleSH.component.html'  
})

export class ToggleSHComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
    // Defining Default Options for Switch
    public handleWidth: number = 0;
    public labelWidth: number = 0;
    public labelText: string = "";
    public inverse: boolean = false;
    public baseClass: string = "bootstrap-switch";

    public onText: string = "Show";
    public offText: string = "Hide";
    public disabled: boolean = false;
    public readonly: boolean = false;

    private _focused: boolean = false;

    private size: any = 'small';
    private _animate: boolean = true;
    private _innerAnimate: boolean = true;
    private _indeterminate: boolean = false;
    private _onColor: string = "primary";
    private _offColor: string = "default";
    private _wrapperClass: string = "wrapper";
    private _innerState: boolean = false;
    private _innerHandleWidth: string | number = "auto";
    private _innerLabelWidth: string | number = "auto";

    private _dragStart: any = null;
    private _dragEnd: any = null;

    private _onTouchedCallback: () => void = callback;
    private _onChangeCallback: (_: any) => void = callback;

    @Output() onChangeState: EventEmitter<any> = new EventEmitter<any>();
    @Input('showButton') show: boolean;
    @Input('header') header: string;

    // Defining DOM Elements
    @ViewChild("container") container: ElementRef;
    @ViewChild("on") on: ElementRef;
    @ViewChild("label") label: ElementRef;
    @ViewChild("off") off: ElementRef;

    private $on(): any {
        return this.on.nativeElement
    }

    private $off(): any {
        return this.off.nativeElement
    }

    private $label(): any {
        return this.label.nativeElement;
    }

    private $container(): any {
        return this.container.nativeElement;
    }

    /**
     * @description:  Function to set the Classes for the Wrapper Div
     * @returns {string}
     */
    public getWrapperClasses() {
        let output: string = this.baseClass + " " + this.baseClass + "-" + this._wrapperClass;

        if (this._focused) {
            output += " " + this.baseClass + "-focused";
        }
        if (this.readonly) {
            output += " " + this.baseClass + "-readonly";
        }

        if (this.size != null) {
            output += " " + this.baseClass + "-" + this.size;
        }

        if (this._innerState) {
            output += " " + this.baseClass + "-on";
        } else {
            output += " " + this.baseClass + "-off";
        }

        if (this._animate) {
            output += " " + this.baseClass + "-animate";
        }

        if (this.disabled) {
            output += " " + this.baseClass + "-disabled";
        }

        if (this._indeterminate || this._innerState === null || typeof this._innerState === "undefined") {
            output += " " + this.baseClass + "-indeterminate";
        }

        if (this.inverse) {
            output += " " + this.baseClass + "-inverse";
        }

        return output
    }

    /**
     * @description Function to set the css classes for #on
     * @returns {string}
     */
    public getOnClasses(): string {
        let output: string = this.baseClass + "-handle-on";

        if (this._onColor) {
            output += " " + this.baseClass + "-" + this._onColor;
        }

        return output
    }

    /**
     * @description Function to set the css classes for #off
     * @returns {string}
     */
    public getOffClasses(): string {
        let output: string = this.baseClass + "-handle-off";

        if (this._offColor) {
            output += " " + this.baseClass + "-" + this._offColor;
        }

        return output
    }

    /**
     * @description  Function set the marging of the #label when change the state
     * @returns {string}
     */
    public getLabelMarginLeft(): string {
        let width = (this.inverse) ? -this.handleWidth : 0;
        if (this._indeterminate || this._innerState === null || typeof this._innerState === "undefined") {
            width = -(this.handleWidth / 2);
        } else if (this._dragEnd) {
            width = this._dragEnd;
        } else if (!this._innerState) {
            if (!this.inverse) {
                width = -this.handleWidth;
            } else {
                width = 0;
            }
        }
        return width + "px";
    }

    constructor(private ngZone: NgZone) {
    }

    ngOnChanges(changes: SimpleChanges) {
   
        let value = changes['show'].currentValue;
        if (value) {
            this.calculateWith();
        }
    }

    ngOnDestroy(): void {
        this.setStateValue(false);
    }

    ngAfterViewInit() {
        // this.calculateWith();
    }

    @HostListener('click') onClick() {
        if (!this.disabled && !this.readonly && !this._dragEnd) {
            this.setStateValue(!this._innerState);
        } else if (this._dragEnd) {
            this._dragEnd = null;
        }
    }

    onFocus() {
        this._focused = true;
    }

    onBlur() {
        this._focused = false;
        this._onTouchedCallback();
    }

    /**
     * @description Function to make recalculate the size of the elements when options change
     * @param disableAnimation
     */
    private calculateWith(disableAnimation: boolean = false): void {
    
        let self = this;
        if (disableAnimation && this._innerAnimate) {
            this._animate = false;
        }
        setTimeout(() => {
            self.$on().style.width = "auto";
            self.$off().style.width = "auto";
            self.$label().style.width = "auto";
            let width = (self._innerHandleWidth === "auto")
                ? Math.max(self.$on().offsetWidth, self.$off().offsetWidth)
                : self._innerHandleWidth;

            if (self.$label().offsetWidth < width) {
                if (self._innerLabelWidth === "auto") {
                    self.labelWidth = Number(width);
                } else {
                    self.labelWidth = Number(self._innerLabelWidth);
                }
            } else {
                if (self._innerLabelWidth === "auto") {
                    self.labelWidth = self.$label().offsetWidth;
                } else {
                    self.labelWidth = Number(self._innerLabelWidth);
                }
            }

            self.handleWidth = Number(width);

            self.ngZone.run(() => {
                self.$label().style.width = self.labelWidth + "px";
                self.$on().style.width = self.handleWidth + "px";
                self.$off().style.width = self.handleWidth + "px";
                setTimeout(() => {
                    if (disableAnimation && this._innerAnimate) {
                        this._animate = true;
                    }
                });
            });
        });
    }

    //Functions to set inputs and the private variables of the Switch
    @Input('switch-base-class') set setBaseClass(value: string) {
        this.baseClass = value;
    }

    @Input('switch-wrapper-class') set setWrapperClass(value: string) {
        this._wrapperClass = value;
    }

    @Input('switch-off-text') set setOffText(value: string) {
        this.offText = (value) ? value : "Hide";
    }

    @Input('switch-label-text') set setLabelText(value: string) {
        this.labelText = value;
    }

    @Input('switch-on-text') set setOnText(value: string) {
        this.onText = (value) ? value : "Show";
    }

    @Input('switch-size') set setSize(value: string) {
        if (value) this.size = value;
    }

    @Input('switch-animate') set setAnimate(value: boolean) {
        this._animate = value;
        this._innerAnimate = value;
    }

    @Input('switch-on-color') set setOnColor(value: string) {
        if (value) this._onColor = value;
    }

    @Input('switch-off-color') set setOffColor(value: string) {
        if (value) this._offColor = value;
    }

    @Input('switch-disabled') set setDisabled(value: boolean) {
        this.disabled = value;
    }

    @Input('switch-readonly') set setReadOnly(value: boolean) {
        this.readonly = value;
    }

    @Input('switch-indeterminate') set setIndeterminate(value: boolean) {
        this._indeterminate = value;
    }

    @Input('switch-inverse') set setInverse(value: boolean) {
        this.inverse = value;
    }

    @Input('switch-handle-width') set setHandleWidth(value: number | "auto") {
        this._innerHandleWidth = (typeof (value) !== "undefined") ? value : "auto";
    }

    @Input('switch-label-width') set setLabelWidth(value: number | "auto") {
        this._innerLabelWidth = (typeof (value) !== "undefined") ? value : "auto";
    }

    get value(): boolean {
        return this._innerState;
    };

    set value(v: boolean) {
        if (v === null || typeof v === "undefined") this._indeterminate = true;
        this.setStateValue(v);
    }

   

    writeValue(value: boolean) {
        if (value !== this._innerState) {
            this._innerState = value;
        }
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }


    private setStateValue(v: boolean): void {
        if (v !== this._innerState) {

            this._onChangeCallback(v);

            this.onChangeState.emit({
                previousValue: this._innerState,
                currentValue: v
            });
            this._innerState = v;
        }
    }
}
