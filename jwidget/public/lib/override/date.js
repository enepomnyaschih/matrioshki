/*
    JW date prototype extension.
    
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

JW.apply(Date.prototype, {
    /**
     * Clone this date.
     */
    clone: function()
    {
        return new Date(this.getTime());
    },
    
    addTime: function(time)
    {
        this.setTime(time + this.getTime());
        return this;
    },
    
    isLeapUTCYear: function()
    {
        var y = this.getUTCFullYear();
        return (y%4==0 && y%100!=0) || y%400==0;
    },
    
    getDaysInUTCMonth: function()
    {
        return [31,(this.isLeapUTCYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getUTCMonth()];
    },
    
    addUTCYears: function(num)
    {
        this.setUTCFullYear(this.getUTCFullYear() + num);
        return this;
    },
    
    addUTCMonths: function(num)
    {
        var tmpdtm = this.getUTCDate();
        
        this.setUTCMonth(this.getUTCMonth() + num);
        
        if (tmpdtm > this.getUTCDate())
            this.addUTCDays(-this.getUTCDate());
        
        return this;
    },
    
    addUTCDays: function(num)
    {
        this.setUTCDate(this.getUTCDate() + num);
        return this;
    },
    
    addUTCHours: function(num)
    {
        this.setUTCHours(this.getUTCHours() + num);
        return this;
    },
    
    addUTCMinutes: function(num)
    {
        this.setUTCMinutes(this.getUTCMinutes() + num);
        return this;
    },
    
    addUTCSeconds: function(num)
    {
        this.setUTCSeconds(this.getUTCSeconds() + num);
        return this;
    },
    
    zeroUTCTime: function()
    {
        this.setUTCMilliseconds(0);
        this.setUTCSeconds(0);
        this.setUTCMinutes(0);
        this.setUTCHours(0);
        return this;
    },
    
    /**
     * Set day of the week.
     */
    setDay: function(day)
    {
        return this.addDays(-JW.mod(this.getDay() - Date.firstDayOfWeek, 7)).addDays(JW.mod(day - Date.firstDayOfWeek, 7));
    },
    
    setUTCDay: function(day)
    {
        return this.addUTCDays(-JW.mod(this.getUTCDay() - Date.firstDayOfWeek, 7)).addUTCDays(JW.mod(day - Date.firstDayOfWeek, 7));
    },
    
    zeroDay: function()
    {
        return this.zeroTime().addDays(-JW.mod(this.getDay() - Date.firstDayOfWeek, 7));
    },
    
    zeroUTCDay: function(day)
    {
        return this.zeroUTCTime().addUTCDays(-JW.mod(this.getUTCDay() - Date.firstDayOfWeek, 7));
    },
    
    isUTCWeekend: function()
    {
        return this.getUTCDay()==0 || this.getUTCDay()==6;
    },
    
    /**
     * Get seconds number from zero date.
     */
    getGlobalSecond: function()
    {
        return 60 * this.getGlobalMinute() + this.getSeconds();
    },
    
    /**
     * Get minutes number from zero date.
     */
    getGlobalMinute: function()
    {
        return 60 * this.getGlobalHour() + this.getMinutes();
    },
    
    /**
     * Get hours number from zero date.
     */
    getGlobalHour: function()
    {
        return 24 * this.getGlobalDay() + this.getHours();
    },
    
    /**
     * Get days number from zero date.
     */
    getGlobalDay: function()
    {
        return Math.round((this.clone().zeroTime().getTime() - new Date(0).zeroTime().getTime()) / Date.MS_PER_DAY);
    },
    
    /**
     * Get weeks number from zero date.
     */
    getGlobalWeek: function()
    {
        return Math.round((this.clone().zeroDay().getTime() - Date.FIRST_SUNDAY.clone().zeroDay().getTime()) / Date.MS_PER_WEEK);
    },
    
    /**
     * Get months number from zero date.
     */
    getGlobalMonth: function()
    {
        return 12 * this.getGlobalYear() + this.getMonth();
    },
    
    /**
     * Get years number from zero date.
     */
    getGlobalYear: function()
    {
        return this.getFullYear() - 1970;
    },
    
    getGlobalUTCSecond: function()
    {
        return 60 * this.getGlobalUTCMinute() + this.getUTCSeconds();
    },
    
    getGlobalUTCMinute: function()
    {
        return 60 * this.getGlobalUTCHour() + this.getUTCMinutes();
    },
    
    getGlobalUTCHour: function()
    {
        return 24 * this.getGlobalUTCDay() + this.getUTCHours();
    },
    
    getGlobalUTCDay: function()
    {
        return Math.round((this.clone().zeroUTCTime().getTime() - new Date(0).zeroUTCTime().getTime()) / Date.MS_PER_DAY);
    },
    
    getGlobalUTCWeek: function()
    {
        return Math.round((this.clone().zeroUTCDay().getTime() - Date.FIRST_UTC_SUNDAY.clone().zeroUTCDay().getTime()) / Date.MS_PER_WEEK);
    },
    
    getGlobalUTCMonth: function()
    {
        return 12 * this.getGlobalUTCYear() + this.getUTCMonth();
    },
    
    getGlobalUTCYear: function()
    {
        return this.getUTCFullYear() - 1970;
    },
    
    getFloatDay: function()
    {
        return (this.getTime() - new Date(0).getTime()) / Date.MS_PER_DAY;
    },
    
    getFloatWeek: function()
    {
        return (this.getTime() - Date.FIRST_SUNDAY.clone().zeroDay().getTime()) / Date.MS_PER_WEEK;
    },
    
    getFloatMonth: function()
    {
        var mb = this.clone().zeroTime();
        mb.setDate(1);
        return this.getGlobalMonth() + (this.getTime() - mb.getTime()) / (this.getDaysInMonth() * Date.MS_PER_DAY);
    },
    
    getFloatYear: function()
    {
        return this.getFloatMonth() / 12;
    },
    
    getFloatUTCDay: function()
    {
        return (this.getTime() - new Date(0).getTime()) / Date.MS_PER_DAY;
    },
    
    getFloatUTCWeek: function()
    {
        return (this.getTime() - Date.FIRST_UTC_SUNDAY.clone().zeroUTCDay().getTime()) / Date.MS_PER_WEEK;
    },
    
    getFloatUTCMonth: function()
    {
        var mb = this.clone().zeroUTCTime();
        mb.setUTCDate(1);
        return this.getGlobalUTCMonth() + (this.getTime() - mb.getTime()) / (this.getDaysInUTCMonth() * Date.MS_PER_DAY);
    },
    
    getFloatUTCYear: function()
    {
        return this.getFloatUTCMonth() / 12;
    },
    
    fromUTC: function()
    {
        return new Date(
            this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(),
            this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds(), this.getUTCMilliseconds());
    },
    
    toUTC: function()
    {
        return new Date(Date.UTC(
            this.getFullYear(), this.getMonth(), this.getDate(),
            this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds()));
    },
    
    getUTCMonthName: function(abbreviated)
    {
        return abbreviated ? Date.abbrMonthNames[this.getUTCMonth()] : Date.monthNames[this.getUTCMonth()];
    },
    
    asUTCString: function(format)
    {
        var _zeroPad = function(num) {
            var s = '0'+num;
            return s.substring(s.length-2);
        };
        
        var r = format || Date.format;
        if (r.split('mm').length>1) { // ugly workaround to make sure we don't replace the m's in e.g. noveMber
            r = r.split('mmmm').join(this.getUTCMonthName(false))
                .split('mmm').join(this.getUTCMonthName(true))
                .split('mm').join(_zeroPad(this.getUTCMonth()+1))
        } else {
            r = r.split('m').join(this.getUTCMonth()+1);
        }
        r = r.split('yyyy').join(this.getUTCFullYear())
            .split('yy').join((this.getUTCFullYear() + '').substring(2))
            .split('dd').join(_zeroPad(this.getUTCDate()))
            .split('d').join(this.getUTCDate());
        return r;
    }
});

