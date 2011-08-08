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
        this._initLocale();
        
        document.title = KM.Locale.Title;
        $(".manual-link").attr("href", "manual-" + KM.Locale.ID + ".html");
        
        JW.PreLoader.bind("complete", function(){
            this.restart();
        }.inScope(this));

        this._renderManual();
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

    _initLocale: function()
    {
        var locale = KM.Locale[this._getLocale()];
        if (!locale)
            return;
        
        $.extend(KM.Locale, locale);
    },
    
    _getLocale: function()
    {
        return JW.Params["hl"] || navigator.language.substr(0, 2);
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
