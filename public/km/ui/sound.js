JW.ns("KM.UI");

KM.UI.Sound = JW.Svg.extend({
    playlist    : null,     // [required] Array
    
    soundOn     : null,     // [readonly] KM.UI.Sound.On
    soundOff    : null,     // [readonly] KM.UI.Sound.Off
    isPlay      : false,    // [readonly] Boolean
    
    x           : KM.Constants.SOUNDX,
    y           : KM.Constants.SOUNDY,
    
    init: function(config)
    {
        this._super(config);
        
        if ($.browser.msie)
            return;
        
        this.trackList = new JW.TrackList({
            playlist: this.playlist
        });
    },

    creationComplete: function()
    {
        this.soundOn  = new KM.UI.Sound.On();
        this.soundOff = new KM.UI.Sound.Off();
        
        this.addChild(this.soundOn);
        this.addChild(this.soundOff);
        
        this.soundOn .creationComplete();
        this.soundOff.creationComplete();
        
        this._update();
        
        this.setAttr("cursor", "pointer");
        this.el.bind("click", this.togglePlay.inScope(this));
    },
    
    togglePlay: function()
    {
        this.isPlay = !this.isPlay;
        this._update();
    },

    _update: function()
    {
        if (this.isPlay)
        {
            this.trackList.next();
            this.soundOn .hide();
            this.soundOff.show();
        }
        else
        {
            this.trackList.stop();
            this.soundOn .show();
            this.soundOff.hide();
        }
    }
});
