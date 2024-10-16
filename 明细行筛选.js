//浏览框或选择框字段的筛选功能函数
function exactlyFilterForBrowserOrSelector(mainFieldIds, detFieldIds, det_id, rows = undefined) {
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
            mainFieldValues.push(mfi_value.split(","));
            new_detFieldIds.push(detFieldIds[i]);
        }
    });
    //如果所有主表筛选字段均为空值，即无筛选，显示所有明细行，函数结束
    if (mainFieldValues.length == 0) {
        WfForm.controlDetailRowDisplay("detail_" + det_id, "all", false);
        return;
    }
    //逐行明细判断
    det_rowIndexs.forEach(rowIndex => {
        if (all_rows.includes(rowIndex)) {
            //逐个筛选字段判断
            let check_res1 = false;
            let i = 0;
            for (const dfi of new_detFieldIds) {
                let dfi_values = WfForm.getFieldValue(dfi + "_" + rowIndex);
                if (dfi_values.length == 0) {
                    //如果明细行对应字段为空,匹配失败，中止循环
                    check_res1 = true;
                    break;
                } else {
                    //如果明细行对应字段为非空，逐个判断是否在筛选范围内
                    let check_res2 = false;
                    for (const dfi_value of dfi_values.split(",")) {
                        if (mainFieldValues[i].includes(dfi_value)) {
                            //如果明细行对应字段值在筛选范围，中止最近循环
                            check_res2 = true;
                            break;
                        }
                    }
                    if (check_res2 == false) {
                        //匹配失败，中止循环
                        check_res1 = true;
                        break;
                    }
                }
                i++;
            }
            WfForm.controlDetailRowDisplay("detail_" + det_id, rowIndex + "", check_res1);
        }
    });
}