'use strict';

const fs = require('fs');
const { Box } = require('../classes/landAndSea.js');

module.exports = parseAndLoadCartesianFile;

/*
    Output will follow example below.
    {
        total: 3
        coordinates: [
            [a, b, c, d],
            [a, b, c, d],
            [a, b, c, d]
        ]
    }
*/

function parseAndLoadCartesianFile(filePath) {
    let data = fs.readFileSync(filePath).toString().replace(/\r\n/g,'\n').split('\n');
    let total = parseFloat(data[0]);
    let boxes = [];
    
    for(let i = 1; i < data.length; i++) {
        // Handle empty lines, can add additional input validation
        if (data[i].length > 0) {
            let coordinates = (data[i].split(' ').map(coordinate => parseFloat(coordinate)));
            boxes.push(new Box(coordinates[0], coordinates[1], coordinates[2], coordinates[3]));
        }
    }

    return {
        total: total,
        boxes: boxes
    };
}
