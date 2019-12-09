'use strict';

const assert = require('assert');
const { Box, Node, NodeVisitor } = require('../classes/landAndSea.js');
const parseAndLoadCartesianFile = require('../utils/parseAndLoadCartesianFile');

describe('landAndSea', () => {
    let data;

    describe('Test loading data from file', () => {

        it('parse and loads data correctly from txt file', () => {
            data = parseAndLoadCartesianFile('./inputs/testInput.txt');
            assert(data);
            assert.deepStrictEqual(data.total, 14);
            assert.deepStrictEqual(data.boxes[0], new Box(1,1,10,6));
        });

        it('parse and loads data correctly from large txt file', () => {
            data = parseAndLoadCartesianFile('./inputs/finalInput.txt');
            assert(data);
            assert.deepStrictEqual(data.total, 107228);
            assert.deepStrictEqual(data.boxes[5], new Box(-779.7917812500001,-882.3542812500001,-779.769,-882.3163125000001));
        });

        it('Number of lines matches total declared in file', () => {
            data = parseAndLoadCartesianFile('./inputs/finalInput.txt');
            assert(data);
            assert.deepStrictEqual(data.total, data.boxes.length);
        });

    });

    describe('landAndSea', () => {
        let visitor, sea, land;

        beforeEach(() => {});

        it('gets correct total of land for testInputs', () => {
            data = parseAndLoadCartesianFile('./inputs/testInput.txt');
            visitor = new NodeVisitor(data.total, data.boxes);
            sea  = new Node('sea', null, -Infinity, -Infinity, Infinity, Infinity);
            visitor.traverse(sea);

            land = visitor.getNumLand();
            assert(land);
            assert.strictEqual(land, 9);
        });

        it('gets correct total of land for finalInputs', () => {
            data = parseAndLoadCartesianFile('./inputs/finalInput.txt');
            visitor = new NodeVisitor(data.total, data.boxes);
            sea  = new Node('sea', null, -Infinity, -Infinity, Infinity, Infinity);
            visitor.traverse(sea);

            land = visitor.getNumLand();
            assert(land);
            assert.strictEqual(land, 59528);
        }).timeout(60000);
    });

});
