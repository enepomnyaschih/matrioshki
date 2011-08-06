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
            "fill"      : this.area.player ? JW.Colors.lighten(this.area.player.color, .5) : "#77a2d9",
            "stroke"    : null
        });
    },
    
    _renderUnit: function()
    {
        if (!this.area.player)
            return;
        
        this.unitView = this.area.player.createUnitView({
            power   : this.area.power,
            x       : KM.Constants.modelToViewX(this.area.center[0]),
            y       : KM.Constants.modelToViewY(this.area.center[1])
        });
        
        this.addChild(this.unitView);
    }
});
