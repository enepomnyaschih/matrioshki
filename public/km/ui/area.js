JW.ns("KM.UI");

KM.UI.Area = JW.Svg.extend({
    area        : null,     // [required] KM.Model.Area
    broadcaster : null,     // [required] KM.UI.Broadcaster
    
    areaPath    : null,     // [readonly] Raphael path
    unitView    : null,     // [readonly] KM.UI.Unit
    highlighted : false,    // [readonly] Boolean
    
    render: function()
    {
        this._super();
        
        this._renderArea();
        this._renderUnit();
        
        this._clickHandler = this._onClick.inScope(this);
    },
    
    highlight: function()
    {
        if (this.highlighted)
            return;
        
        this.highlighted = true;
        this.setAttr("cursor", "pointer");
        this._updateColor();
        this.el.bind("click", this._clickHandler);
    },
    
    reset: function()
    {
        if (!this.highlighted)
            return;
        
        this.highlighted = false;
        this.removeAttr("cursor");
        this._updateColor();
        this.el.unbind("click", this._clickHandler);
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
    
    _renderUnit: function()
    {
        this.unitView = this.area.getPlayer().createUnitView({
            power   : this.area.power,
            x       : KM.Constants.modelToViewX(this.area.center[0]),
            y       : KM.Constants.modelToViewY(this.area.center[1])
        });
        
        this.addChild(this.unitView);
    },
    
    _onClick: function()
    {
        this.broadcaster.trigger("areaclicked", this);
    },
    
    _updateColor: function()
    {
        var lighten = this.highlighted ? KM.Constants.AREA_LIGHTEN_HIGH : KM.Constants.AREA_LIGHTEN_STD;
        var color = JW.Colors.lighten(this.area.getPlayer().color, lighten);
        this.areaPath.attr("fill", color);
    }
});
