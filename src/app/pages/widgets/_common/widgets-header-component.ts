import { Component, Input, Output, EventEmitter } from '@angular/core';
import swal from "sweetalert2";

@Component({
    moduleId: module.id,
    selector: 'app-gadget-header',
    templateUrl: './widgets-header.html',
    styleUrls: ['./styles-widgets.css']
})
export class WidgetsHeaderComponent {
    @Input() title: string;
    @Input() showControls: boolean;
    @Input() inRun: boolean;
    @Input() inConfig: boolean;
    @Input() actionInitiated: boolean;
    @Input() showOperationControls: boolean;
    @Input() showConfigurationControl: boolean;
    @Input() gadgetHasOperationControls: boolean;
    @Output() removeEvent: EventEmitter<any> = new EventEmitter();
    @Output() toggleConfigModeEvent: EventEmitter<any> = new EventEmitter();
    @Output() runEvent: EventEmitter<any> = new EventEmitter();
    @Output() stopEvent: EventEmitter<any> = new EventEmitter();
    @Output() helpEvent: EventEmitter<any> = new EventEmitter();


    remove() {       
        swal({
            title: 'Are you sure you want to delete this widget?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this.removeEvent.emit();
              swal(
                'Deleted!',
                'Your widget has been deleted.',
                'success'
              )
            }
          });
    }

    toggleConfigMode() {
        this.toggleConfigModeEvent.emit();
    }

    run() {

        this.runEvent.emit();

    }

    stop() {

        this.stopEvent.emit();
    }

    help(){
        this.helpEvent.emit();
    }

}