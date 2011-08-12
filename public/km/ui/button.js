JW.ns("KM.UI");

KM.UI.Button = JW.Svg.extend({
    text        : "",       // [optional] String
    
    rectEl      : null,     // [readonly] Raphael rect
    textEl      : null,     // [readonly] Raphael text
    
    render: function()
    {
        this._super();
        
        this.rectEl = this.rect(0, 0, this.getWidth(), this.getHeight(), 5).attr({
            "fill"          : "#77a2d9",
            "stroke"        : "#77a2d9",
            "stroke-width"  : 3
        });
        
        this.textEl = this.paper.text(this.getWidth() / 2, this.getHeight() / 2 + ($.browser.msie ? -6 : 7), this.text).attr({
            "fill"          : "white",
            "font-size"     : 20,
            "font-family"   : KM.Constants.FONT_FAMILY
        });

        this.setAttr("cursor", "pointer");
    }
});
