import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { defaultBoard } from '../dashboard/models/dashboard-default';
import { sampleBoardCollection } from '../dashboard/models/dashboard-collection-sample';


@Injectable()
export class ConfigurationService {
    model: any; // todo review this object closely
    currentModel: any; // this object helps with updates to property page values
    demo = false;

    defaultBoard: any;
    sampleBoardCollection: any;

    /**
     * todo - fix this hard coded store
     * @type {string}
     */
    // remoteConfigurationRepository = 'https://platform.fiwoo.eu/api/data-visualization/dashboards';
    // remoteConfigurationRepository = 'http://stg-sac-fase-dos.emergyalabs.com:8000/data-visualization/dashboards';
    remoteConfigurationRepository = 'https://platform.fiwoo.eu/api/data-visualization/dashboards';

    

    constructor(private _http: Http) {

        Object.assign(this, {defaultBoard});
        Object.assign(this, {sampleBoardCollection});
        this.seedLocalStorageWithSampleBoardCollection();
    }

    private seedLocalStorageWithSampleBoardCollection() {

        if (localStorage.getItem('board') === null) {
            localStorage.setItem('board', JSON.stringify(this.sampleBoardCollection));
        }
    }

    public getBoardByTitle(title: string) {

        if (this.demo) {

            return new Observable(observer => {
                const board_collection = JSON.parse(localStorage.getItem('board'));

                let data = '';
                board_collection['board'].forEach(boardModel => {

                    if (boardModel.title === title) {
                        data = boardModel;
                    }
                });
                observer.next(data);
                return () => {
                };
            });
        } else {

            return this._http.get(this.remoteConfigurationRepository + '/' + name).map(res => res.json());
        }
    }

    public getBoardById(id: string) {

        return this._http.get(this.remoteConfigurationRepository + '/' + id).map(res => res.json());
        
    }

    public getBoards() {

        if (this.demo) {
            return new Observable(observer => {
                let data = JSON.parse(localStorage.getItem('board'));
                if (!data) {
                    data = {board: []};
                }
                observer.next(data.board);
                return () => {
                };
            });

        } else {
            /**
             * todo - this call is based on an internal representation (admin console) of something called a store.
             * That concept requires refactoring.
             */
            return this._http.get(this.remoteConfigurationRepository).map(res => res.json());
        }
    }

    public saveBoard(board: any): any {

        this.model = board;

        if (Object.keys(board).length === 0 && board.constructor === Object) {
            return Observable.empty();
        }

        if (this.demo) {
            return new Observable(observer => {
                let board_collection;

                // find and remove board from storage
                this.deleteBoardFromLocalStore(board.title);

                // get a collection object and add board to it
                if ((board_collection = JSON.parse(localStorage.getItem('board'))) == null) {

                    board_collection = {
                        board: []
                    };
                }
                board_collection['board'].push(board);

                // save
                localStorage.setItem('board', JSON.stringify(board_collection));

                observer.next({});

                return () => {
                };

            });

        } else {

            /**
             * todo - a delete must happen here
             *
             */

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            if (board.isNew){
                return this._http.post(this.remoteConfigurationRepository + '/', JSON.stringify(board), {headers: headers});
            }else{
                var sendBoard = Object.assign({},board);
                sendBoard = this.updateBoardForSend(sendBoard);
                console.log(JSON.stringify(board));
                return this._http.put(this.remoteConfigurationRepository + '/' + board.id, JSON.stringify(sendBoard), {headers: headers});
            }
            
        }
    }

