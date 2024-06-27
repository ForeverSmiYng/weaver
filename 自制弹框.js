/*
说明：
第一个参数是点击ok按钮触发的function，第二个参数是关闭弹框触发的function，允许为null
tips是弹框的抬头，content是弹框内容，ok是确认按钮显示的内容
content参数是array，每一个array[i]代表单独一行
*/
window.opendiyModal(null, null, { tips: "XXXXXX", content: [`${tips}XXX XXX`, "XXX XXX"], ok: '了解' });