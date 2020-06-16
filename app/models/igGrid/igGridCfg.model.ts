import { igColumns } from "./igColumns.model";

export class igGridCfg {

    primaryId?: string;
    autofitLastColumn?: boolean;
    dataSource?: any[];
    columns?: igColumns[];
    show?: boolean;
    features?: any[];
    renderCheckboxes?: boolean

    constructor()
    {
        this.dataSource = [];
        this.columns = [];
    }
} 