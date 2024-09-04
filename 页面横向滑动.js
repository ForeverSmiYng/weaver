/*
每一步内容都必须存放在一个标签页，标签页横向排列，标签页前后各空出一列
每个标签都要在默认的style属性上设置为opacity:0，以默认隐藏步骤内容
每个步骤的内容默认隐藏
方法参数为对象：
{
    curStepFieldId: curStep_FI,
    cols: 5,
    title_class: ".title",
    title_value: ["OA开发需求", "流程开发需求", "台账开发需求"],
    vars: [{
        page: "tab1",
        cnt: "cnt1",
        top: 1,
        titleIndex: 0,
        mainTabCol: 1,
        default_tab: 5,
        tab_required_info: [
            {
                tabid: 5,
                main_feild: [xqlx_FI, cdfj_FI, ssbk_FI, glbm_FI, syjg_FI, sybm_FI, aim_FI],
                det_field: [],
            }
        ],
    }],
    els: ["title"],
}
curStepFieldId为当前步骤字段id
cols为表格有效范围内的列数
title_class为流程页面标题的jQuery选择器
title_value为所有步骤相关的标题名称
vars为每个步骤对应的一组参数，vars参数组顺序与标签页DOM节点顺序一致
其中第一组参数代表意思为：tab1为标签页class，cnt1为步骤一页面全部内容的统一class，top值1表示隐藏标签页顶部标签(0表示不隐藏)，titleIndex值0为该标签对应的标题名称在title_value中的序号(从0开始)，mainTabCol为标签页在主表中的列数(从0开始),default_tab为默认子标签,tab_required_info用于处理标签页内子标签的必填字段排查、必增明细排查
els为其他需要在方法中将display属性还原的单元格class

注意：
(1)当步骤发生变化时，需修改参数对象 sld_obj ，并执行一遍 initialization(sld_obj)的列宽设置
(2)这个方法需要结合以下CSS样式使用，以解决明细表头的问题
.excelDetailFixedHead {
    position: sticky !important;
    top: 0px !important;
}
*/
function pageLateralSlider(sld_obj) {
    document.getElementsByClassName("wf-req-top-button")[0].parentNode.parentNode.id = "submitBtn";
    $("#submitBtn").css("cssText", "display:none !important;");
    var steps = sld_obj.vars.length;
    let myIntv1 = setInterval(() => {
        //页面元素加载判断
        for (let i = 0; i < steps; i++) {
            if ($("." + sld_obj.vars[i].page).length === 0 || $("." + sld_obj.vars[i].cnt).length === 0) {
                return;
            }
        }
        for (let i = 0; i < sld_obj.els.length; i++) {
            if ($("." + sld_obj.els[i]).length === 0) {
                return;
            }
        }
        if ($("#buttonCell").length === 0) {
            return;
        }
        if ($(sld_obj.title_class + " span").length === 0) {
            return;
        }
        if ($(".excelMainTable>colgroup col").length !== sld_obj.cols) {
            return;
        }
        if ($(".wf-req-form").length === 0) {
            return;
        }
        if ($(".wf-req-top-button").length === 0) {
            return;
        }
        clearInterval(myIntv1);
        //自适应列宽            
        const screen_width = $(".wf-req-form")[0].offsetWidth;
        const padding_width = Math.floor(0.02 * screen_width);
        const content_width = screen_width - 2 * padding_width;
        Object.assign(sld_obj, {
            content_width: content_width,
        });
        $(".excelMainTable>colgroup col")[0].style.width = `${padding_width}px`;
        $(".excelMainTable>colgroup col")[sld_obj.cols - 1].style.width = `${padding_width}px`;
        initialization(sld_obj);
        //添加消除prompt的字段集
        Object.assign(sld_obj, {
            eraser_fis: [],
        });
        //获取当前步骤标题信息
        Object.assign(sld_obj, {
            curStep: 0,
        });
        var curStepVar = + WfForm.getFieldValue(sld_obj.curStepFieldId);
        //添加功能按钮        
        $("#buttonCell").append("<span class='ant-btn preStep' style='display:none;'>上一步</span><span class='step-blank' style='display:none;'>&emsp;&emsp;</span><span class='ant-btn nexStep' style='display:none;'>下一步</span>");
        //添加按钮功能
        pageLateralSliderClick(sld_obj);
        //显示其他需要还原display属性的单元格
        sld_obj.els.forEach(e => {
            $("." + e).css("display", "");
        });
        //显示当前步骤内容
        $("." + sld_obj.vars[0].cnt).css("display", "");
        $("." + sld_obj.vars[0].page).css("opacity", "1");
        $(".preStep").css({ "display": "none" });
        $(".step-blank").css({ "display": "none" });
        $(".nexStep").css({ "display": "inline" });
        $("#submitBtn").css("cssText", "display:none !important;");
        if (curStepVar > 0) {
            for (let i = 0; i < curStepVar; i++) {
                if (i === 0) {
                    $(".nexStep")[0].click();
                } else {
                    setTimeout(() => {
                        $(".nexStep")[0].click();
                    }, i * 500);
                }
            }
        }
    }, 100);
}

