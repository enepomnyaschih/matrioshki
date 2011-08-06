JW.ns("KM.Model");

KM.Model.Area = JW.Model.extend({
    CHANGED             : "changed",    //handler(event, KM.Model.Area)
    
    map                 : null,         //[required] KM.Model.Map
    
    coordinates         : null,         //[required] Array<Array<Integer>>
    center              : null,         //[required] Array<Integer>
    player              : null,         //[required] Integer
    power               : null,         //[required] Integer
    borders             : null,         //[required] Array<Integer>
    
    init: function(map, data)
    {
        this._super(data);
        
        this.map = map;
    },

    update: function(player /*KM.Model.Player*/, power /*Integer*/) /*void*/
    {
        this.player = player;
        this.power = power;
        this.trigger("changed");
    },

    getPlayer: function() /*KM.Model.Player*/
    {
        return this.map.game.players[this.player];
    }
});
