/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var tinymce: any;

declare var echarts: any;


// import * as L from "leaflet";
declare module "leaflet" {
    export namespace Toolbar2 {
      namespace Action {
        namespace prototype {
          namespace initialize {
            export function call(context: any): any;
          }
        }
        export function extend(param: any): any;
      }
  
      export class Control {
        constructor(obj: any);
        addTo(map: any): any;
      }
    }
  
    export class Toolbar2 {
      constructor(obj: any);
    }
  
  }
