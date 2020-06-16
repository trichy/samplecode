import { IPropertyGridTarget, CObjectInfo, CPropertyInfo, ICustomTypeEditorResolver, IListProvider, E_PropertyType } from "ui.shared.property-grid/src/Types";
import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as EnumsCommon from "@jci-ahu/data.common.enums";
import { CDoor_ViewModel } from "./CDoor_ViewModel";
import { COpening_ViewModel } from "./COpening_ViewModel"; 
import { CSegment_ViewModel } from "./CSegment_ViewModel";
import { CListProvider_E_DoorHandleType } from "../view-model/ListProviders/CListProvider_E_DoorHandleType";
import { CListProvider_E_UnitSide } from "../view-model/ListProviders/CListProvider_E_UnitSide";
import { CListProvider_E_DoorLatchType } from "../view-model/ListProviders/CListProvider_E_DoorLatchType";
import { CListProvider_E_DoorLockType } from "../view-model/ListProviders/CListProvider_E_DoorLockType";
import { CListProvider_E_DoorViewportType } from "../view-model/ListProviders/CListProvider_E_DoorViewportType";
import { CListProvider_E_DoorSwingDirection } from "../view-model/ListProviders/CListProvider_E_DoorSwingDirection";
import { CListProvider_E_DoorFastenerType } from "../view-model/ListProviders/CListProvider_E_DoorFastenerType";
import { CListProvider_E_AirPressureType } from "../view-model/ListProviders/CListProvider_E_AirPressureType";
import { CListProvider_E_MaterialStyle } from "../view-model/ListProviders/CListProvider_E_MaterialStyle";
import { CListProvider_E_MaterialGauge } from "../view-model/ListProviders/CListProvider_E_MaterialGauge";
import { CMinValueAttribute } from "ui.shared.property-grid/src/Attributes";
import { Console } from "@angular/core/src/console";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";
import { ISegment } from "@jci-ahu/data.ahu.model.interfaces/lib/Configuration/Segments";

export class CDoorProperty_ViewModel implements IPropertyGridTarget {

    private _objectInfo: PG.Types.CObjectInfo = null;
    private _originalSegmentView: CSegment_ViewModel = null;
    private _originalSegment: ISegment = null;

    constructor( 
        private _unitView: CUnit_ViewModel,
        private _model: ModelAHU.Configuration.Types.IDoor) {
        this._originalSegment = this.model.opening.segment();
        if (this._originalSegment !== null) {
            this._originalSegmentView = this._unitView.getSegmentViewModelByOpening(this._model.opening);
        }
    }

