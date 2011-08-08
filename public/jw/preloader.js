JW.PreLoaderClass = JW.Observable.extend({
    started     : false,
    requests    : null,

    init: function(config) /*void*/
    {
        this._super(config);
        this.requests = [];
        this.errors   = [];
        this.complete = [];
    },

    request: function(options) {
        this.requests.push(options);
        $(this.start.inScope(this));
    },

    start: function() {
        if (this.started)
            return;
        this.started = true;
        this._load();
    },

    stop: function()
    {
        this.started = false;
    },

    getResponse: function(url)
    {
        return this.complete[url] || {};
    },

    isComplete: function(url)
    {
        return !!this.complete[url];
    },

    _load: function()
    {
        if (!this.started)
            return;

        if (this.requests.length == 0)
        {
            this.stop();
            this.trigger("complete");
            return;
        }

        var options = this.requests.shift();

        $.ajax({
            url         : options.url,

            success: function(scope, status, response)
                {
                    this.complete[options.url] = $.extend({
                        response    : response,
                        responseText: response.responseText
                    }, options);
                    this._load();

                }.inScope(this),

            error: function()
                {
                    this.errors[options.url] = options;
                    this._load();

                }.inScope(this)
        })
    }
});

JW.PreLoader = new JW.PreLoaderClass();
