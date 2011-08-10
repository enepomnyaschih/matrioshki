KM.UI.Unit.Matreshka = KM.UI.Unit.extend({
    IMAGESIZE: 3.9,
    IMAGEX: -2.8,
    IMAGEY: -2.8,

    render: function()
    {
        this._super();
        
        this.setAttr("fill", "#FF0000");
    },
    
    // override
    _drawHead: function()
    {
        var head = new JW.Svg.Image({
            x: this.IMAGEX,
            y: this.IMAGEY,
            width: this.IMAGESIZE,
            height: this.IMAGESIZE,
            src: "images/matreshka-top.svg"
        });
        this.headView.addChild(head);
    },
    
    // override
    _drawBody: function()
    {
        var body = new JW.Svg.Image({
            x: this.IMAGEX,
            y: this.IMAGEY,
            width: this.IMAGESIZE,
            height: this.IMAGESIZE,
            src: "images/matreshka-bottom.svg"
        });
        this.bodyView.addChild(body);
    }
});

JW.PreLoader.request({
    url: "images/matreshka-top.svg",
    viewBox: "0 0 250 250"
});

JW.PreLoader.request({
    url: "images/matreshka-bottom.svg",
    viewBox: "0 0 250 250"
});
