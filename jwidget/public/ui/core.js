/*
    JW UI core.
    
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

JW.ns("JW.UI");

/**
 * Templates definition.
 * Use this function to build HTML templates for this component.
 * Defined templates can be accessed as this.templates.<name>
 */
JW.UI.template = function(cls, tpls)
{
    cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
    cls.prototype.templates = new cls.prototype.Templates();
}

/**
 * Global JW.UI.windowEl and JW.UI.bodyEl variables definition.
 */
$(function() {
    JW.UI.windowEl = $(window);
    JW.UI.bodyEl   = $(document.body);
});
