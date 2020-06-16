export const DefaultFeature: any[] = [  
    {
        name: "ColumnMoving",
        mode: "deferred",
        movingDialogDisplayText: "Move Column"
    },
    {
        name: 'Resizing',
        deferredResizing: false,
        allowDoubleClickToResize: true
    },
    {
        name: "Selection",
        mode: "row",
        activation: false
    },
    {
        name: "Updating",
        enableAddRow: false,
        enableDeleteRow: false,
        editMode: "cell"
    },
    {
        name: "Filtering"
    }
];

export const PagingFeature: any[] = [   
    {
        name: "Sorting",
        persist: false
    },
    {
        name: "ColumnMoving",
        mode: "deferred",
        movingDialogDisplayText: "Move Column"
    },
    {
        name: 'Resizing',
        deferredResizing: false,
        allowDoubleClickToResize: true
    },
    {
        name: "Selection",
        mode: "row",
        activation: false
    },
    {
        name: "Paging",
        type: "local",
        pageSize: 5
    },
    {
        name: "Updating",
        enableAddRow: false,
        enableDeleteRow: false,
        editMode: "cell"
    }
];



    export const NoPagingFeature: any[] = [   
    {
        name: "ColumnMoving",
        mode: "deferred",
        movingDialogDisplayText: "Move Column"
    },
    {
        name: 'Resizing',
        deferredResizing: false,
        allowDoubleClickToResize: true
    },
    {
        name: "Selection",
        mode: "row",
        activation: false
    },
    {
        name: "Updating",
        enableAddRow: false,
        enableDeleteRow: false,
        editMode: "cell"
    }
];