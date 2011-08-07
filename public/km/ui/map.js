JW.ns("KM.UI");

KM.UI.Map = JW.Svg.extend({
    map         : null,     // [required] KM.Model.Map
    broadcaster : null,     // [required] KM.UI.Broadcaster
    
    areaViews   : null,     // [readonly] Array of KM.UI.Area
    flagViews   : null,     // [readonly] Array of KM.UI.Flag.Point
    
    x           : KM.Constants.MAP_VIEW_X,
    y           : KM.Constants.MAP_VIEW_Y,
    width       : KM.Constants.MAP_VIEW_WIDTH,
    height      : KM.Constants.MAP_VIEW_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.areaViews = [];
        this.map.areas.each(this._renderArea, this);
        
        this.flagViews = [];
        this.map.flags.each(this._renderFlag, this);
    },
    
    _renderArea: function(area)
    {
        var areaView = new KM.UI.Area({
            area        : area,
            broadcaster : this.broadcaster
        });
        
        this.areaViews.push(areaView);
        this.addChild(areaView);
    },
    
    _renderFlag: function(flag)
    {
        var flagView = new KM.UI.Flag.Point({
            flag: flag
        });
        
        this.flagViews.push(flagView);
        this.addChild(flagView);
    }
});
