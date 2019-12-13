(function ($) {
    let html = '';
    const languageArr = ["EN", "ZHs", "TH", "AR","ZHt"];
    const selectPic = $("#select-pic");
    const selectCheck = $("#select-check");
    let OptionHtml = '<option value=""> </option>';
    let checkBoxArr = [];
    for (let i = 0; i < languageArr.length; i++) {
        OptionHtml += '<option value="' + i + '">' + languageArr[i] + '</option>';
    }
    selectPic.html(OptionHtml);
    getPicData();
    /*selectPic.on("change", function () {
        let _this = $(this);
        let val = _this.children('option:selected').val();
        console.log(val)
        if (val === '') {
            getPicData()
        } else {
            getPicData(val)
        }
    });*/

    selectCheck.on("change", function () {
        let _this = $(this);
        let val = _this.children('option:selected').val();
        if (val === "1") {
            showChecked(1)
        } else if (val === "0") {
            showChecked(0)
        } else {
            showChecked()
        }
    })
    $.fn.extend({
        checkbox: function () {
            return this.each(function (index) {
                var $this = $(this);

                if ($this.hasClass("on")) {

                    $this.siblings("input").prop("checked", "checked");
                } else {

                    $this.siblings("input").removeAttr("checked");
                }
                $this.on("click", function () {

                    if ($this.hasClass("on")) {

                        checkBoxArr = checkBoxArr.filter(function (item) {
                            return item != index
                        });
                        $this.siblings("input").removeAttr("checked");
                        $this.removeClass("on");
                        $this.closest(".checkbox_item").removeClass("on");
                    } else {

                        checkBoxArr.push(index)
                        $this.siblings("input").prop("checked", "checked");
                        $this.addClass("on");
                        $this.closest(".checkbox_item").addClass("on");
                    }
                    console.log(checkBoxArr)
                });
            });
        }
    });

    function showChecked(val) {
        let checkedEle = $(".checkbox_item");
        for (let i = 0; i < checkedEle.length; i++) {
            if (val === 1) {
                if ($(checkedEle[i]).hasClass("on")) {
                    $(checkedEle[i]).addClass("show").removeClass("hide")
                } else {
                    $(checkedEle[i]).addClass("hide").removeClass("show")
                }
            } else if (val === 0) {
                if ($(checkedEle[i]).hasClass("on")) {
                    $(checkedEle[i]).addClass("hide").removeClass("show")
                } else {
                    $(checkedEle[i]).addClass("show").removeClass("hide")
                }
            } else {
                $(checkedEle[i]).addClass("show").removeClass("hide")
            }

        }
    }

    function getPicData(type, change, arr) {
        $.ajax({
            "url": '/test_post/nn',
            "type": "GET",
            "dataType": "json",
            success: function (response) {
                console.log(response);
                if (response) {
                    if (!type) {
                        var eleHtml = $("#box").html();
                        for (let i = 0; i < response.length; i++) {
                            html += '<div class="checkbox_item clearfix">\
                                     <h1>' + Object.keys(response[i]) + '</h1>\
                                     <ul id=' + Object.keys(response[i]) + '>\
                                     </ul>\
                                 </div>';
                        }
                        if (!eleHtml) {
                            $("#box").html(html);
                        }
                    }
                    for (let i = 0; i < response.length; i++) {
                        var ht = '';
                        var imgArr = response[i][(Object.keys(response[i]))];
                        if (type) {
                            if (arr.length === 0) {
                                for (let j = 0; j < imgArr.length; j++) {
                                    console.log(imgArr[j]);
                                    ht += '<li><img src="static/img/' + Object.keys(response[i]) + "/" + imgArr[j] + '" alt=""></li>';
                                }
                            }else if (arr && arr.length !== 0) {
                                for (let n = 0; n < arr.length; n++) {
                                    ht += '<li><img src="static/img/' + Object.keys(response[i]) + "/" + imgArr[arr[n]] + '" alt=""></li>';
                                }
                            }else {
                                ht += '<li><img src="static/img/' + Object.keys(response[i]) + "/" + imgArr[type] + '" alt=""></li>';

                            }
                        }else {
                                for (let j = 0; j < imgArr.length; j++) {
                                    console.log(imgArr[j]);
                                    ht += '<li><img src="static/img/' + Object.keys(response[i]) + "/" + imgArr[j] + '" alt=""></li>';
                                }
                        }
                        let checkedEle = $(".checkbox_item");
                        if ($(checkedEle[i]).hasClass("on")) {
                            ht += '<input type="checkbox"><label class="check_label on"> <i class="checkbox_icon"></i> </label>';
                        } else {
                            ht += '<input type="checkbox"><label class="check_label"> <i class="checkbox_icon"></i> </label>';
                        }
                        if (change) {
                            if (arr.length === 0) {
                                $("#" + Object.keys(response[i])).html(ht);
                            } else {
                                $("#" + Object.keys(response[i])).html("");
                                $("#" + Object.keys(response[i])).append(ht);
                            }

                        } else {
                            $("#" + Object.keys(response[i])).html(ht);
                        }

                    }
                    $(".check_label").checkbox();
                }
            }
        })
    }

    window.getPicData = getPicData;
})(jQuery);
