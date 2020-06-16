import { IPropertyGridTarget, CObjectInfo, CPropertyInfo, ICustomTypeEditorResolver, IListProvider, E_PropertyType } from "ui.shared.property-grid/src/Types";
import { Input } from "@angular/core";
import { CListProvider_E_UnitSide } from '../view-model/ListProviders/CListProvider_E_UnitSide';
import { CListProvider_E_OpeningType } from '../view-model/ListProviders/CListProvider_E_OpeningType';
import { CListProvider_E_OpeningShape } from '../view-model/ListProviders/CListProvider_E_OpeningShape';
import { CListProvider_E_MaterialStyle } from '../view-model/ListProviders/CListProvider_E_MaterialStyle';
import { CListProvider_E_DuctType } from '../view-model/ListProviders/CListProvider_E_DuctType';
import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as PG from "@jci-ahu/ui.shared.property-grid";
import { CUnit_ViewModel } from "./CUnit_ViewModel";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import { COpening_ViewModel } from "./COpening_ViewModel";
import { CSegment_ViewModel } from "./CSegment_ViewModel";
import { CListProvider_E_AirType } from "./ListProviders/CListProvider_E_AirType";
import { CListProvider_E_SafetyScreenType } from "./ListProviders/CListProvider_E_SafetyScreenType";
import { ISegment } from "@jci-ahu/data.ahu.model.interfaces/lib/Configuration/Segments";


export class COpeningProperty_ViewModel implements IPropertyGridTarget {


    private _objectInfo: PG.Types.CObjectInfo = null;
    private _originalSegmentView: CSegment_ViewModel = null;
    private _originalSegment: ISegment = null;

    constructor(
        private _unitView: CUnit_ViewModel,
        private _model: ModelAHU.Configuration.Types.IOpening) {
        this._originalSegment = this.model.segment();
        if (this._originalSegment !== null) {
            this._originalSegmentView = this._unitView.getSegmentViewModelByOpening(this._model);
        }
    }

    public get model(): ModelAHU.Configuration.Types.IOpening {
        return this._model;
    }    

