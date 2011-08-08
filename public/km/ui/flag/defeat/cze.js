KM.UI.Flag.Defeat.Cze = KM.UI.Flag.Defeat.extend({
    _drawFlag: function()
    {
    	var flag = new JW.Svg({
            width: 15,
            height: 15
        });

        this.addChild(flag);

        var dx = -303 / 2;
        var dy = -861 - 191 / 2;

        var path = flag.path("m 87.14453,1031.0995 c -16.80028,-2.0164 -32.33413,-8.5072 -44.24608,-18.4883 -2.20277,-1.8457 -4.04469,-3.3808 -4.09316,-3.4115 -0.0485,-0.031 0.80488,-3.9133 1.89635,-8.6281 4.51299,-19.49486 7.51995,-37.72423 9.25068,-56.08122 0.98359,-10.43237 0.82497,-34.4801 -0.29324,-44.46072 -0.49639,-4.43049 -0.82369,-8.13933 -0.72733,-8.24187 0.0964,-0.10255 1.98261,1.39047 4.19167,3.31782 21.91145,19.11722 51.64677,22.4212 99.12181,11.01372 3.65074,-0.87721 14.33492,-3.68748 23.7426,-6.24503 31.99957,-8.69935 36.65843,-9.91944 45.26465,-11.85418 11.31205,-2.54302 23.27756,-4.55429 29.80117,-5.00925 l 5.26003,-0.36683 -0.32676,3.32697 c -1.77281,18.04993 -1.65095,50.38127 0.37616,99.79624 0.69838,17.02415 1.18999,31.03785 1.09248,31.14165 -0.0975,0.1038 -1.5223,-0.064 -3.16622,-0.3722 -10.99512,-2.0631 -29.85835,-2.0833 -46.1341,-0.049 -11.78522,1.4728 -18.05081,2.5206 -43.91106,7.3439 -24.51883,4.573 -32.59894,5.8716 -43.85494,7.0478 -8.41726,0.8796 -26.74084,1.0012 -33.24471,0.2206 l 0,-10e-5 z");
        path.attr("fill","#f2f2f2");
        path.translate(dx,dy);
        path = flag.path("m 254.4375,21.03125 -8.21875,1.09375 -11.0625,1.625 c -1.46184,0.38543 -9.2416,1.98957 -16.71875,3.46875 -16.29949,3.2245 -23.47369,7.331965 -31.40625,9.957685 -2.42019,-2.297846 8.12115,11.964519 10.5558,15.98997 L 209.1875,76.28125 c 4.33739,9.609278 7.77366,19.597203 11.09375,29.59375 l 1.23029,5.21875 c 2.24496,5.13119 3.23196,14.32473 4.05096,20.78125 0.2608,2.0781 -0.29138,11.08585 -0.59375,12.15625 l -2.50817,8.94567 20.07067,0.61683 c 5.8425,0.6231 10.6861,1.19 10.75,1.25 0.0639,0.0595 0.48189,0.0937 0.9375,0.0937 l 0.8125,0 -0.15625,-1.6875 c -0.27954,-2.7386 0.58086,-11.11622 0.25817,-20.375 -0.24103,-6.91606 -0.48377,-15.61337 -0.38317,-19.5625 l 0.25,0.0625 -0.28125,-3.65625 c -0.003,-1.21077 -0.35154,-8.45197 -0.78125,-16.0625 -0.42972,-7.61055 -0.78025,-14.45476 -0.78125,-15.21875 -8.5e-4,-0.626121 -0.046,-0.979951 -0.34375,-1.3125 0.0132,-6.454737 0.41875,-27.371308 0.5625,-32.8125 0.16869,-6.38569 0.84617,-19.80199 1.0625,-23.28125 z");
        path.attr("fill","#e3dedb");
        path.translate(dx,861.09449+dy);
        path = flag.path("M -1.0745622,90.448238 C -21.408162,85.519747 -31.049821,83.110319 -31.105322,82.943622 c -0.08149,-0.244746 0.308242,-9.782527 0.403888,-9.884306 0.02768,-0.02946 3.717763,1.346628 8.200178,3.057967 l 8.149845,3.111526 21.3092443,2.707679 c 11.7200847,1.489224 21.3440747,2.742509 21.3866427,2.785078 0.06718,0.06718 0.616765,12.944666 0.553726,12.974516 -0.01306,0.0062 -13.500805,-3.255342 -29.9727642,-7.247844 l 0,0 z");
        path.attr("fill","none");
        path.translate(dx,861.09449+dy);
        path = flag.path("M -1.0745622,90.448238 C -21.408162,85.519747 -31.049821,83.110319 -31.105322,82.943622 c -0.08149,-0.244746 0.308242,-9.782527 0.403888,-9.884306 0.02768,-0.02946 3.717763,1.346628 8.200178,3.057967 l 8.149845,3.111526 21.3092443,2.707679 c 11.7200847,1.489224 21.3440747,2.742509 21.3866427,2.785078 0.06718,0.06718 0.616765,12.944666 0.553726,12.974516 -0.01306,0.0062 -13.500805,-3.255342 -29.9727642,-7.247844 l 0,0 z");
        path.attr("fill","none");
        path.translate(dx,861.09449+dy);
        path = flag.path("M -1.0745622,90.448238 C -21.408162,85.519747 -31.049821,83.110319 -31.105322,82.943622 c -0.08149,-0.244746 0.308242,-9.782527 0.403888,-9.884306 0.02768,-0.02946 3.717763,1.346628 8.200178,3.057967 l 8.149845,3.111526 21.3092443,2.707679 c 11.7200847,1.489224 21.3440747,2.742509 21.3866427,2.785078 0.06718,0.06718 0.616765,12.944666 0.553726,12.974516 -0.01306,0.0062 -13.500805,-3.255342 -29.9727642,-7.247844 l 0,0 z");
        path.attr("fill","none");
        path.translate(dx,861.09449+dy);
        path = flag.path("M -1.0745622,90.448238 C -21.408162,85.519747 -31.049821,83.110319 -31.105322,82.943622 c -0.08149,-0.244746 0.308242,-9.782527 0.403888,-9.884306 0.02768,-0.02946 3.717763,1.346628 8.200178,3.057967 l 8.149845,3.111526 21.3092443,2.707679 c 11.7200847,1.489224 21.3440747,2.742509 21.3866427,2.785078 0.06718,0.06718 0.616765,12.944666 0.553726,12.974516 -0.01306,0.0062 -13.500805,-3.255342 -29.9727642,-7.247844 l 0,0 z");
        path.attr("fill","none");
        path.translate(dx,861.09449+dy);
        path = flag.path("M -1.0745622,90.448238 C -21.408162,85.519747 -31.049821,83.110319 -31.105322,82.943622 c -0.08149,-0.244746 0.308242,-9.782527 0.403888,-9.884306 0.02768,-0.02946 3.717763,1.346628 8.200178,3.057967 l 8.149845,3.111526 21.3092443,2.707679 c 11.7200847,1.489224 21.3440747,2.742509 21.3866427,2.785078 0.06718,0.06718 0.616765,12.944666 0.553726,12.974516 -0.01306,0.0062 -13.500805,-3.255342 -29.9727642,-7.247844 l 0,0 z");
        path.attr("fill","none");
        path.translate(dx,861.09449+dy);
        path = flag.path("M -1.0745622,90.448238 C -21.408162,85.519747 -31.049821,83.110319 -31.105322,82.943622 c -0.08149,-0.244746 0.308242,-9.782527 0.403888,-9.884306 0.02768,-0.02946 3.717763,1.346628 8.200178,3.057967 l 8.149845,3.111526 21.3092443,2.707679 c 11.7200847,1.489224 21.3440747,2.742509 21.3866427,2.785078 0.06718,0.06718 0.616765,12.944666 0.553726,12.974516 -0.01306,0.0062 -13.500805,-3.255342 -29.9727642,-7.247844 l 0,0 z");
        path.attr("fill","none");
        path.translate(dx,861.09449+dy);
        path = flag.path("m 37.830213,146.71999 c 52.974304,54.34655 180.444107,-3.60103 217.081777,7.42462 L 253.85133,90.858552 C 180.79304,109.00965 112.31217,113.80992 50.558135,98.99028 l -12.727922,47.72971 z");
        path.attr("fill","#c83737");
        path.translate(dx,861.09449+dy);
        path = flag.path("m 37.830213,146.01289 c 3.535534,0 18.031223,-3.53555 18.031223,-3.53555 l -1.414214,16.97057 -16.617009,-13.43502 z");
        path.attr("fill","#a02c2c");
        path.translate(dx,861.09449+dy);
        path = flag.path("m 49.87868,31.610861 c 34.466282,23.014641 70.17969,66.822982 91.3033,75.899499 -27.6907,17.6082 -59.269917,40.87392 -103.010407,39.75736 9.312191,-33.85523 9.062495,-76.926778 11.707107,-115.656859 z");
        path.attr("fill","#0044aa");
        path.translate(dx,861.09449+dy);
        path = flag.path("m 50.911688,32.875796 18.031223,15.202796 c -3.327788,36.383099 -11.463635,73.121758 -12.727922,96.520068 -6.15817,0.90413 -13.426567,3.28856 -16.970562,0.70712 9.414929,-26.42498 8.104408,-74.300855 11.667261,-112.429984 z");
        path.attr("fill","#003380");
        path.translate(dx,861.09449+dy);
        path = flag.path("m 218.84955,99.697387 c 6.45514,7.021033 10.97564,50.199173 3.18198,53.033003 11.3831,-0.6695 25.76551,-2.62442 31.1127,-0.7071 l 0,-59.39697 c -3.09486,1.43045 -5.98155,2.444569 -8.73785,3.197916 -8.16417,2.231412 -15.1844,2.174958 -23.08196,3.873151 l -2.47487,0 z");
        path.attr("fill","#a02c2c");
        path.translate(dx,861.09449+dy);

        var data = {
            size: 100
        };

        flag.setAttr("viewBox", this.templates.viewBox.apply(data));
    }
});