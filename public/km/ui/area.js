JW.ns("KM.UI");

KM.UI.Area = JW.Svg.extend({
    area        : null,     // [required] KM.Model.Area
    broadcaster : null,     // [required] KM.UI.Broadcaster
    
    areaPath    : null,     // [readonly] Raphael path
    unitView    : null,     // [readonly] KM.UI.Unit
    enabled     : false,    // [readonly] Boolean
    
    light       : KM.Constants.AREA_LIGHTEN_STD,    // [optional] Number
    
    render: function()
    {
        this._super();
        
        this._renderArea();
        this._updateUnit();
        
        this._clickHandler = this._onClick.inScope(this);
        
        this.area.bind("playerchanged", this._onPlayerChanged, this);
        this.area.bind("powerchanged",  this._onPowerChanged,  this);
    },
    
    setLight: function(value)
    {
        this.light = JW.defn(value, KM.Constants.AREA_LIGHTEN_STD);
        this._updateColor();
    },
    
    enable: function()
    {
        if (this.enabled)
            return;
        
        this.enabled = true;
        this.setAttr("cursor", "pointer");
        this.el.bind("click", this._clickHandler);
    },
    
    disable: function()
    {
        if (!this.enabled)
            return;
        
        this.enabled = false;
        this.removeAttr("cursor");
        this.el.unbind("click", this._clickHandler);
    },
    
    reset: function()
    {
        this.setLight();
        this.disable();
    },
    
    _renderArea: function()
    {
        function renderVertex(coord)
        {
            return  KM.Constants.modelToViewX(coord[0]) + " " +
                    KM.Constants.modelToViewY(coord[1]);
        }
        
        this.areaPath = this.path("M" + this.area.coordinates.map(renderVertex).join("L"));
        this._updateColor();
    },
    
    _updateUnit: function()
    {
        if (this.unitView)
            this.unitView.destroy();
        
        this.unitView = this.area.getPlayer().createUnitView({
            power   : this.area.power,
            x       : KM.Constants.modelToViewX(this.area.center[0]),
            y       : KM.Constants.modelToViewY(this.area.center[1])
        });
        
        this.addChild(this.unitView);
    },
    
    _updateColor: function()
    {
        var color = JW.Colors.lighten(this.area.getPlayer().color, this.light);
        this.areaPath.attr("fill", color);
    },
    
    _onPlayerChanged: function()
    {
        this._updateColor();
    },
    
    _onPowerChanged: function()
    {
        this._updateUnit();
    },
    
    _onClick: function(event)
    {
        event.stopPropagation();
        this.broadcaster.trigger("areaclicked", this);
    }
});
