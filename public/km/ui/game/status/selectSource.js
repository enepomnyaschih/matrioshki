KM.UI.Game.Status.SelectSource = KM.UI.Game.Status.extend({
    // override
    run: function()
    {
        this.gameView.endTurnButton.show();
        
        this.gameView.mapView.areaViews.each(this._runArea, this);
        this.gameView.broadcaster.bind("areaclicked", this._onAreaClicked, this);
    },
    
    // override
    stop: function()
    {
        this.gameView.broadcaster.unbind("areaclicked", this._onAreaClicked, this);
    },
    
    _runArea: function(areaView)
    {
        if (areaView.area.player == 0 &&
            areaView.area.power > 1)
            areaView.highlight();
    },
    
    _onAreaClicked: function(event, areaView)
    {
        this.gameView.setStatus(new KM.UI.Game.Status.SelectTarget(areaView));
    }
});
