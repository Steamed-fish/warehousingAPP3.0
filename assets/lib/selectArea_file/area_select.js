/**
 * 手机端列表页筛选效果
 */
 $(function(){
var diqu_obj = $(".searchBox .select_detial .diqu");
var diqu2_obj = diqu_obj.find('.diqu_detial2');
var sec_obj = diqu2_obj.find('.two');
var thr_obj = diqu2_obj.find('.three');
var four_obj = diqu2_obj.find('.four');

var areaid = diqu_obj.data('areaid');
var areahref = diqu_obj.data('href');
var areapid = diqu_obj.data('pid');
var level = diqu_obj.data('level');


$('.tab').click(function(event){
    event.stopPropagation();
});

//导航条 点击地区 触发事项
    //需求区域
   
    $('.add_btn').click(function(){
         //alert( $(this).parents('li.region').find('input[name="area"]').last().attr('data'));  
        var t= $(this).parents('li.region').find('a').last().attr('data');
        var b=1;
        var d=parseInt(t) + parseInt(b);

         var txt=' <div class="line"><span class="must">其他区域</span><label><input type="hidden" name="subareaid[]" id="areaid_'+d+'" ><a onclick="tcarea($(this));" class="val_box" value="" id="area_'+d+'" data="'+d+'"></a></label><b class="dele" onclick="$(this).parent().remove();">-</b></div>';
        $(this).parents('li.region').find('.line:last-child').after(txt);
        //area()
    });



//地区弹出框 点击第一列触发效果
$('.diqu .diqu_detial1 ul li').click(function(){
    var _this = $(this);
    if(_this.hasClass('to_more')){
        var zone = _this.data('zone');
        var type = _this.data('type');

        diqu_obj.removeClass('show3 show4').addClass('show2');
        sec_obj.find('.zone-sub').hide();

        if (zone) {
            var sub = sec_obj.find('.zone-'+zone);
            if(sub.length>0){
                sub.show();
            }else{
                show_diqu2(zone, areaid, type);
            }
        }
        
    }
});

//地区弹出框 点击第二列触发效果
diqu2_obj.on('click', '.two .sub-tit', function(){
    var _this = $(this); 
    var pid = _this.data('pid');
    var sub = thr_obj.find('.area-'+pid);

    diqu_obj.removeClass('show2 show4').addClass('show3');
    thr_obj.find('.area-sub').hide();

    if (sub.length>0) {
        sub.show();
    }else{
        show_diqu3(pid, areaid);
    }
});

if(level==3){
    //地区弹出框 点击第三列触发效果
    diqu2_obj.on('click','.three .sub-tit',function(){
        var _this = $(this);
        var pid = sec_obj.find(".zone-sub .active").data('pid');
        var ppid = _this.data('pid');
        var sub = four_obj.find('.area-'+ppid);

        diqu_obj.removeClass('show2 show3').addClass('show4');
        four_obj.find('.area-sub').hide();

        if (sub.length>0) {
            sub.show();
        }else{
            show_diqu4(pid, ppid, areaid);
        }
    })
}

//初始化地区筛选项
function area_init(areaid, zone, pid, pids){    
    var pids_arr, length, type;
    var fir_obj,sec_cur_id,thr_cur_id;

    areaid*=1, zone*=1, pid*=1;
    if(areaid<1 || zone<1 || pid<1){ return false;}

    fir_obj = diqu_obj.find('.diqu_detial1 li[data-zone='+zone+']');            

    pids_arr = pids.split(',');
    length = pids_arr.length;

    //显示第二区域
    type = fir_obj.data('type');
    sec_cur_id = length==2 ? areaid : pids_arr[2];
    show_diqu2(zone, sec_cur_id, type);

    if(pids_arr[1]==3372 || (level!=3 && pids_arr[1]==3371)){
        diqu_obj.addClass('show2');return;
    }

    //显示第三区域
    if(length>=2){
        diqu_obj.addClass('show3');
        thr_cur_id = length<=3 ? areaid : pids_arr[3];
        show_diqu3(sec_cur_id, thr_cur_id);
    }

    //显示第四区域
    if(length>=3 && level==3){
        diqu_obj.removeClass('show3').addClass('show4');
        show_diqu4(pids_arr[2], thr_cur_id, areaid);
    }

}

function show_diqu2(pid, areaid, type) {
    var needSub, loadhref;

    if(level==3){
        needSub = type ? 1 : 0;
    }else{
        needSub = type=='zone-sub' ? 1 : 0;
    }

    loadhref = 'ajax.php?action=get_area_mobile&pid='+pid+'&type='+type+
        '&areaid='+areaid+'&needsub='+needSub+'&level='+level+'&href='+areahref;
//alert(loadhref);
    $('<ul class="zone-sub zone-'+pid+'"></ul>').load(loadhref).appendTo(sec_obj);
}

function show_diqu3(pid, areaid){
    var needSub, loadhref;

    needSub = level==3 ? 1 : 0;
    loadhref = 'ajax.php?action=get_area_mobile&pid='+pid+
        '&areaid='+areaid+'&needsub='+needSub+'&level='+level+'&href='+areahref;
//alert(loadhref);
    $('<ul class="area-sub area-'+pid+'"></ul>').load(loadhref).appendTo(thr_obj);
}

function show_diqu4(pid, ppid, areaid){
    var loadhref;
    loadhref = 'ajax.php?action=get_area_mobile&pid='+ppid+
                '&ppid='+ppid+'&areaid='+areaid+'&href='+areahref;

    $('<ul class="area-sub area-'+ppid+'"></ul>').load(loadhref).appendTo(four_obj);
}

//更多筛选项
$('.more dd a').click(function(){
    var type = $(this).parents('dl').data('type');

    if(type=='multiple'){
        $(this).toggleClass('active');
    }else{
        $(this).addClass('active').siblings().removeClass('active');
    }
    
})

$('.select_detial .sure').click(function(){
    var href = $(this).data('act');
    $('.more dd').each(function(){
        var dl_obj = $(this).parents('dl');
        var code = dl_obj.data('code');
        var type = dl_obj.data('type');

        if (type=='multiple') {
            var multiple_obj = $(this).find('a.active');
            if(multiple_obj.length>0){
                href += '&'+code+'=';
                multiple_obj.each(function(i,e){
                    href += (i!=0 ? '_' :'')+$(this).data('val');
                })
            }                
        } else {
            var single_v;
            single_v = $(this).find('a.active').eq(0).data('val')
            if((type=='single' && single_v>0) || (type!='single' && single_v!=99)){
                href += '&'+code+'='+single_v;
            }
        }
    });

    location.href = href;
})

//弹出框列表点击样式
diqu_obj.on('click', 'ul li', function(){
    var _this = $(this);
    _this.addClass('active').siblings().removeClass('active');

    if(_this.hasClass('sub-tit')){
        _this.parents('ul').nextAll().find('li.active').removeClass('active');
        _this.parents('div.lf').nextAll().find('li.active').removeClass('active');
    }else if(_this.hasClass('to_more')){
        _this.parents('.diqu_detial1').nextAll().find('li.active').removeClass('active');
    }
});

$(".select_detial").on('click',function(e){
    var target = $(e.target);
    if(target.closest(".heg").length == 0){
        $('.select_box li.active').click();
    }
});


});

    function tcarea(t){
           var d= t.attr('data'); 
            k = d;
            // 新增部分
            var e = event || window.event;
            var target = e.target || e.srcElement;
            //新增部分end
            console.log(d);
            if(d==0){
             $('#dareaid').removeClass('false');
             $('#dareaid').html(''); 
            }

             $('.searchBox').attr('type',d);
            $('.select_detial').addClass('active');
            $('body').addClass('html-body-overflow');
            $('.diqu_close').click(function(){

                $('.select_detial').removeClass('active');
                $('body').removeClass('html-body-overflow');
            });
    }
    function get_areaid(aid,name,close){
    var id=$('.searchBox').attr('type');
    $('#areaid_'+id).val(aid);
    $('#area_'+id).text(name);
    if(close=='true'){
         $('.select_detial').removeClass('active');
                $('body').removeClass('html-body-overflow');
    }
    }







