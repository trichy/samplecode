export class FanRating {

    public ProductType: string = "";
    public FanVendorType: string = "";
    public FanSize: string = "";
    public AirflowCFM: number = 0;
    public AltitudeFt: number = 0;
    public TSPInwg: number = 0;
    public WheelWidthPercent: number = 0;
    public FanInputKw: string = "";
    public FanElectricalPower: string = "";
    public RPM: number = 0;
    public HP: number = 0;
    public AirDensityVariationWithAltitude: number = 0; 
    public FanClass: string = "";
    public PercentWheelWidth: number = 0;
    public PercentWheelDiameter: number = 0;
    public Voltage: number = 0;
    public AirflowCFMPoints: any[] = [];
    public TSPInwgPoints: any[] = [];
    public SurgePercent: number = 0;
    public BHPPoints: any[] = [];
    public Errors: any = null;
    public FanArray: any = "";
    public ReduntantFans: number = 0;
    constructor(obj: any) {
        this.ProductType = (obj && obj.ProductType) ? obj.ProductType : null;
        this.FanVendorType = (obj && obj.FanVendorType) ? obj.FanVendorType : null;
        this.FanSize = (obj && obj.FanSize) ? obj.FanSize : null;
        this.AirflowCFM = (obj && obj.AirflowCFM) ? obj.AirflowCFM : null;
        this.AltitudeFt = (obj && obj.AltitudeFt) ? obj.AltitudeFt : null;
        this.TSPInwg = (obj && obj.TSPInwg) ? obj.TSPInwg : 1.11;
        this.WheelWidthPercent = (obj && obj.WheelWidthPercent) ? obj.WheelWidthPercent : null;
        this.FanInputKw = (obj && obj.FanInputKw) ? obj.FanInputKw : null;
        this.FanElectricalPower = (obj && obj.FanElectricalPower) ? obj.FanElectricalPower : null;
        this.AirflowCFMPoints = (obj && obj.AirflowCFMPoints) ? obj.AirflowCFMPoints : null;
        this.TSPInwgPoints = (obj && obj.TSPInwgPoints) ? obj.TSPInwgPoints : null;
        this.SurgePercent = (obj && obj.SurgePercent) ? obj.SurgePercent : null;
        this.BHPPoints = (obj && obj.BHPPoints) ? obj.BHPPoints : null;
        this.RPM = (obj.RPM) ? obj.RPM : null;
        this.FanArray = (obj && obj.FanArray) ? obj.FanArray : null;
        this.ReduntantFans = (obj && obj.ReduntantFans) ? obj.ReduntantFans : null;
    }
}