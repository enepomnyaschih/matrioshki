JW.ns("KM.Model");

KM.Model.Area = JW.Model.extend({
    CHANGED             : "changed",    //handler(event, KM.Model.Area)
    
    map                 : null,         //[required] KM.Model.Map
    index               : null,         //[required] Integer
    
    coordinates         : null,         //[required] Array<Array<Integer>>
    center              : null,         //[required] Array<Integer>
    player              : null,         //[required] Integer
    power               : null,         //[required] Integer
    borders             : null,         //[required] Array<Integer>
    
    init: function(map, index, data)
    {
        this._super(data);
        
        this.map = map;
        this.power = Math.floor(Math.random() * 2 + 1) + this.power;
        this.index = index;
    },

    update: function(player /*Integer*/, power /*Integer*/) /*void*/
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
