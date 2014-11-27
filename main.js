/**
 * Screeps Main Module
 */

var _         = require('lodash');
var harvester = require('harvester');
var builder   = require('builder');
var assault   = require('assault');

if (_.isUndefined(Memory.harvesterCount)) {
    Memory.harvesterCount = 0;
}
if (Memory.harvesterCount != 2) {
    harvester.spawn();
}

for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];

    //console.log(Memory.creeps[creepName].role);

    if (Memory.creeps[creepName].role == 'harvester') {
        harvester.harvest(creep);
    }

    if (Memory.creeps[creepName].role == 'builder') {
        builder(creep);
    }

    if (Memory.creeps[creepName].role == 'assault') {
        assault(creep);
    }
}
