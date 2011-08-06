KM.UI.Game.Status.EndTurn = KM.UI.Game.Status.extend({
    power: 0, // [readonly] Integer
    
    // override
    run: function()
    {
        this.gameView.endTurnButton.hide();
        
        this.power = this._calculatePower();
        
        this._checkPower();
    },
    
    _calculatePower: function()
    {
        return 10;
    },
    
    _checkPower: function()
    {
        if (!this.power)
            return this.gameView.nextPlayer();
        
        --this.power;
        var areas = [];
        var map = this.gameView.game.map;
        for (var i = 0; i < map.areas.length; ++i)
        {
            var area = map.areas[i];
            if (area.player != this.gameView.currentPlayer)
                continue;
            
            if (area.power == KM.Constants.UNIT_MAX_POWER)
                continue;
            
            areas.push(area);
        }
        
        if (areas.length == 0)
            return this.gameView.nextPlayer();
        
        var luckyIndex = Math.floor(Math.random() * areas.length);
        var luckyArea  = areas[luckyIndex];
        luckyArea.setPower(luckyArea.power + 1);
        
        setTimeout(this._checkPower.inScope(this), 100);
    }
});
