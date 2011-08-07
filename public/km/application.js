JW.ns("KM");

KM.Application = JW.Svg.extend({
    // model
    game        : null,     // [readonly] KM.Model.Game
    
    // UI
    manualView  : null,     // [readonly] KM.UI.Manual
    gameView    : null,     // [readonly] KM.UI.Game
    
    width       : KM.Constants.VIEWPORT_WIDTH,
    height      : KM.Constants.VIEWPORT_HEIGHT,
    
    creationComplete: function()
    {
        this._super();
        
        this._renderManual();
        this.restart();
    },
    
    restart: function()
    {
        if (this.gameView)
            this.gameView.destroy();
        
        this.game = new KM.Model.Game({
            mapData         : KM.Model.MapData.DimaxionMap.SplittedCenter
        });
        
        this.gameView = new KM.UI.Game({
            game: this.game
        });
        
        this.addChildAt(this.gameView, 0);
        
        this.gameView.creationComplete();
    },
    
    _renderManual: function()
    {
        if ($.cookie("kmmanual") == "1")
            return;
        
        this.manualView = new KM.UI.Manual();
        this.addChild(this.manualView);
        
        this.manualView.creationComplete();
    }
});

function startApplication()
{
    window.application = new KM.Application({
        renderTo: ".game"
    });
    
    application.creationComplete();
}

$(startApplication);
