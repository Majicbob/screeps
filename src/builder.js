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

    // console.log('Do builder');
    if (0 === builder.carry.energy) {
        // console.log('Builder - no energy');
        builder.moveTo(spawn);
        spawn.transferEnergy(builder);
    }
    else {
        // console.log('Builder - go to site');
        var target = builder.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
        if (target) {
            if (builder.build(target) == ERR_NOT_IN_RANGE) {
                builder.moveTo(target);
            }
        }
    }
};