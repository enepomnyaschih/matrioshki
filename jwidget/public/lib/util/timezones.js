/*
    JW timezone utils.
    
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

JW.TIMEZONES = [
    {"id":"UTC","gmt":0,"dst":false},
    
    {"id":"Pacific/Rarotonga","gmt":-600,"dst":false},
    {"id":"Pacific/Ponape","gmt":660,"dst":false},
    {"id":"Pacific/Guam","gmt":600,"dst":false},
    {"id":"Pacific/Auckland","gmt":780,"dst":true},
    {"id":"Pacific/Norfolk","gmt":690,"dst":false},
    {"id":"Pacific/Apia","gmt":-660,"dst":false},
    {"id":"Pacific/Chatham","gmt":825,"dst":true},
    {"id":"Pacific/Saipan","gmt":600,"dst":false},
    {"id":"Pacific/Funafuti","gmt":720,"dst":false},
    {"id":"Pacific/Majuro","gmt":720,"dst":false},
    {"id":"Pacific/Kiritimati","gmt":840,"dst":false},
    {"id":"Pacific/Guadalcanal","gmt":660,"dst":false},
    {"id":"Pacific/Pago_Pago","gmt":-660,"dst":false},
    {"id":"Pacific/Nauru","gmt":720,"dst":false},
    {"id":"Pacific/Galapagos","gmt":-360,"dst":false},
    {"id":"Pacific/Tarawa","gmt":720,"dst":false},
    {"id":"Pacific/Niue","gmt":-660,"dst":false},
    {"id":"Pacific/Tahiti","gmt":-600,"dst":false},
    {"id":"Pacific/Honolulu","gmt":-600,"dst":false},
    {"id":"Pacific/Truk","gmt":600,"dst":false},
    {"id":"Pacific/Wallis","gmt":720,"dst":false},
    {"id":"Pacific/Wake","gmt":720,"dst":false},
    {"id":"Pacific/Enderbury","gmt":780,"dst":false},
    {"id":"Pacific/Port_Moresby","gmt":600,"dst":false},
    {"id":"Pacific/Noumea","gmt":660,"dst":false},
    {"id":"Pacific/Pitcairn","gmt":-480,"dst":false},
    {"id":"Pacific/Kwajalein","gmt":720,"dst":false},
    {"id":"Pacific/Marquesas","gmt":-570,"dst":false},
    {"id":"Pacific/Gambier","gmt":-540,"dst":false},
    {"id":"Pacific/Easter","gmt":-300,"dst":true},
    {"id":"Pacific/Fakaofo","gmt":-600,"dst":false},
    {"id":"Pacific/Kosrae","gmt":660,"dst":false},
    {"id":"Pacific/Efate","gmt":660,"dst":false},
    {"id":"Pacific/Tongatapu","gmt":780,"dst":false},
    {"id":"Pacific/Fiji","gmt":720,"dst":false},
    {"id":"Pacific/Johnston","gmt":-600,"dst":false},
    {"id":"Pacific/Midway","gmt":-660,"dst":false},
    {"id":"Pacific/Palau","gmt":540,"dst":false},
    
    {"id":"America/Adak","gmt":-600,"dst":true},
    {"id":"America/Anchorage","gmt":-540,"dst":true},
    {"id":"America/Los_Angeles","gmt":-480,"dst":true},
    {"id":"America/Phoenix","gmt":-420,"dst":false},
    {"id":"America/Denver","gmt":-420,"dst":true},
    {"id":"America/Regina","gmt":-360,"dst":false},
    {"id":"America/Mexico_City","gmt":-360,"dst":true},
    {"id":"America/Panama","gmt":-300,"dst":false},
    {"id":"America/New_York","gmt":-300,"dst":true},
    {"id":"America/Caracas","gmt":-270,"dst":false},
    {"id":"America/La_Paz","gmt":-240,"dst":false},
    {"id":"America/Halifax","gmt":-240,"dst":true},
    {"id":"America/St_Johns","gmt":-210,"dst":true},
    {"id":"America/Cayenne","gmt":-180,"dst":false},
    {"id":"America/Montevideo","gmt":-120,"dst":true},
    
    {"id":"Atlantic/South_Georgia","gmt":-120,"dst":false},
    {"id":"Atlantic/Cape_Verde","gmt":-60,"dst":false},
    {"id":"Atlantic/Azores","gmt":-60,"dst":true},
    
    {"id":"Europe/London","gmt":0,"dst":true},
    {"id":"Europe/Rome","gmt":60,"dst":true},
    {"id":"Europe/Athens","gmt":120,"dst":true},
    {"id":"Europe/Moscow","gmt":180,"dst":true},
    
    {"id":"Africa/Algiers","gmt":60,"dst":false},
    {"id":"Africa/Harare","gmt":120,"dst":false},
    
    {"id":"Asia/Baghdad","gmt":180,"dst":false},
    {"id":"Asia/Tehran","gmt":210,"dst":true},
    {"id":"Asia/Dubai","gmt":240,"dst":false},
    {"id":"Asia/Yerevan","gmt":240,"dst":true},
    {"id":"Asia/Kabul","gmt":270,"dst":false},
    {"id":"Asia/Tashkent","gmt":300,"dst":false},
    {"id":"Asia/Yekaterinburg","gmt":300,"dst":true},
    {"id":"Asia/Colombo","gmt":330,"dst":false},
    {"id":"Asia/Katmandu","gmt":345,"dst":false},
    {"id":"Asia/Dhaka","gmt":360,"dst":false},
    {"id":"Asia/Omsk","gmt":360,"dst":true},
    {"id":"Asia/Rangoon","gmt":390,"dst":false},
    {"id":"Asia/Bangkok","gmt":420,"dst":false},
    {"id":"Asia/Krasnoyarsk","gmt":420,"dst":true},
    {"id":"Asia/Hong_Kong","gmt":480,"dst":false},
    {"id":"Asia/Irkutsk","gmt":480,"dst":true},
    {"id":"Asia/Tokyo","gmt":540,"dst":false},
    {"id":"Asia/Yakutsk","gmt":540,"dst":true},
    {"id":"Asia/Vladivostok","gmt":600,"dst":true},
    {"id":"Asia/Kamchatka","gmt":720,"dst":true},
    
    {"id":"Australia/Eucla","gmt":525,"dst":false},
    {"id":"Australia/Darwin","gmt":570,"dst":false},
    {"id":"Australia/Broken_Hill","gmt":630,"dst":true},
    {"id":"Australia/Lord_Howe","gmt":660,"dst":true}
];







JW.TIMEZONES_DATA = (function() {
    function getGmtName(gmt, dst)
    {
        h = Math.floor(Math.abs(gmt) / 60);
        m = Math.floor(Math.abs(gmt) % 60);
        
        s = (gmt >= 0) ? "+" : "-";
        m = m ? (":" + m) : ":00";
        d = dst ? " (DST)" : "";
        
        return "UTC " + s + h + m + d;
    }
    
    var timezones = JW.TIMEZONES;
    var result = [];
    for (var i = 0; i < timezones.length; ++i)
    {
        var timezone = timezones[i];
        var majorId, minorId;
        
        if (timezone.id === "UTC")
        {
            majorId = "UTC";
            minorId = null;
        }
        else if (timezone.majorId)
        {
            majorId = timezone.majorId;
            minorId = timezone.id;
        }
        else
        {
            var point = timezone.id.indexOf("/");
            if (point == -1)
            {
                majorId = "Other";
                minorId = timezone.id;
            }
            else
            {
                majorId = timezone.id.substr(0, point);
                minorId = timezone.id.substr(point + 1);
            }
        }
        
        var gmtName = getGmtName(timezone.gmt, timezone.dst);
        
        result.push({
            id          : timezone.id,
            gmt         : timezone.gmt,
            dst         : timezone.dst,
            majorId     : majorId,
            minorId     : minorId,
            name        : timezone.id,
            fullName    : timezone.id + " - " + gmtName,
            gmtName     : gmtName
        });
    }
    
    result.sort(function(x, y) {
        return  JW.cmp(x.majorId !== "UTC", y.majorId !== "UTC") ||
                JW.cmp(x.majorId, y.majorId) ||
                JW.cmp(x.gmt, y.gmt) ||
                JW.cmp(x.dst, y.dst) ||
                JW.cmp(x.id, y.id);
    });
    
    return result;
})();

JW.LOCAL_DATE_PARAMS = (function() {
    var currentYear = new Date().getFullYear();
    var jan = new Date(currentYear, 0, 1, 2, 0, 0, 0);
    var jul = new Date(currentYear, 6, 1, 2, 0, 0, 0);
    
    var gmt = -1 * ((jan.getTime() % Date.MILLIS_PER_DAY) > (jul.getTime() % Date.MILLIS_PER_DAY)
             ? jan.getTimezoneOffset() : jul.getTimezoneOffset());
    
    var dst = !!(Math.abs(jan.getTimezoneOffset() - jul.getTimezoneOffset()) / 60);
    
    return { gmt: gmt, dst: dst };
})();

JW.LOCAL_TIMEZONES = JW.TIMEZONES_DATA.filter(function(timezone) {
    return  timezone.gmt === JW.LOCAL_DATE_PARAMS.gmt &&
            timezone.dst === JW.LOCAL_DATE_PARAMS.dst;
});

JW.LOCAL_TIMEZONE_ID = JW.LOCAL_TIMEZONES.length ? JW.LOCAL_TIMEZONES[0].id : "UTC";
