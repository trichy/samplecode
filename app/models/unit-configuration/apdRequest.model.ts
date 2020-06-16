export class ApdRequestModel {

    public ProductType: string;
    public SegmentType: string;
    public TunnelHeight: number;
    public TunnelWidth: number;
    public QtyFilter24x12: number;
    public QtyFilter12x24: number;
    public QtyFilter20x20: number;
    public QtyFilter24x20: number;
    public QtyFilter20x24: number;
    public QtyFilter24x24: number;
    public QtyFilter20x16: number;
    public QtyFilter16x20: number;
    public AirflowCFM: number;
    public FilterArea: number;
    public FaceVelocity: number;
    public FilterMediaType: string;
    public FilterDepth: string;
    public PreFilterDepth: string;
    public MervRating: string;
    public FilterLoadMethod: string;
    public FilterBankWidth: number;
    public FilterQtyHigh: number;
    public TrackMaterialType: string;
    public TrackMaterialGauge: number;
    public BulkheadMaterialType: string;

    constructor() {
        this.ProductType = 'SolutionXT';
        this.SegmentType = 'FF';
        this.TunnelHeight = 90;
        this.TunnelWidth = 120;
        this.QtyFilter24x12 = 0;
        this.QtyFilter12x24 = 0;
        this.QtyFilter20x20 = 4;
        this.QtyFilter24x20 = 4;
        this.QtyFilter20x24 = 0;
        this.QtyFilter24x24 = 0;
        this.QtyFilter20x16 = 0;
        this.QtyFilter16x20 = 0;
        this.AirflowCFM = 15000;
        this.FilterArea = 25;
        this.FaceVelocity = 0;
        this.FilterMediaType = "Pleated";
        this.FilterDepth = "_2";
        this.PreFilterDepth = "_2";
        this.MervRating = "Merv_8";
        this.FilterLoadMethod = "FrontLoad";
        this.FilterBankWidth = 18;
        this.FilterQtyHigh = 2;
        this.TrackMaterialType = "STL_GALV";
        this.TrackMaterialGauge = 12;
        this.BulkheadMaterialType = "STL_GALV";
    }
}                                                           