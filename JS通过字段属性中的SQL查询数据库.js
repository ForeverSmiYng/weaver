/*
SFP_myJSON参数需从已有流程字段属性设置中抓取，可通过查看网络请求的方式进行抓取
示例：
let myJSON = `{
    "workflowid":"71025",
    "nodeid": 109529,
    "formid": -1130,
    "isbill": 1,
    "triSource": 1,
    "showAI": 0,
    "triFieldid_117552": 113864,
    "rowIndexStr_117552": ${rowIndex},
    "triTableMark_117552": "detail_1",
    "field113864_${rowIndex}": ${rwdh2},
    "field113969_${rowIndex}": "${jbrwdh2}",
    "field113970_${rowIndex}": "${fhrwdh2}",
    "field113971_${rowIndex}": "${shrwdh2}",
    "field113972_${rowIndex}": "${scrwdh2}",
    "linkageid": 117552,
    "wfTestStr":  ""
    }`;
*/
/*
这是个异步函数，返回结果为promise，调用时需要加await前缀，以实现同步，即await selectByFieldProp(myJSON)
*/
async function selectByFieldPropSyn(SFP_myJSON) {
    try {
        let postObj = JSON.parse(SFP_myJSON);
        const response = await $.post("/api/workflow/linkage/reqFieldSqlResult", postObj);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}