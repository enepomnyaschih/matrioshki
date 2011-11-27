KM.UI.Game.Status.EndGame = KM.UI.Game.Status.extend({
    animation       : 0,
    
    restartButton   : null,

    // override
    run: function()
    {
        this._timer = setInterval(this._animate.inScope(this), 40);

        if (this.gameView.game.winner == 0)
        {
            this.russianFlag = new JW.Svg.Image({
                width: KM.Constants.MAP_VIEW_WIDTH+72,
                height: KM.Constants.MAP_VIEW_HEIGHT+72,
                x: KM.Constants.MAP_VIEW_X - 45,
                y: KM.Constants.MAP_VIEW_Y - 20,
                src: "images/OpenCallVisualFlag.svg"
            });

            this.gameView.addChildAt(this.russianFlag, 0);
            this.russianFlag.setAttr("opacity", 0);
            this.gameView.mapView.areaLayer.hide();

            $.cookie("kmdifficulty", 1 + this.gameView.game.getDifficulty(), 
                {
                    expires     : KM.Constants.KEEP_DIFFICULY_DAYS/*days*/
                }
            );
        }
        
        this.restartButton = new KM.UI.Button({
            text    : KM.Locale.Restart,
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
        clearInterval(this._timer);
        delete this._timer;
    },
    
    _animate: function()
    {
        if (!this._timer)
            return;
        
        this.animation += .04;
        
        //var light = (Math.sin(3 * Math.PI * this.animation) + 2) / 4;
        var jump = Math.max(0, Math.sin(4 * Math.PI * this.animation));
        var headJump = Math.max(0, Math.sin(4 * Math.PI * this.animation - Math.PI / 2) - .5);
        
        this.gameView.mapView.areaViews.each(function(areaView) {
            //areaView.setLight(light);
            if (areaView.area.player == this.gameView.game.winner)
                areaView.setJump(jump, headJump);
            
            if (this.gameView.game.winner == 0)
                this.russianFlag.setAttr("opacity", Math.max(0, Math.min(1, 0.7 * this.animation - 0.2)));
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

JW.PreLoader.request({
    url: "images/OpenCallVisualFlag.svg",
    viewBox: "0 0 1186 790"
});