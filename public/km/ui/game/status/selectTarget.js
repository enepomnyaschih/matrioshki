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
    },
    
    // override
    stop: function()
    {
        this.gameView.broadcaster.unbind("areaclicked", this._onAreaClicked, this);
    },
    
    _runArea: function(areaIndex)
    {
        var areaView = this.gameView.mapView.areaViews[areaIndex];
        if (areaView.area.player == 1)
            areaView.highlight();
    },
    
    _onAreaClicked: function(event, areaView)
    {
        alert("Attack from " + this.sourceAreaView.area.index + " to " + areaView.area.index);
        //this.gameView.setStatus(new KM.UI.Game.Status.Attack(this.sourceAreaView, areaView));
    }
});
