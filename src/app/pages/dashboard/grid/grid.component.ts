import { Component, Output, EventEmitter } from '@angular/core';
import { WidgetsInstanceService } from './grid.service';
import { ConfigurationService } from '../../services/configuration.service';
import { WidgetsConfigModel } from '../../widgets/_common/widgets-config-model';
import { AddWidgetsService } from '../../add-widgets/service';
import { ToastService } from '../../toast/toast.service';
import { FiwooService } from '../../services/fiwoo.service';


@Component({
    moduleId: module.id,
    selector: 'app-grid-component',
    templateUrl: './grid.html',
    styleUrls: ['./styles-grid.css']
})
export class GridComponent {
    @Output() boardUpdateEvent: EventEmitter<any> = new EventEmitter();
    @Output() addWidgetEvent: EventEmitter<any> = new EventEmitter();


    model: any = {};
    noGadgets = true;
    dashedStyle: {};
    dropZone1: any = null;
    dropZone2: any = null;
    dropZone3: any = null;

    gadgetLibrary: any[] = [];

    /** todo
     * Temporary objects for experimenting with AI
     * @type
     */

    gridInsertionPosition = {
        x: 0,
        y: 0
    };

    /**
     * Todo - split model and board operations. This class should really focus on an individual board model's operations
     * within the grid. The board specific operations should be moved to the board component.
     * @param _widgetsInstanceService
     * @param _procmonConfigurationService
     */

    constructor(private _widgetsInstanceService: WidgetsInstanceService,
                private _configurationService: ConfigurationService,
                private _widgetsLibraryService: AddWidgetsService,
                private _toastService: ToastService,
                private _fiwooService: FiwooService) {

        this._widgetsInstanceService.listenForInstanceRemovedEventsFromGadgets().subscribe((message: string) => {
            this.saveBoard('Gadget Removed From Board: ' + message, false);
        });

        this.initializeBoard();
        this.getGadgetLibrary();

    }

    /**
     *
     * This is experimental code that deals with AI
     */
    getGadgetLibrary() {

        this._widgetsLibraryService.getGadgetLibrary().subscribe(data => {
            this.gadgetLibrary.length = 0;
            const me = this;
            data.library.forEach(function (item) {
                me.gadgetLibrary.push(item);
            });
        });
    }

    clickEmptyWidget(){
        this.addWidgetEvent.emit();
    }

    getGadgetFromLibrary(gadgetType: string) {

        let gadgetObject = null;
        this.gadgetLibrary.forEach(gadget => {


            if (gadgetType.localeCompare(gadget['componentType']) === 0) {

                gadgetObject = gadget;
            }
        });
        return gadgetObject;
    }

    addGadgetUsingArtificialIntelligence(aiObject: any) {

        console.log('In add gadget component');
        console.log(aiObject);
        /** todo
         * make confidence code configurable
         */
        if (aiObject && aiObject.operation) {
            switch (aiObject.operation) {
                case 'get_storage':
                    this.addGadget(this.getGadgetFromLibrary('StorageObjectListComponent'));
                    break;
                case 'get_cpu':
                    this.addGadget(this.getGadgetFromLibrary('CPUGadgetComponent'));
                    break;
            }
        }
    }

    /**
     * This is the end of the experimental AI code.
     */

    updateGadgetPositionInBoard($event, columnNumber, rowNumber, type) {
        let moveComplete = false;

        this.getModel().rows.forEach(row => {

            let colpos = 0;

            row.columns.forEach(column => {

                let gadgetpos = 0;

                if (column.gadgets) {

                    column.gadgets.forEach(_widgets => {

                        if (_widgets.instanceId === $event.dragData && !moveComplete) {

                            const gadget = column.gadgets.splice(gadgetpos, 1);


                            if (!this.getModel().rows[rowNumber].columns[columnNumber].gadgets) {
                                this.getModel().rows[rowNumber].columns[columnNumber].gadgets = [];
                            }
                            this.getModel().rows[rowNumber].columns[columnNumber].gadgets.push(gadget[0]);
                            this.saveBoard('drag drop operation', false);
                            moveComplete = true;
                        }
                        gadgetpos++;
                    });
                    colpos++;
                }
            });
        });
    }

    public createBoard(name: string) {
        this.loadNewBoard(name);
    }

    public editBoard(name: string) {

    }

    public deleteBoard(name: string) {

        this._configurationService.deleteBoard(name).subscribe(data => {

                this.initializeBoard();

            },
            error => console.error('Deletion error', error),
            () => console.debug('Board Deletion: ' + name));

    }

    public addGadget(gadget: any) {

        console.log(gadget);

        const _widgets = Object.assign({}, gadget);

        _widgets.instanceId = new Date().getTime();
        _widgets.config = new WidgetsConfigModel(gadget.config);

        this.setGadgetInsertPosition();

        const x = this.gridInsertionPosition.x;
        const y = this.gridInsertionPosition.y;

        if (!this.getModel().rows[x].columns[y].gadgets) {

            this.getModel().rows[x].columns[y].gadgets = [];
        }
        this.getModel().rows[x].columns[y].gadgets.push(_widgets);

        this.saveBoard('Adding Gadget To The Board', false);

    }


