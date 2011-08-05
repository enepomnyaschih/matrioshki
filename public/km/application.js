JW.ns("KM");

KM.Application = JW.Svg.extend({
    width   : 800,
    height  : 600,
    
    initComponent: function()
    {
        this._super();
        
        // initialize model
    },
    
    render: function()
    {
        this._super();
        
        // initialize UI
        
        this.paper.rect(0, 0, this.getWidth(), this.getHeight()).attr("fill", "black");
    }
});

$(function() {
    window.application = new KM.Application({
        renderTo: document.body
    });
});
