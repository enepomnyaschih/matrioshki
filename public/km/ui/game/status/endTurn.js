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
        if (!this.gameView.game.map.empowerPlayer(this.gameView.currentPlayer))
            this.gameView.nextPlayer();
        else
            setTimeout(this._checkPower.inScope(this), 100);
    }
});
