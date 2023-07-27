import {baseComponent} from '@/data/chartJson'


const ENGLISH_LETTERS_REGEX = /[a-zA-Z]/i;

function deepCopy(obj) {
    if (!isObject(obj) && !isMap(obj)) {
        return obj;
    }

    let cloneObj;
    if (isMap(obj)) {
        cloneObj = new Map();
        for (let key of obj.keys()) {
            let value = obj.get(key);
            if (isMap(value) || isObject(value) || Array.isArray(obj)) {
                let copyVal = deepCopy(value);
                cloneObj.set(key, copyVal);
            } else {
                cloneObj.set(key, value);
            }
        }
    } else if (typeof obj === "function") {
        cloneObj = obj
    } else {
        cloneObj = Array.isArray(obj) ? [] : {};
        if (obj instanceof HTMLElement) {
            cloneObj = obj.cloneNode(true)
        } else {
            for (let key in obj) {

                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    cloneObj[key] =
                        isMap(obj[key]) || isObject(obj[key])
                            ? deepCopy(obj[key])
                            : obj[key];
                }
            }

        }
    }
    return cloneObj;
}

function isObject(o) {
    return (
        !isMap(o) &&
        (typeof o === 'object' || typeof o === 'function') &&
        o !== null
    );
}

function isMap(obj) {
    if (obj instanceof Map) {
        return true;
    } else {
        return false;
    }
}

const deepClone = function (obj, cache = []) {

    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}

    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache)
    })

    return copy
}

function generateRandomKey(prefix) {
    if (prefix == null) {
        prefix = 'chart'
    }

    var userAgent = window.navigator.userAgent
        .replace(/[^a-zA-Z0-9]/g, '')
        .split('')
    var mid = ''
    for (var i = 0; i < 12; i++) {
        mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))]
    }
    var time = new Date().getTime()

    return prefix + '_' + mid + '_' + time
}

function isdatetime(s) {
    if (s == null || s.toString().length < 5) {
        return false;
    } else if (checkDateTime(s)) {
        return true;
    } else {
        return false;
    }

    function checkDateTime(str) {
        var reg1 = /^(\d{4})-(\d{1,2})-(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;
        var reg2 = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/;

        if (!reg1.test(str) && !reg2.test(str)) {
            return false;
        }

        var year = RegExp.$1,
            month = RegExp.$2,
            day = RegExp.$3;

        if (year < 1900) {
            return false;
        }

        if (month > 12) {
            return false;
        }

        if (day > 31) {
            return false;
        }

        if (month == 2) {
            if (new Date(year, 1, 29).getDate() == 29 && day > 29) {
                return false;
            } else if (new Date(year, 1, 29).getDate() != 29 && day > 28) {
                return false;
            }
        }

        return true;
    }
}

function isRealNum(val) {
    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
}

function hasEnglishLetters(str) {
    return ENGLISH_LETTERS_REGEX.test(str);
}

function isdatatype(s) {
    var type = "string";
    if (isdatetime(s)) {
        type = "date";
    } else if (!isNaN(parseFloat(s)) && !hasEnglishLetters(s)) {
        type = "num";
    }
    return type;
}

function dataTranspose(getdata) {
    var arr = []
    for (var c = 0; c < getdata[0].length; c++) {
        var a = []
        for (var r = 0; r < getdata.length; r++) {
            var value = ''
            if (getdata[r] != null && getdata[r][c] != null) {
                value = getdata[r][c]
            }
            a.push(value)
        }
        arr.push(a)
    }
    return arr
}

function dataChangeOrder(data, order) {
    if (data.length == 0 || data.length != order.length) {
        return data
    }
    var ret = []
    for (var i = 0; i < data.length; i++) {
        ret[order[i]] = data[i]
    }
    return ret
}

function dataChangeOrderTwo(data, order) {
    var ret = []
    for (var r = 0; r < data.length; r++) {
        var d = data[r]
        ret.push(dataChangeOrder(d, order))
    }
    return ret
}

function getObjType(obj) {
    var toString = Object.prototype.toString;

    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }

    return map[toString.call(obj)];
}

