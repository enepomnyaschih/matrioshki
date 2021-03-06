JW.ns("KM.UI");

/*
    Forget about MVC because too few time and too simple application.
    This class takes controller functionality.
*/

KM.UI.Game = JW.Svg.extend({
    game            : null,     // [required] KM.Model.Game
    
    broadcaster     : null,     // [readonly] KM.UI.Broadcaster
    mapView         : null,     // [readonly] KM.UI.Map
    status          : null,     // [readonly] KM.UI.Game.Status
    endTurnButton   : null,     // [readonly] KM.UI.Button
    giveupButton    : null,     // [readonly] KM.UI.Giveup
    
    currentPlayer   : 0,        // [readonly] Integer
    
    width           : KM.Constants.VIEWPORT_WIDTH,
    height          : KM.Constants.VIEWPORT_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.broadcaster = new KM.UI.Broadcaster();
        
        this.rect(0, 0, this.getWidth(), this.getHeight()).attr("fill", "white");
        
        this.mapView = new KM.UI.Map({
            map         : this.game.map,
            broadcaster : this.broadcaster
        });
        
        this.addChild(this.mapView);
        
        this.endTurnButton = new KM.UI.Button({
            text    : KM.Locale.EndTurn,
            x       : KM.Constants.BUTTONX,
            y       : KM.Constants.BUTTONY,
            width   : 150,
            height  : 40
        });
        
        this.addChild(this.endTurnButton);
        this.endTurnButton.el.click(this._onEndTurnClick.inScope(this));
        
        this.giveupButton = new KM.UI.Giveup({
            x       : 730,
            y       : 28
        });
        
        this.addChild(this.giveupButton);
        this.giveupButton.el.click(this._onGiveUpClick.inScope(this));
    },
    
    creationComplete: function()
    {
        this.setStatus(new KM.UI.Game.Status.SelectArea());
        this._super();
    },
    
    setStatus: function(status)
    {
        if (this.status)
        {
            this.status.stop();
            this.status.destroy();
            this._resetAreas();
        }
        
        this.status = status;
        
        if (this.status)
        {
            this.disableControls();
            this.status.gameView = this;
            this.status.run();
        }
    },
    
    resetStatus: function()
    {
        this.setStatus(this.currentPlayer == 0 ?
            new KM.UI.Game.Status.SelectArea() :
            new KM.UI.Game.Status.AI()
        );
    },
    
    nextPlayer: function()
    {
        this.currentPlayer = 1 - this.currentPlayer;
        this.resetStatus();
    },
    
    endTurn: function()
    {
        this.setStatus(new KM.UI.Game.Status.EndTurn());
    },
    
    disableControls: function()
    {
        this.endTurnButton.hide();
        this.giveupButton.hide();
    },
    
    enableControls: function()
    {
        this.endTurnButton.show();
        this.giveupButton.show();
    },
    
    _resetAreas: function()
    {
        this.mapView.areaViews.each(this._resetArea, this);
    },
    
    _resetArea: function(area)
    {
        area.reset();
    },
    
    _onEndTurnClick: function()
    {
        this.endTurn();
    },
    
    _onGiveUpClick: function()
    {
        this.game.winner = 1;
        this.setStatus(new KM.UI.Game.Status.EndGame());
    }
});
