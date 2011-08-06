JW.ns("KM.Model");

KM.Model.Map = JW.Model.extend({
    CHANGED             : "changed",    // handler(event, KM.Model.Area)
    
    game                : null,         //[required] KM.Model.Game
    mapData             : null,         //[required] Object
    
    areas               : null,         //[readonly] Array<KM.Model.Area>
    
    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        
        this.initAreas();
    },

    initAreas: function() /*void*/
    {
        this.areas = [];
        JW.each(this.mapData.areas, function(areaData, index) /*void*/
        {
            var area = new KM.Model.Area(this, index, areaData);
            this.areas.push(area);
        }, this);
    },
    
    getPlayerBorders: function(playerIndex, extraCondition, scope)
    {
        function isAllyArea(index)
        {
            return this.areas[index].player == playerIndex;
        }
        
        var result = [];
        for (var i = 0; i < this.areas.length; ++i)
        {
            var area = this.areas[i];
            if (area.player != playerIndex || area.power == 1 ||
                area.borders.every(isAllyArea, this))
                continue;
            
            if (extraCondition && !extraCondition.call(scope || this, area))
                continue;
            
            result.push(area);
        }
        
        return result;
    }
});
