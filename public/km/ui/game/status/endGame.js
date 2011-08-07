KM.UI.Game.Status.EndGame = KM.UI.Game.Status.extend({
    animation       : 0,
    
    restartButton   : null,
    
    // override
    run: function()
    {
        this._timer = setInterval(this._animate.inScope(this), 40);
        
        this.restartButton = new KM.UI.Button({
            text    : "Restart",
            x       : KM.Constants.BUTTONX,
            y       : KM.Constants.BUTTONY,
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
        }, this);
        
        this.gameView.paper.safari();
    },
    
    _onRestartClick: function()
    {
        this.gameView.setStatus(null);
        application.restart();
    }
});
