$(function () {
    var t = $(".noUiSlider")[0];
    noUiSlider.create(t, {
        start: [0, 50],
        connect: !0,
        range: {min: 0, max: 250},
        pips: {mode: "values", values: [0, 25, 50, 100, 150, 200], density: 4}
    }), t.noUiSlider.on("change", function (n, e) {
        n[e] > 200 && t.noUiSlider.set([n[0], 250])
    }), $(".whlist-wrap").parent("body").css("overflow-x", "hidden"), $(".wh-warehouse-tab-item").unbind("click").click(function () {
        $(".filter-pop").css("opacity", "block").animate({left: "0"})
    }), $(".filter-pop .close,.filter-pop .define-btn").unbind("click").click(function () {
        var t = $(document).width();
        $(".filter-pop").animate({left: t})
    }), $(".filter-pop .wltag").unbind("click").click(function () {
        $(this).hasClass("wltag-on") ? $(this).removeClass("wltag-on") : $(this).addClass("wltag-on")
    }), $(".filter-pop .all").unbind("click").click(function () {
        var t = $(this).parents(".canvas-con-item"), n = t.find(".wltag"), e = t.find(".wltag-on");
        n.length == e.length ? n.removeClass("wltag-on") : n.addClass("wltag-on")
    }), $(".filter-pop .reset").unbind("click").click(function () {
        $(".filter-pop .wltag").removeClass("wltag-on")
    })
}), function () {
    var t = $("#J_Address");
    t.citySelect(), t.on("click", function (n) {
        n.stopPropagation(), t.citySelect("open")
    }), t.on("done.ydui.cityselect", function (t) {
        console.log(t), $(this).val(t.country + " " + t.provance + " " + t.city + " " + t.area)
    })
}();

$('.whlist-wrap .wh-lbs-hd .filter').click(function () {
    $('.wh-sub-warehouse').fadeToggle(100);
})

var sortArr = ["综合排序", "最新发布", "评论数最多", "租赁费由高到低", "租赁费由低到高"],
    areaArr = ["不限", "≤2000m²", "2001-8000m²", "8001-20000m²", "≥20000m²"], mobileSelect1 = new MobileSelect({
        trigger: "#trigger1",
        title: "排序",
        wheels: [{data: sortArr}],
        position: [1],
        titleColor: "#333",
        textColor: "#666",
        /*carrier:"#wh-warehouse-tab-wrap",*/
        transitionEnd: function (t, n) {
            console.log(n)
        },
        callback: function (t, n) {
            console.log(n)
        }
    }), mobileSelect2 = new MobileSelect({
        trigger: "#trigger2",
        title: "面积",
        wheels: [{data: areaArr}],
        position: [1],
        transitionEnd: function (t, n) {
            console.log(n)
        },
        callback: function (t, n) {
            console.log(n)
        }
    });