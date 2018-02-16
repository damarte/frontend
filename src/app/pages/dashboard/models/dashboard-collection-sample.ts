export const sampleBoardCollection = {
    'board': [
    {
            'title': 'Dashboard Sample',
            'structure': '8-4-4/8-4-4',
            'id': 1,
            'rows': [
                {
                    "columns": [
                       {
                            "styleClass": "eight wide",
                            "widgets": [
                                {
                                    "id": 50,
                                    "name" : "Widget A",
                                    "description": "Temperature",
                                    "icon": "assets/images/line.png",
                                    "tags": [
                                        {
                                            "facet": "Grahphic Charts",
                                            "name": "Line Chart"
                                        }
                                    ],
                                    "config":{
                                        "propertyPages":[
                                            {
                                                "displayName": "Configuration",
                                                "properties":[
                                                    {
                                                        "controlType": "textbox",
                                                        "key": "title",
                                                        "label": "Title",
                                                        "value": "Temperature from Sensor",
                                                        "required": true,
                                                        "order": 1
                                                    },
                                                    {
                                                        "controlType": "textbox",
                                                        "key": "instanceId",
                                                        "label": "Widget id",
                                                        "value": 123,
                                                        "required": true,
                                                        "order": -1

                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "sources": [
                                        {                                       
                                            "url": "http://google.com",
                                            "parameters":[
                                                {
                                                    "id":1,
                                                    "name": "parameter_A",
                                                    "value": "value_A",
                                                    "operator": "operator_A"

                                                },
                                                {
                                                    "id":2,
                                                    "name": "parameter_B",
                                                    "value": "value_B",
                                                    "operator": "operator_B"

                                                },
                                                {
                                                    "id":3,
                                                    "name": "parameter_C",
                                                    "value": "value_C",
                                                    "operator": "operator_C"
                                                },

                                            ]
                                        }
                                    ],
                                    "type": null,
                                    "properties": [
                                        {
                                            "id": 148,
                                            "name": "width",
                                            "value": "220px"
                                        },
                                        {
                                            "id": 149,
                                            "name": "height",
                                            "value": "220px"
                                        },
                                        {
                                            "id": 150,
                                            "name": "position",
                                            "value": "top"
                                        }
                                    ],
                                    "actions":[ {  "name": "Add" }  ]
                                }
                            ] 
                        }
                    ]
                }           
            ]
        },

    ],
    "assets": [
        {
            "id": 65,
            "asset": "Asset A"
        },
        {
            "id": 66,
            "asset": "Asset B"
        }
    ],
    "owner": "Emergya"
};
