JW.ns("KM.UI");

KM.UI.Game = JW.Svg.extend({
    game        : null,     // [required] KM.Model.Game
    
    mapView     : null,     // [readonly] KM.UI.Map
    
    width       : KM.Constants.VIEWPORT_WIDTH,
    height      : KM.Constants.VIEWPORT_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.mapView = new KM.UI.Map({
            map: this.game.map
        });
        
        this.addChild(this.mapView);
    }
});
