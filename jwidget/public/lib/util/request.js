/*
    JW Ajax request adapter.
    
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

JW.Request = JW.Observable.extend({
    EVENT_LOAD          : "load",       // handler(event, xhr, params)
    EVENT_COMPLETE      : "complete",   // handler(event, xhr, textStatus)
    EVENT_SUCCESS       : "success",    // handler(event, response, textStatus, xhr)
    EVENT_ERROR         : "error",      // handler(event, xhr, textStatus, errorThrown)
    EVENT_ABORT         : "abort",      // handler(event, xhr)
    
    url                 : null,         // [required] String
    data                : null,         // [optional] Object or String
    timeout             : null,         // [optional] Number, see $.ajax for default value
    type                : null,         // [optional] String, see $.ajax for default value
    dataType            : null,         // [optional] String, see $.ajax for default value
    contentType         : null,         // [optional] String, see $.ajax for default value
    jsonp               : null,         // [optional] String, see $.ajax for default value
    jsonpCallback       : null,         // [optional] String, see $.ajax for default value
    username            : null,         // [optional] String, see $.ajax for default value
    password            : null,         // [optional] String, see $.ajax for default value
    scriptCharset       : null,         // [optional] String, see $.ajax for default value
    cache               : null,         // [optional] Boolean, see $.ajax for default value
    global              : null,         // [optional] Boolean, see $.ajax for default value
    ifModified          : null,         // [optional] Boolean, see $.ajax for default value
    processData         : null,         // [optional] Boolean, see $.ajax for default value
    traditional         : null,         // [optional] Boolean, see $.ajax for default value
    
    status              : "ready",      // [read-only] JW.Request.Status
    response            : null,         // [read-only] *
    xhr                 : null,         // [read-only] XMLHttpRequest
    textStatus          : null,         // [read-only] String, see $.ajax handlers
    errorThrown         : null,         // [read-only] String, see $.ajax error handler
    
    init: function(config)
    {
        this._super();
        JW.apply(this, config);
    },
    
    load: function(extraData, extraParams)
    {
        if (this.isLoading())
            return;
        
        this._load(extraData, extraParams);
    },
    
    reload: function(extraData, extraParams)
    {
        this.abort();
        this.load(extraData, extraParams);
    },
    
    abort: function()
    {
        if (!this.isLoading())
            return;
        
        this.status = "abort";
        this.textStatus = "abort";
        this.xhr.abort();
        this.trigger("abort", this.xhr);
        this.trigger("complete", this.xhr, this.textStatus);
    },
    
    reset: function()
    {
        this.abort();
        
        this.status = "ready";
        delete this.response;
        delete this.xhr;
        delete this.textStatus;
        delete this.errorThrown;
    },
    
    isLoading: function()
    {
        return this.status === "load";
    },
    
    isComplete: function()
    {
        return  this.status === "success" ||
                this.status === "error";
    },
    
    _load: function(extraData, extraParams)
    {
        this.reset();
        
        var data = JW.apply({}, this.data, extraData);
        
        var params = JW.apply({
            url             : this.url,
            data            : data,
            timeout         : this.timeout,
            type            : this.type,
            dataType        : this.dataType,
            contentType     : this.contentType,
            jsonp           : this.jsonp,
            jsonpCallback   : this.jsonpCallback,
            username        : this.username,
            password        : this.password,
            scriptCharset   : this.scriptCharset,
            async           : this.async,
            cache           : this.cache,
            global          : this.global,
            ifModified      : this.ifModified,
            processData     : this.processData,
            traditional     : this.traditional
        }, extraParams);
        
        params = JW.cleann(params);
        
        JW.apply(params, {
            success : this._onSuccess.inScope(this),
            error   : this._onError.inScope(this)
        });
        
        this.status = "load";
        this.xhr = $.ajax(params);
        this.trigger("load", this.xhr, params);
    },
    
    _onSuccess: function(response, textStatus, xhr)
    {
        this.status         = "success";
        this.response       = response;
        this.textStatus     = textStatus;
        
        this.trigger("success", response, textStatus, xhr);
        this._onComplete(xhr, textStatus);
    },
    
    _onError: function(xhr, textStatus, errorThrown)
    {
        if (this.status === "abort")
            return;
        
        this.status         = "error";
        this.textStatus     = textStatus;
        this.errorThrown    = errorThrown;
        
        this.trigger("error", xhr, textStatus, errorThrown);
        this._onComplete(xhr, textStatus);
    },
    
    _onComplete: function(xhr, textStatus)
    {
        this.trigger("complete", xhr, textStatus);
    }
});

JW.Request.Status = {
    READY       : "ready",
    LOAD        : "load",
    SUCCESS     : "success",
    ERROR       : "error",
    ABORT       : "abort"
};
