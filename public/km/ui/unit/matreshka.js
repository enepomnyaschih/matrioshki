KM.UI.Unit.Matreshka = KM.UI.Unit.extend({
	COMMONSCALE: 21,
	FLOWERSCALE: 250,

    render: function()
    {
        this._super();
        
        this.setAttr("fill", "#FF0000");
    },
    
    // override
    _drawHead: function()
    {
        var svg = new JW.Svg();
        svg.setSize(1,1);
        svg.setAttr("viewBox", "0 30 " + this.COMMONSCALE + " " + this.COMMONSCALE);
        this.headView.addChild(svg);
        

        var path = svg.path("m 0, -52 c -17.27296,0 -31.9028,11.66409 -36.875,27.78125 l 0,0.0312 0,0.0625 c -1.16188,3.79616 -1.8125,7.8385 -1.8125,12.03125 0,1.00028 0.0554,1.98694 0.125,2.96875 -2.04678,16.63302 -3.97238,23.35488 -8.1875,30.25 -3.42524,5.60306 -4.59375,7.84649 -4.59375,8.75 -4.80908,9.92572 -7.5625,21.38949 -7.5625,33.59375 0,0.2083 -0.002,0.4172 0,0.625 47.64908,-3.30963 88.29634,-2.94162 118.125,0 0.002,-0.2078 0,2.88328 0,0 0,-15.36012 -4.37066,-30.16259 -11.71875,-41.59375 8.1e-4,-0.0118 0,-0.0188 0,-0.0312 0,-0.74238 -0.8229,-2.61473 -3.1875,-7.21875 -2.94156,-5.72742 -4.25714,-11.25124 -5.6875,-25.25 0.0346,-0.6962 0.0625,-1.38865 0.0625,-2.09375 0,-3.38896 -0.41696,-6.7021 -1.1875,-9.84375 -4.24128,-17.29265 -19.4171,-30.0625 -37.5,-30.0625 z");

        var circle = svg.circle(0, -9, 29);
        circle.attr("fill", "#FFFFEE");
        
        var circle = svg.circle(-13, -15, 7);
        circle.attr("fill", "darkred");
        var circle = svg.circle(13, -15, 7);
        circle.attr("fill", "darkred");

        var circle = svg.circle(-23, 3, 10);
        circle.attr("fill", "pink");
        var circle = svg.circle( 23, 3, 10);
        circle.attr("fill", "pink");

        var path = svg.path("M -58, 73 c 1.74531,18.57608 9.24722,34.63648 21.15556,45.73398 l 73.84375,0 c 11.90834,-11.0975 20.62466,-27.1579 22.37569,-45.73398 -37.1288,-5.90427 -76.85034,-5.59863 -117.375,0 z");
        
        var flower = new JW.Svg();
        svg.addChild(flower);
        flower.setAttr("viewBox", "0 30 " + this.FLOWERSCALE + " " + this.FLOWERSCALE);
        flower.setXY(-40, 23);
        
        var path = flower.path("M 505.71429,20.004464 C 412.66286,20.004464 337.1518,101.29338 337.15179,201.44196 C 337.15179,205.26968 337.27814,209.04786 337.49554,212.81696 C 307.73713,184.4093 268.58972,167.12946 225.71429,167.12946 C 132.66286,167.12946 57.151785,248.4184 57.151786,348.56696 C 57.151786,438.00929 117.39365,512.40227 196.55804,527.28571 C 163.53261,560.41352 142.87054,607.62022 142.87054,660.00446 C 142.87054,760.15303 218.38161,841.44194 311.43304,841.44196 C 380.07162,841.44196 439.14707,797.18746 465.43304,733.78571 C 493.79804,791.01919 549.83649,830.00446 614.27679,830.00446 C 707.32822,830.00446 782.87052,748.71554 782.87054,648.56696 C 782.87054,609.68774 771.45988,573.66967 752.08929,544.12946 C 762.06586,546.1123 772.36342,547.12946 782.87054,547.12946 C 875.92197,547.12946 951.43302,465.87177 951.43304,365.72321 C 951.43304,265.57464 875.922,184.28571 782.87054,184.28571 C 740.62231,184.28571 701.96328,201.02263 672.37054,228.69196 C 673.61864,219.79475 674.27679,210.71199 674.27679,201.44196 C 674.27679,101.29339 598.76571,20.004464 505.71429,20.004464 z");
        path.attr("fill", "yellow");
        path = flower.path("M 491.43304,328.56696 C 486.89875,328.56696 482.412,328.74685 477.99554,329.09821 C 473.57908,329.44957 469.24085,329.97526 464.96429,330.66071 C 460.68773,331.34616 456.48513,332.18971 452.37054,333.19196 C 448.25595,334.19421 444.20733,335.35892 440.27679,336.66071 C 436.34625,337.9625 432.53245,339.42042 428.80804,341.00446 C 425.08363,342.5885 421.4605,344.31169 417.96429,346.16071 C 414.46808,348.00973 411.08522,349.97024 407.83929,352.06696 C 404.59336,354.16368 401.46911,356.39607 398.49554,358.72321 C 395.52197,361.05035 392.70593,363.46417 390.02679,366.00446 C 387.34765,368.54475 384.82692,371.2058 382.46429,373.94196 C 380.10166,376.67812 377.89459,379.49596 375.87054,382.41071 C 373.84649,385.32546 372.00268,388.33464 370.33929,391.41071 C 368.6759,394.48678 367.18245,397.6281 365.90179,400.84821 C 364.62113,404.06832 363.55889,407.37634 362.68304,410.72321 C 361.80719,414.07008 361.132,417.45435 360.68304,420.91071 C 360.23408,424.36707 359.99554,427.89339 359.99554,431.44196 C 359.99554,434.99053 360.23408,438.4856 360.68304,441.94196 C 361.132,445.39832 361.80719,448.81384 362.68304,452.16071 C 363.55889,455.50758 364.62113,458.78435 365.90179,462.00446 C 367.18245,465.22457 368.6759,468.36589 370.33929,471.44196 C 372.00268,474.51803 373.84649,477.52721 375.87054,480.44196 C 377.89459,483.35671 380.10166,486.17455 382.46429,488.91071 C 384.82692,491.64687 387.34765,494.30792 390.02679,496.84821 C 392.70593,499.3885 395.52197,501.83357 398.49554,504.16071 C 401.46911,506.48785 404.59336,508.68899 407.83929,510.78571 C 411.08522,512.88243 414.46808,514.87419 417.96429,516.72321 C 421.4605,518.57223 425.08363,520.29542 428.80804,521.87946 C 432.53245,523.4635 436.34625,524.89017 440.27679,526.19196 C 444.20733,527.49375 448.25595,528.65846 452.37054,529.66071 C 456.48513,530.66296 460.68773,531.50651 464.96429,532.19196 C 469.24085,532.87741 473.57908,533.4031 477.99554,533.75446 C 482.412,534.10582 486.89875,534.28571 491.43304,534.28571 C 495.96733,534.28571 500.45408,534.10582 504.87054,533.75446 C 509.287,533.4031 513.62523,532.87741 517.90179,532.19196 C 522.17835,531.50651 526.38095,530.66296 530.49554,529.66071 C 534.61013,528.65846 538.6275,527.49375 542.55804,526.19196 C 546.48858,524.89017 550.33363,523.4635 554.05804,521.87946 C 557.78245,520.29542 561.40558,518.57223 564.90179,516.72321 C 568.398,514.87419 571.78086,512.88243 575.02679,510.78571 C 578.27272,508.68899 581.36572,506.48785 584.33929,504.16071 C 587.31286,501.83357 590.16015,499.3885 592.83929,496.84821 C 595.51843,494.30792 598.03916,491.64687 600.40179,488.91071 C 602.76442,486.17455 604.97149,483.35671 606.99554,480.44196 C 609.01959,477.52721 610.8634,474.51803 612.52679,471.44196 C 614.19018,468.36589 615.65238,465.22457 616.93304,462.00446 C 618.2137,458.78435 619.30719,455.50759 620.18304,452.16071 C 621.05889,448.81383 621.73408,445.39832 622.18304,441.94196 C 622.632,438.4856 622.87054,434.99053 622.87054,431.44196 C 622.87054,427.89339 622.632,424.36707 622.18304,420.91071 C 621.73408,417.45435 621.05889,414.07008 620.18304,410.72321 C 619.30719,407.37634 618.2137,404.06832 616.93304,400.84821 C 615.65238,397.6281 614.19018,394.48678 612.52679,391.41071 C 610.8634,388.33464 609.01959,385.32546 606.99554,382.41071 C 604.97149,379.49596 602.76442,376.67812 600.40179,373.94196 C 598.03916,371.2058 595.51843,368.54475 592.83929,366.00446 C 590.16015,363.46417 587.31286,361.05035 584.33929,358.72321 C 581.36572,356.39607 578.27272,354.16368 575.02679,352.06696 C 571.78086,349.97024 568.398,348.00973 564.90179,346.16071 C 561.40558,344.31169 557.78245,342.5885 554.05804,341.00446 C 550.33363,339.42042 546.48858,337.9625 542.55804,336.66071 C 538.6275,335.35892 534.61013,334.19421 530.49554,333.19196 C 526.38095,332.18971 522.17835,331.34616 517.90179,330.66071 C 513.62523,329.97526 509.287,329.44957 504.87054,329.09821 C 500.45408,328.74685 495.96733,328.56696 491.43304,328.56696 z");
        path.attr("fill", "red");
    },
    
    // override
    _drawBody: function()
    {
    }
});
