export const mockData = {
    "name": "Plan Level Attribution - Daily",
    "profileId": 52170,
    "hasAccounts": false,
    "Account": null,
    "parameters": [
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Business Unit",
                "parameterName": "BU"
            },
            "values": [{
                "displayName": "BU",
                "parameterValue": "00206",
                "isSelected": true
            }],
            "mandatory": true,
            "dynamic": {
                "parents": [],
                "children": ["REPORT_ID", "REL_DT", "TP", "DTSTART", "DTEND"]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "selectlist",
            "parameter": {
                "displayName": "Report Name",
                "parameterName": "REPORT_ID"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": ["BU"],
                "children": ["REL_DT", "DTSTART", "DTENT"]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "radio",
            "parameter": {
                "displayName": "Date Option",
                "parameterName": "DATE_OPT"
            },
            "values": [
                {
                    "displayName": "Standard Time Period",
                    "parameterValue": "STD_TP",
                    "isSelected": true
                },
                {
                    "displayName": "Date Range",
                    "parameterValue": "DT_RANGE",
                    "isSelected": false
                },
            ],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": null
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Relative Date",
                "parameterName": "REL_DT"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": ["BU", "REPORT_ID"],
                "children": []
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "radio",
            "parameter": {
                "displayName": "Annualized or Cumulative",
                "parameterName": "ANNUALIZED_CUMULATIVE"
            },
            "values": [
                {
                    "displayName": "Cumulative",
                    "parameterValue": "CRORTYP",
                    "isSelected": true
                },
                {
                    "displayName": "Annualized",
                    "parameterValue": "ARORTYPE",
                    "isSelected": false
                }
            ],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": ["TP"]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Time Period",
                "parameterName": "TP"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": ["BU", "ANNUALIZED_CUMULATIVE"],
                "children": [],
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Start Date",
                "parameterName": "DTSTART"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": ["BU", "REPORT_ID"],
                "children": []
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "END Date",
                "parameterName": "DTEND"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": ["BU", "REPORT_ID"],
                "children": []
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "radio",
            "parameter": {
                "displayName": "Layout Option",
                "parameterName": "LAYOUT_OPT"
            },
            "values": [
                {
                    "displayName": "Portrait",
                    "parameterValue": "Portrait",
                    "isSelected": false
                },
                {
                    "displayName": "Landscape",
                    "parameterValue": "Landscape",
                    "isSelected": false
                },
            ],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": null
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "checkbox",
            "parameter": {
                "displayName": "Output Type",
                "parameterName": "OUTPUT_TYPE"
            },
            "values": [
                {
                    "displayName": "PDF",
                    "parameterValue": "PDF",
                    "isSelected": true
                },
                {
                    "displayName": "HTML",
                    "parameterValue": "HTML",
                    "isSelected": false
                },
                {
                    "displayName": "XLS",
                    "parameterValue": "XLS",
                    "isSelected": false
                }
            ],
            "mandatory": false,
            "dynamic": {
                "parents": null,
                "children": null
            },
            "description": null,
            "noSelect": "Please select a view"
        }
    ]
}


export const secondaryMockData =
{
    "name": "Secondary Plan Level Attribution - Daily",
    "profileId": 52170,
    "hasAccounts": false,
    "Account": null,
    "parameters": [
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Business Unit",
                "parameterName": "BU"
            },
            "values": [
                {
                    "displayName": "00206-1",
                    "parameterValue": "00206",
                    "isSelected": true
                },
                {
                    "displayName": "00207-2",
                    "parameterValue": "00207",
                    "isSelected": false
                }
            ],
            "mandatory": true,
            "dynamic": {
                "parents": [
                    "BU"
                ],
                "children": [
                    "REPORT_ID",
                    "REL_DT",
                    "TP",
                    "DTSTART",
                    "DTENT"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "selectlist",
            "parameter": {
                "displayName": "Report Name",
                "parameterName": "REPORT_ID"
            },
            "values": [{
                "displayName": "Report Name",
                "parameterValue": "REPORT_NAME",
                "isSelected": false
            },
            {
                "displayName": "Report 2",
                "parameterValue": "REPORT2",
                "isSelected": false
            }],
            "mandatory": true,
            "dynamic": {
                "parents": [
                    "BU"
                ],
                "children": [
                    "REL_DT",
                    "DTSTART",
                    "DTENT"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "radio",
            "parameter": {
                "displayName": "Date Option",
                "parameterName": "DATE_OPT"
            },
            "values": [
                {
                    "displayName": "Standard Time Period",
                    "parameterValue": "STD_TP",
                    "isSelected": true
                },
                {
                    "displayName": "Date Range",
                    "parameterValue": "DT_RANGE",
                    "isSelected": false
                }
            ],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": null
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Relative Date",
                "parameterName": "REL_DT"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": [
                    "BU",
                    "REPORT_ID"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "radio",
            "parameter": {
                "displayName": "Annualized or Cumulative",
                "parameterName": "ANNUALIZED_CUMULATIVE"
            },
            "values": [
                {
                    "displayName": "Cumulative",
                    "parameterValue": "CRORTYP",
                    "isSelected": true
                },
                {
                    "displayName": "Annualized",
                    "parameterValue": "ARORTYPE",
                    "isSelected": false
                }
            ],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": [
                    "TP"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Time Period",
                "parameterName": "TP"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": [
                    "BU",
                    "ANNUALIZED_CUMULATIVE"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "Start Date",
                "parameterName": "STSTART"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": [
                    "BU",
                    "REPORT_ID"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "dropdown",
            "parameter": {
                "displayName": "END Date",
                "parameterName": "DTEND"
            },
            "values": [],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": [
                    "BU",
                    "REPORT_ID"
                ]
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "radio",
            "parameter": {
                "displayName": "Layout Option",
                "parameterName": "LAYOUT_OPT"
            },
            "values": [
                {
                    "displayName": "Portrait",
                    "parameterValue": "Portrait",
                    "isSelected": false
                },
                {
                    "displayName": "Landscape",
                    "parameterValue": "Landscape",
                    "isSelected": false
                }
            ],
            "mandatory": true,
            "dynamic": {
                "parents": null,
                "children": null
            },
            "description": null,
            "noSelect": null
        },
        {
            "type": "checkbox",
            "parameter": {
                "displayName": "Output Type",
                "parameterName": "OUTPUT_TYPE"
            },
            "values": [
                {
                    "displayName": "PDF",
                    "parameterValue": "PDF",
                    "isSelected": true
                },
                {
                    "displayName": "HTML",
                    "parameterValue": "HTML",
                    "isSelected": false
                },
                {
                    "displayName": "XLS",
                    "parameterValue": "XLS",
                    "isSelected": false
                }
            ],
            "mandatory": false,
            "dynamic": {
                "parents": null,
                "children": null
            },
            "description": null,
            "noSelect": "Please select a view"
        }
    ]
}
