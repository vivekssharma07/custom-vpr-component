import axios from 'axios';
import { mockData } from '../stories/fieldsData';

const apiResponse = [{
    "type": "selectlist",
    "parameter": {
        "displayName": "Report Name",
        "parameterName": "REPORT_ID"
    },
    "values": [{
        "displayName": "Report Name",
        "parameterValue": "REPORT_NAME",
        "isSelected": true
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
}];

export const fetchAccountData = async (reqBody) => {
    try {
        return apiResponse
    } catch (error) {
        console.error("Error fetching account data: ", error);
    }
};

export 
const fetchInitialData = async () => {
    try {
        return mockData?.parameters
    } catch (error) {
        console.log("Error fetching initial data:", error);
    }
};