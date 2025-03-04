let oldFieldIds = ["field242087", "field242066", "field242067", "field242069", "field242068", "field242070", "field242071", "field242073", "field242074", "field242095", "field242075", "field242347", "field242099"];
//                版本编号0          字段名称1      起用日期2        字段类别3      字段性质4      词典级别5      词典示范信息6    词典数据库7    词典查询网址8    词典附件9      数据源说明10    作废日期11        状态12
let newFieldIds = ["field242051", "field242052", "field242053", "field242055", "field242054", "field242077", "field242057", "field242078", "field242061", "field242058", "field242062", "field242346", "field242098"];

let oldDetFieldIds = ["field242100", "field242101", "field242119", "field242102", "field242103", "field242104", "field242841"];
//                      编号0           名称1          上级编号2       上级名称3      显示顺序4         状态5       备注6
let newDetFieldIds = ["field242040", "field242041", "field242120", "field242042", "field242043", "field242081", "field242044"];

mainFieldComparator(newFieldIds, oldFieldIds);
function mainFieldComparator(newFieldIds, oldFieldIds) {
    newFieldIds.forEach((id, index) => {
        let var1 = setInterval(() => {
            if ($(`${id}_swapDiv`).length > 0) {
                clearInterval(var1);
                fn1(index);
            }
        }, 50);
    });

    let newFieldIds_str = newFieldIds.join(",");
    WfForm.bindFieldChangeEvent(newFieldIds_str, function (obj, id, value) {
        let index = newFieldIds.indexOf(id);
        fn1(index);
    });

    function fn1(index) {
        let var1 = WfForm.getFieldValue(oldFieldIds[index]);
        let var2 = WfForm.getFieldValue(newFieldIds[index]);
        if (var1 == var2) {
            document.getElementsByClassName(newFieldIds[index] + "_swapDiv")[0].parentElement.style.background = '#fff';
        } else {
            document.getElementsByClassName(newFieldIds[index] + "_swapDiv")[0].parentElement.style.background = '#ccc';
        }
    }
}

detailFieldComparator(newDetFieldIds, oldDetFieldIds, 1);
function detailFieldComparator(newDetFieldIds, oldDetFieldIds, detnum) {
    let detRows_str = WfForm.getDetailAllRowIndexStr("detail_" + detnum);
    if (detRows_str.length > 0) {
        let detRows = detRows_str.split(",");
        detRows.forEach(rowIndex => {
            newDetFieldIds.forEach((id, index) => {
                let var1 = setInterval(() => {
                    if ($(`${id}_${rowIndex}_swapDiv`).length > 0) {
                        clearInterval(var1);
                        fn1(index, rowIndex);
                    }
                }, 50);
            });
        });
    }

    let newDetFieldIds_str = newDetFieldIds.join(",");
    WfForm.bindDetailFieldChangeEvent(newDetFieldIds_str, function (id, rowIndex, value) {
        let index = newDetFieldIds.indexOf(id);
        fn1(index, rowIndex);
    });

    function fn1(index, rowIndex) {
        let var1 = WfForm.getFieldValue(oldDetFieldIds[index] + "_" + rowIndex);
        let var2 = WfForm.getFieldValue(newDetFieldIds[index] + "_" + rowIndex);
        if (var1 == var2) {
            document.getElementsByClassName(newDetFieldIds[index] + "_" + rowIndex + "_swapDiv")[0].parentElement.style.background = '#fff';
        } else {
            document.getElementsByClassName(newDetFieldIds[index] + "_" + rowIndex + "_swapDiv")[0].parentElement.style.background = '#ccc';
        }
    }
}
