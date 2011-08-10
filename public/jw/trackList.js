JW.TrackList = JW.Class.extend({
    srcs        : "audio/background.ogg",
    currentTrack: 0,
    muted       : false,
    paused      : true,
    rnd         : true,

    _tracks     : null,

    init: function(config) /*void*/
    {
        this._super(config);
        $.extend(this, config);

        if (!JW.isArray(this.srcs))
        {
            this.srcs = [this.srcs];
        }

        this._tracks = [];

        JW.each(this.srcs, function(src){
            var audio = new Audio();
            audio.src = src;
            audio.addEventListener('ended', function(){
                this.next();
            }.inScope(this), false);
            audio.volume = 0.05;
            this._tracks.push(audio);
        }.inScope(this));

        this.currentTrack = this._getNextTrack();
    },

    next: function() /*void*/
    {
        this._tracks[this.currentTrack].currentTime = 0;
        this._tracks[this.currentTrack].pause();

        this.currentTrack = this._getNextTrack();
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
    },

    _updateState: function()
    {
        var state = !(this.paused || this.muted);
        this._tracks[this.currentTrack][state?"play":"pause"]();
    },

    _getNextTrack: function()
    {
        if (this.rnd)
        {
            return Math.floor((Math.random() * this._tracks.length));
        }

        return (this.currentTrack + 1) % this._tracks.length;
    }
});
