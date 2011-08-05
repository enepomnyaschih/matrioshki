JW.ns("KM.UI");

KM.UI.Unit = JW.Svg.extend({
    power       : 0,        // [optional] Number
    
    headView    : null,     // [readonly] JW.Svg
    bodyView    : null,     // [readonly] JW.Svg
    
    width       : 10,
    height      : 10,
    
    render: function()
    {
        this._super();
        
        this.setAttr("overflow", "visible");
        this.setAttr("pointer-events", "none");
        
        this._draw();
        this._scale();
    },
    
    setPower: function(value)
    {
        this.power = value;
        this._scale();
    },
    
    // virtual
    _draw: function()
    {
        this.paper.rect(0, 0, 10, 10).attr("fill", "red");
    },
    
    _scale: function()
    {
        var scale = this.power * KM.Constants.UNIT_SCALE_COEF + KM.Constants.UNIT_SCALE_MIN;
        var data = {
            width   : this.getWidth()  / scale,
            height  : this.getHeight() / scale
        };
        
        this.setAttr("viewBox", this.templates.viewBox.apply(data));
    }
});

JW.Component.template(KM.UI.Unit, {
    viewBox: $.template("0 0 ${width} ${height}")
});
