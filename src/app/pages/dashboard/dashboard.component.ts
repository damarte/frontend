import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Router, NavigationStart } from '@angular/router';

var context;

@Component({
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./styles-board.css']
})

export class DashboardComponent implements OnInit {


    dashboardList: any[] = [];
    selectedBoard:any = null;

    detailMenuOpen = 'out';

    constructor(private _configurationService: ConfigurationService,
        public http: Http, router:Router) {

            context = this;

            //Delete all timers.
            router.events.subscribe(event => {
                if(event instanceof NavigationStart) {
                    for(var i=0; i<10000; i++){
                        clearInterval(i);
                    }
                }
              });
    }

    onLoadFinished(){

    }

    ngOnInit() {
        this.updateDashboardMenu('');
    }

    updateDashboardMenu(selectedBoard: any) {

        this._configurationService.getBoards().subscribe(data => {

            const me = this;
            if (data && data instanceof Array && data.length) {
                this.dashboardList.length = 0;

                //TODO CHANGE WHEN STRUCTURE GOES OK
                // data  = [{"title": data[0].name, "structure": data[0].structure}];
                if (!this._configurationService.demo){
                    var newData = [];
                    var i = data.length - 1; //ONLY LAST 3 DASHBOARDS - TEST
                    var limit = i - 3;
                    limit = limit > 0 ? limit : 0;
                    for (i; i >= limit; i--){
                        var element = data[i];
                        if (i >= limit){
                            newData.push({"title": element.name, "structure": element.structure,
                            "id": element.id});
                        }
                    }
                    data = newData;
                }
                console.log(data);

                // sort boards
                data.sort((a: any, b: any) => a.id - b.id);

                data.forEach(board => {

                    me.dashboardList.push({"title": board.title, "id": board.id});

                });

                if (!selectedBoard.id) {
                    var newBoard = this.dashboardList[0];
                } else {
                    newBoard = {id: selectedBoard.id, title: selectedBoard.title};
                    this.selectBoard(newBoard);
                }
                this.selectBoard(newBoard);
            }else{
                this.dashboardList = [];
            }

            setTimeout(function (){
                // window.dispatchEvent(new Event('resize'));
            }, 1000);


        });
    }

    selectBoard(selectedBoard: any) {
        this.selectedBoard = selectedBoard;
    }

    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }
}
