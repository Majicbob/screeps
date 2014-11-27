/**
 * Builder Module
 */

module.exports = function (builder) {
    var spawn = Game.spawns.Spawn1;

    if (builder.energy < builder.energyCapacity) {
        var sources = builder.pos.findNearest(Game.CONSTRUCTION_SITES);
        builder.moveTo(sources[0]);
        builder.harvest(sources[0]);
    }
    else {
        builder.moveTo(spawn);
        builder.transferEnergy(spawn);
    }
};