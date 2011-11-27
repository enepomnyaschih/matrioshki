JW.ns("KM.Model");

KM.Model.Flag = JW.Model.extend({
    PLAYERCHANGED       : "playerchanged", // handler(event)
    
    map                 : null,         //[required] KM.Model.Map
    index               : null,         //[required] Integer
    
    coordinates         : null,         //[required] Array<Array<Integer>>
    country             : null,         //[required] String
    area                : null,         //[required] Integer
    
    player              : null,         //[readonly] Integer
    
    init: function(map, index, data)
    {
        this._super(data);
        
        this.map   = map;
        this.index = index;
    },
    
    attach: function()
    {
        this.getArea().bind("playerchanged", this._onPlayerChanged, this);
    },
    
    getArea: function() /* KM.Model.Area */
    {
        return this.map.areas[this.area];
    },
    
    getPlayer: function() /* KM.Model.Player */
    {
        return this.map.game.players[this.getArea().player];
    },
    
    _onPlayerChanged: function()
    {
        this.trigger("playerchanged");
    }
});
