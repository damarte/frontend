import {CPUGadgetComponent} from '../gadgets/cpu/cpu-gadget.component';
import {BarGaugeComponent} from '../gadgets/bar-gauge/bar-gauge.component';
import {PropertyListGadgetComponent} from '../gadgets/property-list/property-list-gadget.component';
import {DiskGadgetComponent} from '../gadgets/disk/disk-gadget.component';
import {ServiceListGadgetComponent} from '../gadgets/service-list/service-list-gadget.component';
import {StatisticGadgetComponent} from '../gadgets/statistic/statistic-gadget.component';
import {TrendGadgetComponent} from '../gadgets/trend/trend-gadget.component';
import {NewsGadgetComponent} from '../gadgets/news/news-gadget.component';
import {CircularGaugeComponent} from '../gadgets/circular-gauge/circular-gauge.component';
import {LineChartComponent} from '../gadgets/line-chart/line-chart.component';
import {LinearGaugeComponent} from '../gadgets/linear-gauge/linear-gauge.component';
import {BarChartComponent} from '../gadgets/bar-chart/bar-chart.component';
import {DoughnutChartComponent} from '../gadgets/doughnut-chart/doughnut-chart.component';
import {StorageObjectListComponent} from '../gadgets/storage-object-list/storage-object-list.component';
import {PolarChartComponent} from '../gadgets/polar-chart/polar-chart.component';
/**
 * Created by jayhamilton on 6/30/17.
 */

export class GadgetFactory {


    /**
     * todo - return new instances  instead of the same instance. This requires the creation of new configuration options.
     * @param gadgetType
     * @returns {any}
     */

    static getComponentType(gadgetType): any {

        switch (gadgetType) {

            case 'PolarChartComponent':
                return PolarChartComponent;
            case 'CPUGadgetComponent':
                return CPUGadgetComponent;
            case 'BarGaugeComponent':
                return BarGaugeComponent;
            case 'PropertyListGadgetComponent':
                return PropertyListGadgetComponent;
            case 'DiskGadgetComponent':
                return DiskGadgetComponent;
            case 'ServiceListGadgetComponent':
                return ServiceListGadgetComponent;
            case 'StatisticGadgetComponent':
                return StatisticGadgetComponent;
            case 'TrendGadgetComponent':
                return TrendGadgetComponent;
            case 'NewsGadgetComponent':
                return NewsGadgetComponent;
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
            case 'StorageObjectListComponent':
                return StorageObjectListComponent;
            default:
                return null;

        }
    }
}
