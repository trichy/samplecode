import * as ModelAHU from "@jci-ahu/data.ahu.model.interfaces";
import * as PG from "@jci-ahu/ui.shared.property-grid";
import * as EnumsAHU from "@jci-ahu/data.ahu.enums";
import * as EnumsCommon from "@jci-ahu/data.common.enums";

import { IPropertyGridTarget, CObjectInfo, CPropertyInfo, ICustomTypeEditorResolver, IListProvider, E_PropertyType } from "ui.shared.property-grid/src/Types";
import { CMotorControl_ViewModel } from "./CMotorControl_ViewModel";
import { CListProvider_E_UnitSide } from "./ListProviders/CListProvider_E_UnitSide";
import { CListProvider_E_AmbientTemperatureType } from "./ListProviders/CListProvider_E_AmbientTemperatureType";
import { CListProvider_E_ControlCommType } from "./ListProviders/CListProvider_E_ControlCommType";
import { CListProvider_E_ControlEnclosureType } from "./ListProviders/CListProvider_E_ControlEnclosureType";
import { CListProvider_E_DisconnectType } from "./ListProviders/CListProvider_E_DisconnectType";
import { CListProvider_E_MotorControlType } from "./ListProviders/CListProvider_E_MotorControlType";
import { CListProvider_E_MotorControlVendor } from "./ListProviders/CListProvider_E_MotorControlVendor";
import { CListProvider_E_ControlAuxilliaryContactType } from "./ListProviders/CListProvider_E_ControlAuxilliaryContactType";
import { CListProvider_E_ElectricalVoltage } from "./ListProviders/CListProvider_E_ElectricalVoltage";
import { CUnit_ViewModel } from "@local/app/components/unit-configuration/view-model/CUnit_ViewModel";


export class CMotorControlProperty_ViewModel implements IPropertyGridTarget {

    private _objectInfo: PG.Types.CObjectInfo = null;

    constructor(
        private _unitView: CUnit_ViewModel,
        private _model: ModelAHU.Configuration.Types.IMotorControl) { }


