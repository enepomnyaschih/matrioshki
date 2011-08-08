JW.Params = {};

(function() {
    var params = window.location.search.substr(1).split("&");
    for (var i = 0; i < params.length; ++i)
    {
        var tokens = params[i].split("=");
        if (tokens.length != 2)
            continue;
        
        JW.Params[tokens[0]] = tokens[1];
    }
})();