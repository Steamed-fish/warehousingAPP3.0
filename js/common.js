$(function(){if($("body").css("min-height",$(window).height()),$(window).scroll(function(){$(window).scrollTop()>200?$(".icon-totop").fadeIn(1e3):$(".icon-totop").stop(!0,!0).fadeOut(1e3)}),$(".icon-totop").click(function(){$("html,body").animate({scrollTop:0},300)}),$("#key-text-btn").click(function(){$(".wh-opa,.wh-pop").show()}),$("#pop-close").click(function(){$(".wh-opa,.wh-pop").hide()}),$(".foot-wrap").length>0){var o=$(".foot-wrap").height();$("body").css("padding-bottom",o)}FastClick.attach(document.body),$(".am-collapse.am-in")});