    public get model(): ModelAHU.Configuration.Types.IMotorControl {
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
    @PG.Attributes.Description("Mounting Offset")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get MountingOffset(): number {
        return this._model.mountingOffset;
    }
    public set MountingOffset(value: number) {
        this._model.mountingOffset = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(9)
    @PG.Attributes.Description("Ambient Temperature Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_AmbientTemperatureType())
    public get AmbientTemperatureType(): EnumsAHU.MotorControl.E_AmbientTemperatureType {
        return this._model.ambientTemperatureType;
    }
    public set AmbientTemperatureType(value: EnumsAHU.MotorControl.E_AmbientTemperatureType) {
        this._model.ambientTemperatureType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(10)
    @PG.Attributes.Description("Control CommType")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_ControlCommType())
    public get ControlCommType(): EnumsAHU.MotorControl.E_ControlCommType {
        return this._model.controlCommType;
    }
    public set ControlCommType(value: EnumsAHU.MotorControl.E_ControlCommType) {
        this._model.controlCommType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(11)
    @PG.Attributes.Description("Control Disconnect Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_DisconnectType())
    public get ControlDisconnectType(): EnumsAHU.MotorControl.E_DisconnectType {
        return this._model.controlDisconnectType;
    }
    public set ControlDisconnectType(value: EnumsAHU.MotorControl.E_DisconnectType) {
        this._model.controlDisconnectType = value;
        this.updateRender();
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(12)
    @PG.Attributes.Description("Control Enclosure Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_ControlEnclosureType())
    public get ControlEnclosureType(): EnumsAHU.MotorControl.E_ControlEnclosureType {
        return this._model.controlEnclosureType;
    }
    public set ControlEnclosureType(value: EnumsAHU.MotorControl.E_ControlEnclosureType) {
        this._model.controlEnclosureType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(13)
    @PG.Attributes.Description("Motor Control Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MotorControlType())
    public get MotorControlType(): EnumsAHU.MotorControl.E_MotorControlType {
        return this._model.motorControlType;
    }
    public set MotorControlType(value: EnumsAHU.MotorControl.E_MotorControlType) {
        this._model.motorControlType = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(14)
    @PG.Attributes.Description("Motor Control Vendor")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_MotorControlVendor())
    public get MotorControlVendor(): EnumsAHU.MotorControl.E_MotorControlVendor {
        return this._model.motorControlVendor;
    }
    public set MotorControlVendor(value: EnumsAHU.MotorControl.E_MotorControlVendor) {
        this._model.motorControlVendor = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(15)
    @PG.Attributes.Description("Has Aux Contact")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasAuxContact(): boolean {
        return this._model.hasAuxContact;
    }
    public set HasAuxContact(value: boolean) {
        this._model.hasAuxContact = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(16)
    @PG.Attributes.Description("Auxilliary Contact Type")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_ControlAuxilliaryContactType())
    public get AuxilliaryContactType(): EnumsAHU.MotorControl.E_ControlAuxilliaryContactType {
        return this._model.auxilliaryContactType;
    }
    public set AuxilliaryContactType(value: EnumsAHU.MotorControl.E_ControlAuxilliaryContactType) {
        this._model.auxilliaryContactType = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(17)
    @PG.Attributes.Description("Extra Auxilliary Contact Count")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get ExtraAuxilliaryContactCount(): number {
        return this._model.extraAuxilliaryContactCount;
    }
    public set ExtraAuxilliaryContactCount(value: number) {
        this._model.extraAuxilliaryContactCount = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(18)
    @PG.Attributes.Description("Has Key Pad")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasKeyPad(): boolean {
        return this._model.hasKeyPad;
    }
    public set HasKeyPad(value: boolean) {
        this._model.hasKeyPad = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(19)
    @PG.Attributes.Description("Has Manual Bypass")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasManualBypass(): boolean {
        return this._model.hasManualBypass;
    }
    public set HasManualBypass(value: boolean) {
        this._model.hasManualBypass = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(20)
    @PG.Attributes.Description("Has Under Over Voltage Relay")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get HasUnderOverVoltageRelay(): boolean {
        return this._model.hasUnderOverVoltageRelay;
    }
    public set HasUnderOverVoltageRelay(value: boolean) {
        this._model.hasUnderOverVoltageRelay = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(21)
    @PG.Attributes.Description("Ship Loose")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Boolean)
    public get ShipLoose(): boolean {
        return this._model.shipLoose;
    }
    public set ShipLoose(value: boolean) {
        this._model.shipLoose = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(22)
    @PG.Attributes.Description("Fla")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get Fla(): number {
        return this._model.fla;
    }
    public set Fla(value: number) {
        this._model.fla = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(23)
    @PG.Attributes.Description("Mca")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get Mca(): number {
        return this._model.mca;
    }
    public set Mca(value: number) {
        this._model.mca = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(24)
    @PG.Attributes.Description("Voltage")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.List)
    @PG.Attributes.ListProvider(new CListProvider_E_ElectricalVoltage())
    public get Voltage(): EnumsAHU.Electrical.E_ElectricalVoltage {
        return this._model.voltage;
    }
    public set Voltage(value: EnumsAHU.Electrical.E_ElectricalVoltage) {
        this._model.voltage = value;
    }


    @PG.Attributes.Include()
    @PG.Attributes.Order(25)
    @PG.Attributes.Description("Horse Power")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get HorsePower(): number {
        return this._model.horsePower;
    }
    public set HorsePower(value: number) {
        this._model.horsePower = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(26)
    @PG.Attributes.Description("Disconnect Size")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get DisconnectSize(): number {
        return this._model.disconnectSize;
    }
    public set DisconnectSize(value: number) {
        this._model.disconnectSize = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(27)
    @PG.Attributes.Description("External Disconnect Fuse Size")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get ExternalDisconnectFuseSize(): number {
        return this._model.externalDisconnectFuseSize;
    }
    public set ExternalDisconnectFuseSize(value: number) {
        this._model.externalDisconnectFuseSize = value;
    }

    @PG.Attributes.Include()
    @PG.Attributes.Order(28)
    @PG.Attributes.Description("Weight")
    @PG.Attributes.PropertyType(PG.Types.E_PropertyType.Integer)
    public get Weight(): number {
        return this._model.weight;
    }
    public set Weight(value: number) {
        this._model.weight = value;
    }
            

    public get ObjectName(): string {
        return "Motor Control";
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
        this._unitView.getMotorControlModelSelected.render();
    }

}