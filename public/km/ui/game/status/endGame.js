KM.UI.Game.Status.EndGame = KM.UI.Game.Status.extend({
    animation       : 0,
    
    restartButton   : null,
    
    // override
    run: function()
    {
        var mapView = this.gameView.mapView;
        mapView.rect(15, 41, mapView.getWidth() - 30, mapView.getHeight() - 54).attr({
            "fill"          : "none",
            "stroke"        : "#BBBBBB",
            "stroke-width"  : 1
        });
        
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
        var headJump = Math.max(0, Math.sin(4 * Math.PI * this.animation - Math.PI / 2) - .5);
        
        this.gameView.mapView.areaViews.each(function(areaView) {
            //areaView.setLight(light);
            if (areaView.area.player == this.gameView.game.winner)
                areaView.setJump(jump, headJump);
            
            if (this.gameView.game.winner == 0)
                areaView.setColor(JW.Colors.lighten(this._getAreaColor(areaView.area.center[1]), Math.max(0, Math.min(1, 1 - 0.5 * this.animation))));
        }, this);
        
        this.gameView.paper.safari();
    },
    
    _getAreaColor: function(y)
    {
        if (y < 300)
            return "#F3F3F3";
        else if (y < 500)
            return "blue";
        else
            return "#DD0000";
    },
    
    _onRestartClick: function()
    {
        this.gameView.setStatus(null);
        application.restart();
    }
});
