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
	WfForm.showMessage("请参考提示修正内容。", 1, 5);
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