Date.MS_PER_SECOND  = 1000;
Date.MS_PER_MINUTE  = 60 * Date.MS_PER_SECOND;
Date.MS_PER_HOUR    = 60 * Date.MS_PER_MINUTE;
Date.MS_PER_DAY     = 24 * Date.MS_PER_HOUR;
Date.MS_PER_WEEK    =  7 * Date.MS_PER_DAY;

Date.FIRST_SUNDAY = new Date(0).zeroTime().addDays(7).setDay(0);
Date.FIRST_UTC_SUNDAY = new Date(0).zeroUTCTime().addUTCDays(7).setUTCDay(0);

JW.apply(Date, {
    getDate: function(v)
    {
        if (!v)
            return new Date();
        
        if (typeof v === "number")
            return new Date(v);
        
        if (typeof v === "string")
        {
            var i = parseInt(v);
            return isNaN(i) ? new Date(v) : new Date(i);
        }
        
        return v;
    },
    
    getTime: function(v)
    {
        if (!JW.isSet(v))
            return new Date().getTime();
        
        if (typeof v === "string")
        {
            var i = parseInt(v);
            return isNaN(i) ? new Date(v).getTime() : i;
        }
        
        return (typeof v === "number") ? v : v.getTime();
    },
    
    getUTCTime: function(v)
    {
        return Date.getDate(v).fromUTC().getTime();
    },
    
    getFloatDayTime: function(d)
    {
        return Math.round(d * Date.MS_PER_DAY);
    },
    
    getFloatWeekTime: function(d)
    {
        return Math.round(d * Date.MS_PER_WEEK);
    },
    
    getFloatMonthTime: function(d)
    {
        var y = Math.floor(d / 12);
        var m = Math.floor(d) - y * 12;
        var f = d - Math.floor(d);
        
        var date = new Date(1970 + y, m, 1, 0, 0, 0, 0);
        return date.getTime() + Math.round(f * date.getDaysInMonth() * Date.MS_PER_DAY);
    },
    
    getFloatUTCDayTime: function(d)
    {
        return Math.round(d * Date.MS_PER_DAY);
    },
    
    getFloatUTCWeekTime: function(d)
    {
        return Math.round(d * Date.MS_PER_WEEK);
    },
    
    getFloatUTCMonthTime: function(d)
    {
        var y = Math.floor(d / 12);
        var m = Math.floor(d) - y * 12;
        var f = d - Math.floor(d);
        
        var date = new Date(Date.UTC(1970 + y, m, 1, 0, 0, 0, 0));
        return date.getTime() + Math.round(f * date.getDaysInUTCMonth() * Date.MS_PER_DAY);
    },
    
    fromUTCString: function(s)
    {
        var f = Date.format;
        
        var d = new Date(Date.UTC(1970, 0, 1));
        
        if (s == '') return d;
        
        s = s.toLowerCase();
        var matcher = '';
        var order = [];
        var r = /(dd?d?|mm?m?|yy?yy?)+([^(m|d|y)])?/g;
        var results;
        while ((results = r.exec(f)) != null)
        {
            switch (results[1]) {
                case 'd':
                case 'dd':
                case 'm':
                case 'mm':
                case 'yy':
                case 'yyyy':
                    matcher += '(\\d+\\d?\\d?\\d?)+';
                    order.push(results[1].substr(0, 1));
                    break;
                case 'mmm':
                    matcher += '([a-z]{3})';
                    order.push('M');
                    break;
            }
            if (results[2]) {
                matcher += results[2];
            }
            
        }
        var dm = new RegExp(matcher);
        var result = s.match(dm);
        for (var i=0; i<order.length; i++) {
            var res = result[i+1];
            switch(order[i]) {
                case 'd':
                    d.setUTCDate(res);
                    break;
                case 'm':
                    d.setUTCMonth(Number(res)-1);
                    break;
                case 'M':
                    for (var j=0; j<Date.abbrMonthNames.length; j++) {
                        if (Date.abbrMonthNames[j].toLowerCase() == res) break;
                    }
                    d.setUTCMonth(j);
                    break;
                case 'y':
                    d.setUTCFullYear(res);
                    break;
            }
        }
        
        return d;
    }
});
