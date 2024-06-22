/*
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
前端执行SQL查询语句
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function SelectByGSL() {
    const getUrl = '/api/gSl/GSl/gsl';
    const Query1 = `SELECT loginid as id,password as pw FROM hrmresource`;//编写SQL语句
    const jiami = ecCom.WeaTools.Base64.encode(Query1);
    const result1 = ecCom.WeaTools.Base64.encode("id,pw");//编写查询内容
    const mynewJSON = `{
                        "expression": "${jiami}",
                        "result": "${result1}"
                        }`;
    const result = await ecCom.WeaTools.callApi(getUrl, 'POST', JSON.parse(mynewJSON));
}
/*
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
前端执行SQL增、删、改语句
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function insertOrDeleteOrUpdateByGSL() {
    const getUrl = '/api/gSl/GSl/setTable';
    const Query1 = `update hrmresource set fieldname='123' where id='43' `;//编写SQL语句
    const jiami = ecCom.WeaTools.Base64.encode(Query1);
    const mynewJSON = `{
                        "expression": "${jiami}",
                        }`;
    const result = await ecCom.WeaTools.callApi(getUrl, 'POST', JSON.parse(mynewJSON));
}