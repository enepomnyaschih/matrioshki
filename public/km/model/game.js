JW.ns("KM.Model");

KM.Model.Game = JW.Model.extend({
    mapData: null, /*[required] Object*/

    //private
    map: null, /*Array<KM.Model.Map>*/
    players: null, /*Array<KM.Model.Player>*/
    init:function(config /*Object*/) /*void*/
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
