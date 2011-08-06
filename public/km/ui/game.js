JW.ns("KM.UI");

/*
    Forget about MVC because too few time and too simple application.
    This class takes controller functionality.
*/

KM.UI.Game = JW.Svg.extend({
    game        : null,     // [required] KM.Model.Game
    
    broadcaster : null,     // [readonly] KM.UI.Broadcaster
    mapView     : null,     // [readonly] KM.UI.Map
    status      : null,     // [readonly] KM.UI.Game.Status
    
    width       : KM.Constants.VIEWPORT_WIDTH,
    height      : KM.Constants.VIEWPORT_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.broadcaster = new KM.UI.Broadcaster();
        
        this.mapView = new KM.UI.Map({
            map         : this.game.map,
            broadcaster : this.broadcaster
        });
        
        this.addChild(this.mapView);
    },
    
    creationComplete: function()
    {
        this.setStatus(new KM.UI.Game.Status.SelectSource());
        
        this._super();
    },
    
    setStatus: function(status)
    {
        if (this.status)
        {
            this.status.stop();
            this.status.destroy();
            this._resetAreas();
        }
        
        this.status = status;
        
        if (this.status)
        {
            this.status.gameView = this;
            this.status.run();
        }
    },
    
    _resetAreas: function()
    {
        this.mapView.areaViews.each(this._resetArea, this);
    },
    
    _resetArea: function(area)
    {
        area.reset();
    }
});
