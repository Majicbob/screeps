/**
 * Screeps Main Module
 *
 * Notes:
 *
 * Lodash module is provided by the game and is the JS lib. See https://lodash.com/docs
 *
 * Might want to think about moving to spawn functions out of the different creep modules.
 *
 * Need to find out how the CPU credits work. Will efficiency of the code matter?
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