function getRowColCheck(data) {

    var r = data.length - 1,
        c = data[0].length - 1
    var r_cal, c_cal
    while (r >= 0 && c >= 0) {
        var cell = data[r][c]

        if (
            cell === null ||
            isRealNum(cell) ||
            (getObjType(cell) == 'object' && isRealNum(cell.v)) ||
            (getObjType(cell) == 'object' &&
                getObjType(cell.v) == 'undefined') ||
            cell === '' ||
            cell.v === ''
        ) {
            if (cell && cell.ct && cell.ct.fa == 'yyyy-MM-dd') {
                r_cal = r + 1
                c_cal = c + 1
                break
            } else {
                r_cal = r--
                c_cal = c--
            }
        } else {
            if (r == data.length - 1 && c == data[0].length - 1) {
                r_cal = r
                c_cal = c
            } else {
                r_cal = r + 1
                c_cal = c + 1
            }
            break
        }
    }

    var rowcheck = {exits: false, range: [0, 0]}
    if (r_cal > 0) {
        for (var i = r_cal; i >= 0; i--) {
            var cell = data[i][c_cal]
            if (
                cell === null ||
                isRealNum(cell) ||
                (getObjType(cell) == 'object' && isRealNum(cell.v)) ||
                (getObjType(cell) == 'object' &&
                    getObjType(cell.v) == 'undefined') ||
                cell === '' ||
                cell.v === ''
            ) {
            } else {
                rowcheck.exits = true
                rowcheck.range = [0, i]
                break
            }
        }
    }

    var colcheck = {exits: false, range: [0, 0]}
    if (c_cal > 0) {
        for (var i = c_cal; i >= 0; i--) {
            var cell = data[r_cal][i]
            if (
                cell === null ||
                isRealNum(cell) ||
                (getObjType(cell) == 'object' && isRealNum(cell.v)) ||
                (getObjType(cell) == 'object' &&
                    getObjType(cell.v) == 'undefined') ||
                cell === '' ||
                cell.v === ''
            ) {
                if (cell && cell.ct && cell.ct.fa == 'yyyy-MM-dd') {
                    colcheck.exits = true
                    colcheck.range = [0, i]
                    break
                }
            } else {
                colcheck.exits = true
                colcheck.range = [0, i]
                break
            }
        }
    }

    if (rowcheck.range[1] + 1 == data.length) {
        rowcheck = {exits: false, range: [0, 0]}
    }
    if (colcheck.range[1] + 1 == data[0].length) {
        colcheck = {exits: false, range: [0, 0]}
    }

    return [rowcheck, colcheck]
}

function getRangeSplitArray(
    chartData,
    rangeArray,
    rangeColCheck,
    rangeRowCheck
) {
    var rangeSplitArray = {};

    if (rangeArray.length > 1) {

        rangeSplitArray = {
            title: {row: [0, 0], column: [0, 0]},
            rowtitle: {row: [0, 0], column: [1, chartData[0].length - 1]},
            coltitle: {row: [1, chartData.length - 1], column: [0, 0]},
            content: {
                row: [1, chartData.length - 1],
                column: [1, chartData[0].length - 1]
            },
            type: "multi",
            range: rangeArray
        };
    }

    if (rangeColCheck.exits && rangeRowCheck.exits) {
        rangeSplitArray = {
            title: {row: rangeRowCheck.range, column: rangeColCheck.range},
            rowtitle: {
                row: rangeRowCheck.range,
                column: [rangeColCheck.range[1] + 1, chartData[0].length - 1]
            },
            coltitle: {
                row: [rangeRowCheck.range[1] + 1, chartData.length - 1],
                column: rangeColCheck.range
            },
            content: {
                row: [rangeRowCheck.range[1] + 1, chartData.length - 1],
                column: [rangeColCheck.range[1] + 1, chartData[0].length - 1]
            },
            type: "normal",
            range: rangeArray[0]
        };
    } else if (rangeColCheck.exits) {

        rangeSplitArray = {
            title: null,
            rowtitle: null,
            coltitle: {
                row: [0, chartData.length - 1],
                column: rangeColCheck.range
            },
            content: {
                row: [0, chartData.length - 1],
                column: [rangeColCheck.range[1] + 1, chartData[0].length - 1]
            },
            type: "leftright",
            range: rangeArray[0]
        };
    } else if (rangeRowCheck.exits) {

        rangeSplitArray = {
            title: null,
            rowtitle: {
                row: rangeRowCheck.range,
                column: [0, chartData[0].length - 1]
            },
            coltitle: null,
            content: {
                row: [rangeRowCheck.range[1] + 1, chartData.length - 1],
                column: [0, chartData[0].length - 1]
            },
            type: "topbottom",
            range: rangeArray[0]
        };
    } else {
        rangeSplitArray = {
            title: null,
            rowtitle: null,
            coltitle: null,
            content: {
                row: [0, chartData.length - 1],
                column: [0, chartData[0].length - 1]
            },
            type: "contentonly",
            range: rangeArray[0]
        };
    }

    return rangeSplitArray;
}

