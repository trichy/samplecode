export class SaveEstimatedRequest {
    public Items: any[];
    public Guid: string;
    public Name: string;
    public Desripcion: string;
    public ParentGuid: string;
    public Type: string
    public Quantity: number;
    public Sequence: number;
    public EstimateLocation: string;
    public isActive: boolean;
    public isVisible: boolean;
    public Attributes: any;
    public EstimatingAttributes: any;
    public OrderingAttributes: any;
    public Xml: any;
    public URLs: any;
    public States: any;
    public References: any;
    public Notes: string;
    public EstValues: any[];
    public Tags: any[]

    constructor() {
        this.Guid = '66334B79-CA49-45E0-B8C0-B0173B7FEA1B';
        this.Name = 'VAV-1 - SW 6';
        this.Desripcion = 'VAV Box.Dual Duct';
        //this.
    }
}