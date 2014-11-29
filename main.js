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
 *
 * Survival Mode Notes:
 * Energy Runs out fast building DPS, probably need to scale harvesters with something and increase default.
 * The killed creep scanner definetly needed, had to manually reset 3 times.
 * Got my new high score though 465.
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

initMemory();

/**
 * Status Scan. Check for units that have died.
 *
 * Might want to add units that can't move since so far they aren't very useful.
 * Also need to check to see if I need to filter for ones that belong to me.
 *
 * @TODO: Create a roles array/object for these type functions can be a loop. Will need one for every role.
 */
var liveHarvesters = _.filter(Game.creeps, {
    memory: {role: 'harvester'}
});
if (_.isObject(liveHarvesters)) {
    Memory.config.harvesterCount = liveHarvesters.length;
}
var liveAssaults = _.filter(Game.creeps, {
    memory: {role: 'assault'}
});
if (_.isObject(liveHarvesters)) {
    Memory.config.assaultCount   = liveAssaults.length;
}

/**
 * This should probably be moved out to a screep factory type module.
 *
 * 1st run all 3 assaults were created but the harvester count got incremented.
 * 2nd run did harvesters first but still ++'ed the assault.
 * Probably will need priority or queing or better checking
 */
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
