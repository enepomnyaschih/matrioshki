JW.ns("KM.UI");

KM.UI.Balalaika = JW.Svg.Image.extend({
    src         : "images/bear/balalaika2.svg",
    width       : 100,
    height      : 100,
    
    render: function()
    {
        this._super();
        
        this.balaEl = this.addSvgChild("images/bear/balalaika.svg");
        this.handEl = this.addSvgChild("images/bear/hand.svg");
    },
    
    creationComplete: function()
    {
        this._animation = 0;
        
        this._animate();
        this._animationTimer = setInterval(this._animate.inScope(this), this.ANIMATION_STEP);
        
        this._super();
    },
    
    destroyComponent: function()
    {
        clearInterval(this._animationTimer);
        
        this._super();
    },
    
    _animate: function()
    {
        this._animation += 0.001 * this.ANIMATION_STEP;
        
        var scale = .8 + .2 * (1 - this._getPeriodValue(.4));
        var skew = 10 * this._getPeriodValue(.8);
        
        this.svgEl.childNodes[1].childNodes[1].setAttribute("transform", "skewX(" + skew + ") scale(1 " + scale + ")");
        
        var dx = -446 * Math.tan(Math.PI * skew / 180) / 2;
        var dy =  507 * (1 - scale) / 2;
        
        this.balaEl.setAttribute("x", dx);
        this.balaEl.setAttribute("y", dy);
        
        this.handEl.setAttribute("x", dx);
        this.handEl.setAttribute("y", dy);
        
        var rotate = 20 * this._getPeriodValue(.3);
        
        this.handEl.childNodes[1].setAttribute("transform", "rotate(" + rotate + " 300 190)");
    },
    
    _getPeriodValue: function(period)
    {
        return 2 * Math.abs(JW.mod(this._animation / period, 1) - .5);
    }
});

JW.PreLoader.request({
    url     : "images/bear/balalaika.svg",
    viewBox : "0 0 446 507"
});

JW.PreLoader.request({
    url     : "images/bear/hand.svg",
    viewBox : "0 0 446 507"
});
