JW.ns("KM.Model");

KM.Model.Game = JW.Model.extend({
    CHANGED             : "changed",    //handler(event, KM.Model.Area)

    mapData             : null,         //[optional] Object

    //private
    map                 : null,         //[readonly] KM.Model.Map
    players             : null,         //[readonly] Array<KM.Model.Player>
    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        this.mapData = this.mapData || KM.Model.MapData.Default;
        this.initMap();
    },

    initMap: function() /*void*/
    {
        this.map = new KM.Model.Map({
            mapData: this.mapData
        });
        this.relay(this.map, "changed");
    },

    initPlayers: function() /*void*/
    {
        this.players = [];
        for (var i = 0; i < this.mapData.playersCount; ++i)
        {
            this.players.push(new JW.Model.Player());
        }
        
        JW.each(this.playersData.playersAreas, function(areas /*Array<Object>*/, id /*Integer*/) /*void*/
        {
            var player = this.players[id];
            JW.each(areas, function(area /*Object*/) /*void*/
            {
                this.map.getArea(area.id).update(player, area.power);
            }, this);
        })
    }
});
