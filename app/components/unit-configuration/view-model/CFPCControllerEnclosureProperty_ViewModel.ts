import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as EnumsCommon from "@jci-ahu/data.common.enums";

import { IPropertyGridTarget, CObjectInfo, CPropertyInfo, ICustomTypeEditorResolver, IListProvider, E_PropertyType } from "ui.shared.property-grid/src/Types";
import { CFPCControllerEnclosure_ViewModel } from "./CFPCControllerEnclosure_ViewModel";
import { CListProvider_E_UnitSide } from "./ListProviders/CListProvider_E_UnitSide";
import { CListProvider_E_FPCControllerEnclosureDoorOption } from "./ListProviders/CListProvider_E_FPCControllerEnclosureDoorOption";
import { CListProvider_E_FPCControllerEnclosurePowerOption } from "./ListProviders/CListProvider_E_FPCControllerEnclosurePowerOption";
import { CListProvider_E_FPCControllerEnclosureSize } from "./ListProviders/CListProvider_E_FPCControllerEnclosureSize";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";



export class CFPCControllerEnclosureProperty_ViewModel implements IPropertyGridTarget {

    private _objectInfo: PG.Types.CObjectInfo = null;

    constructor(
        private _unitView: CUnit_ViewModel,
        private _model: ModelAHU.Configuration.Types.IFPCControllerEnclosure) { }


    public get model(): ModelAHU.Configuration.Types.IFPCControllerEnclosure {
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
        this.updateRender();
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
        this.updateRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(2)
    @PG.Attributes.Description("Z")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get GeometryZ(): number {
        return this._model.geometry.z;
    }
    public set GeometryZ(value: number) {
        this._model.geometry.z = value;
        this.updateRender();
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
        this.updateRender();
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
        this.updateRender();
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
        this.updateRender();
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(6)
    @PG.Attributes.Description("User Defined Name")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.String)
    public get UserDefinedName(): string {
        return this._model.userDefinedName;
    }
    public set UserDefinedName(value: string) {
        this._model.userDefinedName = value;
        this.updateRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(7)
    @PG.Attributes.Description("Unit Side")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_UnitSide())
    public get UnitSide(): EnumsCommon.Common.E_UnitSide {
        return this._model.unitSide;
    }
    public set UnitSide(value: EnumsCommon.Common.E_UnitSide) {
        this._model.unitSide = value;
        this.updateRender();
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(8)
    @PG.Attributes.Description("DoorOption")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_FPCControllerEnclosureDoorOption())
    public get DoorOption(): EnumsAHU.FPC.E_FPCControllerEnclosureDoorOption {
        return this._model.doorOption;
    }
    public set DoorOption(value: EnumsAHU.FPC.E_FPCControllerEnclosureDoorOption) {
        this._model.doorOption = value;
        this.updateRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(9)
    @PG.Attributes.Description("PowerOption")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_FPCControllerEnclosurePowerOption())
    public get PowerOption(): EnumsAHU.FPC.E_FPCControllerEnclosurePowerOption {
        return this._model.powerOption;
    }
    public set PowerOption(value: EnumsAHU.FPC.E_FPCControllerEnclosurePowerOption) {
        this._model.powerOption = value;
        this.updateRender();
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(10)
    @PG.Attributes.Description("Size")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_FPCControllerEnclosureSize())
    public get Size(): EnumsAHU.FPC.E_FPCControllerEnclosureSize {
        return this._model.size;
    }
    public set Size(value: EnumsAHU.FPC.E_FPCControllerEnclosureSize) {
        this._model.size = value;
        this.updateRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(11)
    @PG.Attributes.Description("Ship Loose")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get ShipLoose(): boolean {
        return this._model.shipLoose;
    }
    public set ShipLoose(value: boolean) {
        this._model.shipLoose = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(12)
    @PG.Attributes.Description("Weight")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get Weight(): number {
        return this._model.weight;
    }
    public set Weight(value: number) {
        this._model.weight = value;
    }

    //controllerList: IFPCController[];


    public get ObjectName(): string {
        return "FPC Controller Enclosure";
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

    public updateRender(): void {
        this._unitView.getFPCControlEnclosureModelSelected.render();
    }

}