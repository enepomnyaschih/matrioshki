KM.UI.Game.Status.SelectSource = KM.UI.Game.Status.extend({
    // override
    run: function()
    {
        this.gameView.endTurnButton.show();
        
        this.gameView.game.map.getPlayerBorders(0).each(function(area) {
            this.gameView.mapView.areaViews[area.index].highlight();
        }, this);
        
        this.gameView.broadcaster.bind("areaclicked", this._onAreaClicked, this);
    },
    
    // override
    stop: function()
    {
        this.gameView.broadcaster.unbind("areaclicked", this._onAreaClicked, this);
    },
    
    _onAreaClicked: function(event, areaView)
    {
        this.gameView.setStatus(new KM.UI.Game.Status.SelectTarget(areaView));
    }
});