    public get model(): ModelAHU.Configuration.Types.IDoor {
        return this._model;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(0)
    @PG.Attributes.Description("X")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
 
    public get GeometryX():  number {
        return this.model.geometry.x;
    }
    public set GeometryX(value: number) {
        this.model.geometry.x = value;
        this.model.opening.geometry.x = value;
        this.updateSegmentRender();
    }    

    @PG.Attributes.Include()
    @PG.Attributes.Order(0)
    @PG.Attributes.Description("Y")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryY(): number {
        return this.model.geometry.y;
    }
    public set GeometryY(value: number) {
        this.model.geometry.y = value;
        this.model.opening.geometry.y = value;
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(1)
    @PG.Attributes.Description("Z")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryZ(): number {
        return this.model.geometry.z;
    }
    public set GeometryZ(value: number) {
        this.model.geometry.z = value;
        this.model.opening.geometry.z = value;
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(2)
    @PG.Attributes.Description("X Length")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer) 
    public get GeometryXLength(): number {
        return this.model.geometry.xLength;
    }

    public set GeometryXLength(value: number) {     
        this.model.geometry.xLength = value;      
        this.model.opening.geometry.xLength = value;    
        this.updateSegmentRender();
    }
    
    @PG.Attributes.Include()
    @PG.Attributes.Order(3)
    @PG.Attributes.Description("Y Length")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryYLength(): number {
        return this.model.geometry.yLength;
    }
    public set GeometryYLength(value: number) {
        this.model.geometry.yLength = value;
        this.model.opening.geometry.yLength = value;
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(4)
    @PG.Attributes.Description("Z Length")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryZLength(): number {
        return this.model.geometry.zLength;
    }
    public set GeometryZLength(value: number) {
        this.model.geometry.zLength = value;
        this.model.opening.geometry.zLength = value;
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(5)
    @PG.Attributes.Description("Handle Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DoorHandleType())
    public get HandleType(): EnumsAHU.Door.E_DoorHandleType {
        return this.model.handleType;
    }
    public set HandleType(value: EnumsAHU.Door.E_DoorHandleType) {
        this.model.handleType = value;
    }
    
    @PG.Attributes.Include()
    @PG.Attributes.Order(6)
    @PG.Attributes.Description("Hinge Location")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_UnitSide())
    public get HingeLocation(): EnumsCommon.Common.E_UnitSide {
        return this.model.hingeLocation;
    }
    public set HingeLocation(value: EnumsCommon.Common.E_UnitSide) {
        this.model.hingeLocation = value;
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(7)
    @PG.Attributes.Description("Latch Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DoorLatchType())
    public get LatchType(): EnumsAHU.Door.E_DoorLatchType {
        return this.model.latchType;
    }
    public set LatchType(value: EnumsAHU.Door.E_DoorLatchType) {
        this.model.latchType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(8)
    @PG.Attributes.Description("Lock Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DoorLockType())
    public get LockType(): EnumsAHU.Door.E_DoorLockType {
        return this.model.lockType;
    }
    public set LockType(value: EnumsAHU.Door.E_DoorLockType) {
        this.model.lockType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(9)
    @PG.Attributes.Description("View Port Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DoorViewportType())
    public get ViewportType(): EnumsAHU.Door.E_DoorViewportType {
        return this.model.viewportType;
    }
    public set ViewportType(value: EnumsAHU.Door.E_DoorViewportType) {
        this.model.viewportType = value;
        this._unitView.getDoorViewModelSelected.render();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(10)
    @PG.Attributes.Description("View Port Wire")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasViewportWire(): boolean {
        return this.model.hasViewportWire;
    }
    public set HasViewportWire(value: boolean) {
        this.model.hasViewportWire = value;
        this._unitView.getDoorViewModelSelected.render();
    } 



    @PG.Attributes.Include()
    @PG.Attributes.Order(11)
    @PG.Attributes.Description("Swing Direction")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DoorSwingDirection())
    public get SwingDirection(): EnumsAHU.Door.E_DoorSwingDirection {
        return this.model.swingDirection;
    }
    public set SwingDirection(value: EnumsAHU.Door.E_DoorSwingDirection) {
        this.model.swingDirection = value;
        this.updateSegmentRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(12)
    @PG.Attributes.Description("Fastener Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DoorFastenerType())
    public get FastenerType(): EnumsAHU.Door.E_DoorFastenerType {
        return this.model.fastenerType;
    }
    public set FastenerType(value: EnumsAHU.Door.E_DoorFastenerType) {
        this._model.fastenerType = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(13)
    @PG.Attributes.Description("Air Pressure Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_AirPressureType())
    public get AirPressureType(): EnumsAHU.Common.E_AirPressureType {
        return this._model.airPressureType;
    }
    public set AirPressureType(value: EnumsAHU.Common.E_AirPressureType) {
        this._model.airPressureType = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(14)
    @PG.Attributes.Description("Has Test Port")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
 
    public get HasTestPort(): boolean {
        return this.model.hasTestPort;
    }
    public set HasTestPort(value: boolean) {
        this.model.hasTestPort = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(15)
    @PG.Attributes.Description("Has Safety Latch")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)

    public get HasSafetyLatch(): boolean {
        return this.model.hasSafetyLatch;
    }
    public set HasSafetyLatch(value: boolean) {
        this.model.hasSafetyLatch = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(16)
    @PG.Attributes.Description("Has Inter Lock")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get IsThermalBreak(): boolean {
        return this.model.isThermalBreak;
    }
    public set IsThermalBreak(value: boolean) {
        this.model.isThermalBreak = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(17)
    @PG.Attributes.Description("Has Spare Gasket")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasSpareGasket(): boolean {
        return this.model.hasSpareGasket;
    }
    public set HasSpareGasket(value: boolean) {
        this.model.hasSpareGasket = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(18)
    @PG.Attributes.Description("Is Louvered")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get IsLouvered(): boolean {
        return this.model.isLouvered;
    }
    public set IsLouvered(value: boolean) {
        this.model.isLouvered = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(19)
    @PG.Attributes.Description("Louver Vent Area")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Decimal)
    public get LouverVentArea(): number {
        return this.model.louverVentArea;
    }
    public set LouverVentArea(value: number) {
        this.model.louverVentArea = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(20)
    @PG.Attributes.Description("Has Surface Mount Latch")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasSurfaceMountLatch(): boolean {
        return this.model.hasSurfaceMountLatch;
    }
    public set HasSurfaceMountLatch(value: boolean) {
        this.model.hasSurfaceMountLatch = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(21)
    @PG.Attributes.Description("Interior Material Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialStyle())
    public get InteriorMaterialType(): EnumsAHU.ConstructionOptions.E_MaterialType {
        return this.model.interiorMaterialType;
    }
    public set InteriorMaterialType(value: EnumsAHU.ConstructionOptions.E_MaterialType) {
        this.model.interiorMaterialType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(22)
    @PG.Attributes.Description("Interior Gauge")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialGauge())
    public get InteriorGauge(): EnumsAHU.ConstructionOptions.E_MaterialGauge {
        return this.model.interiorGauge;
    }
    public set InteriorGauge(value: EnumsAHU.ConstructionOptions.E_MaterialGauge) {
        this.model.interiorGauge = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(23)
    @PG.Attributes.Description("Interior Paint Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialGauge())
    public get InteriorPaintType(): EnumsAHU.ConstructionOptions.E_PaintType {
        return this.model.interiorPaintType;
    }
    public set InteriorPaintType(value: EnumsAHU.ConstructionOptions.E_PaintType) {
        this.model.interiorPaintType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(24)
    @PG.Attributes.Description("Exterior Material Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialStyle())
    public get ExteriorMaterialType(): EnumsAHU.ConstructionOptions.E_MaterialType {
        return this.model.exteriorMaterialType;
    }
    public set ExteriorMaterialType(value: EnumsAHU.ConstructionOptions.E_MaterialType) {
        this.model.exteriorMaterialType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(25)
    @PG.Attributes.Description("Interior Gauge")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialGauge())
    public get ExteriorGauge(): EnumsAHU.ConstructionOptions.E_MaterialGauge {
        return this.model.exteriorGauge;
    }
    public set ExteriorGauge(value: EnumsAHU.ConstructionOptions.E_MaterialGauge) {
        this.model.exteriorGauge = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(26)
    @PG.Attributes.Description("Exterior Paint Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MaterialGauge())
    public get ExteriorPaintType(): EnumsAHU.ConstructionOptions.E_PaintType {
        return this.model.exteriorPaintType;
    }
    public set ExteriorPaintType(value: EnumsAHU.ConstructionOptions.E_PaintType) {
        this.model.exteriorPaintType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(27)
    @PG.Attributes.Description("Unit Side")
    @PG.Attributes.ReadOnly(true)
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_UnitSide())
    public get UnitSide(): EnumsCommon.Common.E_UnitSide {
        return this.model.opening.unitSide;
    }

     
    public get ObjectName(): string {
        return "Door";
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

    public get WidthMaxValue(): number {
        return this.model.opening.geometry.xLength;
    }

    public get WidthMinValue(): number {
        return 0;
    }


    public updateSegmentRender(): void {
        if (this.model.opening.segment() === null || this._originalSegment === null) {
            this._unitView.segmentList.forEach(seg => { seg.render(); });
        }
        else {
            if (this._originalSegment.id !== this.model.opening.segment().id) {
                this._originalSegmentView.render();
            }
            this._unitView.getSegmentViewModelByOpening(this._model.opening).render();
        }
    }
}