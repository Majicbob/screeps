/**
 * Screeps Main Module
 */

var harvester = require('harvester');
var builder   = require('builder');
var assault   = require('assault');

var creep, creepName;
for (creepName in Game.creeps) {
    creep = Game.creeps[creepName];

    // console.log(Memory.creeps[creepName].role);

    if (Memory.creeps[creepName].role === 'harvester') {
        harvester(creep);
    }

    if (Memory.creeps[creepName].role === 'builder') {
        builder(creep);
    }

    if (Memory.creeps[creepName].role === 'assault') {
        assault(creep);
    }
}