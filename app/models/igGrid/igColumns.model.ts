export class igColumns {


    public headerText?: string = '';
    public key?: string = '';
    public dataType?: string;
    public width?: string;
    public allowHiding?: boolean;
    public hidden?: boolean;
    public format?: string = "";
    public formatter?: any;
    public template?: string;
    public group?: any;

    constructor() {
        this.allowHiding = false;
        this.hidden = false;
    }
}
