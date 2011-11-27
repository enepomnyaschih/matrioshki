/*
    JW ordered collection.
    
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
    
    ----
    
    This is an adapter of array that triggers events about modifications.
    Events are taken from ActionScript's CollectionEventKind (with small
    reasonable changes).
*/

JW.Collection = JW.Observable.extend({
    EVENT_ADDED     : "added",      // handler(event, index, item)
    EVENT_REMOVED   : "removed",    // handler(event, index, item)
    EVENT_REPLACED  : "replaced",   // handler(event, index, oldItem, newItem)
    EVENT_MOVED     : "moved",      // handler(event, fromIndex, toIndex, item)
    EVENT_CLEARED   : "cleared",    // handler(event)
    EVENT_REORDERED : "reordered",  // handler(event)
    EVENT_FILTERED  : "filtered",   // handler(event)
    EVENT_RESETTED  : "resetted",   // handler(event)
    
    base: null, // [readonly] Array
    
    init: function(
        base)   // [optional] Array
    {
        this._super();
        this.base = JW.makeArray(base);
    },
    
    getLength: function()
    {
        return this.base.length;
    },
    
    getItemAt: function(index)
    {
        return this.base[index];
    },
    
    addItem: function(
        item)   // [required] *
    {
        this.addItemAt(item, this.getLength());
    },
    
    addItemAt: function(
        item,   // [required] *
        index)  // [required] Integer
    {
        this.base.splice(index, 0, item);
        this.trigger("added", index, item);
    },
    
    removeItem: function(
        item)   // [required] *
    {
        var index = this.base.indexOf(item);
        if (index != -1)
            this.removeItemAt(index);
    },
    
    removeItemAt: function(
        index)  // [required] Integer
    {
        var item = this.base[index];
        this.base.splice(index, 1);
        this.trigger("removed", index, item);
    },
    
    setItem: function(
        index,  // [required] Integer
        item)   // [required] *
    {
        var oldItem = this.base[index];
        this.base[index] = item;
        this.trigger("replaced", index, oldItem, item);
    },
    
    moveItem: function(
        fromIndex,  // [required] Integer
        toIndex)    // [required] Integer
    {
        var item = this.base[fromIndex];
        this.base.splice(fromIndex, 1);
        this.base.splice(toIndex, 0, item);
        this.trigger("moved", fromIndex, toIndex, item);
    },
    
    clear: function()
    {
        this.base.splice(0, this.base.length);
        this.trigger("cleared");
    },
    
    triggerReordered: function()
    {
        this.trigger("reordered");
    },
    
    triggerFiltered: function()
    {
        this.trigger("filtered");
    },
    
    triggerResetted: function()
    {
        this.trigger("resetted");
    },
    
    every: function(
        callback,   // [required] Function(item, index, array)
        scope)      // [optional] Object
    {
        return this.base.every(callback, scope);
    },
    
    createEmpty: function()
    {
        return new JW.Collection();
    },
    
    pushItem: function(value, index)
    {
        this.base.push(value);
        return this;
    }
});

JW.apply(JW.Collection.prototype, JW.Alg.SimpleMethods);
JW.apply(JW.Collection.prototype, JW.Alg.BuildMethods);

JW.Collection.getCollection = function(collection)
{
    return (collection instanceof JW.Collection) ? collection : JW.Collection(collection);
}
