/*
    JW auto Ajax request repeater.
    
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

JW.RequestRepeater = JW.Class.extend({
    request : null, // [read-only] JW.Request
    timer   : null, // [read-only] JW.Timer
    
    init: function(request, delay)
    {
        this._super();
        
        this.request = request;
        this.request.bind("load", this._onLoad, this);
        this.request.bind("complete", this._onComplete, this);
        
        this.timer = new JW.Timer(delay);
        this.timer.bind("tick", this._onTick, this);
    },
    
    destroy: function()
    {
        this.timer.destroy();
        this._super();
    },
    
    _onTick: function()
    {
        this.request.load();
    },
    
    _onLoad: function()
    {
        this.timer.stop();
    },
    
    _onComplete: function()
    {
        this.timer.start();
    }
});
