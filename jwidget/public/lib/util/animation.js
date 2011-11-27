/*
    JW animation engine.
    
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

JW.Animation = JW.Observable.extend({
    easing          : "linear", // [optional] String or Function
    duration        : 1000,     // [optional] Number
    applyOnStart    : false,    // [optional] Boolean
    autoStart       : false,    // [optional] Boolean
    noIPad          : false,    // [optional] Boolean
    
    id              : 0,        // [readonly] Number
    started         : false,    // [readonly] Boolean
    time            : 0,        // [readonly] Number
    position        : 0,        // [readonly] Number
    easValue        : 0,        // [readonly] Number
    
    init: function(config)
    {
        this._applyConfig(config);
        
        if (this.autoStart)
            this.start();
    },
    
    // virtual
    apply: function()
    {
    },
    
    // virtual
    finish: function()
    {
    },
    
    getParam: function(from, to)
    {
        return from + (to - from) * this.easValue;
    },
    
    start: function(config)
    {
        this._applyConfig(config);
        
        JW.Animation.Core.start(this);
    },
    
    stop: function()
    {
        JW.Animation.Core.stop(this);
    },
    
    reset: function()
    {
        this.time       = 0;
        this.position   = 0;
        this.easValue   = 0;
    },
    
    _applyConfig: function(config)
    {
        JW.apply(this, config);
        if (typeof this.easing === "string")
            this.easing = JW.Easing[this.easing];
    }
});

JW.Animation.CoreClass = JW.Observable.extend({
    STEP        : 50,
    
    animations  : null,     // [readonly] Map from index to JW.Animation
    timer       : null,     // [readonly] JW.Timer
    lastTime    : 0,        // [readonly] Number
    
    _lastId     : 0,        // [readonly] Number
    _count      : 0,        // [readonly] Number
    
    _init: function()
    {
        if (this.animations)
            return;
        
        this.animations = {};
        this.timer = new JW.Timer(this.STEP, true);
        this.timer.bind("tick", this._onTick, this);
    },
    
    start: function(animation)
    {
        if (animation.started)
            return;
        
        this._init();
        
        animation.id = this._lastId++;
        this.animations[animation.id] = animation;
        animation.started = true;
        ++this._count;
        
        if (animation.applyOnStart)
            animation.apply();
        
        this.lastTime = new Date().getTime();
        this.timer.start();
    },
    
    stop: function(animation)
    {
        if (!animation.started)
            return;
        
        this._init();
        
        delete this.animations[animation.id];
        animation.started = false;
        --this._count;
        
        if (this._count == 0)
            this.timer.stop();
    },
    
    _onTick: function()
    {
        var animations = [].merge(this.animations);
        var time = Date.getTime();
        var step = time - this.lastTime;
        this.lastTime = time;
        for (var i = 0; i < animations.length; ++i)
        {
            var animation = animations[i];
            if (animation.noIPad && JW.Browsers.isIPad)
                animation.time = animation.duration;
            else
                animation.time += step;
            
            if (animation.time >= animation.duration)
            {
                animation.position = 1;
                animation.easValue = 1;
                animation.apply();
                animation.stop();
                animation.finish();
            }
            else
            {
                animation.position = animation.time / animation.duration;
                animation.easValue = animation.easing(animation.position);
                animation.apply();
            }
        }
    }
});

JW.Animation.Core = new JW.Animation.CoreClass();
