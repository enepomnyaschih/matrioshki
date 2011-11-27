JW.ns("KM.Model");

KM.Model.Area = JW.Model.extend({
    PLAYERCHANGED       : "playerchanged",  // handler(event)
    POWERCHANGED        : "powerchanged",   // handler(event)
    
    map                 : null,         //[required] KM.Model.Map
    index               : null,         //[required] Integer
    
    coordinates         : null,         //[required] Array<Array<Integer>>
    center              : null,         //[required] Array<Integer>
    player              : null,         //[required] Integer
    cityCount           : null,         //[required] Integer
    borders             : null,         //[required] Array<Integer>
    
    power               : null,         //[readonly] Integer
    
    init: function(map, index, data)
    {
        this._super(data);
        
        this.map = map;
        this.index = index;
        this.power = 1 + 1 * this.cityCount;
    },

    setPlayer: function(value)
    {
        this.player = value;
        this.trigger("playerchanged");
    },
    
    setPower: function(value)
    {
        this.power = value;
        this.trigger("powerchanged");
    },

    getPlayer: function() /*KM.Model.Player*/
    {
        return this.map.game.players[this.player];
    },
    
    getFlags: function()
    {
        return this.map.flags.filterBy("area", this.index);
    }
});
