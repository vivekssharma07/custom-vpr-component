import React, { useEffect, useState } from 'react';
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/300-italic.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/500-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/800-italic.css";
import "@fontsource/pt-mono";
import { SaltProvider } from "@salt-ds/core";
import "@salt-ds/theme/index.css";
import {mockData } from './fieldsData';
import { RunAs } from '../components/RunAs';

const apiResponse = [{
    "type": "dropdown",
    "parameter": {
        "displayName": "Time Period",
        "parameterName": "TP"
    },
    "values": [{
        "displayName": "Weekly",
        "parameterValue": "Weekly",
        "isSelected": true
    },
    {
        "displayName": "Monthly",
        "parameterValue": "Monthly",
        "isSelected": false
    }],
    "mandatory": true,
    "dynamic": {
        "parents": null,
        "children": [
            "BU",
            "ANNUALIZED_CUMULATIVE"
        ]
    },
    "description": null,
    "noSelect": null,
    "isDate": true
}]

export const SecondaryForm = () => {

    return (<>
        <SaltProvider>
            <RunAs
                structureURL={'structureURL'}
                valuesURL={'valuesURL'}
                runAsStructure={mockData}
            />
        </SaltProvider>
    </>

    );
};