/**
 * Screeps Main Module
 *
 * Notes:
 *
 * Lodash module is provided by the game and is the JS lib. See https://lodash.com/docs
 *
 * Might want to think about moving to spawn functions out of the different creep modules.
 *
 * @TODO: Need to find out how the CPU credits work. Will efficiency or mem use of the code matter?
 */

// Modules
var _         = require('lodash');
var harvester = require('harvester');
var builder   = require('builder');
var assault   = require('assault');


/**
 * Config Values
 *
 * Maybe this should be rolled into a high-level strategy the module.
 * I could see wanting different sets for game types or what not.
 */

/**
 * Amount of harvesters to auto-build.
 *
 * Probably move these to Memory or a strategy module.
 *
 * @TODO: Need to have a scan function that will adjust the Memory.harvesterCount when one ages or gets killed.
 */
var MAX_HARVESTERS = 2;
var MAX_ASSAULT    = 3;

/**
 * Initializtion of Memory vars
 */
function initMemory() {
    if (_.isUndefined(Memory.config)) {
        Memory.config.harvesterCount = 0;
        Memory.config.assaultCount   = 0;
    }
}


/**
 * Main Game Logic
 */

// This should probably be moved out to a screep factory type module.
if (Memory.config.harvesterCount != MAX_HARVESTERS) {
    harvester.spawn();
}
if (Memory.config.assaultCount != MAX_ASSAULT) {
    assault.spawn();
}

// Main creep loop
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
        assault.assault(creep);
    }
}
