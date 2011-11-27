JW.ns("KM.UI");

KM.UI.Tooltip = JW.Svg.extend({
    text: "", // [optional] String
    
    creationComplete: function()
    {
        this._super();
        
        var rect = this.rect(0, 0, 1, 1, 5).attr({
            "fill"          : this.color,
            "stroke"        : "none"
        });
        
        var text = this.paper.text(0, 0, this.text).attr({
            "fill"          : "black",
            "font-size"     : 10,
            "font-family"   : KM.Constants.FONT_FAMILY
        });
        
        if (!$.browser.msie)
        {
            ///TODO: sometimes this methods throws exception
            var bbox = text.getBBox();
            bbox.width  += 6;
            bbox.height += 4;
        
            rect.attr({
                x       : -bbox.width / 2,
                y       : -bbox.height / 2,
                width   : bbox.width,
                height  : bbox.height
            });
        }
        
        this.setAttr("pointer-events", "none");
        
    }
});
