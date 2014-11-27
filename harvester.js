/**
 * Harvester Module
 */

module.exports = function (creep) {
    var spawn = Game.spawns.Spawn1;

    if (creep.energy < creep.energyCapacity) {
        var sources = creep.pos.findNearest(Game.SOURCES);
        creep.moveTo(sources[0]);
        creep.harvest(sources[0]);
    }
    else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn);
    }
};