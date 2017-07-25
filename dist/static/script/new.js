window.formData = {
    typeIndex: -1,
    typeValue: "",
    tagsIndex: -1,
    tagsValue: "",
    areaIndex: [],
    areaValue: "",
    avatarData: "",
    wxcodeData: ""
};
window.countTimeIndex = 10;
window.countTimeFlag = true;
$(function () {
    var curPageType = getLocalParams("types"),
        $placeholder = $("#Js_wx"),
        typeData,
        tagsData,
        selectTitle;


    switch (curPageType) {
        case "gameGroup":
            typeData = typeGroup;
            tagsData = tagsGroup;
            selectTitle = "";
            break;
        case "gameAgent":
            typeData = typeAgent;
            tagsData = tagsAgent;
            break;
        case "gamePush":
            typeData = typePush;
            tagsData = tagsPush;
            $placeholder.attr("placeholder", "地推微信号");
            break;
        default:
            toast.show("参数丢失");
            return false;
            break;
    }


    //添加头像
    $("#imgAvatar").change(function (evt) {
        var files = evt.target.files;
        var len = files.length;
        var i = 0;

        (function (item) {
            let reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    formData.wxcodeData = dataURLtoBlob(e.target.result);
                    var img = new Image();
                    img.onload = function () {
                        $(".avatarPriview").html(img);
                    };
                    img.src = e.target.result;
                }
            })(item);

            reader.readAsDataURL(item);
        })(files[0]);
    });

    //添加微信图片
    $("#imgWx").change(function (evt) {
        var files = evt.target.files;
        var len = files.length;
        var i = 0;


        (function (item) {
            let reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    formData.avatarData = dataURLtoBlob(e.target.result);
                    var img = new Image();
                    img.onload = function () {
                        $(".wxPriview").html(img);
                    };
                    img.src = e.target.result;
                }
            })(item);

            reader.readAsDataURL(item);
        })(files[0]);

    });


    //分类
    var $gameType = $("#gameType");
    $gameType.click(function () {
        var $this = $(this);
        new picker({
            title: "游戏分类",
            data: typeData,
            activeIndex: formData.typeIndex,
            sureFn: function (tIndex, tValue) {
                formData.typeIndex = tIndex;
                formData.typeValue = tValue;
                $this.text(tValue);
            }
        })
    });


    //标签
    var $gameTags = $("#gameTags");
    $gameTags.click(function () {
        var $this = $(this);
        new picker({
            title: "游戏标签",
            data: tagsData,
            activeIndex: formData.tagsIndex,
            sureFn: function (tIndex, tValue) {
                formData.tagsIndex = tIndex;
                formData.tagsValue = tValue;
                $this.text(tValue);
            }
        })

    });


    //手机号码校验
    $("#verifyTxt").click(function () {
        var $tel = $("#tel");
        if($tel.val()=="" || !isTel($tel.val())){
            toast.show("请先输入正确的手机号码");
            return false;
        }else{
            if(countTimeFlag){
                countTime(countTimeIndex);
            }
        }
    });

    //发布
    var $btnPublish = $("#btnPublish");
    $btnPublish.click(function () {
        var $title = $("#title"),
            $wxCode = $("#Js_wx"),
            $intro = $("#intro"),
            $avatar = $("#imgAvatar"),
            $wxcode = $("#imgWx"),
            $tel = $("#tel"),
            $vCode = $("#verifyCode");

        if ($title.val() == "") {
            toast.show("请输入标题");
            return false;
        }

        if ($wxCode.val() == "") {
            toast.show("请输入群主微信号");
            return false;
        }

        if ($intro.val() == "") {
            toast.show("请添加产品介绍");
            return false;
        }

        if ($avatar.val() == "") {
            toast.show("请添加产品头像");
            return false;
        }

        if ($wxcode.val() == "") {
            toast.show("请添加二维码图片");
            return false;
        }

        if (formData.typeValue == "") {
            toast.show("请选择游戏分类");
            return false;
        }

        if (formData.areaValue == "") {
            toast.show("请选择地区");
            return false;
        }

        if (formData.tagsValue == "") {
            toast.show("请选择游戏标签");
            return false;
        }

        if ($tel.val() == "") {
            toast.show("请输入手机号码");
            return false;
        }

        if (!isTel($tel.val())) {
            toast.show("请输入正确的手机号");
            return false;
        }

        if ($vCode.val() == "") {
            toast.show("请输入手机验证码");
            return false;
        }

        let form = new FormData();

        form.append('title', $title.val());
        form.append('wxId', $wxCode.val());
        form.append('intro', $intro.val());
        form.append('avatar', formData.avatarData);
        form.append('wx', formData.wxcodeData);
        form.append('type', formData.typeValue);
        form.append('area', formData.areaValue);
        form.append('tags', formData.tagsValue);
        form.append('tel', $tel.val());
        form.append('verifyCode', $vCode.val());

        console.log(form);

    });
});


//倒计时
function countTime(countTimeIndex) {
    countTimeIndex--;
    var $vTxt =$("#verifyTxt");
    countTimeFlag = false;
    $vTxt.addClass("disabled").html(countTimeIndex+'秒后重新获取');
    if(countTimeIndex==0){
        countTimeFlag = true;
        $vTxt.removeClass("disabled").html('获取验证码');
        return false;
    }
    setTimeout(function(){
        countTime(countTimeIndex);
    },1000);
}

//转成blob数据
function dataURLtoBlob(dataURL) {
    var binary = atob(dataURL.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

//电话号码校验
function isTel(val) {
    var flag = true;
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
        flag = false;
    }
    return flag;
}

//地区选择
(function (formData) {
    var firsts = [
        {
            id: "0",
            text: "浙江省"
        }
    ];
    var second = [
        {
            id: "0",
            text: "杭州市"
        }
    ];
    var third = [
        {
            id: "0",
            text: "下城区"
        }
    ];
    var selectedIndex = [0, 0, 0];
    var picker = new Picker({
        data: [firsts, second, third],
        selectedIndex: selectedIndex,
        title: '地址选择'
    });

    $("#area").click(function () {
        picker.show();
    })


    picker.on('picker.select', function (selectedVal, selectedIndex) {
        var text1 = firsts[selectedIndex[0]].text;
        var text2 = second[selectedIndex[1]].text;
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';

        formData.areaValue = text1 + ' ' + text2 + ' ' + text3;
    });
})(formData);