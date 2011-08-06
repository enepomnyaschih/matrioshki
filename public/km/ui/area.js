JW.ns("KM.UI");

KM.UI.Area = JW.Svg.extend({
    area        : null,     // [required] KM.Model.Area
    
    areaPath    : null,     // [readonly] Raphael path
    unitView    : null,     // [readonly] KM.UI.Unit
    
    render: function()
    {
        this._super();
        
        this._renderArea();
        this._renderUnit();
    },
    
    _renderArea: function()
    {
        function renderVertex(coord)
        {
            return  KM.Constants.modelToViewX(coord[0]) + " " +
                    KM.Constants.modelToViewY(coord[1]);
        }
        
        this.areaPath = this.paper.path("M" + this.area.coordinates.map(renderVertex).join("L"));
        this.areaPath.attr({
            "fill"      : JW.Colors.lighten(this.area.getPlayer().color, .5),
            "stroke"    : null
        });
    },
    
    _renderUnit: function()
    {
        this.unitView = this.area.getPlayer().createUnitView({
            power   : this.area.power,
            x       : KM.Constants.modelToViewX(this.area.center[0]),
            y       : KM.Constants.modelToViewY(this.area.center[1])
        });
        
        this.addChild(this.unitView);
    }
});