function getChartCellData(r, c, d) {
    var value = null

    var cell = d[r][c]
    if (cell != null) {
        if (cell.v != null) {
            value = cell.v
        } else {
            value = cell
        }
    }

    if (value == undefined) {
        value = ''
    }
    return value
}

function getChartDataCache(
    chartData,
    rangeSplitArray,
    product,
    type,
    style,
    rangeConfigCheck
) {
    var ret = {}
    if (
        type == 'line' ||
        type == 'column' ||
        type == 'area' ||
        type == 'scatter' ||
        type == 'bar' ||
        type == 'pie' ||
        type == 'radar' ||
        type == 'funnel' ||
        type == 'gauge' ||
        type == 'map'
    ) {

        if (rangeConfigCheck) {
            if (rangeSplitArray.type == 'normal') {
                var rangeSA = rangeSplitArray

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle != null) {
                    ret.title = {

                        text: getChartCellData(
                            rangeSA.title.row[0],
                            rangeSA.title.column[0],
                            chartData
                        )
                    }

                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += '\n' + getChartCellData(r, c, chartData)
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        rtitleData.push(value)
                    }
                    ret.xAxis = rtitleData
                }

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        ctitleData.push(value.substr(1, value.length))
                    }
                    ret.label = ctitleData
                }

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }
            } else if (rangeSplitArray.type == 'leftright') {
                var rangeSA = rangeSplitArray

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        ctitleData.push(value.substr(1, value.length))
                    }
                    ret.label = ctitleData
                }

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {

                        text: 'Chart title'
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push(c + 1)
                    }
                    ret.xAxis = rtitleData
                }
            } else if (rangeSplitArray.type == 'topbottom') {
                var rangeSA = rangeSplitArray

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle != null) {
                    ret.title = {

                        text: 'Chart title'
                    }

                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += '\n' + getChartCellData(r, c, chartData)
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        rtitleData.push(value)
                    }
                    ret.xAxis = rtitleData
                }

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push('Series' + (r + 1))
                    }
                    ret.label = ctitleData
                }
            } else if (rangeSplitArray.type == 'contentonly') {
                var rangeSA = rangeSplitArray

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var c = content.column[0]; c <= content.column[1]; c++) {
                        var row = []
                        var i = 0
                        for (var r = content.row[0]; r <= content.row[1]; r++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (c == content.column[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {

                        text: 'Chart title'
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push(c + 1)
                    }
                    ret.xAxis = rtitleData
                }

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push('Series' + (r + 1))
                    }
                    ret.label = ctitleData
                }
            }
        } else {

            if (rangeSplitArray.type == 'normal') {
                var rangeSA = rangeSplitArray

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []

                if (rtitle != null) {
                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        rtitleData.push(value.substr(1, value.length))
                    }
                    ret.label = rtitleData
                }

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += '\n' + getChartCellData(r, c, chartData)
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        ctitleData.push(value)
                    }

                    ret.xAxis = ctitleData

                }

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }
            } else if (rangeSplitArray.type == 'leftright') {
                var rangeSA = rangeSplitArray

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle != null) {
                    for (var r = ctitle.row[0]; r <= ctitle.row[1]; r++) {
                        var value = ''
                        for (var c = ctitle.column[0]; c <= ctitle.column[1]; c++) {
                            value += '\n' + getChartCellData(r, c, chartData)
                        }
                        value = value.substr(1, value.length)
                        if (product == 'highcharts') {
                            value = value.replace(/\n/g, '<br/>')
                        }
                        ctitleData.push(value)
                    }
                    ret.xAxis = ctitleData
                }

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {
                        text: 'Chart title'
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push('Series' + (c + 1))
                    }
                    ret.label = rtitleData
                }
            } else if (rangeSplitArray.type == 'topbottom') {
                var rangeSA = rangeSplitArray

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle != null) {
                    ret.title = {
                        text: 'Chart title'
                    }

                    for (var c = rtitle.column[0]; c <= rtitle.column[1]; c++) {
                        var value = ''
                        for (var r = rtitle.row[0]; r <= rtitle.row[1]; r++) {
                            value += ' ' + getChartCellData(r, c, chartData)
                        }
                        rtitleData.push(value.substr(1, value.length))
                    }
                    ret.label = rtitleData
                }

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push(r + 1)
                    }
                    ret.xAxis = ctitleData
                }
            } else if (rangeSplitArray.type == 'contentonly') {
                var rangeSA = rangeSplitArray

                var content = rangeSA.content,
                    contentData = []
                if (content != null) {
                    var series_tpye = {}
                    for (var r = content.row[0]; r <= content.row[1]; r++) {
                        var row = []
                        var i = 0
                        for (var c = content.column[0]; c <= content.column[1]; c++) {
                            var value = getChartCellData(r, c, chartData)
                            row.push(value)

                            if (r == content.row[0]) {
                                series_tpye[i++] = isdatatype(value)
                            }
                        }
                        contentData.push(row)
                    }
                    ret.series = contentData

                    ret.series_tpye = series_tpye
                }

                var rtitle = rangeSA.rowtitle,
                    rtitleData = []
                if (rtitle == null) {
                    ret.title = {
                        text: 'Chart title'
                    }

                    for (var c = 0; c <= content.column[1] - content.column[0]; c++) {
                        rtitleData.push('Series' + (c + 1))
                    }
                    ret.label = rtitleData
                }

                var ctitle = rangeSA.coltitle,
                    ctitleData = []
                if (ctitle == null) {
                    for (var r = 0; r <= content.row[1] - content.row[0]; r++) {
                        ctitleData.push(r + 1)
                    }
                    ret.xAxis = ctitleData
                }
            }
        }
    }

    return ret
}

