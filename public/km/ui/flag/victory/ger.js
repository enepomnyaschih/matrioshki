JW.ns("KM.UI");

KM.UI.Flag.Victory.Ger = KM.UI.Flag.extend({
    _drawFlag: function()
    {
    	var flag = new JW.Svg({
            width: 15,
            height: 15
        });

        this.addChild(flag);

        var dx = -303 / 2;
        var dy = -861 - 191 / 2;

        var path = flag.path("m 87.14453,1027.0235 c -16.80028,-1.9693 -32.33413,-8.3085 -44.24608,-18.0565 -2.20277,-1.8025 -4.04469,-3.3017 -4.09316,-3.3317 -0.0485,-0.031 0.80488,-3.8219 1.89635,-8.42654 4.51299,-19.0394 7.51995,-36.84287 9.25068,-54.77099 0.98359,-10.18863 0.82497,-33.67453 -0.29324,-43.42198 -0.49639,-4.32698 -0.82369,-7.94917 -0.72733,-8.0493 0.0964,-0.10012 0.803927,1.66934 3.035353,3.52576 22.154082,18.43099 53.105767,21.02756 99.410887,11.04186 3.66601,-0.79057 18.67111,-5.02863 28.07879,-7.52643 31.99957,-8.4961 33.18948,-6.54764 41.7957,-8.43718 11.31205,-2.48361 23.27756,-4.44789 29.80117,-4.89222 l 2.65832,-0.92917 0.2514,1.53649 c -1.77281,17.62823 0.3726,49.20421 2.39971,97.46468 0.69838,16.62642 1.18999,30.31272 1.09248,30.41412 -0.0975,0.1013 -1.5223,-0.062 -3.16622,-0.3635 -10.99512,-2.0149 -29.85835,-2.0346 -46.1341,-0.048 -11.78522,1.4384 -18.05081,2.4618 -43.91106,7.1724 -24.51883,4.4661 -32.59894,5.7344 -43.85494,6.8831 -8.41726,0.8591 -26.74084,0.9778 -33.24471,0.2154 l 0,-10e-5 0,2e-4 z");
        path.attr("fill","#d40000");
        path.translate(dx,dy);
        var path = flag.path("m 79.89679,944.83182 c -10.12728,-1.0905 -19.79339,-3.82683 -26.41028,-7.47636 l -4.39943,-2.42649 0.36212,-8.07281 c 0.33422,-7.4506 -0.2984,-27.62271 -1.09082,-34.78233 l -0.3375,-3.04939 c 15.61019,17.73261 38.82025,21.3282 60.5736,21.45984 11.96244,-0.008 13.46954,-0.13361 22.61779,-1.89549 12.97145,-2.4982 20.09499,-4.24751 47.45146,-11.65253 33.27823,-9.00795 50.41905,-12.72087 67.01099,-14.51541 3.37129,-0.36463 7.06995,-0.7944 8.21925,-0.95505 l 2.08964,-0.29208 -0.001,16.75923 c -0.001,9.21758 -0.16476,21.72806 -0.36421,27.80106 l -0.36263,11.04184 -3.11853,-1.17645 c -6.64005,-2.50493 -12.77757,-3.46971 -24.34256,-3.82647 -16.05917,-0.4954 -27.6507,0.62301 -65.79084,6.34784 -38.76376,5.81843 -51.62011,7.13472 -68.45417,7.00868 -6.43609,-0.0482 -12.57962,-0.18213 -13.6523,-0.29763 l -1.7e-4,0 z");
        path.attr("fill","#292929");
        path.translate(dx,dy);
        var path = flag.path("m 87.14086,1031.1434 c -6.41579,-0.6888 -12.70407,-2.028 -18.38881,-3.9163 -9.1932,-3.0537 -23.86526,-11.9786 -28.95336,-17.6121 l -1.92737,-2.134 0.96002,-3.6985 c 1.6973,-6.53883 4.21199,-18.89048 5.55288,-27.27455 l 1.30476,-8.1581 1.64058,1.83501 c 6.81258,7.61996 18.4283,13.36166 31.70034,15.66962 16.22758,2.82193 32.3262,1.64713 80.55174,-5.8783 25.15357,-3.92512 37.40111,-5.4232 51.82302,-6.33879 11.28321,-0.71634 27.69964,-0.42693 36.49901,0.64344 7.79567,0.94829 7.92409,0.99721 8.28135,3.15501 0.40894,2.46992 1.6531,40.14476 1.33684,40.48136 -0.13322,0.1418 -3.85635,-0.2013 -8.27363,-0.7624 -5.5091,-0.6999 -12.31898,-1.024 -21.6837,-1.0321 -19.02172,-0.016 -29.29046,1.1892 -65.75394,7.7203 -11.79949,2.1135 -24.96421,4.3696 -29.25493,5.0136 -17.78667,2.6696 -34.16661,3.4944 -45.4148,2.2868 l 0,0 z");
        path.attr("fill","#ffdd88");
        path.translate(dx,dy);
        var path = flag.path("m 49.4681,937.65314 c -0.14656,0.14724 -1.11836,11.23021 -1.85274,21.05438 l -0.70581,9.17755 1.05871,0.98583 c 3.07851,2.8997 6.92516,5.97156 8.73436,6.97118 0.24426,0.13496 0.49784,0.27456 0.74992,0.39902 0.0128,-0.0243 0.031,-0.0463 0.0441,-0.0704 -1.20373,-4.29206 -0.13556,-20.66615 0.5073,-26.85196 l 0.72786,-7.957 -3.5952,-1.1736 c -3.06534,-1.4528 -5.61946,-2.58425 -5.66851,-2.53498 z m 9.2196,39.19823 c -0.0198,0.0335 -0.0469,0.0605 -0.0661,0.0939 0.0728,0.0267 0.14786,0.0658 0.22057,0.0939 0.0134,0.005 0.056,10e-4 0.0882,0 -0.0418,-0.0545 -0.11441,-0.11206 -0.24262,-0.18778 z");
        path.attr("fill","#aa0000");
        path.translate(dx,dy);
        var path = flag.path("m 57.23842,938.1472 c -1.89317,-0.76717 -5.4049,-2.60356 -6.23033,-3.25804 -0.35468,-0.28122 -0.36036,-0.52155 -0.14711,-6.22583 0.46121,-12.33699 0.13542,-24.5782 -0.88255,-33.16107 -0.16231,-1.36854 -0.26866,-2.51377 -0.23632,-2.54498 0.0323,-0.0312 1.49062,1.29036 3.24063,2.93681 l 3.18183,2.99353 4.8957,2.6761 c 2.69264,1.47186 4.92902,2.70493 4.96975,2.74017 0.0407,0.0352 -1.33343,7.85094 -3.0537,17.36823 -2.49359,13.79564 -3.18767,17.30306 -3.42327,17.29872 -0.16254,-0.003 -1.20412,-0.37363 -2.31463,-0.82364 l 0,0 z");
        path.attr("fill","#090909");
        path.translate(dx,dy);
        var path = flag.path("m 54.70698,1018.4656 c -3.71133,-1.5587 -6.67142,-3.522 -12.47102,-8.2714 l -3.53873,-2.8981 0.29292,-0.8758 c 1.20401,-3.6001 4.35142,-17.49517 6.09713,-26.91737 0.97849,-5.28128 0.99787,-9.43937 1.17387,-9.32973 0.13147,0.0819 2.72273,4.01184 5.27678,5.91447 l 5.62879,2.83037 -0.97377,8.28145 c 0.006,4.20885 0.07,13.10091 0.14187,19.76011 0.0785,7.2736 0.0587,12.1049 -0.0494,12.1005 -0.099,0 -0.80929,-0.2715 -1.57838,-0.5945 l 1e-5,0 -6e-5,0 z");
        path.attr("fill","#ffbb00");
        path.translate(dx,dy);
        var path = flag.path("m 204.37778,930.52322 c 1.08017,-0.44821 -16.81758,-33.51067 -20.56802,-33.5119 -2.32934,-7.5e-4 1.47869,-0.53626 3.20793,-1.10865 7.93256,-2.62572 15.11595,-4.35996 31.41544,-7.58446 7.47715,-1.47918 15.26239,-3.10314 16.72423,-3.48857 l 11.05816,-1.60659 8.22306,-1.08248 c -0.21633,3.47926 -0.88007,16.86948 -1.04876,23.25517 -0.18843,7.13255 -0.006,28.60668 -0.0263,28.44907 l -16.00064,-3.4424 -9.45065,-0.40904 c -3.10228,-0.14049 -17.1719,0.18103 -21.39844,0.48899 -1.7337,0.12632 -4.39096,0.41127 -5.905,0.63321 -3.22818,0.47321 -2.81849,0.43876 -2.9295,0.24628 l 0,0 6.69845,-0.83863 z");
        path.attr("fill","#090909");
        path.translate(dx,dy);
        var path = flag.path("m 253.26891,1015.9357 c -0.0639,-0.06 -4.89633,-0.6184 -10.73883,-1.2415 l -18.78188,-1.9208 1.20779,-7.6469 c 0.30237,-1.0704 0.86113,-10.0679 0.60033,-12.146 -1.10937,-8.8399 -2.23673,-14.8517 -2.36377,-16.4338 -0.21597,-2.68962 -0.43497,-3.41922 0.32073,-2.60169 0.75926,0.82137 -0.5296,-0.18234 -0.10073,-0.0982 1.65753,0.32509 6.80997,0.42227 10.79422,0.41297 7.29157,-0.0171 11.02861,0.12557 15.93862,1.11032 l 2.56495,0.0557 0.26756,2.59337 c 0.42185,2.20986 0.57906,7.68381 0.86665,15.93585 0.32269,9.25878 0.74368,17.64578 1.02322,20.38438 l 0.17403,1.7048 -0.82841,0 c -0.45561,0 -0.88063,-0.049 -0.94448,-0.1085 l 0,0 z");
        path.attr("fill","#ffbb00");
        path.translate(dx,dy);
        var path = flag.path("m 227.89264,972.46013 -5.73302,-0.2618 -1.8915,-5.24164 c -3.07669,-9.70599 -8.64116,-24.55616 -11.05982,-29.51587 -1.83359,-3.75996 -2.0207,-4.3583 -1.4414,-4.60932 0.36615,-0.15866 6.60565,-0.28643 13.86558,-0.28393 11.06546,0.004 13.80515,0.12688 16.94312,0.76123 5.20104,1.05143 9.22299,2.26421 12.11629,3.65355 2.30061,1.10475 2.46279,1.27397 2.46455,2.57163 0.001,0.76399 0.35347,7.61587 0.78319,15.22642 0.42971,7.61053 0.78348,14.82797 0.78616,16.03874 l 0.28356,3.6839 -3.6567,-0.88057 c -1.89624,-0.0358 -9.59738,-0.49801 -16.56414,-1.36473 l -6.89587,0.22239 z");
        path.attr("fill","#aa0000");
        path.translate(dx,dy);

        var data = {
            size: 100
        };

        flag.setAttr("viewBox", this.templates.viewBox.apply(data));
    }
});