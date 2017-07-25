function getLocalParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURIComponent(r[2]);
    return null;
}


var toast = {
    show: function (txt) {
        $("body").append("<div class='toast'><div class='t-txt'>" + txt + "</div></div>");
        this.hide();
    },
    hide: function () {
        setTimeout(function () {
            $("body").find(".toast").remove();
        },1500)
    }
};

/*定义下拉数据*/
var typeGroup = [
    {
        id: "1",
        txt: "麻将群"
    },
    {
        id: "2",
        txt: "斗地主群"
    },
    {
        id: "3",
        txt: "跑得快群"
    },
    {
        id: "4",
        txt: "斗牛群"
    },
    {
        id: "5",
        txt: "双扣群"
    },
    {
        id: "6",
        txt: "其他群"
    }
];
var typeAgent = [];
var typePush = [];


var tagsGroup = [
    {
        id: "1",
        txt: "娱乐交流"
    },
    {
        id: "1",
        txt: "技术交流"
    },
    {
        id: "1",
        txt: "招商代理"
    }
];
var tagsAgent = [];
var tagsPush = [];


/*发布部分的下拉*/
(function (window, $, undefined) {

    var picker = function (config) {
        return new picker.fn.init(config);
    };

    picker.fn = picker.prototype = {
        init: function (config) {
            this.currentIndex = 0;
            this.currentValue = "";
            var ckg = config;
            this.createHtml(ckg);
            this.bindEvent(ckg);
            this.show();
        },
        createHtml(ckg){
            var sItemHtm = "";
            ckg.data.forEach(function (item, index) {
                if (index == ckg.activeIndex) {
                    sItemHtm += "<div class='s-item active' id='" + item.id + "'>" + item.txt + "</div>";
                } else {
                    sItemHtm += "<div class='s-item' id='" + item.id + "'>" + item.txt + "</div>";
                }
            });

            var selectHtml = `<div id="selectBox" class="select-box">
                <div id="selectMask" class="s-mask"></div>
                <div class="s-inner">
                    <div class="s-title">${ckg.title}</div>
                    <div class="s-btn">
                        <div id="selectCancel" class="s-cancel">取消</div>
                        <div id="selectConfirm" class="s-sure">确定</div>
                    </div>
                    <div class="s-content">
                       ${sItemHtm}
                    </div>
                </div>
            </div>
            `;
            $("body").append(selectHtml);
        },
        bindEvent: function (ckg) {
            var self = this;
            document.querySelector("#selectCancel").addEventListener("touchend", function () {
                self.hide();
            }, false);

            document.querySelector("#selectConfirm").addEventListener("touchend", function () {
                if (ckg.sureFn) ckg.sureFn(self.currentIndex, self.currentValue);
                self.hide();
            }, false);


            $(".s-item").each(function (index) {
                var $this = $(this);
                $this.click(function () {
                    $(".s-item").removeClass("active");
                    $this.addClass("active");
                    self.currentIndex = index;
                    self.currentValue = $this.text();
                })
            });


        },
        show: function () {
            var $select = document.querySelector("#selectBox");
            $select.className = $select.className + " active";

        },
        hide: function () {
            var $select = document.querySelector("#selectBox");
            $select.parentNode.removeChild($select);
        }
    };

    picker.fn.init.prototype = picker.fn;

    window.picker = picker;
})(window, $);