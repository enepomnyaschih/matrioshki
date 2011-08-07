JW.ns("KM");

KM.Application = JW.Svg.extend({
    // model
    game        : null,     // [readonly] KM.Model.Game
    
    // UI
    gameView    : null,     // [readonly] KM.UI.Game
    
    width       : KM.Constants.VIEWPORT_WIDTH,
    height      : KM.Constants.VIEWPORT_HEIGHT,
    
    initComponent: function()
    {
        this._super();
        
        // initialize model
        this.game = new KM.Model.Game({
            mapData         : KM.Model.MapData.DimaxionMap.SplittedCenter
        });
    },
    
    render: function()
    {
        this._super();
        
        // initialize UI
        
        this.gameView = new KM.UI.Game({
            game: this.game
        });
        
        this.addChild(this.gameView);
        
    }
});

function restartApplication()
{
    if (window.application)
        window.application.destroy();
    
    window.application = new KM.Application({
        renderTo: ".game"
    });
    
    application.creationComplete();
}

$(restartApplication);
