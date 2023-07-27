let obj = {
    'chartSetting': {
        data: 'Data',
        chartType: 'Chart type',
        transpose: 'Transpose (switch row/column)',
        row1: 'Set number',
        row2: 'row as title',
        column1: 'Set number',
        column2: 'column as title',
        style: 'Style',
        echarts: {
            line: {
                default: 'Basic Line',
                smooth: 'Smoothed Line',
                label: 'Line with Label'
            },
            area: {
                default: 'Basic Area',
                stack: 'Stacked Area'
            },
            column: {
                default: 'Basic Column',
                stack: 'Stacked Column'
            },
            bar: {
                default: 'Basic Bar',
                stack: 'Stacked Bar'
            },
            pie: {
                default: 'Basic Pie',
                split: 'Split Pie',
                ring: 'Doughnut Pie'
            }
        }
    },
    'chartTitle': {
        modalName: 'Title Settings',
        show: 'Show title',
        text: 'Content',
        placeholder: 'Enter the title',
        label: 'Label style',
        position: 'Position',
        offsetL: 'Slide to change offsetLeft',
        offsetT: 'Slide to change offsetTop'
    },
    'chartSubTitle': {
        modalName: 'Subtitle settings',
        placeholder: 'Enter the title',
        text: 'Content',
        label: 'Label style',
        gap: 'The gap between the main title and subtitle',
        content: 'Slide to change gap'
    },
    'chartAxis': {
        modalName: 'XY-Axis settings',
        select: 'Select axis',
        text: 'Title content',
        placeholder: 'Enter title content',
        label: 'Label style',
        align: 'Text align',
        reverse: 'Invert the axis',
        content: 'Slide to change interval',
        interval: 'Interval for axis',
        content1: 'Slide to change gap',
        gap: 'Gap between name and line',
        content2: 'Slide to change rotation',
        title: 'Rotation of axis name',
        showLine: 'Show axis line',
        content3: 'Slide to change line width',
        lineWidth: 'Line width',
        lineColor: 'Line color',
        showTick: 'Show tick',
        position: 'Tick position',
        content4: 'Slide to change tick length',
        tickLength: 'Tick Length',
        content5: 'Slide to change tick width',
        tickWidth: 'Tick Width',
        tickColor: 'Tick Color',
        showLabel: 'Show axis label',
        content6: 'Slide to change rotation',
        rotate: 'Rotation of axis label',
        content7: 'Enter min value',
        min: 'MinValue',
        content8: 'Enter max value',
        max: 'MaxValue',
        ratio: 'Scale value',
        digit: 'Decimal digits',
        content9: 'Enter prefix',
        prefix: 'Prefix',
        content10: 'Enter suffix',
        suffix: 'Suffix',
        showNet: 'Show split line',
        content11: 'Slide to change line width',
        netWidth: 'Split line line width',
        netType: 'Split line type',
        netColor: 'Split line color',
        netInterval: 'Interval of axis split line',
        content12: 'Slide to change interval',
        showArea: 'Show splitArea',
        areaInterval: 'Interval of axis split area',
        area1: 'Area One',
        area2: 'Area Two',
    },
    'chartLegend': {
        modalName: 'Legend Settings',
        show: 'Show legend',
        label: 'label style',
        position: 'Position',
        contentH: 'Slide to change ox',
        contentV: 'Slide to change oy',
        direction: 'Direction',
        width: 'Item width',
        height: 'Item height',
        contentWidth: 'Slide to change height',
        contentHeight: 'Slide to change width',
        gap: 'The distance between each legend',
        contentGap: 'Slide to change these gap'
    },
    'chartCursor': {
        modalName: 'Tooltip Settings',
        show: 'Show tooltip',
        label: 'Label style',
        background: 'Background color',
        trigger: 'Conditions to trigger',
        type: 'Type of triggering',
        lineType: 'line type',
        lineWidth: 'line width',
        color: 'line color',
        axisType: 'Indicator type',
        position: 'Position',
        suffix: 'Suffix of tooltip',
        placeholder: 'Suffix',
        ratio: 'Scale value',
        digit: 'Decimal digits'
    }
}

export default obj