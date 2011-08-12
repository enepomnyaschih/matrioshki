$.extend(JW, {
    random: function(value)
    {
        return value ? Math.floor(Math.random() * value) : 0;
    }
});

$.extend(Array.prototype, {
    random: function()
    {
        return this[JW.random(this.length)];
    }
});