function getChartDataSeriesOrder(len) {
    var ret = {}
    ret.length = len
    for (var i = 0; i < len; i++) {
        ret[i] = i
    }
    return ret
}

function addDataToOption(
    defaultOptionIni,
    chartDataCache,
    chartDataSeriesOrder,
    chartPro,
    chartType,
    chartStyle,
    chartData
) {

    if (
        !!chartDataCache.xAxis && chartType != 'bar'
    ) {

        if (
            defaultOptionIni.axis.xAxisDown.data == null ||
            defaultOptionIni.axis.xAxisDown.data.length == 0 ||
            defaultOptionIni.axis.xAxisDown.data.length != chartDataCache.xAxis.length
        ) {
            defaultOptionIni.axis.xAxisDown.data = chartDataCache.xAxis

        } else {
            for (var i = 0; i < defaultOptionIni.axis.xAxisDown.data.length; i++) {
                var cell = defaultOptionIni.axis.xAxisDown.data[i]
                if (cell instanceof Object) {
                    cell.value = chartDataCache.xAxis[i]
                } else {
                    defaultOptionIni.axis.xAxisDown.data[i] = chartDataCache.xAxis[i]
                }
            }
        }
        defaultOptionIni.axis.xAxisDown.type = 'category'
        defaultOptionIni.axis.yAxisLeft.type = 'value'
    }

    if (
        chartPro == 'echarts' && chartType == 'bar'
    ) {
        if (
            defaultOptionIni.axis.yAxisLeft.data == null ||
            defaultOptionIni.axis.yAxisLeft.data.length == 0 ||
            defaultOptionIni.axis.yAxisLeft.data.length != chartDataCache.xAxis.length
        ) {
            defaultOptionIni.axis.yAxisLeft.data = chartDataCache.xAxis
        } else {
            for (var i = 0; i < defaultOptionIni.axis.yAxisLeft.data.length; i++) {
                var cell = defaultOptionIni.axis.yAxisLeft.data[i]
                if (cell instanceof Object) {
                    cell.value = chartDataCache.xAxis[i]
                } else {
                    defaultOptionIni.axis.yAxisLeft.data[i] = chartDataCache.xAxis[i]
                }
            }
        }
        defaultOptionIni.axis.yAxisLeft.type = 'category'
        defaultOptionIni.axis.xAxisDown.type = 'value'
    }

    if (!!chartDataCache.series) {

        var seriesData = dataTranspose(
            dataChangeOrderTwo(chartDataCache.series, chartDataSeriesOrder)
        )

        var legendData = dataChangeOrder(
            chartDataCache.label,
            chartDataSeriesOrder
        )
        defaultOptionIni.legend.data = legendData
        defaultOptionIni.seriesData = seriesData

        if (chartType == 'pie') {
            transformPie(defaultOptionIni, chartDataCache, seriesData, legendData, chartPro, chartType, chartStyle)

        } else if (chartType == 'line' || chartType == 'area' || chartType == 'bar' || chartType == 'column') {
            transformCommon(defaultOptionIni, seriesData, legendData, chartPro, chartType, chartStyle)
        }
    }

    return defaultOptionIni
}

