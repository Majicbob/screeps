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
 * Ranged DPS can shoot over walls.
 *
 * External Resources
 * Reddit: https://www.reddit.com/r/screeps/
 * StackOverflow: http://stackoverflow.com/questions/tagged/screeps
 * Twitter: https://twitter.com/ScreepsGame
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
     * Updated Cost Info - 2016-03-15
     * http://support.screeps.com/hc/en-us/articles/203013212-Creep
     *
     * Move      50
     * Work     100
     * Carry     50
     * Attack    80
     * Ranged   150
     * Heal     250
     * Claim    600
     * Tough     10
     */

    /**
     * Basic global level harvester.
     *
     * Cost: 200
     */
    Memory.roles.harvester = {
        "name":  "Harvester",
        "role":  "harvester",
        "build": [MOVE, CARRY, CARRY, WORK],
        "numActive": 0,
        "nameIndex": 0,
    };

    /**
     * Basic global level melee.
     *
     * Cost: 190
     */
    Memory.roles.melee = {
        "name":  "Melee",
        "role":  "melee", // Should the different types of assault have thier own roles?
        "build": [TOUGH, MOVE, MOVE, ATTACK],
        "numActive": 0,
        "nameIndex": 0,
    };

    /**
     * Basic global level ranged.
     *
     * Cost: 230
     */
    Memory.roles.ranged = {
        "name":  "Ranged",
        "role":  "ranged", // Should the different types of assault have thier own roles?
        "build": [TOUGH, TOUGH, TOUGH, MOVE, RANGED_ATTACK],
        "numActive": 0,
        "nameIndex": 0,
    };

    /**
     * Basic global level healer.
     *
     * Cost: 300
     */
    Memory.roles.healer = {
        "name":  "Healer",
        "role":  "healer",
        "build": [MOVE, HEAL],
        "numActive": 0,
        "nameIndex": 0,
    };

    /**
     * Basic global level builder.
     *
     * @todo This is the same as the harvester now, look into that
     *
     * Cost: 200
     */
    Memory.roles.builder = {
        "name":  "Builder",
        "role":  "builder",
        "build": [MOVE, WORK, CARRY],
        "numActive": 0,
        "nameIndex": 0,
    };
}

/**
 * Status Scan
 *
 * Scans all creeps by role and updates the active count, removing units that died or can't move.
 *
 * This can probably stay in global with maybe an overide or hook for strat level scan logic.
 *
 * @TODO: Check to see if I need to filter for ones that belong to me.
 */
function statusScan() {
    var currentRole = {}, activeCreeps = [];
    for (var i in Memory.roles) {
        currentRole = Memory.roles[i];

        activeCreeps = _.filter(Game.creeps, {
            memory: {role: currentRole.role}
        });
        var numActive = activeCreeps.length;

        // If all the creep's move parts have 0 hits left then it can't move
        _.forEach(activeCreeps, function (creep) {
            var allMoveParts  = _.filter(creep.body, {'type': 'move'} );
            var deadMoveParts = _.filter(allMoveParts, {'hits': 0} );

            if (allMoveParts.length === deadMoveParts.length) {
                numActive--;
            }
        });

        currentRole.numActive = numActive;
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

        if (Memory.creeps[creepName].role == 'melee') {
            assault.assault(creep);
        }

        if (Memory.creeps[creepName].role == 'ranged') {
            assault.rangedAttack(creep);
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