function initialization(init_obj) {
    //设置列宽
    let useful_cols = [];
    init_obj.vars.forEach(e => {
        useful_cols.push(e.mainTabCol);
    });
    for (let i = 1; i <= init_obj.cols - 2; i++) {
        if (useful_cols.includes(i)) {
            $(".excelMainTable>colgroup col")[i].style.width = `${init_obj.content_width}px`;
        } else {
            $(".excelMainTable>colgroup col")[i].style.width = `1px`;
        }
    }
    //隐藏标签页顶部标签
    init_obj.vars.forEach(e => {
        if (e.top === 1) {
            $("." + e.page + " .tab_top")[0].style.display = "none";
        }
    });
}

function pageLateralSliderClick(clc_obj) {
    var clc_content_width = clc_obj.content_width;
    $(".nexStep").off("click");
    $(".preStep").off("click");
    //点击事件
    var click_judg = 0;
    $(".nexStep").click(() => {
        if (click_judg === 0) {
            if (showEmptyRequiredField(clc_obj) == false) {
                return;
            }
            click_judg++;
            clc_obj.curStep++;
            $(clc_obj.title_class + " span")[0].innerHTML = clc_obj.title_value[clc_obj.vars[clc_obj.curStep].titleIndex];
            let offset = (clc_obj.vars[clc_obj.curStep].mainTabCol - 1 - clc_obj.curStep);
            clc_obj.vars.forEach((e, index) => {
                if (index !== clc_obj.curStep) {
                    anime({
                        targets: '.' + e.page,
                        translateX: - clc_obj.curStep * clc_content_width - offset,
                        opacity: 0,
                        duration: 500,
                        easing: 'easeInOutQuad',
                        complete: () => {
                            $("." + e.cnt).css("display", "none");
                            $("#tab_" + e.default_tab).click();
                        }
                    });
                }
            });
            $("." + clc_obj.vars[clc_obj.curStep].cnt).css("display", "");
            anime({
                targets: '.' + clc_obj.vars[clc_obj.curStep].page,
                translateX: - clc_obj.curStep * clc_content_width - offset,
                opacity: 1,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    $('.' + clc_obj.vars[clc_obj.curStep].cnt).css("display", "");
                }
            });
            if (clc_obj.curStep === 0) {
                $(".preStep").css({ "display": "none" });
                $(".step-blank").css({ "display": "none" });
                $(".nexStep").css({ "display": "inline" });
                $("#submitBtn").css("cssText", "display:none !important;");
            } else if (clc_obj.curStep === clc_obj.vars.length - 1) {
                $(".preStep").css({ "display": "inline" });
                $(".step-blank").css({ "display": "none" });
                $(".nexStep").css({ "display": "none" });
                $("#submitBtn").css("cssText", "display:inline-block !important;");
            } else {
                $(".preStep").css({ "display": "inline" });
                $(".step-blank").css({ "display": "inline" });
                $(".nexStep").css({ "display": "inline" });
                $("#submitBtn").css("cssText", "display:none !important;");
            }
            WfForm.changeFieldValue(clc_obj.curStepFieldId, { value: clc_obj.curStep });
            click_judg--;
        }
    });
    $(".preStep").click(() => {
        $(`.myprom`).remove();
        if (click_judg === 0) {
            click_judg++;
            clc_obj.curStep--;
            $(clc_obj.title_class + " span")[0].innerHTML = clc_obj.title_value[clc_obj.vars[clc_obj.curStep].titleIndex];
            let offset = (clc_obj.vars[clc_obj.curStep].mainTabCol - 1 - clc_obj.curStep);
            clc_obj.vars.forEach((e, index) => {
                if (index !== clc_obj.curStep) {
                    anime({
                        targets: '.' + e.page,
                        translateX: - clc_obj.curStep * clc_content_width - offset,
                        opacity: 0,
                        duration: 500,
                        easing: 'easeInOutQuad',
                        complete: () => {
                            $("." + e.cnt).css("display", "none");
                            $("#tab_" + e.default_tab).click();
                        }
                    });
                }
            });
            $("." + clc_obj.vars[clc_obj.curStep].cnt).css("display", "");
            anime({
                targets: '.' + clc_obj.vars[clc_obj.curStep].page,
                translateX: - clc_obj.curStep * clc_content_width - offset,
                opacity: 1,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    $('.' + clc_obj.vars[clc_obj.curStep].cnt).css("display", "");
                }
            });
            if (clc_obj.curStep === 0) {
                $(".preStep").css({ "display": "none" });
                $(".step-blank").css({ "display": "none" });
                $(".nexStep").css({ "display": "inline" });
                $("#submitBtn").css("cssText", "display:none !important;");
            } else if (clc_obj.curStep === clc_obj.vars.length - 1) {
                $(".preStep").css({ "display": "inline" });
                $(".step-blank").css({ "display": "none" });
                $(".nexStep").css({ "display": "none" });
                $("#submitBtn").css("cssText", "display:inline-block !important;");
            } else {
                $(".preStep").css({ "display": "inline" });
                $(".step-blank").css({ "display": "inline" });
                $(".nexStep").css({ "display": "inline" });
                $("#submitBtn").css("cssText", "display:none !important;");
            }
            WfForm.changeFieldValue(clc_obj.curStepFieldId, { value: clc_obj.curStep });
            click_judg--;
        }
    });
}

