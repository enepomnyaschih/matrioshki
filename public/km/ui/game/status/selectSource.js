KM.UI.Game.Status.SelectSource = KM.UI.Game.Status.extend({
    // override
    run: function()
    {
        this.gameView.endTurnButton.show();
        
        this.gameView.game.map.getPlayerBorders(0).each(function(area) {
            var view = this.gameView.mapView.areaViews[area.index];
            view.setLight(KM.Constants.AREA_LIGHTEN_HIGH);
            view.enable();
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