function transformCommon(defaultOptionIni, seriesData, legendData, chartPro, chartType, chartStyle) {
    if (defaultOptionIni.series.length != seriesData.length) {
        defaultOptionIni.series = []
    }

    for (var i = 0; i < seriesData.length; i++) {
        if (defaultOptionIni.series[i] == null) {
            defaultOptionIni.series[i] = initCommon(defaultOptionIni.series[i], seriesData[i], legendData[i], chartPro, chartType, chartStyle)
        } else {
            defaultOptionIni.series[i] = editCommon(defaultOptionIni.series[i], seriesData[i], legendData[i], chartPro, chartType, chartStyle)
        }
    }

}

function initCommon(series, data, legendData, product, type, style) {
    series = {
        itemStyle: deepCopy(baseComponent.item),
        lineStyle: deepCopy(baseComponent.lineStyle),
        data,
        type,
        name: legendData,
        markPoint: {
            data: []
        },
        markLine: {
            data: []
        },
        markArea: {
            data: []
        }
    }
    let actions = new Map([
        ['line', initLine],
        ['area', initArea],
        ['bar', initBar],
        ['column', initColumn]
    ])
    return actions.get(type)(series, data, legendData, product, type, style)
}

function initLine(series, data, legendData, product, type, style) {
    if (style == 'smooth') {
        series.smooth = true
    }
    if (style == 'label') {
        series.label = {
            show: true,
            formatter: '{c}',
            fontSize: 10,
            distance: 1
        }
    }
    return series
}

function initArea(series, data, legendData, product, type, style) {
    series.type = 'line'
    series.areaStyle = {
        normal: {}
    }
    if (style == 'stack') {
        series.stack = '示例'
    }
    return series
}

function initColumn(series, data, legendData, product, type, style) {
    series.type = 'bar'
    if (style == 'stack') {
        series.stack = '示例'
    }
    return series
}

function initBar(series, data, legendData, product, type, style) {
    if (style == 'stack') {
        series.stack = '示例'
    }
    return series
}

