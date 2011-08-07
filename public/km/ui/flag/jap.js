JW.ns("KM.UI");

KM.UI.Flag.Jap = KM.UI.Flag.extend({
    _drawFlag: function()
    {
    	var flag = new JW.Svg({
            width: 15,
            height: 15
        });

        flag.setXY(0,0);

        this.view.addChild(flag);

        var dx = -303 / 2;
        var dy = -861 - 191 / 2;

        var path = flag.path("m 87.14453,1031.0995 c -16.80028,-2.0164 -32.33413,-8.5072 -44.24608,-18.4883 -2.20277,-1.8457 -4.04469,-3.3808 -4.09316,-3.4115 -0.0485,-0.031 0.80488,-3.9133 1.89635,-8.6281 4.51299,-19.49486 7.51995,-37.72423 9.25068,-56.08122 0.98359,-10.43237 0.82497,-34.4801 -0.29324,-44.46072 -0.49639,-4.43049 -0.82369,-8.13933 -0.72733,-8.24187 0.0964,-0.10255 1.98261,1.39047 4.19167,3.31782 21.91145,19.11722 51.64677,22.4212 99.12181,11.01372 3.65074,-0.87721 14.33492,-3.68748 23.7426,-6.24503 31.99957,-8.69935 36.65843,-9.91944 45.26465,-11.85418 11.31205,-2.54302 23.27756,-4.55429 29.80117,-5.00925 l 5.26003,-0.36683 -0.32676,3.32697 c -1.77281,18.04993 -1.65095,50.38127 0.37616,99.79624 0.69838,17.02415 1.18999,31.03785 1.09248,31.14165 -0.0975,0.1038 -1.5223,-0.064 -3.16622,-0.3722 -10.99512,-2.0631 -29.85835,-2.0833 -46.1341,-0.049 -11.78522,1.4728 -18.05081,2.5206 -43.91106,7.3439 -24.51883,4.573 -32.59894,5.8716 -43.85494,7.0478 -8.41726,0.8796 -26.74084,1.0012 -33.24471,0.2206 l 0,-10e-5 z");
        path.attr("fill", "#fafafa");
        path.translate(dx, dy);

        path = flag.path("m 49.75,892.96949 c -0.03234,0.0312 0.05644,1.16271 0.21875,2.53125 1.01797,8.58287 1.797266,20.81926 1.336056,33.15625 -0.470125,10.35611 -1.985264,22.48425 -2.820193,32.64134 l -3.324516,18.10144 C 43.672661,989.19498 41.705589,996.8605 39,1006.407 l -0.3125,0.875 6.356242,5.6999 c 5.7996,4.7494 8.327613,6.0779 12.038943,7.6366 -0.08013,-4.4446 -0.721685,-11.5951 -0.738935,-13.649 C 55.605603,987.65656 56.144067,968.54856 58,949.31324 l 0.65625,-7.09375 c 0.717746,-2.4936 1.903804,-14.55718 3.882694,-25.50527 1.72027,-9.51729 3.533006,-12.36578 3.492306,-12.40098 -0.04073,-0.0352 -2.27611,-1.27814 -4.96875,-2.75 l -4.90625,-2.6875 -3.1875,-2.96875 c -1.75001,-1.64645 -3.18645,-2.9687 -3.21875,-2.9375 z");
        path.attr("fill", "#f0f0f0");
        path.translate(dx, dy);
    
        var path = flag.path("m 254.4375,21.03125 -8.21875,1.09375 -11.0625,1.625 c -1.46184,0.38543 -9.2416,1.98957 -16.71875,3.46875 -16.29949,3.2245 -23.47369,7.331965 -31.40625,9.957685 -2.42019,-2.297846 8.12115,11.964519 10.5558,15.98997 L 209.1875,76.28125 c 4.33739,9.609278 7.77366,19.597203 11.09375,29.59375 l 1.23029,5.21875 c 2.24496,5.13119 3.23196,14.32473 4.05096,20.78125 0.2608,2.0781 -0.29138,11.08585 -0.59375,12.15625 l -2.50817,8.94567 20.07067,0.61683 c 5.8425,0.6231 10.6861,1.19 10.75,1.25 0.0639,0.0595 0.48189,0.0937 0.9375,0.0937 l 0.8125,0 -0.15625,-1.6875 c -0.27954,-2.7386 0.58086,-11.11622 0.25817,-20.375 -0.24103,-6.91606 -0.48377,-15.61337 -0.38317,-19.5625 l 0.25,0.0625 -0.28125,-3.65625 c -0.003,-1.21077 -0.35154,-8.45197 -0.78125,-16.0625 -0.42972,-7.61055 -0.78025,-14.45476 -0.78125,-15.21875 -8.5e-4,-0.626121 -0.046,-0.979951 -0.34375,-1.3125 0.0132,-6.454737 0.41875,-27.371308 0.5625,-32.8125 0.16869,-6.38569 0.84617,-19.80199 1.0625,-23.28125 z");
        path.attr("fill", "#f0f0f0");
        path.translate(0+dx, 861.09449+dy);
    
        var path = flag.path("m 154.9987,107.9939 a 12.61264,18.161713 0 1 1 -25.22528,0 12.61264,18.161713 0 1 1 25.22528,0 z");
        path.attr("fill", "#c83737");
        path.translate(0+dx, 861.09449+dy);
        

        var data = {
            size: 100
        };

        flag.setAttr("viewBox", this.templates.viewBox.apply(data));
    }
});