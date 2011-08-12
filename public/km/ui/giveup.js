JW.ns("KM.UI");

KM.UI.Giveup = JW.Svg.extend({
    render: function()
    {
        this._super();
        
        var rect = this.rect(-2, -2, 27, 27).attr({
            "fill"      : "white",
            "opacity"   : 0,
            "title"     : KM.Locale.GiveUp
        });
        
        $(rect.node.parentNode).tooltip();
        
        var sprite = new JW.Svg.Image({
            x           : -6,
            y           : -2,
            src         : "images/giveup.svg",
            width       : 36,
            height      : 24
        });
        
        sprite.setAttr("pointer-events", "none");
        this.addChild(sprite);
        
        var line = this.line(0, 0, 0, 25).attr({
            "stroke": "#888800"
        });
        line.node.setAttribute("pointer-events", "none");
        
        this.setAttr("cursor", "pointer");
    }
});

JW.PreLoader.request({
    url     : "images/giveup.svg",
    viewBox : "0 0 303 191"
});
