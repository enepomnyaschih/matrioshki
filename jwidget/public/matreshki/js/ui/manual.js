JW.ns("KM.UI");

KM.UI.Manual = JW.Svg.extend({
    creationComplete: function()
    {
        this._super();
        
        this.rect(
            0, 0,
            KM.Constants.VIEWPORT_WIDTH,
            KM.Constants.VIEWPORT_HEIGHT
        ).attr({
            "fill"          : "white",
            "opacity"       : .6
        });
        
        this.paper.text(
            400, 200,
            KM.Locale.Manual
        ).attr({
            "cursor"        : "default",
            "fill"          : "#000088",
            "font-size"     : 25,
            "font-weight"   : "bold",
            "font-family"   : KM.Constants.FONT_FAMILY
        });
        
        this.el.click(this._onClick.inScope(this));
    },
    
    _onClick: function()
    {
        this.destroy();
        
        $.cookie("kmmanual", "1", {expires: 1000/*days*/});
    }
});
