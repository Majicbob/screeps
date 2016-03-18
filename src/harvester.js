/**
 * Harvester Module
 *
 * Notes:
 * Sources regen time seems to increase each time it happens. Will need to update source finding code.
 */

var currentCreep = {};

/**
 * Find best source to harvest
 */
function findSource() {
    return currentCreep.pos.findClosestByRange(FIND_SOURCES);
}

function returnEnergy(spawn) {
    if ('upgradeRC' == currentCreep.memory.status) {
        if (currentCreep.room.controller) {
            if (currentCreep.upgradeController(currentCreep.room.controller) == ERR_NOT_IN_RANGE) {
                currentCreep.moveTo(currentCreep.room.controller);
            }
        }

        return;
    }

    if (spawn.energy == spawn.energyCapacity) {
        // upgrade room controller
        currentCreep.memory.status = 'upgradeRC';

    }
    else {
        currentCreep.moveTo(spawn);
        currentCreep.transferEnergy(spawn);
    }
}

/**
 * Basic harvesting function. If not full then find nearest source and harvest then return to spawn and transfer.
 *
 * Right now Spawn1 is hardcoded b/c I've only been working with one.
 * Probably will want to change that to find closest or assign it through Memory.
 *
 * @TODO: If the source is depleted then return to base and transfer.
 */
module.exports.harvest = function (creep) {
    currentCreep = creep;
    var spawn    = Game.spawns.Spawn1;
    var source   = findSource();

    if (creep.carry.energy == 0) {
        creep.memory.status = 'harvest';
    }

    if ('harvest' == creep.memory.status) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }

        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.status = '';
        }

        return;
    }

    if (source.energy === 0 && creep.carry.energy !== 0) {
        console.log('Source out of energy');
        returnEnergy(spawn);
    }
    else {
        returnEnergy(spawn);
    }



};
