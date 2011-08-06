KM.UI.Game.Status.SelectTarget = KM.UI.Game.Status.extend({
    sourceAreaView: null, // [required] KM.UI.Area
    
    init: function(sourceAreaView)
    {
        this._super();
        
        this.sourceAreaView = sourceAreaView;
    },
    
    // override
    run: function()
    {
        this.sourceAreaView.area.borders.each(this._runArea, this);
        this.gameView.broadcaster.bind("areaclicked", this._onAreaClicked, this);
        
        this._clickHandler = this._onClick.inScope(this);
        this.gameView.el.bind("click", this._clickHandler);
    },
    
    // override
    stop: function()
    {
        this.gameView.broadcaster.unbind("areaclicked", this._onAreaClicked, this);
        this.gameView.el.unbind("click", this._clickHandler);
    },
    
    _runArea: function(areaIndex)
    {
        var areaView = this.gameView.mapView.areaViews[areaIndex];
        if (areaView.area.player == 1)
            areaView.highlight();
    },
    
    _onAreaClicked: function(event, areaView)
    {
        this.gameView.setStatus(new KM.UI.Game.Status.Attack(this.sourceAreaView, areaView));
    },
    
    _onClick: function()
    {
        this.gameView.resetStatus();
    }
});
