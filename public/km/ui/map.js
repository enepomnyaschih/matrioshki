JW.ns("KM.UI");

KM.UI.Map = JW.Svg.extend({
    map         : null,     // [required] KM.Model.Map
    broadcaster : null,     // [required] KM.UI.Broadcaster
    
    areaLayer   : null,     // [readonly] JW.Svg
    unitLayer   : null,     // [readonly] JW.Svg
    flagLayer   : null,     // [readonly] JW.Svg
    ttipLayer   : null,     // [readonly] JW.Svg
    
    areaViews   : null,     // [readonly] Array of KM.UI.Area
    flagViews   : null,     // [readonly] Array of KM.UI.Flag.Point
    
    x           : KM.Constants.MAP_VIEW_X,
    y           : KM.Constants.MAP_VIEW_Y,
    width       : KM.Constants.MAP_VIEW_WIDTH,
    height      : KM.Constants.MAP_VIEW_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.areaLayer = new JW.Svg();
        this.unitLayer = new JW.Svg();
        this.flagLayer = new JW.Svg();
        this.ttipLayer = new JW.Svg();
        
        this.addChild(this.areaLayer);
        this.addChild(this.flagLayer);
        this.addChild(this.unitLayer);
        this.addChild(this.ttipLayer);
        
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
        this.areaLayer.addChild(areaView);
        
        areaView.bind("unitupdated",    this._onAreaUnitUpdated,    this);
        areaView.bind("tooltipupdated", this._onAreaTooltipUpdated, this);
        this._updateUnit(areaView);
    },
    
    _updateUnit: function(areaView)
    {
        this.unitLayer.addChildAt(areaView.unitView, areaView.area.index);
    },
    
    _renderFlag: function(flag)
    {
        var flagView = new KM.UI.Flag.Point({
            flag: flag
        });
        
        this.flagViews.push(flagView);
        this.flagLayer.addChild(flagView);
    },
    
    _onAreaUnitUpdated: function(event)
    {
        this._updateUnit(event.target);
    },
    
    _onAreaTooltipUpdated: function(event)
    {
        var areaView = event.target;
        this.ttipLayer.addChild(areaView.tooltip);
    }
});
