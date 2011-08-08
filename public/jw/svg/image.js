JW.ns("JW.Svg");

JW.Svg.Image = JW.Svg.extend({
    src: "images/flag-arg.svg",

    width       : 10,
    height      : 10,

    render: function()
    {
        this._super();
        if (!JW.PreLoader.isComplete(this.src))
            return;

        var response = JW.PreLoader.getResponse(this.src);

        var parser = new DOMParser();
        parser.async = false;

        var el = parser.parseFromString(response.responseText, 'text/xml').documentElement;
        this.paper.canvas.appendChild(el);

        this.setAttr("viewBox", response.viewBox);
    }
});