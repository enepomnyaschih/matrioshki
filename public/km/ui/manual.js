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
            400, 220,
            "Androids got out of control and captured all GDD hosting\n" +
            "locations excepting Moscow. And only Russian matreshki\n" +
            "can fix androids up and safe the feast!\n \n" +
            "- Secure all GDD hosting locations -\n" +
            "- Don't let Androids to capture all GDD hosting locations -\n \n" +
            "Click to continue..."
        ).attr({
            "cursor"        : "default",
            "fill"          : "#000088",
            "font-size"     : 28,
            "font-family"   : KM.Constants.FONT_FAMILY
        });
        
        this.el.click(this._onClick.inScope(this));
    },
    
    _onClick: function()
    {
        this.destroy();
        
        $.cookie("kmmanual", "1");
    }
});
