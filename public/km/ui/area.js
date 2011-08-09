JW.ns("KM.UI");

KM.UI.Area = JW.Svg.extend({
    UNITUPDATED     : "unitupdated",    // handler(event)
    TOOLTIPUPDATED  : "tooltipupdated", // handler(event)
    
    area        : null,     // [required] KM.Model.Area
    broadcaster : null,     // [required] KM.UI.Broadcaster
    
    areaPath    : null,     // [readonly] Raphael path
    unitView    : null,     // [readonly] KM.UI.Unit
    tooltip     : null,     // [readonly] KM.UI.Tooltip
    enabled     : false,    // [readonly] Boolean
    color       : null,     // [readonly] String
    
    light       : KM.Constants.AREA_LIGHTEN_STD,    // [optional] Number
    jump        : 0,
    headJump    : 0,
    
    render: function()
    {
        this._super();
        
        this._renderArea();
        this._updateUnit();
        
        this._clickHandler = this._onClick.inScope(this);
        
        this.area.bind("playerchanged", this._onPlayerChanged, this);
        this.area.bind("powerchanged",  this._onPowerChanged,  this);
        
        this.el.mouseover(this._onMouseOver.inScope(this));
        this.el.mouseout (this._onMouseOut .inScope(this));
    },
    
    setLight: function(value)
    {
        this.light = JW.defn(value, KM.Constants.AREA_LIGHTEN_STD);
        this._updateColor();
    },
    
    setJump: function(jump, headJump)
    {
        this.jump = jump;
        this.headJump = headJump;
        this._updateUnitPosition();
    },
    
    setColor: function(color)
    {
        this.color = color;
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
            x       : KM.Constants.modelToViewX(this.area.center[0])
        });
        
        this.trigger("unitupdated");
        this._updateUnitPosition();
    },
    
    _updateUnitPosition: function()
    {
        this.unitView.setY(KM.Constants.modelToViewY(this.area.center[1]) - this.jump * 15);
        this.unitView.headView.setY(-this.headJump * 4);
    },
    
    _updateColor: function()
    {
        var color = JW.Colors.lighten(this.color || this.area.getPlayer().color, this.light);
        this.areaPath.attr("fill", color);
    },
    
    _updateTooltip: function()
    {
        if (!this.tooltip)
            return;
        
        this._removeTooltip();
        this._addTooltip();
    },
    
    _addTooltip: function()
    {
        if (this.tooltip)
            return;
        
        var template = (this.area.player == 0) ? KM.Locale.MatreshkaLevel : KM.Locale.AndroidLevel;
        var data = {
            level: this.area.power
        };
        
        this.tooltip = new KM.UI.Tooltip({
            x       : KM.Constants.modelToViewX(this.area.center[0]),
            y       : KM.Constants.modelToViewY(this.area.center[1]) - 30,
            text    : $.template(template).apply(data),
            color   : JW.Colors.lighten(this.area.getPlayer().color, .5)
        });
        
        this.trigger("tooltipupdated");
        this.tooltip.creationComplete();
    },
    
    _removeTooltip: function()
    {
        if (!this.tooltip)
            return;
        
        this.tooltip.destroy();
        delete this.tooltip;
    },
    
    _onPlayerChanged: function()
    {
        this._updateColor();
        this._updateTooltip();
    },
    
    _onPowerChanged: function()
    {
        this._updateUnit();
        this._updateTooltip();
    },
    
    _onClick: function(event)
    {
        event.stopPropagation();
        this.broadcaster.trigger("areaclicked", this);
    },
    
    _onMouseOver: function()
    {
        this._addTooltip();
    },
    
    _onMouseOut: function()
    {
        this._removeTooltip();
    }
});
