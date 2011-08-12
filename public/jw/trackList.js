JW.TrackList = JW.Observable.extend({
    TRACKCHANGED: "trackchanged", // handler(event)
    
    playlist    : null,     // [required] Array
    
    audioEl     : null,     // [readonly] Audio
    index       : null,     // [readonly] Integer
    isPlay      : false,    // [readonly] Boolean
    
    init: function(config)
    {
        this._super();
        
        $.extend(this, config);
        
        this._onEnded = this.next.as(this);
    },
    
    next: function()
    {
        this.stop();
        
        if (JW.isSet(this.index))
            this.index = (this.index + 1) % this.playlist.length;
        
        this.play();
    },

    play: function()
    {
        this.stop();
        
        this.index   = JW.defn(this.index, 0);
        this.isPlay  = true;
        this.audioEl = this._getAudio(this.index);
        
        var track = this.playlist[this.index];
        if (JW.Browsers.isChrome)
            this._timer = setTimeout(this._onEnded, track.duration * 1000);
        else
        {
            if (this.audioEl.addEventListener)
                this.audioEl.addEventListener('ended', this._onEnded, false);
            else
                this.audioEl.onended = this._onEnded;
        }
        
        this.audioEl.play();
        
        this.trigger("trackchanged");
    },

    stop: function()
    {
        if (!this.isPlay)
            return;
        
        this.isPlay = false;
        
        // This line causes DOM Error in Chrome on slow Internet
        //this.audioEl.currentTime = 0;
        this.audioEl.pause();
        
        if (this._timer)
        {
            clearTimeout(this._timer);
            delete this._timer;
        }
        else
        {
            if (this.audioEl.addEventListener)
                this.audioEl.removeEventListener('ended', this._onEnded, false);
            else
                delete this.audioEl.onended;
            
        }
        
        this.audioEl.src = "/dummy";
        delete this.audioEl;
    },
    
    getCurrentTrack: function()
    {
        return JW.isSet(this.index) ? this.playlist[this.index] : null;
    },
    
    _getAudio: function(index)
    {
        var track = this.playlist[this.index];
        var el = new Audio();

        var src = track.ogg;
        if (!el.canPlayType("audio/ogg") && el.canPlayType("audio/mpeg"))
            src = track.mp3;
        el.src = src + (JW.Browsers.isChrome ? ("?timestamp=" + Date.getTime()) : '');
        return el;
    }
});
