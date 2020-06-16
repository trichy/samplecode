
export class FilterBank {

    public MaximumBankHeight: number;
    public MaximumBankWidth: number;
    public QtyFilter24x12: boolean;
    public QtyFilter12x24: boolean;
    public QtyFilter20x20: boolean;
    public QtyFilter24x20: boolean;
    public QtyFilter20x24: boolean;
    public QtyFilter24x24: boolean;
    public QtyFilter20x16: boolean;
    public QtyFilter16x20: boolean;

    private filterBankHeight: number;
    private filterBankWidth: number;
    private filterBankArea: number;
    private filterBankFilterQtyHigh: number;

    private filterBankAFilterHeight: number;
    private filterBankAFilterWidth: number;
    private filterBankAQtyFilterHigh: number;
    private filterBankAQtyFilterWide: number;

    private filterBankBFilterHeight: number;
    private filterBankBFilterWidth: number;
    private filterBankBQtyFilterHigh: number;
    private filterBankBQtyFilterWide: number;

    private filterBankCFilterHeight: number;
    private filterBankCFilterWidth: number;
    private filterBankCQtyFilterHigh: number;
    private filterBankCQtyFilterWide: number;;



    public Errors: any;
    constructor(obj: any) {
        this.filterBankHeight = obj && typeof (obj.FilterBankHeight) != "undefined" ? obj.FilterBankHeight : 0;
        this.filterBankWidth = obj && typeof (obj.FilterBankWidth) != "undefined" ? obj.FilterBankWidth : 0;
        this.filterBankArea = obj && typeof (obj.FilterBankArea) != "undefined" ? obj.FilterBankArea : 0;
        this.filterBankFilterQtyHigh = obj && typeof (obj.FilterBankFilterQtyHigh) != "undefined" ? obj.FilterBankFilterQtyHigh : 0;

        this.filterBankAFilterHeight = obj && typeof (obj.FilterBankAFilterHeight) != "undefined" ? obj.FilterBankAFilterHeight : 0;
        this.filterBankAFilterWidth = obj && typeof (obj.FilterBankAFilterWidth) != "undefined" ? obj.FilterBankAFilterWidth : 0;
        this.filterBankAQtyFilterHigh = obj && typeof (obj.FilterBankAQtyFilterHigh) != "undefined" ? obj.FilterBankAQtyFilterHigh : 0;
        this.filterBankAQtyFilterWide = obj && typeof (obj.FilterBankAQtyFilterWide) != "undefined" ? obj.FilterBankAQtyFilterWide : 0;

        this.filterBankBFilterHeight = obj && typeof (obj.FilterBankBFilterHeight) != "undefined" ? obj.FilterBankBFilterHeight : 0;
        this.filterBankBFilterWidth = obj && typeof (obj.FilterBankBFilterWidth) != "undefined" ? obj.FilterBankBFilterWidth : 0;
        this.filterBankBQtyFilterHigh = obj && typeof (obj.FilterBankBQtyFilterHigh) != "undefined" ? obj.FilterBankBQtyFilterHigh : 0;
        this.filterBankBQtyFilterWide = obj && typeof (obj.FilterBankBQtyFilterWide) != "undefined" ? obj.FilterBankBQtyFilterWide : 0;

        this.filterBankCFilterHeight = obj && typeof (obj.FilterBankCFilterHeight) != "undefined" ? obj.FilterBankCFilterHeight : 0;
        this.filterBankCFilterWidth = obj && typeof (obj.FilterBankCFilterWidth) != "undefined" ? obj.FilterBankCFilterWidth : 0;
        this.filterBankCQtyFilterHigh = obj && typeof (obj.FilterBankCQtyFilterHigh) != "undefined" ? obj.FilterBankCQtyFilterHigh : 0;
        this.filterBankCQtyFilterWide = obj && typeof (obj.FilterBankCQtyFilterWide) != "undefined" ? obj.FilterBankCQtyFilterWide : 0;
    }
}