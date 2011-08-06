KM.UI.Game.Status.AI = KM.UI.Game.Status.extend({
    // override
    run: function()
    {
        var areas;
        
        areas = this.gameView.game.map.getPlayerBorders(1, this._noCity, this);
        if (this._selectSourceArea(areas))
            return;
        
        areas = this.gameView.game.map.getPlayerBorders(1, this._maxPower, this);
        if (this._selectSourceArea(areas))
            return;
        
        this.gameView.endTurn();
    },
    
    // override
    stop: function()
    {
    },
    
    _selectSourceArea: function(areas)
    {
        var options = [];
        for (var i = 0; i < areas.length; ++i)
        {
            var source = areas[i];
            for (var j = 0; j < source.borders.length; ++j)
            {
                var target = this.gameView.game.map.areas[source.borders[j]];
                if (target.player == 1)
                    continue;
                
                if (source.power < target.power)
                    continue;
                
                options.push({
                    source: source,
                    target: target
                });
            }
        }
        
        if (options.length == 0)
            return false;
        
        var optionIndex = Math.floor(Math.random() * options.length);
        var option = options[optionIndex];
        
        this.gameView.setStatus(new KM.UI.Game.Status.Attack(
            this._getAreaView(option.source),
            this._getAreaView(option.target)
        ));
        
        return true;
    },
    
    _noCity: function(area)
    {
        return area.cityCount == 0;
    },
    
    _maxPower: function(area)
    {
        return area.power == KM.Constants.UNIT_MAX_POWER;
    },
    
    _getAreaView: function(area)
    {
        return this.gameView.mapView.areaViews[area.index];
    }
});
