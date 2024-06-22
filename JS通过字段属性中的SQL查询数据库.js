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
let postObj = JSON.parse(myJSON);
$.post("/api/workflow/linkage/reqFieldSqlResult", postObj);