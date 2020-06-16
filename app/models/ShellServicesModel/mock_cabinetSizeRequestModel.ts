export class CabinetSizeRequestModel {
    ProductType: string;
    UnitType: string;
    StackingType: string;
    HousingThickness: string;
    UnitBaseHeight: number;
    BottomTunnelHeight: number;
    BottomTunnelWidth: number;
    TopTunnelHeight: number;
    TopTunnelWidth: number;
    constructor(productType, unitType, stackingType, thickness, baseHeight, bottomHeight, bottomWidth, topHeight, topWidth) {

        this.ProductType = productType,
            this.UnitType = unitType,
            this.StackingType = stackingType,
            this.HousingThickness = thickness,
            this.UnitBaseHeight = baseHeight,
            this.BottomTunnelHeight = bottomHeight,
            this.BottomTunnelWidth = bottomWidth,
            this.TopTunnelHeight = topHeight,
            this.TopTunnelWidth = topWidth
    }

}