function showEmptyRequiredField(serf_obj) {
    let serf_arr = serf_obj.vars[serf_obj.curStep].tab_required_info;
    for (let e of serf_arr) {
        for (let me of e.main_feild) {
            if (WfForm.getFieldValue(me) == "") {
                $(`.myprom`).remove();
                showPrompt(me, "必填字段不能空！", e.tabid);
                checkPrompt();
                if (!serf_obj.eraser_fis.includes(me)) {
                    serf_obj.eraser_fis.push(me);
                    WfForm.bindFieldChangeEvent(me, function (obj, id, value) {
                        if (value !== "") {
                            eraseFieldPrompt(me);
                        }
                    });
                }
                return false;
            }
        }
        for (let de of e.det_field) {
            let detRows_str = WfForm.getDetailAllRowIndexStr("detail_" + de.det_id);
            if (detRows_str.length > 0) {
                let detRows_arr = detRows_str.split(",");
                for (let rowI of detRows_arr) {
                    for (let de_f of de.field_id) {
                        if (WfForm.getFieldValue(de_f + "_" + rowI) == "") {
                            $(`.myprom`).remove();
                            showPrompt(de_f, "必填字段不能空！", e.tabid, rowI);
                            checkPrompt();
                            if (!serf_obj.eraser_fis.includes(de_f)) {
                                serf_obj.eraser_fis.push(de_f);
                                WfForm.bindDetailFieldChangeEvent(de_f, function (id, rowIndex, value) {
                                    if (value !== "") {
                                        eraseFieldPrompt(de_f, rowIndex);
                                    }
                                });
                            }
                            return false;
                        }
                    }
                }
            } else if (de.noEmpty == true) {
                WfForm.showMessage(de.det_name + "不能为空！", 2, 5);
                return false;
            }
        }
    }
    return true;
}

