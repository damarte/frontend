import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

declare var jQuery: any;


@Component({
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles-board.css']
})

export class DashboardComponent implements OnInit {


    dashboardList: any[] = [];
    selectedBoard = '';  

    detailMenuOpen = 'out';

    constructor(private _configurationService: ConfigurationService) {
    }

    ngOnInit() {
        this.updateDashboardMenu('');        
    }

    updateDashboardMenu(selectedBoard: string) {

        this._configurationService.getBoards().subscribe(data => {

            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;


                // sort boards
                data.sort((a: any, b: any) => a.id - b.id);

                data.forEach(board => {

                    me.dashboardList.push(board.title);

                });

                if (selectedBoard === '') {

                    this.selectBoard(this.dashboardList[0]);

                } else {

                    this.selectBoard(selectedBoard);
                }
            }
        });
    }

    selectBoard(selectedBoard: string) {
        this.selectedBoard = selectedBoard;
    }

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }

    
}