    public updateBoardLayout(structure) {

        if (structure.id === this.getModel().id) {
            return;
        }

        const _model = Object.assign({}, this.getModel());

        const columns: any[] = this.readColumnsFromOriginalModel(_model);

        // reset the original model's rows and columns based on the new structure
        _model.rows.length = 0;

        Object.assign(_model.rows, structure.rows);
        _model.structure = structure.structure;
        _model.id = structure.id;

        let counter = 0;

        while (counter < columns.length) {
            counter = this.fillGridStructure(_model, columns, counter);
        }

        this.setModel(_model);

        // clear temporary object
        for (const member in  _model) {
            if (_model[member] != null) {
              delete  _model[member];
            }
        }

        this.saveBoard('Grid Layout Update', false);
    }

    private updateGridState() {

        let gadgetCount = 0;

        if (this.getModel().rows) {
            this.getModel().rows.forEach(function (row) {
                row.columns.forEach(function (column) {
                    if (column.gadgets) {
                        column.gadgets.forEach(function (gadget) {
                            gadgetCount++;
                        });
                    }
                });
            });
        }

        this.noGadgets = !gadgetCount;

        this.dashedStyle = {
            'border-style': this.noGadgets ? 'dashed' : 'none',
            'border-width': this.noGadgets ? '2px' : 'none',
            'border-color': this.noGadgets ? 'darkgray' : 'none',
            'padding': this.noGadgets ? '5px' : 'none'
        };
    }

    private readColumnsFromOriginalModel(_model) {

        const columns = [];
        _model.rows.forEach(function (row) {
            row.columns.forEach(function (col) {
                columns.push(col);
            });
        });
        return columns;

    }

    private fillGridStructure(destinationModelStructure, originalColumns: any[], counter: number) {

        const me = this;

        destinationModelStructure.rows.forEach(function (row) {
            row.columns.forEach(function (destinationColumn) {
                if (!destinationColumn.gadgets) {
                    destinationColumn.gadgets = [];
                }
                if (originalColumns[counter]) {
                    me.copyGadgets(originalColumns[counter], destinationColumn);
                    counter++;
                }
            });
        });

        console.log('Fill grid structure counter value returned: ' + counter);

        return counter;

    }

    private copyGadgets(source, target) {

        if (source.gadgets && source.gadgets.length > 0) {
            let w = source.gadgets.shift();
            while (w) {
                target.gadgets.push(w);
                w = source.gadgets.shift();
            }
        }
    }

    public enableConfigMode() {

        this._widgetsInstanceService.enableConfigureMode();
    }

    private initializeBoard() {



        this._configurationService.getBoards().subscribe(board => {

            if (board && board instanceof Array && board.length) {

                //TODO CHANGE
                var newData: [any];
                var i = board.length - 1; //ONLY LAST 3 DASHBOARDS - TEST
                var limit = i - 3;
                limit = limit > 0 ? limit : 0;
                for (i; i >= limit; i--){
                    var element = board[i];
                    if (i >= limit){
                        newData.push(element);
                    }
                }
                // board.forEach(element => {
                //     if (i >= limit){
                //         newData.push(element);
                //         i--;
                //     }
                // });

                board = newData;

                const sortedBoard = board.sort(function (a, b) {
                    return a.id - b.id;
                });
                if (this._configurationService.demo){
                    this.loadBoard(sortedBoard[0].title);
                }else{
                    this.loadBoardById(sortedBoard[0].id);
                }
            } else {
                this.boardUpdateEvent.emit('');
                // this.loadDefaultBoard();
            }
        });
    }

    private loadBoardById(boardId: string) {

        this.clearGridModelAndGadgetInstanceStructures();

        this._configurationService.getBoardById(boardId).subscribe(board => {
                board = this.updateBoard(board);
                this.setModel(board);
                this.updateServicesAndGridWithModel();
                this.boardUpdateEvent.emit(board);
            },
            error => {
                console.error(error);
                this.loadDefaultBoard();

            });

    }

    getLocalWidgetType (type){
        var typeName = type.name;
       switch(typeName){
           case "barChart":
           return "BarChartComponent";
           case "controlWidgets":
           return "LinearGaugeComponent";
           case "lineChart":
           return "LineChartComponent";
           case "alarmWidget":
           return "BarGaugeComponent";
           case "analogGauge":
           return "CircularGaugeComponent";
           case "cards":
           return "GisMapComponent";
           case "pieChart":
           return "InteractiveCommunicationComponent";
       }
   }

