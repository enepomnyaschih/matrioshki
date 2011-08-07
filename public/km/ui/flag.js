JW.ns("KM.UI");

KM.UI.Flag = JW.Svg.extend({
    width       : KM.Constants.FLAG_VIEW_SIZE,
    height      : KM.Constants.FLAG_VIEW_SIZE,
    
    creationComplete: function()
    {
        this._super();
        
        this.setAttr("pointer-events", "none");
        
        this._drawFlag();
        
        this.children[0].setXY(-16, this.yOffset);
        
        this.line(0, 0, 0, -25).attr({
            "stroke": "#888800"
        });
    },
    
    // virtual
    _drawFlag: function()
    {
    }
});

JW.Component.template(KM.UI.Flag, {
    viewBox: $.template("0 0 ${size} ${size}")
});
