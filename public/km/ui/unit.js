JW.ns("KM.UI");

KM.UI.Unit = JW.Svg.extend({
    power       : 0,        // [optional] Number
    
    headView    : null,     // [readonly] JW.Svg
    bodyView    : null,     // [readonly] JW.Svg
    
    width       : KM.Constants.UNIT_VIEW_SIZE,
    height      : KM.Constants.UNIT_VIEW_SIZE,
    
    render: function()
    {
        this._super();
        
        this.setAttr("pointer-events", "none");
        
        this.headView = new JW.Svg();
        this.bodyView = new JW.Svg();
        
        this.addChild(this.headView);
        this.addChild(this.bodyView);
        
        this._drawHead();
        this._drawBody();
        
        this._scale();
    },
    
    setPower: function(value)
    {
        this.power = value;
        this._scale();
    },
    
    // virtual
    _drawHead: function()
    {
    },
    
    // virtual
    _drawBody: function()
    {
    },
    
    _scale: function()
    {
        var scale = this.power * KM.Constants.UNIT_SCALE_COEF + KM.Constants.UNIT_SCALE_MIN;
        var data = {
            size: KM.Constants.UNIT_MODEL_SIZE / scale
        };
        
        this.setAttr("viewBox", this.templates.viewBox.apply(data));
    }
});

JW.Component.template(KM.UI.Unit, {
    viewBox: $.template("0 0 ${size} ${size}")
});
