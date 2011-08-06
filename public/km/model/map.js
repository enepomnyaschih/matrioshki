JW.ns("KM.Model");

KM.Model.Map = JW.Model.extend({
    CHANGED             : "changed",    // handler(event, KM.Model.Area)
    
    game                : null,         //[required] KM.Model.Game
    mapData             : null,         //[required] Object
    
    areas               : null,         //[readonly] Array<KM.Model.Area>
    
    init: function(config /*Object*/) /*void*/
    {
        this._super(config);
        
        this._initAreas();
        this._generate();
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
    },
    
    empowerPlayer: function(playerIndex)
    {
        var areas = [];
        for (var i = 0; i < this.areas.length; ++i)
        {
            var area = this.areas[i];
            if (area.player != playerIndex)
                continue;
            
            if (area.power == KM.Constants.UNIT_MAX_POWER)
                continue;
            
            areas.push(area);
        }
        
        if (areas.length == 0)
            return false;
        
        var luckyIndex = Math.floor(Math.random() * areas.length);
        var luckyArea  = areas[luckyIndex];
        luckyArea.setPower(luckyArea.power + 1);
        
        return true;
    },

    _initAreas: function() /*void*/
    {
        this.areas = [];
        JW.each(this.mapData.areas, function(areaData, index) /*void*/
        {
            var area = new KM.Model.Area(this, index, areaData);
            this.areas.push(area);
        }, this);
    },
    
    _generate: function()
    {
        this._arrangePlayers();
        
        for (var i = 0; i < 20; ++i)
            this.empowerPlayer(0);
        
        for (var i = 0; i < 20; ++i)
            this.empowerPlayer(1);
    },
    
    _arrangePlayers: function()
    {
        var areas = this.areas.filter(function(area) {
            return !JW.isSet(area.player);
        }, this);
        
        for (var i = 0; i < areas.length; ++i)
        {
            var j = i + Math.floor(Math.random() * (areas.length - i));
            var a = areas[i];
            areas[i] = areas[j];
            areas[j] = a;
            areas[i].player = i % 2;
        }
    }
});
