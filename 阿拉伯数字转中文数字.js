function ArabicToChinese(Arabic_numerals) {
    let strI = String(Arabic_numerals);
    let mixNumerals = "";
    let positionArr = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];
    for (let j = 1; j <= strI.length; j++) {
        let poistion = (strI.slice(-j)[0] == 0 && positionArr[j - 1] !== "万" && positionArr[j - 1] !== "亿") ? "" : positionArr[j - 1];
        let strIJ = (strI.slice(-j)[0] == 0 && (positionArr[j - 1] == "万" || positionArr[j - 1] == "亿")) ? "" : strI.slice(-j)[0];
        mixNumerals = strIJ + poistion + mixNumerals;
    }
    for (let j = Math.floor((strI.length - 1) / 4); j >= 1; j--) {
        if (j % 2 !== 0) {
            let regExp1 = new RegExp(`000+${positionArr[j * 4]}`, "g");
            mixNumerals = mixNumerals.replaceAll(regExp1, "");
        }
        let regExp2 = new RegExp(`0+${positionArr[j * 4]}`, "g");
        mixNumerals = mixNumerals.replaceAll(regExp2, `${positionArr[j * 4]}0`);
    }
    mixNumerals = mixNumerals.replaceAll(/00+/g, "0");
    mixNumerals = mixNumerals.replace(/^1十/, "十");
    mixNumerals = mixNumerals.replace(/0+$/, "");
    mixNumerals = mixNumerals.replace(/[0-9]/g, match => {
        const chineseNumerals = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return chineseNumerals[parseInt(match)];
    });
    return mixNumerals;
}