KM.UI.Game.Status.SelectSource = KM.UI.Game.Status.extend({
    // override
    run: function()
    {
        this.gameView.mapView.areaViews.each(this._runArea, this);
        this.gameView.broadcaster.bind("areaclicked", this._onAreaClicked, this);
    },
    
    // override
    stop: function()
    {
        this.gameView.broadcaster.bind("areaclicked", this._onAreaClicked, this);
    },
    
    _runArea: function(areaView)
    {
        if (areaView.area.player == 0 &&
            areaView.area.power > 1)
            areaView.highlight();
    },
    
    _onAreaClicked: function(event, areaView)
    {
        alert(areaView.area.index);
    }
});
