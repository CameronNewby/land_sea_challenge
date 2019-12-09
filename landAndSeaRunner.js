'use strict';

const { Node, NodeVisitor } = require('./classes/landAndSea.js');
const parseAndLoadCartesianFile = require('./utils/parseAndLoadCartesianFile');
const startTime = new Date();

const args = process.argv.slice(2);

let data = parseAndLoadCartesianFile(args[0]);
let visitor = new NodeVisitor(data.total, data.boxes);
let sea  = new Node('sea', null, -Infinity, -Infinity, Infinity, Infinity);
visitor.traverse(sea);

let land = visitor.getNumLand();
let timeTaken = new Date() - startTime;

console.info('Land: ', land);
console.info('Execution Time: %dms', timeTaken);
return land;
