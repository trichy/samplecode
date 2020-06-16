import { Component, ElementRef, Input, forwardRef, HostListener, SimpleChanges, EventEmitter, ViewChild, OnInit, Output, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChangeDetectorRef } from '@angular/core';

declare var $: any;

const callback = () => {
};

const CUSTOM_INPUT: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpinnerComponent),
    multi: true
};

@Component({
    selector: 'spinner',
    providers: [CUSTOM_INPUT],
    template: `  <input #inputValue id="{{ getId() }}" #spinnerControl 
                    type="number" 
                    class="form-control sg-spinner" 
                    min="{{ getMin()}}" 
                    max='{{ getMax() }}' 
                    step='{{ getStep() }}' 
                    [(ngModel)]='value' 
                    (blur)='onBlur()'
                    (change)='onBlur()'
                    (focus)="onFocus()"                   
                    style="width: {{ getWidth() }}%;">`
})

export class SpinnerComponent implements OnChanges, AfterViewInit, ControlValueAccessor {

    private innerValue: number = 0;
    private _focused: boolean = false;

    @Input('Id') id: string;
    @Input('Min') min: number;
    @Input('Max') max: number;
    @Input('Step') step: number;
    @Input('Width') width: number;
    @Input('WidthPercentage') widthPercentage: number;
    @Input('Show') show: boolean;
    @Input('Disabled') disabled: boolean;
    @ViewChild('inputValue') input: ElementRef; 
    @ViewChild("spinnerControl") private spinner: ElementRef;

    private onTouchedCallback: () => void = callback;
    private onChangeCallback: (_: any) => void = callback;
    @Output() onChangeValue: EventEmitter<any> = new EventEmitter<any>();
    @Output() change: EventEmitter<number> = new EventEmitter<number>();

    constructor(private cd: ChangeDetectorRef) {       
    }

    ngOnInit() {
        this.createSpinner();
    }

 
    get value(): number {
        return this.innerValue;
    };

 
    set value(v: number) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    onBlur() {
        let idSpinner = `#${this.id}`;
        let value = $(idSpinner).spinner('value');
        $(idSpinner).spinner().attr('ng-reflect-model', value);
        $(idSpinner).spinner().parent().parent().attr('ng-reflect-model', value);
        $(idSpinner).spinner().parent().parent().attr('ng-reflect-ng-model', value);
        this.change.emit(value);
        this.onTouchedCallback();
    }
 

    onFocus() {
        this._focused = true;
    }
 
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

 
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }
 
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


    ngAfterViewInit(): void {
        this.createSpinner();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.createSpinner();
    }

    public getPercentage(): number {
        return this.widthPercentage || 0;
    }

    public getMin(): number {
        return this.min;
    }

    public getId(): string {
        return this.id;
    }

    public getMax(): number {
        return this.max;
    }

    public getStep(): number {
        return this.step;
    }

    public getValue(): number {
        return this.value;
    }

    public getWidth(): number {
        return this.width;
    }

    public getDisabled(): boolean {
        return this.disabled || false;
    }

    public getInputValue(): number {
        return +this.input.nativeElement.value;
    }

    public createSpinner(): void {

        let idSpinner = `#${this.id}`;
        $(idSpinner).spinner({
            disabled: this.getDisabled()
        });

        if (this.getPercentage() > 0) $('.ui-spinner').width(this.getPercentage() + '%');
        if (this.getWidth() > 0) $(idSpinner).spinner().width(this.getWidth());
      
        $('.ui-spinner').removeClass('ui-widget');
        $('.ui-spinner').removeClass('ui-corner-all');
        $('.ui-spinner').removeClass('ui-widget-content');
        $('.ui-spinner a > span.ui-icon').removeClass();
    }

    @HostListener('change') onChange() {
        //this.onBlur();
        let idSpinner = `#${this.id}`;
        this.setStateValue($(idSpinner).spinner('value'));
    }

    private setStateValue(v: number): void {
        if (v !== this.innerValue) {
            this.onChangeCallback(v);
            this.onChangeValue.emit({
                previousValue: this.innerValue,
                currentValue: v
            });
            this.innerValue = v;
        }
    }

    private updateValues() {

    }

    
}