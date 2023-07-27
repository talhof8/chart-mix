import {deepCopy} from '../utils/util';

const baseComponent = {
    label: {
        fontSize: 12,
        color: '#333',
        fontFamily: 'Lato',

        fontGroup: [],
        cusFontSize: 12,
    },
    formatter: {
        prefix: '',
        suffix: '',
        ratio: 1,
        digit: 'auto',
    },
    item: {
        color: null,
        borderColor: '#000',
        borderType: 'solid',
        borderWidth: 1
    },
    lineStyle: {
        color: null,
        width: 1,
        type: 'solid'
    }
};

const chartComponent = {
    title: {
        show: false,
        text: 'Default title',
        label: deepCopy(baseComponent.label),
        position: {
            value: 'left-top',
            offsetX: 40,
            offsetY: 50,
        },
    },

    subtitle: {
        show: false,
        text: '',
        label: deepCopy(baseComponent.label),
        distance: {
            value: 'auto',
            cusGap: 40,
        },
    },

    config: {
        color: 'transparent',
        fontFamily: 'Sans-serif',
        grid: {
            value: 'normal',
            top: 5,
            left: 10,
            right: 20,
            bottom: 10,
        },
    },

    legend: {
        show: true,
        selectMode: 'multiple',
        selected: [],
        label: deepCopy(baseComponent.label),
        position: {
            value: 'left-top',
            offsetX: 40,
            offsetY: 50,
            direction: 'horizontal',
        },
        width: {

            value: 'auto',
            cusSize: 25,
        },
        height: {

            value: 'auto',
            cusSize: 14,
        },
        distance: {
            value: 'auto',
            cusGap: 10,
        },
        itemGap: 10,
    },

    tooltip: {
        show: true,
        label: deepCopy(baseComponent.label),
        backgroundColor: 'rgba(50,50,50,0.7)',
        triggerOn: 'mousemove',
        triggerType: 'item',
        axisPointer: {

            type: 'line',
            style: {

                color: '#555',
                width: 'normal',
                type: 'solid',
            },
        },
        format: [],
        position: 'auto',
    },

    axis: {
        axisType: 'xAxisDown',
        xAxisUp: {
            show: false,
            title: {
                showTitle: false,
                text: '',
                nameGap: 15,
                rotate: 45,
                label: deepCopy(baseComponent.label),
                fzPosition: 'end',
            },
            name: 'Show axis',
            inverse: false,

            tickLine: {
                show: true,
                width: 1,
                color: 'auto',
            },

            tick: {
                show: true,
                position: 'outside',
                length: 5,
                width: 1,
                color: 'auto',
            },

            tickLabel: {
                show: true,
                label: deepCopy(baseComponent.label),
                rotate: 0,
                prefix: '',
                suffix: '',
                optimize: 0,
                distance: 0,
                min: 'auto',
                max: 'auto',
                ratio: 1,
                digit: 'auto',
            },

            netLine: {
                show: false,
                width: 1,
                type: 'solid',
                color: 'auto',
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
            },

            netArea: {
                show: false,
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto',
                colorTwo: 'auto',
            },
            axisLine: {

                onZero: false,
            },
        },
        xAxisDown: {
            show: true,
            title: {
                showTitle: false,
                text: '',
                nameGap: 15,
                rotate: 45,
                label: deepCopy(baseComponent.label),
                fzPosition: 'end',
            },
            name: 'Show axis',
            inverse: false,

            tickLine: {
                show: true,
                width: 1,
                color: 'auto',
            },

            tick: {
                show: true,
                position: 'outside',
                length: 5,
                width: 1,
                color: 'auto',
            },

            tickLabel: {
                show: true,
                label: deepCopy(baseComponent.label),
                rotate: 0,
                prefix: '',
                suffix: '',
                optimize: 0,
                distance: 0,
                min: null,
                max: null,
                ratio: 1,
                digit: 'auto',
            },

            netLine: {
                show: false,
                width: 1,
                type: 'solid',
                color: 'auto',
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
            },

            netArea: {
                show: false,
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto',
                colorTwo: 'auto',
            },
        },
        yAxisLeft: {
            show: true,
            title: {
                showTitle: false,
                text: '',
                nameGap: 15,
                rotate: 0,
                label: deepCopy(baseComponent.label),
                fzPosition: 'end',
            },
            name: 'Show axis',
            inverse: false,

            tickLine: {
                show: true,
                width: 1,
                color: 'auto',
            },

            tick: {
                show: true,
                position: 'outside',
                length: 5,
                width: 1,
                color: 'auto',
            },

            tickLabel: {
                show: true,
                label: deepCopy(baseComponent.label),
                rotate: 0,
                formatter: deepCopy(baseComponent.formatter),
                split: 5,
                min: null,
                max: null,
                prefix: '',
                suffix: '',
                ratio: 1,
                digit: 'auto',
                distance: 0,
            },

            netLine: {
                show: false,
                width: 1,
                type: 'solid',
                color: 'auto',
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
            },

            netArea: {
                show: false,
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto',
                colorTwo: 'auto',
            },
        },
        yAxisRight: {
            show: false,
            title: {
                showTitle: false,
                text: '',
                nameGap: 15,
                rotate: 0,
                label: deepCopy(baseComponent.label),
                fzPosition: 'end',
            },
            name: 'Show axis',
            inverse: false,

            tickLine: {
                show: true,
                width: 1,
                color: 'auto',
            },

            tick: {
                show: true,
                position: 'outside',
                length: 5,
                width: 1,
                color: 'auto',
            },

            tickLabel: {
                show: true,
                label: deepCopy(baseComponent.label),
                rotate: 0,
                formatter: deepCopy(baseComponent.formatter),
                split: 5,
                min: null,
                max: null,
                prefix: '',
                suffix: '',
                ratio: 1,
                digit: 'auto',
                distance: 0,
            },

            netLine: {
                show: false,
                width: 1,
                type: 'solid',
                color: 'auto',
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
            },

            netArea: {
                show: false,
                interval: {

                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto',
                colorTwo: 'auto',
            },
        },
    },
};

const positionOption = [
    {value: 'left-top', label: 'Left top'},
    {value: 'left-middle', label: 'Left middle'},
    {value: 'left-bottom', label: 'Left bottom'},
    {value: 'right-top', label: 'Right top'},
    {value: 'right-middle', label: 'Right middle'},
    {value: 'right-bottom', label: 'Right bottom'},
    {value: 'center-top', label: 'Center top'},
    {value: 'center-middle', label: 'Center middle'},
    {value: 'center-bottom', label: 'Center bottom'},
    {value: 'custom', label: 'Custom'},
];

const distanceOption = [
    {value: 'auto', label: 'Auto'},
    {value: 'far', label: 'Far'},
    {value: 'normal', label: 'Normal'},
    {value: 'close', label: 'Close'},
    {value: 'custom', label: 'Custom'},
];

const fontSizeOption = [
    {value: 6, label: '6px'},
    {value: 8, label: '8px'},
    {value: 10, label: '10px'},
    {value: 12, label: '12px'},
    {value: 14, label: '14px'},
    {value: 16, label: '16px'},
    {value: 18, label: '18px'},
    {value: 20, label: '20px'},
    {value: 22, label: '22px'},
    {value: 24, label: '24px'},
    {value: 30, label: '30x'},
    {value: 36, label: '36px'},
    {value: 'custom', label: 'Custom'},
];

const lineStyleOption = [
    {value: 'solid', label: 'Solid'},
    {value: 'dashed', label: 'Dashed'},
    {value: 'dotted', label: 'Dotted'},
];

const lineWeightOption = [
    {value: 'normal', label: 'Normal'},
    {value: 'bold', label: 'Bold'},
    {value: 'bolder', label: 'Bolder'},
];

const posOption = [
    {value: 'auto', label: 'Default'},
    {value: 'inside', label: 'Center'},
    {value: 'top', label: 'Top'},
    {value: 'left', label: 'Left'},
    {value: 'right', label: 'Right'},
    {value: 'bottom', label: 'Bottom'},
];

const ratioOption = [
    {value: 100, label: 'Multiply by 100'},
    {value: 10, label: 'Multiply by 10'},
    {value: 1, label: 'Default'},
    {value: 0.1, label: 'Divide by 10'},
    {value: 0.01, label: 'Divide by 100'},
    {value: 0.001, label: 'Divide by 1000'},
    {value: 0.0001, label: 'Divide by ten thousand'},
    {value: 0.00001, label: 'Divide by 100 thousand'},
    {value: 0.000001, label: 'Divide by one million'},
    {value: 0.0000001, label: 'Divide by ten million'},
    {value: 0.00000001, label: 'Divide by one hundred million'},
    {value: 0.000000001, label: 'Divide by one billion'},
];

const digitOption = [
    {value: 'auto', label: 'Auto display'},
    {value: 0, label: 'Integer'},
    {value: 1, label: '1 decimal place'},
    {value: 2, label: '2 decimal places'},
    {value: 3, label: '3 decimal places'},
    {value: 4, label: '4 decimal places'},
    {value: 5, label: '5 decimal places'},
    {value: 6, label: '6 decimal places'},
    {value: 7, label: '7 decimal places'},
    {value: 8, label: '8 decimal places'},
];

const sizeOption = [
    {value: 'auto', label: 'Auto'},
    {value: 'big', label: 'Big'},
    {value: 'medium', label: 'Medium'},
    {value: 'small', label: 'Small'},
    {value: 'custom', label: 'Custom'},
];

const intervalOption = [
    {value: 'auto', label: 'Auto'},
    {value: 0, label: 'Each interval'},
    {value: 1, label: 'Interval 1'},
    {value: 2, label: 'Interval 2'},
    {value: 3, label: 'Interval 3'},
    {value: 'custom', label: 'Custom'},
];

const fontSizeList = [
    {label: 'Default', value: 'auto'},
    {label: '6px', value: 6},
    {label: '8px', value: 8},
    {label: '10px', value: 10},
    {label: '12px', value: 12},
    {label: '14px', value: 14},
    {label: '16px', value: 16},
    {label: '18px', value: 18},
    {label: '24px', value: 24},
    {label: '28px', value: 28},
    {label: '36px', value: 36},
    {label: 'Custom', value: 'custom'},
];

const fontStyleIBV = {
        bold: {
            des: 'Bold',
            text: 'B',
        },
        italic: {
            des: 'Italic',
            text: 'I',
        },
        vertical: {
            des: 'Vertical Text',
            text: 'Vertical',
        },
    }
;

const fontStyleIB = {
    bold: {
        des: 'Bold',
        text: 'B',
    },
    italic: {
        des: 'Italic',
        text: 'I',
    },
};

const chartModelData = [];

const chartOptions = {

    chartAllType: 'echarts|line|default',

    defaultOption: deepCopy(chartComponent),

    chartData: deepCopy(chartModelData),
}

export {
    baseComponent,
    chartComponent,
    positionOption,
    distanceOption,
    fontSizeOption,
    lineStyleOption,
    lineWeightOption,
    posOption,
    ratioOption,
    digitOption,
    sizeOption,
    fontSizeList,
    intervalOption,
    fontStyleIBV,
    fontStyleIB,
    chartOptions
};