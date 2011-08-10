JW.ns("KM.Model");

KM.Model.Game = JW.Model.extend({
    CHANGED             : "changed",    //handler(event, KM.Model.Area)
    
    mapData             : null,         //[optional] Object
    
    map                 : null,         //[readonly] KM.Model.Map
    players             : null,         //[readonly] Array<KM.Model.Player>
    
    winner              : null,         // [readonly] Integer or null
    
    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        
        this.mapData = this.mapData || KM.Model.MapData.Default;
        
        this._initMap();
        this._initPlayers();
    },
    
    getWinner: function()
    {
        if (this._isVictory(0))
            this.winner = 0;
        
        if (this._isVictory(1))
            this.winner = 1;
        
        return this.winner;
    },

    getDifficulty: function()
    {
        return parseInt(JW.defn($.cookie("kmdifficulty"), 0));
    },

    _initMap: function() /*void*/
    {
        this.map = new KM.Model.Map({
            game    : this,
            mapData : this.mapData
        });
    },

    _initPlayers: function() /*void*/
    {
        this.players = [
            new KM.Model.Player.Human(),
            new KM.Model.Player.Android()
        ];
    },
    
    _isVictory: function(playerIndex)
    {
        return this.map.areas.every(function(area) {
            return area.cityCount == 0 || area.player == playerIndex;
        }, this);
    }
});
