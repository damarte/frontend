/**
 * Created by jayhamilton on 1/24/17.
 */
import {
    ViewChild, ElementRef, AfterViewInit, Component, Output, EventEmitter, Input
} from '@angular/core';
import {
     style, state, trigger, animate, transition
} from '@angular/animations';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {tabsModel} from '../../dashboard/models/dashboard-configtabs.model';
import {ConfigurationService} from '../../services/configuration.service';
import swal from "sweetalert2";


declare var jQuery: any;

/**
 * Message Modal - clasable modal with message
 *
 * Selector message-modal
 *
 * Methods
 *      popMessageModal - display a message modal for a sepcified duration
 *      showMessageModal - show the message modal
 *      hideMessageModal - hide the message modal
 */
@Component({
    selector: 'app-board-configuration-modal',
    moduleId: module.id,
    templateUrl: './board-configuration.html',
    styleUrls: ['./styles-board.css'],
    animations: [

        trigger('contentSwitch', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('750ms ease-in')),
            transition('active => inactive', animate('750ms ease-out'))
        ])
    ]


})
export class BoardConfigurationComponent implements AfterViewInit {

    @Output() dashboardCreateEvent: EventEmitter<any> = new EventEmitter();
    @Output() dashboardEditEvent: EventEmitter<any> = new EventEmitter();
    @Output() dashboardDeleteEvent: EventEmitter<any> = new EventEmitter();
    @Input() dashboardList: any [];


    newDashboardItem = '';


    modalicon: string;
    modalheader: string;
    modalconfig: string;

    @ViewChild('boardconfigmodal_tag') boardconfigmodalaRef: ElementRef;
    configModal: any;
    currentTab: string;
    tabsModel: any[];

    constructor(private _configurationService: ConfigurationService) {

        Object.assign(this, {tabsModel});
        this.setCurrentTab(0);

    }


    popConfigModal(icon: string, header: string, message: string, durationms: number) {
        this.showMessageModal(icon, header, message);
        Observable.interval(durationms).take(1).subscribe(
            () => {
                this.hideMessageModal();
            }
        );
    }

    showMessageModal(icon: string, header: string, message: string) {
        this.modalicon = icon;
        this.modalheader = header;
        this.modalconfig = message;
        this.configModal.modal('show');

    }

    showBoardConfigurationModal(header: string) {
        this.modalheader = header;
        this.configModal.modal('show');
    }

    hideMessageModal() {
        this.modalicon = '';
        this.modalheader = '';
        this.modalconfig = '';
        this.configModal.modal('hide');
    }

    createBoard(name: string) {
        if (name !==  '') {
            this.dashboardCreateEvent.emit(name);
            this.newDashboardItem = '';
        }
    }

    editBoard(name: string) {
        this.dashboardEditEvent.emit(name);
    }

    deleteBoard(board: any) {
        if (this._configurationService.demo){
            this.dashboardDeleteEvent.emit(board.title);
        }else{
            swal({
                title: 'Are you sure you want to delete the dashboard?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                  this.dashboardDeleteEvent.emit(board.id);
                  swal(
                    'Deleted!',
                    'Your dashboard has been deleted.',
                    'success'
                  )
                }
              });
            
        }
    }


    ngAfterViewInit() {
        this.configModal = jQuery(this.boardconfigmodalaRef.nativeElement);
        this.configModal.modal('hide');
    }

    setCurrentTab(tab_index) {
        this.currentTab = this.tabsModel[tab_index].displayName;
    }

}
