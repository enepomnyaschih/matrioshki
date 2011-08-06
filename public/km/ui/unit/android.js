KM.UI.Unit.Android = KM.UI.Unit.extend({
    render: function()
    {
        this._super();
        
        this.setAttr("fill", "#97C03E");
    },
    
    // override
    _drawHead: function()
    {
        var androidHead = new JW.Svg();
        this.headView.addChild(androidHead);

        androidHead.path("m21.481,0.65239,4.062,7.0627c-7.394,3.6269-12.406,10.728-12.406,18.875h23.656,23.656c0-8.1468-5.012-15.248-12.406-18.875l4.063-7.0626s0.19231-0.37509-0.17225-0.58569c-0.365-0.21059-0.61,0.14869-0.61,0.14869l-4.125,7.1248c-3.141-1.3979-6.6721-2.1875-10.406-2.1875-3.7341,0-7.2653,0.7896-10.406,2.1875l-4.125-7.1248s-0.23006-0.35939-0.59737-0.14971c-0.368,0.20967-0.184,0.58671-0.184,0.58671zm4.062,13.68c1.2395,0,2.25,1.0105,2.25,2.25-0.00001,1.2395-1.0105,2.2188-2.25,2.2188s-2.25-0.97928-2.25-2.2188,1.0105-2.25,2.25-2.25zm22.5,0c1.2395,0,2.25,1.0105,2.25,2.25-0.00001,1.2395-1.0105,2.2188-2.25,2.2188s-2.25-0.97928-2.25-2.2188,1.0105-2.25,2.25-2.25z");
        androidHead.setSize(1,1);
        androidHead.setXY(-3,-3);
        var data = {
            size: 10
        };
        androidHead.setAttr("viewBox", this.templates.viewBox.apply(data));
    },
    
    // override
    _drawBody: function()
    {
        var androidBody = new JW.Svg();
        this.bodyView.addChild(androidBody);
        androidBody.path("m12.947,29.344,0,35.893c0,1.7807,2.1523,4.1116,3.933,4.1116h5.6295v12.237c0,3.1162,2.2691,5.625,5.0938,5.625,2.8246,0,5.0938-2.5088,5.0938-5.625v-12.237h8.1875v12.237c0,3.1162,2.2691,5.625,5.0938,5.625,2.8246,0,5.125-2.5088,5.125-5.625v-12.237h5.5982c1.7807,0,3.933-2.3309,3.933-4.1116v-35.893h-47.688z");
        androidBody.rect(0,     28.593, 10.197, 32.545, 5.625);
        androidBody.rect(63.39, 28.593, 10.197, 32.545, 5.625);
        androidBody.setSize(1,1);
        androidBody.setXY(-3,-3);

        var data = {
            size: 10
        };
        androidBody.setAttr("viewBox", this.templates.viewBox.apply(data));
    }
});
