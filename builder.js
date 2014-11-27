/**
 * Builder Module
 */

module.exports = function(builder) {
    var spawn = Game.spawns.Spawn1;

    if(0 === builder.energy) {
        builder.moveTo(spawn);
        builder.transferEnergy(spawn);
    }
    else {
        var site = builder.pos.findNearest(Game.CONSTRUCTION_SITES);
        builder.moveTo(site);
        builder.harvest(site);
    }
};