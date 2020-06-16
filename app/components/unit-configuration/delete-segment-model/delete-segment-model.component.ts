import { Component, OnInit, Output, EventEmitter , Input} from '@angular/core';

@Component({
  selector: 'app-delete-segment-model',
  templateUrl: './delete-segment-model.component.html',
  styleUrls: ['./delete-segment-model.component.css']
})
export class DeleteSegmentModelComponent implements OnInit {
    @Output() onContinue = new EventEmitter<any>();
    @Output() deleteSegmentCancel = new EventEmitter<any>();
    @Input() segmentName;
    @Input() segmentSuffix;
    
  constructor() { }

  ngOnInit() {
  }
   segmentDeletionContinue() {
       this.onContinue.emit(true);
   }
    public onCloseModalClicked(): void {
        
        this.deleteSegmentCancel.emit(true);
    }
      
    }


