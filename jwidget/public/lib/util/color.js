/*
    JW colors conversion utilities.
    
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

/**
 * TODO: hsv
 * 
 * All convertion functions require valid color in parameter!
 * Valid color formats are:
 * 1) Integer from 0 to 0xFFFFFF
 * 2) String - color name (http://www.w3schools.com/cssref/css_colornames.asp)
 * 3) String in format "rgb(x, x, x)", where x - integer from 0 to 255
 * 4) String in format "rgb(x%, x%, x%)", where x - number from 0 to 255
 * 5) String in format "#xxxxxx", where x - hex-digit
 * 6) String in format "#xxx", where x - hex-digit
 * 7) Array(3) of integers from 0 to 255
 * All string formats are trimmable and case-insensitive.
 */
JW.Color = {
    colors: {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgrey": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "grey": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred ": [205, 92, 92],
        "indigo ": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgrey": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 216],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [216, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    },
    
    _format1: /^rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)$/,
    _format2: /^rgb\s*\(\s*(-?[0-9]+(?:\.[0-9]+)?)\%\s*,\s*(-?[0-9]+(?:\.[0-9]+)?)\%\s*,\s*(-?[0-9]+(?:\.[0-9]+)?)\%\s*\)$/,
    _format3: /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
    _format4: /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
    
    /**
     * Convert arbitrary value to rgb array
     * 1) Guarantees proper rgb or null in output
     * 2) Returns null for improper value
     * 3) Works slowly
     * 4) Can be used for validation
     */
    parse: function(color)
    {
        if (typeof color === "number")
        {
            if (!JW.isInt(color) || (color < 0) || (color > 0xFFFFFF))
                return null;
            
            return [
                (color >> 16),
                (color >> 8) & 0xFF,
                (color) & 0xFF
            ];
        }
        
        if (typeof color === "string")
        {
            var result;
            color = $.trim(color).toLowerCase();
            if (result = JW.Color.colors[color])
                return result.concat();
            
            if (result = JW.Color._format1.exec(color))
            {
                return JW.Color._parseArray([
                    parseInt(result[1]),
                    parseInt(result[2]),
                    parseInt(result[3])
                ]);
            }
            
            if (result = JW.Color._format2.exec(color))
            {
                for (var i = 0; i < 3; ++i)
                {
                    result[i + 1] = parseFloat(result[i + 1]);
                    if (result[i + 1] < 0 || result[i + 1] > 100)
                        return null;
                }
                
                return JW.Color._parseArray([
                    Math.round(result[1] * 2.55),
                    Math.round(result[2] * 2.55),
                    Math.round(result[3] * 2.55)
                ]);
            }
            
            if (result = JW.Color._format3.exec(color))
            {
                return JW.Color._parseArray([
                    parseInt(result[1], 16),
                    parseInt(result[2], 16),
                    parseInt(result[3], 16)
                ]);
            }
            
            if (result = JW.Color._format4.exec(color))
            {
                return JW.Color._parseArray([
                    parseInt(result[1], 16) * 17,
                    parseInt(result[2], 16) * 17,
                    parseInt(result[3], 16) * 17
                ]);
            }
            
            return null;
        }
        
        if (JW.isArray(color) && color.length === 3 &&
            (typeof color[0] === "number") &&
            (typeof color[1] === "number") &&
            (typeof color[2] === "number") &&
            JW.Color._parseArray(color))
        {
            return color.concat();
        }
        
        return null;
    },
    
    /**
     * Convert arbitrary value to rgb array
     * 1) Guarantees proper rgb or null in output
     * 2) Trying to suggest the nearest rgb for improper value
     * 3) Works slowly
     * 4) Can be used to provide better "fools shield"
     */
    suggest: function(color)
    {
        if (typeof color === "number")
        {
            color = JW.mod(Math.round(color), 0x1000000);
            
            return [
                (color >> 16),
                (color >> 8) & 0xFF,
                (color) & 0xFF
            ];
        }
        
        if (typeof color === "string")
        {
            var result;
            color = $.trim(color).toLowerCase();
            if (result = JW.Color.colors[color])
                return result.concat();
            
            if (result = JW.Color._format1.exec(color))
            {
                return JW.Color._suggestArray([
                    parseInt(result[1]),
                    parseInt(result[2]),
                    parseInt(result[3])
                ]);
            }
            
            if (result = JW.Color._format2.exec(color))
            {
                return JW.Color._suggestArray([
                    parseFloat(result[1]) * 2.55,
                    parseFloat(result[2]) * 2.55,
                    parseFloat(result[3]) * 2.55
                ]);
            }
            
            if (result = JW.Color._format3.exec(color))
            {
                return JW.Color._suggestArray([
                    parseInt(result[1], 16),
                    parseInt(result[2], 16),
                    parseInt(result[3], 16)
                ]);
            }
            
            if (result = JW.Color._format4.exec(color))
            {
                return JW.Color._suggestArray([
                    parseInt(result[1], 16) * 17,
                    parseInt(result[2], 16) * 17,
                    parseInt(result[3], 16) * 17
                ]);
            }
            
            return null;
        }
        
        if (JW.isArray(color) && color.length === 3 &&
            (typeof color[0] === "number") &&
            (typeof color[1] === "number") &&
            (typeof color[2] === "number"))
        {
            return JW.Color._suggestArray(color);
        }
        
        return null;
    },
    
    /**
     * Convert arbitrary value to rgb array
     * 1) Does not guarantee proper rgb or null in output
     * 2) Works unexpectedly for improper value
     * 3) Works quickly
     * 4) Preferrable for better performance
     */
    rgb: function(color)
    {
        if (typeof color === "number")
        {
            return [
                (color >> 16),
                (color >> 8) & 0xFF,
                (color) & 0xFF
            ];
        }
        
        if (typeof color === "string")
        {
            var result;
            color = $.trim(color).toLowerCase();
            if (result = JW.Color.colors[color])
                return result.concat();
            
            if (result = JW.Color._format1.exec(color))
            {
                return [
                    parseInt(result[1]),
                    parseInt(result[2]),
                    parseInt(result[3])
                ];
            }
            
            if (result = JW.Color._format2.exec(color))
            {
                return [
                    Math.round(parseFloat(result[1]) * 2.55),
                    Math.round(parseFloat(result[2]) * 2.55),
                    Math.round(parseFloat(result[3]) * 2.55)
                ];
            }
            
            if (result = JW.Color._format3.exec(color))
            {
                return [
                    parseInt(result[1], 16),
                    parseInt(result[2], 16),
                    parseInt(result[3], 16)
                ];
            }
            
            if (result = JW.Color._format4.exec(color))
            {
                return [
                    parseInt(result[1], 16) * 17,
                    parseInt(result[2], 16) * 17,
                    parseInt(result[3], 16) * 17
                ];
            }
            
            // bonus
            return null;
        }
        
        return color.concat();
    },
    
    /**
     * Convert arbitrary value to string (output format is varying)
     * 1) Works unexpectedly for improper value
     * 2) If you are sure, that specified color is browser-compatible, then this
     *      can be used to modify style attribute of DOM element
     * 3) Otherwise, use hex instead
     */
    str: function(color)
    {
        if (typeof color === "string")
            return color;
        
        color = JW.Color.num(color);
        return "#" + color.toString(16).prepend(6, "0");
    },
    
    /**
     * Convert arbitrary value to number (output format is 0xFFFFFF)
     * 1) Works unexpectedly for improper value
     * 2) Can be used for fast color calculations
     */
    num: function(color)
    {
        if (typeof color === "number")
            return color;
        
        color = JW.Color.rgb(color);
        return (color[0] << 16) | (color[1] << 8) | color[2];
    },
    
    /**
     * Convert arbitrary value to string (output format is #FFFFFF)
     * 1) Works unexpectedly for improper value
     * 2) Can be used for serialization as the most easy-to-parse format
     */
    hex: function(color)
    {
        return "#" + JW.Color.num(color).toString(16).prepend(6, "0");
    },
    
    /**
     * Make color darker
     * power of 0 = color
     * power of 1 = black
     */
    darken: function(color, power)
    {
        var color = JW.Color.rgb(color);
        for (var i = 0; i < 3; ++i)
            color[i] *= (1 - power);
        
        return color;
    },
    
    /**
     * Make color lighter
     * power of 0 = color
     * power of 1 = white
     */
    lighten: function(color, power)
    {
        var color = JW.Color.rgb(color);
        for (var i = 0; i < 3; ++i)
            color[i] += (0xFF - color[i]) * power;
        
        return color;
    },
    
    /**
     * Find the most different color from specified one to use as foreground on specified background.
     * Returns white or black in array format.
     */
    fg: function(color)
    {
        var color = JW.Color.rgb(color);
        return (color[0] + color[1] + color[2] >= 384) ? [ 0, 0, 0 ] : [ 0xFF, 0xFF, 0xFF ];
    },
    
    _parseArray: function(rgb)
    {
        for (var i = 0; i < 3; ++i)
        {
            if (!JW.isInt(rgb[i]) || (rgb[i] < 0) || (rgb[i] > 0xFF))
                return null;
        }
        
        return rgb;
    },
    
    _suggestArray: function(rgb)
    {
        var result = [];
        for (var i = 0; i < 3; ++i)
            result[i] = Math.round(Math.max(0, Math.min(0xFF, rgb[i])));
        
        return result;
    }
};
