!function(){var o=$("#J_Address");o.citySelect(),o.on("click",function(e){e.stopPropagation(),o.citySelect("open")}),o.on("done.ydui.cityselect",function(o){console.log(o),$(this).val(o.country+" "+o.provance+" "+o.city+" "+o.area)})}();var sortArr=["综合排序","最新发布","评论数最多","租赁费由高到低","租赁费由低到高"],areaArr=["不限","≤2000m²","2001-8000m²","8001-20000m²","≥20000m²"],mobileSelect1=new MobileSelect({trigger:"#trigger1",title:"排序",wheels:[{data:sortArr}],position:[1],titleColor:"#333",textColor:"#666",transitionEnd:function(o,e){console.log(e)},callback:function(o,e){console.log(e)}}),mobileSelect2=new MobileSelect({trigger:"#trigger2",title:"面积",wheels:[{data:areaArr}],position:[1],transitionEnd:function(o,e){console.log(e)},callback:function(o,e){console.log(e)}});