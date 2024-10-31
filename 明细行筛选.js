//浏览框或选择框字段的筛选功能函数
function myFilter(mainFieldIds, detFieldIds, det_id, comparators, emptyValues = undefined, mainFieldSeparators = undefined, detFieldSeparators = undefined, rows = undefined) {
    let all_rows_str = WfForm.getDetailAllRowIndexStr("detail_" + det_id);
    if (all_rows_str.length == 0) {
        //如果明细为空，函数结束
        return;
    }
    let all_rows = all_rows_str.split(",");
    let det_rowIndexs;
    if (rows == undefined) {
        det_rowIndexs = all_rows;
    } else {
        det_rowIndexs = rows;
    }
    let mainFieldValues = [];
    let new_detFieldIds = [];
    mainFieldIds.forEach((mfi, i) => {
        let mfi_value = WfForm.getFieldValue(mfi);
        if (mfi_value.length > 0) {
            mainFieldValues.push(mfi_value.split(mainFieldSeparators == undefined ? "," : mainFieldSeparators[i]).filter(e => e.length > 0));
            new_detFieldIds.push([detFieldIds[i], detFieldSeparators == undefined ? "," : detFieldSeparators[i], comparators[i], emptyValues == undefined ? undefined : emptyValues[i]]);
        }
    });
    //如果所有主表筛选字段均为空值，即无筛选，显示所有明细行，函数结束
    if (mainFieldValues.length == 0) {
        WfForm.controlDetailRowDisplay("detail_" + det_id, "all", false);
        return;
    }

    //逐行明细判断
    let oldCheckedRows = WfForm.getDetailCheckedRowIndexStr("detail_" + det_id).split(",");
    let newCheckedRows = [];
    det_rowIndexs.forEach(rowIndex => {
        if (all_rows.includes(rowIndex)) {
            //逐个筛选字段判断
            let check_res1 = false;
            let i = 0;
            for (const dfi of new_detFieldIds) {
                let dfi_values = WfForm.getFieldValue(dfi[0] + "_" + rowIndex);
                if (dfi_values.length == 0 && dfi[2] != "check框" && dfi[2] != "有无") {
                    //如果明细行对应字段为空,匹配失败，中止循环
                    check_res1 = true;
                    break;
                } else {
                    //如果明细行对应字段为非空，逐个判断是否在筛选范围内
                    let check_res2 = myFilterComparator(mainFieldValues[i], dfi_values, dfi[1], dfi[2], dfi[3]);
                    if (check_res2 == false) {
                        //匹配失败，中止循环
                        check_res1 = true;
                        break;
                    }
                }
                i++;
            }
            WfForm.controlDetailRowDisplay("detail_" + det_id, rowIndex + "", check_res1);
            if (check_res1 == false && oldCheckedRows.includes(rowIndex + "")) {
                newCheckedRows.push(rowIndex + "");
            }
        }
    });
    WfForm.checkDetailRow("detail_" + det_id, newCheckedRows.join(","), true);
}

function myFilterComparator(mainFV, detFV, detSeparators, index, emptyValue) {
    switch (index) {
        case "文本":
            for (const mfi_value of mainFV) {
                if (detFV.includes(mfi_value)) {
                    return true;
                }
            }
            return false;
        case "浏览框":
            for (const dfi_value of detFV.split(detSeparators).filter(e => e.length > 0)) {
                if (mainFV.includes(dfi_value)) {
                    return true;
                }
            }
            return false;
        case "选择框":
            for (const dfi_value of detFV.split(detSeparators).filter(e => e.length > 0)) {
                if (mainFV.includes(dfi_value)) {
                    return true;
                }
            }
            return false;
        case "有无":
            if (["0", "1", 0, 1].includes(emptyValue)) {
                if (detFV.length == 0) {
                    if (mainFV.includes(emptyValue + "")) {
                        return true;
                    }
                } else {
                    if (mainFV.includes(emptyValue + "" == "1" ? "0" : "1")) {
                        return true;
                    }
                }
            }
            return false;
        case "check框":
            if (["0", "1", 0, 1].includes(emptyValue)) {
                if (detFV == 0 || detFV.length == 0) {
                    if (mainFV.includes(emptyValue + "")) {
                        return true;
                    }
                } else {
                    if (mainFV.includes(emptyValue + "" == "1" ? "0" : "1")) {
                        return true;
                    }
                }
            }
            return false;
        default:
            for (const mfi_value of mainFV) {
                if (detFV.includes(mfi_value)) {
                    return true;
                }
            }
            return false;
    }
}