JW.ns("KM.UI");

KM.UI.Sound.Off = KM.UI.Button.extend({
    bearView    : null,     // KM.UI.Bear
    
    width       : KM.Constants.SOUND_WIDTH,
    height      : KM.Constants.SOUND_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.bearView = new KM.UI.Bear({
            x: 5,
            y: 5
        });
        
        this.addChild(this.bearView);
    }
});
