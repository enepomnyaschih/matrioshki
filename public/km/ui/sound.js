JW.ns("KM.UI");

KM.UI.Sound = JW.Svg.extend({
    x           : KM.Constants.SOUNDX,
    y           : KM.Constants.SOUNDY,

    width       : KM.Constants.SOUND_WIDTH,
    height      : KM.Constants.SOUND_HEIGTH,

    muted       : true,

    soundTracks : null,

    background  : null,

    init: function(config)
    {
        this._super(config);

        if ($.browser.msie)
            return;

        this.soundTracks = [];

        if (!this.background)
        {
            this.background = new JW.TrackList({
                srcs:
                [
                    "audio/Dune-2-The-battle-for-Arrakis.ogg",
                    "audio/Cannon-Fodder-War-Has-Never-Been-So-Much-Fun.ogg",
                    "audio/Zero-Tolerance-Sub-basement.ogg",
                    "audio/Mecano-Associates-Alisia-Dragoon.ogg",
                    "audio/Golden-Axe-A-Voyage-to-Castle.ogg"
                ]
            });
        }

        this.play(this.background);
    },

    creationComplete: function()
    {
        this.muteOn  = new JW.Svg.Image({
            width   : KM.Constants.SOUND_WIDTH,
            height  : KM.Constants.SOUND_HEIGHT,
            src     : "images/mute-on.svg"
        });
        this.muteOff = new JW.Svg.Image({
            width   : KM.Constants.SOUND_WIDTH,
            height  : KM.Constants.SOUND_HEIGHT,
            src     : "images/mute-off.svg"
        });

        this.addChild(this.muteOff);
        this.addChild(this.muteOn);

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

JW.PreLoader.request({
    url     : "images/mute-on.svg",
    viewBox : "0 0 256 256"
});

JW.PreLoader.request({
    url     : "images/mute-off.svg",
    viewBox : "0 0 256 256"
});