    @PG.Attributes.Include()
    @PG.Attributes.Order(0)
    @PG.Attributes.Description("X")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryX(): number {
        return this._model.geometry.x;
    }
    public set GeometryX(value: number) {
        this._model.geometry.x = value;
        this._unitView.getOpeningViewModelSelected.damperlist.forEach(d => { d.model.geometry.x = value; });
        this._unitView.getOpeningViewModelSelected.standardlist.forEach(s => { s.model.geometry.x = value; });
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(1)
    @PG.Attributes.Description("Y")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryY(): number {
        return this._model.geometry.y;
    }
    public set GeometryY(value: number) {
        this._model.geometry.y = value;
        this._unitView.getOpeningViewModelSelected.damperlist.forEach(d => { d.model.geometry.y = value; });
        this._unitView.getOpeningViewModelSelected.standardlist.forEach(s => { s.model.geometry.y = value; });
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(2)
    @PG.Attributes.Description("Z")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryZ(): number {
        return this.model.geometry.z;
    }
    public set GeometryZ(value: number) {
        this.model.geometry.z = value;
        this._unitView.getOpeningViewModelSelected.damperlist.forEach(d => { d.model.geometry.z = value; });
        this._unitView.getOpeningViewModelSelected.standardlist.forEach(s => { s.model.geometry.z = value; });
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(3)
    @PG.Attributes.Description("X Length")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryXLength(): number {
        return this._model.geometry.xLength;
    }
    public set GeometryXLength(value: number) {
        this._model.geometry.xLength = value;
        this._unitView.getOpeningViewModelSelected.damperlist.forEach(d => { d.model.geometry.xLength = value; });
        this._unitView.getOpeningViewModelSelected.standardlist.forEach(s => { s.model.geometry.xLength = value; });
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(4)
    @PG.Attributes.Description("Y Length")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryYLength(): number {
        return this._model.geometry.yLength;
    }
    public set GeometryYLength(value: number) {
        this._model.geometry.yLength = value;
        this._unitView.getOpeningViewModelSelected.damperlist.forEach(d => { d.model.geometry.yLength = value; });
        this._unitView.getOpeningViewModelSelected.standardlist.forEach(s => { s.model.geometry.yLength = value; });
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(5)
    @PG.Attributes.Description("Z Length")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryZLength(): number {
        return this._model.geometry.zLength;
    }
    public set GeometryZLength(value: number) {
        this._model.geometry.zLength = value;
        this._unitView.getOpeningViewModelSelected.damperlist.forEach(d => { d.model.geometry.zLength = value; });
        this._unitView.getOpeningViewModelSelected.standardlist.forEach(s => { s.model.geometry.zLength = value; });
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(6)
    @PG.Attributes.Description("Unit Side")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_UnitSide())
    public get UnitSide(): EnumsCommon.Common.E_UnitSide {
        return this._model.unitSide;
    }
    public set UnitSide(value: EnumsCommon.Common.E_UnitSide) {
        this._model.unitSide = value;
        this.updateSegmentRender();
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(8)
    @PG.Attributes.Description("Opening Shape")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_OpeningShape())
    public get OpeningShape(): EnumsAHU.Opening.E_OpeningShape {         
        return  this._model.openingShape;
    }
    public set OpeningShape(value: EnumsAHU.Opening.E_OpeningShape) {
        this._model.openingShape = value;
        this._unitView.getOpeningViewModelSelected.render();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(9)
    @PG.Attributes.Description("Air Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_AirType())
    public get AirType(): EnumsAHU.Common.E_AirType {
        return  this.model.airType;
    }
    public set AirType(value: EnumsAHU.Common.E_AirType) {
        this._model.airType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(10)
    @PG.Attributes.Description("Safety Screen Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_SafetyScreenType())
    public get SafetyScreenType(): EnumsAHU.Opening.E_SafetyScreenType {  
        return  this._model.safetyScreenType;
    }
    public set SafetyScreenType(value: EnumsAHU.Opening.E_SafetyScreenType) {
         this._model.safetyScreenType = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(11)
    @PG.Attributes.Description("Material Style")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialStyle())
    public get MaterialType(): EnumsAHU.ConstructionOptions.E_MaterialStyle {
        return  this._model.safetyScreenMaterialStyle;
    }
    public set MaterialType(value: EnumsAHU.ConstructionOptions.E_MaterialStyle) {
         this._model.safetyScreenMaterialStyle = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(12)
    @PG.Attributes.Description("Velocity")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Decimal)
   
    public get OpeningVelocity(): number {
        return  this._model.openingVelocity;
    }
    public set OpenVelocity(value:number) {
         this._model.openingVelocity = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(13)
    @PG.Attributes.Description("Pressure Drop")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Decimal)
    public get OpeningPressureDrop(): number {
        return  this._model.openingPressureDrop;
    }
    public set OpeningPressureDrop(value: number) {
         this._model.openingPressureDrop = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(14)
    @PG.Attributes.Description("Duct Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DuctType())
    public get DuctType(): EnumsAHU.Opening.E_DuctType {
        return  this._model.ductType;
    }
    public set DuctType(value: EnumsAHU.Opening.E_DuctType) {
         this._model.ductType = value;
    }
        
    public get ObjectName(): string {
        return "Opening";
    }
    public Validate(objectInfo: CObjectInfo): void {
    }

    public PropertyChanged(prop: CPropertyInfo): void {
    }

    public NotifyAll(): void {
    }

    public Init(objectInfo: CObjectInfo): void {

    }
    public Dispose(): void {

    }
    
    public updateSegmentRender(): void {
        if (this.model.segment() === null || this._originalSegment === null) {
            this._unitView.segmentList.forEach(seg => { seg.render(); });
        }
        else {
            if (this._originalSegment.id !== this.model.segment().id) {
                this._originalSegmentView.render();
            }
            this._unitView.getSegmentViewModelByOpening(this._model).render();
        }
    }
} 