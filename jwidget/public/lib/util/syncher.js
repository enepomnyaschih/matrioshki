/*
    JW ordered collection syncher.
    
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
    
    This class offers a new solution of working with ordered collections.
    User must define 5 simple callback functions only to handle collection
    change events.
    This way prevents a lot of copy-paste and is very simple to use.
    
    Let's name bound collection "model" and scope object "controller".
    Model is a collection of submodels.
    Controller is a collection of subcontrollers.
    
    You want to observe model changes and provide changes in controller
    correspondingly:
    -   If submodel is added to model, then new subcontroller must be created
        and added into controller
    -   If submodel is removed from model, then corresponding subcontroller
        must be removed from controller and destroyed
    -   If submodel is moved from one position to another then corresponding
        subcontroller must move in controller (without recreation, optimized)
    -   If model is cleared then controller must be cleared
    -   When controller is created on existing model, the subcontrollers must
        initialize immediately
    -   When controller is destroyed, all subcontrollers must be destroyed as
        well
    
    To provide this behavior, you just need to define 5 simple callbacks:
    -   creator(submodel):subcontroller
        Creates a subcontroller and binds it to corresponding submodel
    -   inserter(subcontroller, index)
        Inserts a subcontroller into specified position in controller
    -   remover(index):subcontroller
        Removes a subcontroller from specified position in controller
    -   destroyer(subcontroller)
        Destroys a subcontroller and unbinds it from corresponding submodel
    -   clearer():Array of subcontroller
        Clears controller and returns all removed subcontrollers
*/

JW.Syncher = JW.Class.extend({
    collection  : null,     // [required] JW.Collection
    
    creator     : null,     // [required] Function(submodel):subcontroller
    inserter    : null,     // [required] Function(subcontroller, index)
    remover     : null,     // [required] Function(index):subcontroller
    destroyer   : null,     // [required] Function(subcontroller)
    clearer     : null,     // [required] Function():Array of subcontroller
    
    scope       : null,     // [optional] Object
    
    skipInit    : false,    // [optional] Boolean, if true, doesn't initialize
                            // subcontrollers in contructor
    
    init: function(config)
    {
        JW.apply(this, config);
        
        this.collection.bind("added",    this._onAdded,    this);
        this.collection.bind("removed",  this._onRemoved,  this);
        this.collection.bind("replaced", this._onReplaced, this);
        this.collection.bind("moved",    this._onMoved,    this);
        this.collection.bind("cleared",  this._onCleared,  this);
        
        if (this.skipInit)
            return;
        
        for (var i = 0; i < this.collection.getLength(); ++i)
            this._inserter(this._creator(this.collection.getItemAt(i)), i);
    },
    
    destroy: function()
    {
        this.collection.purge(this);
        
        this._clear();
    },
    
    _creator: function(data)
    {
        return this.creator.call(this.scope || this, data);
    },
    
    _inserter: function(controller, index)
    {
        this.inserter.call(this.scope || this, controller, index);
    },
    
    _remover: function(index)
    {
        return this.remover.call(this.scope || this, index);
    },
    
    _destroyer: function(controller)
    {
        this.destroyer.call(this.scope || this, controller);
    },
    
    _clearer: function()
    {
        return this.clearer.call(this.scope || this);
    },
    
    _onAdded: function(event, index, item)
    {
        this._inserter(this._creator(item), index);
    },
    
    _onRemoved: function(event, index)
    {
        this._destroyer(this._remover(index));
    },
    
    _onReplaced: function(event, index, oldItem, newItem)
    {
        this._destroyer(this._remover(index));
        this._inserter(this._creator(newItem), index);
    },
    
    _onMoved: function(event, fromIndex, toIndex)
    {
        this._inserter(this._remover(fromIndex), toIndex);
    },
    
    _onCleared: function(event)
    {
        this._clear();
    },
    
    _clear: function()
    {
        this._clearer().each(this._destroyer, this);
    }
});
