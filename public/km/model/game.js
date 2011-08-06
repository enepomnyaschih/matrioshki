JW.ns("KM.Model");

KM.Model.Game = JW.Model.extend({
    CHANGED             : "changed",    //handler(event, KM.Model.Area)
    
    mapData             : null,         //[optional] Object
    
    map                 : null,         //[readonly] KM.Model.Map
    players             : null,         //[readonly] Array<KM.Model.Player>
    
    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        
        this.mapData = this.mapData || KM.Model.MapData.Default;
        
        this.initMap();
        this.initPlayers();
    },

    initMap: function() /*void*/
    {
        this.map = new KM.Model.Map({
            game    : this,
            mapData : this.mapData
        });
    },

    initPlayers: function() /*void*/
    {
        this.players = [
            new KM.Model.Player.Human(),
            new KM.Model.Player.Android()
        ];
    }
});
