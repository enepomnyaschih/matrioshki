/*
    JW timer.
    
    Copyright (C) 2011 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Timer = JW.Observable.extend({
    // Events
    EVENT_TICK: "tick",
    
    // Config options, read-only properties
    delay   : 0,
    repeat  : false,
    
    init: function(delay, repeat)
    {
        JW.apply(this, {
            delay   : delay,
            repeat  : repeat
        });
    },
    
    start: function()
    {
        if (this.isStarted())
            return;
        
        var runner = this.repeat ? setInterval : setTimeout;
        this._handle = runner(this._onTimeout.inScope(this), this.delay);
    },
    
    stop: function()
    {
        if (!this.isStarted())
            return;
        
        var stopper = this.repeat ? clearInterval : clearTimeout;
        stopper(this._handle);
        delete this._handle;
    },
    
    restart: function()
    {
        this.stop();
        this.start();
    },
    
    isStarted: function()
    {
        return !!this._handle;
    },
    
    _onTimeout: function()
    {
        this.trigger("tick");
    }
});
