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
        
        var flags = [ "Arg", "Bra", "Aus", "Cze", "Ger", "Izr", "Jap", "Rus" ];
        for (var i = 0; i < flags.length; ++i)
        {
            var cls = KM.UI.Flag[flags[i]];
            var flag = new cls({
                x: 50 * (i + 1),
                y: 50
            });
            this.addChild(flag);
            flag.creationComplete();
            ++i;
        }
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
