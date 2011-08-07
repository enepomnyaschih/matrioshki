JW.ns("KM.UI");

KM.UI.Flag = JW.Svg.extend({
    headView	: null,
    bodyView	: null,
    view		: null,

    
    width       : KM.Constants.FLAG_VIEW_SIZE,
    height      : KM.Constants.FLAG_VIEW_SIZE,
    
    creationComplete: function()
    {
        this._super();
        
        this.setAttr("pointer-events", "none");
        
        this.bodyView = this.headView = this.view = new JW.Svg();
        
        this.addChild(this.view);
        
        this._drawFlag();
        
        //this._scale();
    },
    
    // virtual
    _drawFlag: function()
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

JW.Component.template(KM.UI.Flag, {
    viewBox: $.template("0 0 ${size} ${size}")
});
