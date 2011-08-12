JW.ns("KM.UI");

KM.UI.Sound.On = KM.UI.Button.extend({
    balaView    : null,     // JW.Svg.Image
    
    width       : KM.Constants.SOUND_WIDTH,
    height      : KM.Constants.SOUND_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.rectEl.attr("opacity", 0);
        this.rectEl.attr("title", KM.Locale.LetsShakeIt);
        $(this.rectEl.node.parentNode).tooltip();
        
        this.balaView = new JW.Svg.Image({
            src     : "images/bear/balalaika2.svg",
            x       : 5,
            y       : 5,
            width   : 100,
            height  : 100
        });
        
        this.balaView.setAttr("pointer-events", "none");
        this.addChild(this.balaView);
    }
});

JW.PreLoader.request({
    url     : "images/bear/balalaika2.svg",
    viewBox : "0 0 200 270"
});
