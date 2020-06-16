import { Component, OnInit, Output, EventEmitter} from "@angular/core";

@Component
    ({
        selector: "footprint-map",
        templateUrl: "./footprint-map.component.html",
        styleUrls:
            [
                "./footprint-map.component.css"
            ]
    })
export class FootprintMapComponent implements OnInit {

    title: string;
    view: number;

    @Output() viewChange = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        this.title = '';
    }

    public selectedView(view : number): void  {
        this.view = view;

        switch (view) {
            case 1: this.title = "- Top"; break;
            case 2: this.title = "- Bottom"; break;
            case 3: this.title = "- Left Side"; break;
            case 4: this.title = "- Front"; break;
            case 5: this.title = "- Right Side"; break;
            case 6: this.title = "- Rear"; break;
            default: this.title = ''; break;
        }
        if (view > 0) this.viewChange.emit(view);
      //  console.log(view);
    }
}