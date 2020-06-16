import { Type } from '@angular/core';



export class CurrentUnit {
    public static tabList: Array<TabItem> = [
        {
            title: 'Filters',
            module: 'filters',
            data: {}
        },
        {
            title: 'Fan',
            module: 'fan',
            data: {}
        },
        {
            title: 'Coil',
            module: 'coil',
            data: {}
        }
    ];

}

export class TabItem {
    title: string;
    module: string;
    component?: Type<any>;
    //unremovable?: boolean;
    //icon?: string;
    data?: any;
}


export class Menu {
    title: string;
    module: string;
    power?: string;
    isSelect: boolean;
}
