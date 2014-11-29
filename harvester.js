/**
 * Harvester Module
 */

function returnEnergy(creep, spawn) {
    creep.moveTo(spawn);
    creep.transferEnergy(spawn);
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
    var spawn = Game.spawns.Spawn1;
    var source = creep.pos.findNearest(Game.SOURCES);

    if (source.energy === 0 && creep.energy != 0) {
        returnEnergy(creep, spawn);
    }
    else if (creep.energy < creep.energyCapacity) {
        creep.moveTo(source);
        creep.harvest(source);
    }
    else {
        returnEnergy(creep, spawn);
    }
};
