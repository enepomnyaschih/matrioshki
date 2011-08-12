JW.TrackList = JW.Observable.extend({
    TRACKCHANGED: "trackchanged", // handler(event)
    
    playlist    : null,     // [required] Array
    
    audioEls    : null,     // [readonly] Map from index to Audio
    index       : null,     // [readonly] Integer
    isPlay      : false,    // [readonly] Boolean
    
    init: function(config)
    {
        this._super();
        
        $.extend(this, config);
        
        this.audioEls = {};
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
        
        this.index  = JW.defn(this.index, 0);
        this.isPlay = true;
        
        var track = this.playlist [this.index];
        var el    = this._getAudio(this.index);
        
        if (JW.Browsers.isChrome)
            this._timer = setTimeout(this._onEnded, track.duration * 1000);
        else
            el.addEventListener('ended', this._onEnded, false);
        
        el.play();
        
        this.trigger("trackchanged");
    },

    stop: function()
    {
        if (!this.isPlay)
            return;
        
        this.isPlay = false;
        
        var el = this.audioEls[this.index];
        // This line causes DOM Error in Chrome on slow Internet
        //el.currentTime = 0;
        el.pause();
        
        if (this._timer)
        {
            clearTimeout(this._timer);
            delete this._timer;
        }
        else
        {
            el.removeEventListener('ended', this._onEnded, false);
        }
    },
    
    getCurrentTrack: function()
    {
        return JW.isSet(this.index) ? this.playlist[this.index] : null;
    },
    
    _getAudio: function(index)
    {
        // This doesn't work don't know why
        /*
        var existingEl = this.audioEls[index];
        if (existingEl)
            return existingEl;
        */
        var track = this.playlist[this.index];
        var el = new Audio();
        el.src = track.ogg + (JW.Browsers.isChrome ? ("?timestamp=" + Date.getTime()) : '');
        
        this.audioEls[index] = el;
        
        return el;
    }
});
