JW.ns("KM.UI");

KM.UI.Area = JW.Svg.extend({
    area        : null,     // [required] KM.Model.Area
    
    render: function()
    {
        this._super();
        
        this.setAttr("overflow", "visible");
    }
});