function editCommon(series, data, legendData, product, type, style) {
    if (
        series.data == null ||
        series.data.length == 0 ||
        series.data.length != data.length
    ) {
        series.data = data
        series.name = legendData
        series.type = type
    } else {
        for (var a = 0; a < series.data.length; a++) {
            var cell = series.data[a]
            if (cell instanceof Object) {
                cell.value = data[a]
            } else {
                series.data[a] = data[a]
            }
        }
        series.name = legendData
        series.type = type
    }
    let actions = new Map([
        ['line', editLine],
        ['area', editArea],
        ['bar', editBar],
        ['column', editColumn]
    ])
    return actions.get(type)(series, data, legendData, product, type, style)
}

function editLine(series, data, legendData, product, type, style) {
    return series
}

function editArea(series, data, legendData, product, type, style) {
    series.type = 'line'
    return series
}

function editBar(series, data, legendData, product, type, style) {
    return series
}

function editColumn(series, data, legendData, product, type, style) {
    series.type = 'bar'
    return series
}

function transformPie(defaultOptionIni, chartDataCache, seriesData, legendData, chartPro, chartType, chartStyle) {
    defaultOptionIni.legend.data = []

    for (var i = 0; i < chartDataCache.xAxis.length; i++) {
        defaultOptionIni.legend.data.push({
            name: chartDataCache.xAxis[i],
            textStyle: {color: null},
            value: seriesData[0][i]
        })
    }

    for (var i = 0; i < seriesData.length; i++) {
        if (i > 0) {
            return
        }
        if (defaultOptionIni.series[i] == null) {
            defaultOptionIni.series[i] = initPie(defaultOptionIni.series[i], chartDataCache, seriesData[i], legendData[i], chartPro, chartType, chartStyle)
        } else {
            defaultOptionIni.series[i] = editPie(defaultOptionIni.series[i], chartDataCache, seriesData[i], legendData[i], chartPro, chartType, chartStyle)
        }
    }
}

function initPie(series, chartDataCache, seriesData, legendData, product, type, style) {
    let seriesObj = {
        name: legendData,
        type: 'pie',
        radius: ['0%', '75%'],
        data: [],
        dataLabels: {},
        seLabel: {},
        seLine: {}
    }

    for (let j = 0; j < seriesData.length; j++) {
        let value
        let name
        if (seriesData[j] > 0) {
            value = seriesData[j]
            name = chartDataCache.xAxis[j]
        } else if (seriesData[j] <= 0) {
            value = ''
            name = ''
        }
        seriesObj.data.push({
            value: value,
            name: name,
            label: {},
            labelLine: {
                lineStyle: {}
            },
            itemStyle: {}
        })
    }
    series = seriesObj
    series.roseType = false

    if (style == 'split') {
        for (var j = 0; j < series.data.length; j++) {
            series.data[j].selected = 'true'
            series.data[j].selectedOffset = 5
        }
    }

    if (style == 'ring') {
        series.radius = ['50%', '85%']
        series.avoidLabelOverlap = false
        series.label = {
            normal: {
                show: true,
                position: 'outside'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            }
        }
    }
    return series
}

function editPie(series, chartDataCache, seriesData, legendData, chartPro, chartType, chartStyle) {
    series.name = legendData

    for (let j = 0; j < seriesData.length; j++) {
        let value
        let name
        if (seriesData[j] > 0) {
            value = +seriesData[j]
            name = chartDataCache.xAxis[j]
        } else if (seriesData[j] <= 0) {
            value = ''
            name = ''
        }

        series.data[j].name = name
        series.data[j].value = value
        series.data[j].y = value

        if (series.data.length < seriesData.length) {
            for (let k = series.data.length; k < seriesData.length; k++) {
                series.data.push({
                    value,
                    name,
                    y: value
                })
            }
        }

        if (series.data.length > seriesData.length) {
            for (let i = seriesData.length; i < series.data.length; i++) {
                series.data[i].value = ''
                series.data[i].y = ''
                series.data[i].name = ''
            }
        }
    }
    return series
}

export {
    deepCopy,
    deepClone,
    generateRandomKey,
    getRowColCheck,
    getRangeSplitArray,
    getChartDataCache,
    getChartDataSeriesOrder,
    addDataToOption,
    transformCommon
}