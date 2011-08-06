JW.ns("KM.UI");

KM.UI.Area = JW.Svg.extend({
    area        : null,     // [required] KM.Model.Area
    
    areaPath    : null,     // [readonly] Raphael path
    
    render: function()
    {
        this._super();
        
        this.setAttr("overflow", "visible");
        
        this._renderArea();
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
            "fill"      : "#77a2d9",
            "stroke"    : null
        });
    }
});
