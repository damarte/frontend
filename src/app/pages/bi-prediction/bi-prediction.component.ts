import { Component, OnInit, ViewChild } from '@angular/core';
import { BIService } from '../services/bi.service';
import { DxChartComponent } from 'devextreme-angular';

declare var require: any;
const moment = require('moment');

var context;

@Component({
    selector: 'app-bi-prediction',
    templateUrl: './bi-prediction.component.html',
    styleUrls: ['./bi-prediction.component.scss']
})


export class BiPredictionComponent implements OnInit {


    @ViewChild(DxChartComponent) dataChart: DxChartComponent

    title: string = "Glucose Prediction";

    dataHistorics: any[];
    data = [];

    futureValue = "2018-02-25 21:54:00";  

    constructor(biService: BIService) {

        context = this;
        this.dataHistorics = biService.getPredictionHistorics();

        biService.getPrediction().subscribe(result => {
            this.dataHistorics = biService.getPredictionHistorics();

            this.configureData();

            var values = 10;
            this.data = this.data.slice(Math.max(this.data.length - values, 1))


            this.data.push({ date: this.formatNow(), value: parseInt(result.value, 10) });
            
            //Fix the width narrowing problem
            this.dataChart.instance.render();         

        });

    }

    configureData() {
        var keys = {};
        this.dataHistorics.forEach(hist => {
            if (!(hist.content.date in keys)){
                this.data.push({ date: this.formatDate(hist.content.date), value: parseInt(hist.content.glucosa, 10) });
                keys[hist.content.date] = hist.content.date;
            }
            
        });
    }

    customizePoint(arg: any) {

        if (arg.index === context.data.length - 1) {
            return { color: "red", visible: true };
        }
        return { color: "blue", visible: true };
    }

    customizeTooltip(arg) {

        if (arg.point.index === context.data.length - 1) {
            return {
                text: "Estimated value:\n" + "\n" + arg.valueText
            }
        }
        return {
            text: arg.valueText
        }
    }

    ngOnInit() {
    }

    private formatDate (date){
        return (moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }

    private formatNow (){
        return (moment().format('YYYY-MM-DD HH:mm:ss'));
    }


}