    //TODO CHANGE WHEN WS Ok
    private updateBoard(board){
        if (board != null){
            board.title = board.name;
            if (board.structure == null){
                board.structure = "8-4-4";
            }
            var columnEmptyObject1 = {"styleClass": "eight wide", gadgets: []};

            if (board.rows.length == 0){

                for (var i=0; i < 3; i++){

                    board.rows.push({"columns": [{"styleClass": "eight wide", gadgets: []}, {"styleClass": "four wide", gadgets: []}, {"styleClass": "four wide", gadgets: []}]});
                }


            }
            else{
                board.rows.forEach(row => {
                    if (row.columns.length == 1){
                        row.columns.push(columnEmptyObject1);
                    }
                    row.columns.forEach(column => {
                        column.gadgets = Object.assign([], column.widgets);
                        column.gadgets.forEach(gadget => {
                            gadget.componentType = this.getLocalWidgetType(gadget.type);
                            gadget.instanceId = gadget.id;
                            gadget.config = {};
                            gadget.config.propertyPages = gadget.propertyPages;
                            gadget.config.propertyPages.forEach(propertyPage => {
                                propertyPage.groupId = "run";
                                propertyPage.position =  10;
                                propertyPage.properties.forEach(property => {
                                    property.controlType = property._controlType;
                                    property.key = property._key;
                                    property.label = property._label;
                                    property.value = property._value;
                                    property.required = property._required;
                                    property.order = property._order;
                                });
                            });
                        });
                    });
                });
            }
        }
        return board;
    }

    private loadBoard(boardTitle: string) {

        this.clearGridModelAndGadgetInstanceStructures();

        this._configurationService.getBoardByTitle(boardTitle).subscribe(board => {

                this.setModel(board);
                this.updateServicesAndGridWithModel();
                this.boardUpdateEvent.emit(boardTitle);
            },
            error => {
                console.error(error);
                this.loadDefaultBoard();

            });

    }

    private loadDefaultBoard() {

        // this.clearGridModelAndGadgetInstanceStructures();

        // this._configurationService.getDefaultBoard().subscribe(board => {

        //     console.log('loading default board');
        //     this.setModel(board);
        //     this.updateServicesAndGridWithModel();
        //     this.saveBoard('Initialization of a default board', true);


        // });
    }

    private loadNewBoard(name: string) {

        this.clearGridModelAndGadgetInstanceStructures();

        this._configurationService.getDefaultBoard().subscribe(res => {

            this.setModel(res);
            this.getModel().title = name;
            this.getModel().name = name;
            this.getModel().id = new Date().getTime();
            this.getModel().isNew = true;

            this.updateServicesAndGridWithModel();

            //NEW GET ME to GET USER ASSETS
            this._fiwooService.getMe().subscribe(data => {
                    console.log(data);
                },
                error => {

                }
            );
            this.saveBoard('Initialization of a new board', true);
        });
    }

    private updateServicesAndGridWithModel() {
        this._widgetsInstanceService.setCurrentModel(this.getModel());
        this._configurationService.setCurrentModel(this.getModel());
        this.updateGridState();
    }


    private saveBoard(operation: string, alertBoardListenerThatTheMenuShouldBeUpdated: boolean) {

        this.updateServicesAndGridWithModel();

        this._configurationService.saveBoard(this.getModel()).subscribe(result => {

                this._toastService.sendMessage(this.getModel().title + ' has been updated!', '');

                if (alertBoardListenerThatTheMenuShouldBeUpdated) {
                    this.boardUpdateEvent.emit(this.getModel());
                }
                if (this.getModel().isNew){
                    this.getModel().isNew = false;
                    result = result.json();
                    if (result){
                        this.clearGridModelAndGadgetInstanceStructures();
                        result = this.updateBoard(result);
                        this.setModel(result);
                        this.updateServicesAndGridWithModel();
                        this.boardUpdateEvent.emit(result);
                    }else{
                        this.loadBoardById(this.model.id);
                    }
                }else{
                    // result = result.json();
                    // if (result){
                    //     this.clearGridModelAndGadgetInstanceStructures();
                    //     result = this.updateBoard(result);
                    //     this.setModel(result);
                    //     this.updateServicesAndGridWithModel();
                    //     this.boardUpdateEvent.emit(result);
                    // }else{
                        this.loadBoardById(this.model.id);
                    // }
                }


            },
            error => console.error('Error' + error),
            () => console.debug('Saving configuration to store!'));

    }

    private clearGridModelAndGadgetInstanceStructures() {
        // clear gadgetInstances
        this._widgetsInstanceService.clearAllInstances();
        // clear current model
        for (const prop in this.getModel()) {
            if (this.model.hasOwnProperty(prop)) {
                delete this.model[prop];
            }
        }
    }

    private setGadgetInsertPosition() {

        for (let x = 0; x < this.getModel().rows.length; x++) {

            for (let y = 0; y < this.getModel().rows[x].columns.length; y++) {

                if (this.getModel().rows[x].columns[y].gadgets && this.getModel().rows[x].columns[y].gadgets.length === 0) {

                    this.gridInsertionPosition.x = x;
                    this.gridInsertionPosition.y = y;
                    return;

                }
            }
        }
        // we go here because the board is either empty or full
        // insert in the top left most cell
        this.gridInsertionPosition.y = 0;

        if (this.noGadgets) {
            // there are no gadgets so insert in top row
            this.gridInsertionPosition.x = 0;
        } else {
            // board is full so insert in the last row
            this.gridInsertionPosition.x = this.getModel().rows.length - 1;
        }
    }

    public setModel(model: any) {

        this.model = Object.assign({}, model);
    }

    public getModel() {
        return this.model;
    }


}
