JW.ns("KM.UI");

KM.UI.Sound.Off = KM.UI.Button.extend({
    trackList   : null,     // [required] JW.TrackList
    
    bearView    : null,     // [readonly] KM.UI.Bear
    
    width       : KM.Constants.SOUND_WIDTH,
    height      : KM.Constants.SOUND_HEIGHT,
    
    render: function()
    {
        this._super();
        
        this.rectEl.attr("opacity", 0);
        
        this.bearView = new KM.UI.Bear({
            x: 5,
            y: 5
        });
        
        this.bearView.setAttr("pointer-events", "none");
        this.addChild(this.bearView);
        
        this.trackList.bind("trackchanged", this._updateTrack.as(this), this);
    },
    
    _updateTrack: function()
    {
        var track = this.trackList.getCurrentTrack();
        if (!track)
            return;
        
        var joke = KM.Locale.BearJokes.random();
        this.rectEl.attr("title", $.template(joke).apply(track));
        $(this.rectEl.node.parentNode).tooltip();
    }
});
