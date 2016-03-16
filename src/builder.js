/**
 * Builder Module
 *
 * So far it doesn't seem possible to script the location/type of construction sites.
 */

/**
 * Basic build function. Transfer energy from Spawn1 if empty and go work on the nearest site.
 */
module.exports = function(builder) {
    var spawn = Game.spawns.Spawn1;

    if (0 === builder.energy) {
        builder.moveTo(spawn);
        spawn.transferEnergy(builder);
    }
    else {
        var site = builder.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
        builder.moveTo(site);
        builder.build(site);
    }
};