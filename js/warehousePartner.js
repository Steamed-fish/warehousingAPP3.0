$(function(){var e,t;$("#my-start").datepicker().on("changeDate.datepicker.amui",function(t){e=new Date(t.date),$("#my-startDate").text($("#my-start").data("date")),$(this).datepicker("close")}),$("#my-end").datepicker().on("changeDate.datepicker.amui",function(e){t=new Date(e.date),$("#my-endDate").text($("#my-end").data("date")),$(this).datepicker("close")})});