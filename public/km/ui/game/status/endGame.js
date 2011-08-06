KM.UI.Game.Status.EndGame = KM.UI.Game.Status.extend({
    animation       : 0,
    
    restartButton   : null,
    
    // override
    run: function()
    {
        this._timer = setInterval(this._animate.inScope(this), 40);
        
        this.restartButton = new KM.UI.Button({
            text    : "Restart",
            x       : 600,
            y       : 500,
            width   : 150,
            height  : 40
        });
        
        this.gameView.addChild(this.restartButton);
        this.restartButton.el.click(this._onRestartClick.inScope(this));
    },
    
    // override
    stop: function()
    {
        clearInterval(this.timer);
    },
    
    _animate: function()
    {
        this.animation += .04;
        
        //var light = (Math.sin(3 * Math.PI * this.animation) + 2) / 4;
        var jump = Math.max(0, Math.sin(4 * Math.PI * this.animation));
        
        this.gameView.mapView.areaViews.each(function(areaView) {
            //areaView.setLight(light);
            if (areaView.area.player == this.gameView.game.winner)
                areaView.setJump(jump);
        }, this);
        
        this.gameView.paper.safari();
    },
    
    _onRestartClick: function()
    {
        this.gameView.setStatus(null);
        restartApplication();
    }
});
