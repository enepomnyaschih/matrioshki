JW.ns("KM.UI");

KM.UI.Sound = JW.Svg.extend({
    x           : KM.Constants.SOUNDX,
    y           : KM.Constants.SOUNDY,

    muted       : true,

    soundTracks : null,

    init: function(config)
    {
        this._super(config);

        if ($.browser.msie)
            return;

        this.soundTracks = [];
    },

    creationComplete: function()
    {
        this.muteOn  = new KM.UI.Sound.On();
        this.muteOff = new KM.UI.Sound.Off();

        this.addChild(this.muteOff);
        this.addChild(this.muteOn);
        
        this.muteOn .creationComplete();
        this.muteOff.creationComplete();

        this._updateControl();

        this.setAttr("cursor", "pointer");
        this.el.bind("click", this.toggleMute.inScope(this));
    },

    toggleMute: function()
    {
        this.muted = !this.muted;

        JW.each(this.soundTracks, function(track) {
            track.setMuted(this.muted);
        }.inScope(this));

        this._updateControl();
    },

    stop: function(track)
    {
        track.pause();
        track.currentTime = 0;
        this.soundTracks.removeItem(track);
    },

    pause: function(track)
    {
        track.pause();
        this.soundTracks.removeItem(track);
    },

    play: function(track)
    {
        this.soundTracks.push(track);
        track.play();
        track.setMuted(this.muted);
    },

    _updateControl: function()
    {
        this.muteOff[this.muted ? "hide" : "show"]();
        this.muteOn [this.muted ? "show" : "hide"]();
    }
});
