/**
 * Screeps Main Module
 *
 * Notes:
 *
 * Lodash module is provided by the game and is the JS lib. See https://lodash.com/docs
 *
 * I think strategies should by a folder with a subfolder per strat to contain main file and
 * any strat specific modules. Need to find out if the game will support that. If not then use
 * namespace like filenames.
 *
 * @TODO: Need to find out how the CPU credits work. Will efficiency or mem use of the code matter?
 * @TODO: Creep factory. Might want to think about moving to spawn functions out of the different creep modules.
 * @TODO: Come up with an interface/prototype for strategies.
 */

/**
 * Modules
 *
 * @TODO: Create Healer role module.
 */
var _         = require('lodash');
var harvester = require('harvester');
var builder   = require('builder');
var assault   = require('assault');

var strategy  = require('strategy_survival');

/**
 * Global Config Values
 *
 * Vars that aren't strategy specific
 */
// stub, none at the moment

/**
 * Game functions, not strat specific
 */

/**
 * Initializtion of Memory vars
 */
function initMemory() {
    if (! _.isUndefined(Memory.roles)) {
        return;
    }

    Memory.config = {};
    // stub, none at the moment

    /**
     * Map of roles, strats can add to this
     *
     * Should the roles be an array or map? Seems to need to be a map, was having issues using an array.
     * Should the active count be in here? I don't see why not.
     * Role prototype?
     */
    Memory.roles = {};

    /**
     * Basic global level harvester.
     *
     * Cost: 170
     */
    Memory.roles.harvester = {
        "name":  "Harvester",
        "role":  "harvester",
        "build": [Game.MOVE, Game.MOVE, Game.CARRY, Game.WORK],
        "numActive": 0,
    };

    /**
     * Basic global level melee.
     *
     * Cost: 205
     */
    Memory.roles.melee = {
        "name":  "Melee",
        "role":  "assault", // Should the different types of assault have thier own roles?
        "build": [Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK],
        "numActive": 0,
    };
}

/**
 * Status Scan
 *
 * Check for units that have died or shouldn't be included in the active count.
 *
 * This can probably stay in global with maybe an overide or hook for strat level scan logic.
 *
 * @TODO: Create a roles array/object for these type functions can be a loop. Will need one for every role.
 * @TODO: Treat units that can't move as dead since so far they aren't very useful.
 * @TODO: Check to see if I need to filter for ones that belong to me.
 */
function statusScan() {
    var currentRole = {}, activeCreeps = [];
    for (var i in Memory.roles) {
        currentRole = Memory.roles[i];

        activeCreeps = _.filter(Game.creeps, {
            memory: {role: currentRole.role}
        });

        if (_.isObject(activeCreeps)) {
            currentRole.numActive = activeCreeps.length;
        }
    }
}

/**
 * Do Creep Actions
 *
 * Should this be strat specific/have a strat hook?
 */
function doCreepActions() {
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
}


/**
 * Main Game Loop
 */
initMemory();
statusScan();
strategy.run();
doCreepActions();