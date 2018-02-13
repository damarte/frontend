import { BarGaugeComponent } from '../widgets/bar-gauge/bar-gauge.component';
import { CircularGaugeComponent } from '../widgets/circular-gauge/circular-gauge.component';
import { LineChartComponent } from '../widgets/line-chart/line-chart.component';
import { LinearGaugeComponent } from '../widgets/linear-gauge/linear-gauge.component';
import { BarChartComponent } from '../widgets/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from '../widgets/doughnut-chart/doughnut-chart.component';
import { PolarChartComponent } from '../widgets/polar-chart/polar-chart.component';
import { GisMapComponent } from '../widgets/gis-map/gis-map.component';


export class WidgetsFactory {


    /**
     * todo - return new instances  instead of the same instance. This requires the creation of new configuration options.
     * @param gadgetType
     * @returns {any}
     */

    static getComponentType(gadgetType): any {

        switch (gadgetType) {

            case 'PolarChartComponent':
                return PolarChartComponent;           
            case 'BarGaugeComponent':
                return BarGaugeComponent;                        
            case'CircularGaugeComponent':
                return CircularGaugeComponent;
            case'LineChartComponent':
                return LineChartComponent;
            case'LinearGaugeComponent':
                return LinearGaugeComponent;
            case 'BarChartComponent':
                return BarChartComponent;
            case 'DoughnutChartComponent':
                return DoughnutChartComponent;
            case 'GisMapComponent':
                return GisMapComponent;
            default:
                return null;

        }
    }
}
