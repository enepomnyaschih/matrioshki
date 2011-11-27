JW.ns("KM.UI");

KM.UI.GoogleAsset = JW.Svg.Image.extend({
    width       : KM.Constants.GOOGLE_WIDTH,
    height      : KM.Constants.GOOGLE_HEIGHT,
    x           : KM.Constants.GOOGLE_X,
    y           : KM.Constants.GOOGLE_Y,
    src         : "images/gdd-2011.svg",
    href        : "http://www.google.com/events/developerday/2011/",

    render: function() /*void*/
    {
        this._super();
        this.rectEl = this.rect(0, 0, 220, 180, 5).attr({
            "fill"          : "brown",
            "stroke"        : "brown",
            "stroke-width"  : 3
        });
        this.rectEl.attr("opacity", 0);
        this.rectEl.attr("title", KM.Locale.GDDTitle);
        $(this.rectEl.node.parentNode).tooltip();
    }
});

JW.PreLoader.request({
    url: "images/gdd-2011.svg",
    viewBox: "0 0 176 141"
});