function showPrompt(SP_fieldid, SP_content, SP_tabid, SP_rowIndex) {//添加提示,SP_rowIndex选填；如要填SP_rowIndex，SP_tabid必填，可填null
    if (SP_rowIndex === null || SP_rowIndex === undefined) {
        $(`.myprom_${SP_fieldid}`).remove();
        if ($(`.${SP_fieldid}_swapDiv`).length > 0) {
            $(`.${SP_fieldid}_swapDiv`).after(`<div class="prompt-box myprom myprom_${SP_fieldid}" data_tab_id=${SP_tabid}><div class="prompt-arrow" style="top: -3px;"></div><div class="prompt-content"><i class="anticon anticon-exclamation-circle"></i><span class="prompt-content-label">${SP_content}</span><span class="prompt-content-info"></span></div></div>`);
        }
    } else {
        $(`.myprom_${SP_fieldid}_${SP_rowIndex}`).remove();
        if ($(`.${SP_fieldid}_${SP_rowIndex}_swapDiv`).length > 0) {
            $(`.${SP_fieldid}_${SP_rowIndex}_swapDiv`).after(`<div class="prompt-box myprom myprom_${SP_fieldid}_${SP_rowIndex}" data_tab_id=${SP_tabid}><div class="prompt-arrow" style="top: -3px;"></div><div class="prompt-content"><i class="anticon anticon-exclamation-circle"></i><span class="prompt-content-label">${SP_content}</span><span class="prompt-content-info"></span></div></div>`);
        }
    }
}

function eraseFieldPrompt(EFP_fieldid, EFP_rowIndex) {//移除提示,SP_rowIndex选填
    if (EFP_rowIndex === null || EFP_rowIndex === undefined) {
        $(`.myprom_${EFP_fieldid}`).remove();
    } else {
        $(`.myprom_${EFP_fieldid}_${EFP_rowIndex}`).remove();
    }
}

function checkPrompt() {//提交前判断，先做一次if ($(".myprom").length > 0) {}判断，true则触发该方法，并禁断提交，false不执行
    let tab_id = $(".myprom")[0].getAttribute("data_tab_id");
    if (tab_id === "null" || tab_id === "undefined") {
        let scroll_to_windowTop = $(".wf-req-form-scroll")[0].getBoundingClientRect().top;//scroll框距离window顶部的距离
        let dom_to_scrollTop = $(".myprom")[0].getBoundingClientRect().top - scroll_to_windowTop;//DOM节点距离scroll框顶部的距离
        let scroll_display_height = window.innerHeight - scroll_to_windowTop;//scroll框最大显示高度
        if (dom_to_scrollTop < scroll_display_height / 4 || dom_to_scrollTop > scroll_display_height / 4 * 3) {
            $(".wf-req-form-scroll")[0].scrollTo({
                top: dom_to_scrollTop + $(".wf-req-form-scroll")[0].scrollTop - scroll_display_height / 2,
                behavior: "smooth"
            });
        }
    } else {
        $("#tab_" + tab_id)[0].click();
        let myInterval2;
        myInterval2 = setInterval(() => {
            if ($("#tab_" + tab_id + "_content").css("display") == "block") {
                clearInterval(myInterval2);
                let scroll_to_windowTop = $(".wf-req-form-scroll")[0].getBoundingClientRect().top;//scroll框距离window顶部的距离
                let dom_to_scrollTop = $(".myprom")[0].getBoundingClientRect().top - scroll_to_windowTop;//DOM节点距离scroll框顶部的距离
                let scroll_display_height = window.innerHeight - scroll_to_windowTop;//scroll框最大显示高度
                if (dom_to_scrollTop < scroll_display_height / 4 || dom_to_scrollTop > scroll_display_height / 4 * 3) {
                    $(".wf-req-form-scroll")[0].scrollTo({
                        top: dom_to_scrollTop + $(".wf-req-form-scroll")[0].scrollTop - scroll_display_height / 2,
                        behavior: "smooth"
                    });
                }
            }
        }, 50);
    }
}