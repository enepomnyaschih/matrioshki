KM.UI.Game.Status.SelectArea = KM.UI.Game.Status.extend({
    sourceAreaView: null, // [required] KM.UI.Area
    
    init: function(sourceAreaView)
    {
        this._super();
        
        this.sourceAreaView = sourceAreaView;
    },
    
    // override
    run: function()
    {
        this.gameView.endTurnButton.show();
        
        if (this.sourceAreaView)
        {
            this.sourceAreaView.setLight(.9);
            this.sourceAreaView.area.borders.each(this._runSourceAreaBorder, this);
            
            this._freeClickHandler = this._onFreeClick.inScope(this);
            this.gameView.el.bind("click", this._freeClickHandler);
        }
        
        this.gameView.game.map.getPlayerBorders(0).each(this._runPlayerBorder, this);
        this.gameView.broadcaster.bind("areaclicked", this._onAreaClicked, this);
    },
    
    // override
    stop: function()
    {
        this.gameView.broadcaster.unbind("areaclicked", this._onAreaClicked, this);
        
        if (this._freeClickHandler)
            this.gameView.el.unbind("click", this._clickHandler);
    },
    
    _runPlayerBorder: function(area)
    {
        var view = this.gameView.mapView.areaViews[area.index];
        view.setLight(KM.Constants.AREA_LIGHTEN_HIGH);
        view.enable();
    },
    
    _runSourceAreaBorder: function(areaIndex)
    {
        var areaView = this.gameView.mapView.areaViews[areaIndex];
        if (areaView.area.player == 1)
        {
            areaView.setLight(KM.Constants.AREA_LIGHTEN_HIGH);
            areaView.enable();
        }
    },
    
    _onAreaClicked: function(event, areaView)
    {
        if (areaView.area.player == 0)
            this.gameView.setStatus(new KM.UI.Game.Status.SelectArea(areaView));
        else
            this.gameView.setStatus(new KM.UI.Game.Status.Attack(this.sourceAreaView, areaView));
    },
    
    _onFreeClick: function()
    {
        this.gameView.resetStatus();
    }
});
