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
        
        JW.PreLoader.bind("complete", this._onResourcesLoaded, this);
        JW.PreLoader.start();
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
    
    _onResourcesLoaded: function()
    {
        $(".km-root").show();
        
        if (Audio)
        {
            this._initSound();
        }
        this.restart();
        this._renderManual();
        this._initHelp();
        this._initGoogleAsset();
    },

    _initLocale: function()
    {
        if (JW.Params.hl)
            $.cookie("kmlocale", JW.Params.hl, {expires: 1000/*days*/});
        
        var locale = KM.Locale[this._getLocale()];
        if (!locale)
            return;
        
        $.extend(KM.Locale, locale);
    },
    
    _getLocale: function()
    {
        var language = "en";
        if (navigator.language)
        {
            language = navigator.language.substr(0, 2);
        }
        if ($.cookie("kmlocale"))
        {
            language = $.cookie("kmlocale");
        }
        return language;
    },
    
    _renderManual: function()
    {
        if ($.cookie("kmmanual") == "1")
            return;
        
        this.manualView = new KM.UI.Manual();
        this.addChild(this.manualView);
        
        this.manualView.creationComplete();
    },

    _initSound: function()
    {
        this.soundView = new KM.UI.Sound({
            playlist: KM.Audio.playlist
        });
        
        this.addChild(this.soundView);
        this.soundView.creationComplete();
    },

    _initHelp: function()
    {
        this.helpView = new KM.UI.Help({
            href   : "manual-" + KM.Locale.ID + ".html",
        });
        this.addChild(this.helpView);
        this.helpView.creationComplete();
    },

    _initGoogleAsset: function()
    {
        this.googleView = new KM.UI.GoogleAsset();
        this.addChild(this.googleView);
        this.googleView.creationComplete();
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

function addMedved()
{
    var bear = new KM.UI.Bear();
    application.gameView.addChild(bear);
    bear.creationComplete();
}

JW.PreLoader.request({
    url: "images/help-icon.svg",
    viewBox: "0 0 400 400"
});