     //TODO CHANGE WHEN WS Ok
     private updateBoardForSend(board){
        if (board != null){
            board.name = board.title;
            board.rows.forEach(row => {
                row.columns.forEach(column => {
                    // if (column.gadgets.length == 0){
                    //     row.columns.pop(column);                           
                    // }else{
                        column.widgets = Object.assign([], column.gadgets);
                        column.widgets.forEach(widget => {
                            widget.type = this.getWidgetType(widget.componentType);
                            widget.id = widget.instanceId;
                            widget.propertyPages = widget.config.propertyPages;
                            widget.propertyPages.forEach(propertyPage => {
                                propertyPage.groupId = "run";
                                propertyPage.position =  10;
                                var i = 0;
                                propertyPage.properties.forEach(property => {
                                    // property.id = i
                                    property._controlType = property.controlType;
                                    property._key = property.key;
                                    property._label = property.label;
                                    property._value = property.value;
                                    property._required = property.required;
                                    property._order = property.order;  
                                    i++;     
                                });
                            });
                        });
                    // }
                });
                // if (row.columns.length == 0){
                //     board.rows.pop(row);    
                // }  
            });
            
        }
        return board;
    }

    getWidgetType (typeName){
        var name = "";
       switch(typeName){
           case "BarChartComponent":
            name = "barChart";
           break;
           case "LinearGaugeComponent":
            name = "controlWidgets";
           break;
           case "LineChartComponent":
            name = "lineChart";
           break;
           case "BarGaugeComponent":
            name = "alarmWidget";
           break;
           case "CircularGaugeComponent":
            name = "analogGauge";
           break;
           case "GisMapComponent":
            name = "cards";
           break;
        
       }
       return {"name": name};
   }


    private delete(board_collection: any) {

        localStorage.removeItem('board');
        localStorage.setItem('board', JSON.stringify(board_collection));

    }

    private deleteBoardFromLocalStore(boardTitle: string) {
        const board_collection = JSON.parse(localStorage.getItem('board'));

        let index;
        if (board_collection && ( index = board_collection['board'].findIndex(item => {
                return item.title === boardTitle;
            })) >= 0) {

            board_collection['board'].splice(index, 1);

            this.delete(board_collection);

        }
    }

    public deleteBoard(boardTitle: string) {

        if (this.demo) {

            return new Observable(observer => {

                this.deleteBoardFromLocalStore(boardTitle);

                observer.next({});
                return () => {
                };

            });

        } else {

            return this._http.delete(this.remoteConfigurationRepository + '/' + boardTitle);
        }
    }

    public getDefaultBoard() {

        return new Observable(observer => {
            observer.next(this.defaultBoard);
            return () => {
            };
        });
    }


    /*
     when a gadget instance's property page is updated and saved, the change gets communicated to all
     gadgets. The gadget instance id that caused the change will update their current instance. todo - this might be able to be
     improved. For now the utility of this approach allows the configuration service to capture the property page change in a way
     that allows us to update the persisted board model.
     */
    notifyGadgetOnPropertyChange(gadgetConfig: string, instanceId: number) {

        this.savePropertyPageConfigurationToStore(gadgetConfig, instanceId);
    }


    setCurrentModel(_currentModel: any) {
        this.currentModel = _currentModel;
    }

    savePropertyPageConfigurationToStore(gadgetConfig: string, instanceId: number) {

        this.currentModel.rows.forEach(row => {

            row.columns.forEach(column => {

                if (column.gadgets) {
                    column.gadgets.forEach(gadget => {
                        this.updateProperties(gadgetConfig, gadget, instanceId);

                    });
                }
            });
        });

        this.saveBoard(this.currentModel).subscribe(result => {

                /**
                 * todo - create popup/toast to show configuration saved message
                 */
                console.debug('The following configuration model was saved!');

            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!'));


    }

    updateProperties(updatedProperties: any, gadget: any, instanceId: number) {

        const updatedPropsObject = JSON.parse(updatedProperties);

        if (gadget.instanceId === instanceId) {

            gadget.config.propertyPages.forEach(function (propertyPage) {

                for (let x = 0; x < propertyPage.properties.length; x++) {

                    for (const prop in updatedPropsObject) {
                        if (updatedPropsObject.hasOwnProperty(prop)) {
                            if (prop === propertyPage.properties[x].key) {
                                propertyPage.properties[x].value = updatedPropsObject[prop];
                            }
                        }
                    }
                }
            });
        }
    }
}
