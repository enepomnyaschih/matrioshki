JW.TrackList = JW.Class.extend({
    tracks              : null,
    muted               : false,
    paused              : true,
    rnd                 : false,


    track               : null,
    trackIndex          : -1,

    init: function(config) /*void*/
    {
        $.extend(this, config);
        this._super(config);

        this.track = this.getNextTrack();
    },

    next: function() /*void*/
    {
        this.track.currentTime = 0;
        this.track.pause();

        this.track = this.getNextTrack();
        this._updateState();
    },

    play: function() /*void*/
    {
        this.paused = false;
        this._updateState();
    },

    pause: function() /*void*/
    {
        this.paused = true;
        this._updateState();
    },

    setMuted: function(value)  /*void*/
    {
        this.muted = value;
        this._updateState();

        if (this.muted)
        {
	        this.track = this.getNextTrack();
        }
    },

    _updateState: function()
    {
        var state = !(this.paused || this.muted);
        this.track[state?"play":"pause"]();
    },

    getNextTrack: function()
    {
        if (this.rnd)
            this.trackIndex = Math.floor((Math.random() * this.tracks.length));
        else
            this.trackIndex = (this.trackIndex + 1) % this.tracks.length;

        var nextTrack = new Audio();
        nextTrack.addEventListener('ended', function() {
            this.next();
        }.inScope(this), false);

        nextTrack.src = this.tracks[this.trackIndex].ogg;
        return nextTrack;
    }
});
