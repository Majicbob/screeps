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
    return currentCreep.pos.findNearest(Game.SOURCES);
}

function returnEnergy(spawn) {
    currentCreep.moveTo(spawn);
    currentCreep.transferEnergy(spawn);
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

    if (source.energy === 0 && creep.energy !== 0) {
        returnEnergy(spawn);
    }
    else if (creep.energy < creep.energyCapacity) {
        creep.moveTo(source);
        creep.harvest(source);
    }
    else {
        returnEnergy(spawn);
    }
};
