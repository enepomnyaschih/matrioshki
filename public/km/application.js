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
            mapData         : KM.Model.MapData.DimaxionMap.Small
        });
    },
    
    render: function()
    {
        this._super();
        
        this.paper.rect(0, 0, this.getWidth(), this.getHeight()).attr("fill", "black");
        
        // initialize UI
        
        this.gameView = new KM.UI.Game({
            game: this.game
        });
        
        this.addChild(this.gameView);
        
    }
});

$(function() {
    window.application = new KM.Application({
        renderTo: document.body
    });
    
    application.creationComplete();
});
