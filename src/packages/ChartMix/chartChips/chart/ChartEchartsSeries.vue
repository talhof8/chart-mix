<template>
  <el-collapse-item name="9" title="Series">
    <!-- Series设置 -->

    <el-row>
      <el-col :span="1">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="6" class="title">Series Settings</el-col>
      <el-col :span="10">
        <el-select size="mini" v-model="seriesValue">
          <el-option :key="i" :label="item" :value="item" v-for="(item , i) in seriesOption"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">Type</el-col>
      <el-col :span="6">
        <el-select size="mini" v-model="type">
          <el-option
            :key="i"
            :label="item.label"
            :value="item.value"
            v-for="(item , i) in typeOption"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-show="seriesValue != 'General Settings'">
      <el-row style="margin-top: 15px;">
        <el-col :span="6">鼠标提示显示格式</el-col>
        <el-col :span="6">
          <el-select @change="extpFormat" size="mini" v-model="series.tpFormat">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in tpFormatOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">Mouse tooltip format</el-col>
        <el-col :span="6">
          <el-select @change="extpFormat" size="mini" v-model="series.tpDigit">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueDigitOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select @change="extpFormat" size="mini" v-model="series.tpRatio">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueRatioOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input @change="extpFormat" size="mini" v-model="series.tpText"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">Y axis primary and secondary coordinates</el-col>
      <el-col :span="10">
        <el-radio-group @change="exAxis" size="mini" v-model="series.radio">
          <el-radio-button :label="0">Primary axis (left side)</el-radio-button>
          <el-radio-button :label="1">Secondary axis (right side)</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;" v-show="chart_pro=='echarts'&&chart_type=='column'&&chart_style=='doubleX'">
      <el-col :span="6">X axis primary and secondary coordinates</el-col>
      <el-col :span="10">
        <el-radio-group @change="exXAxis" size="mini" v-model="series.xradio">
          <el-radio-button :label="0">Primary axis (lower side)</el-radio-button>
          <el-radio-button :label="1">Secondary axis (upper side)</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="3">
        <el-button @click="addLevel">Click to add level</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">Polling type</el-col>
      <el-col :span="6">
        <el-switch
          @change="excirculation"
          active-color="#13ce66"
          inactive-color="#d8d8d8"
          v-model="comCirculation.start"
        ></el-switch>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="6">Polling interval</el-col>
      <el-col :span="6">
        <el-input @change="excirculation" size="mini" v-model="comCirculation.time"></el-input>秒
      </el-col>
    </el-row>
    <!-- 折线图设置 -->
    <div v-show="type == 'line'">
      <el-row style="margin-top: 15px;">
        <el-col :span="4">Line</el-col>
        <el-col :span="5">
          <el-select @change="exlineWidth" size="mini" v-model="series.lineWidth">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item, i) in lineWidthOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select @change="exlineType" size="mini" v-model="series.lineType">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item, i) in lineTypeOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-checkbox-group @change="exlineStyle" size="mini" v-model="series.lineStyle">
            <el-checkbox-button label="step">Steps</el-checkbox-button>
            <el-checkbox-button label="smooth">Smooth</el-checkbox-button>
          </el-checkbox-group>
        </el-col>
        <el-col :span="2">
          <gradient-picker @change="exlineColor" size="mini" v-model="series.lineColor"></gradient-picker>
        </el-col>
      </el-row>
      <el-row v-show="series.lineWidth == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusLineWidth"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cuslineWidth"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">Data point</el-col>
        <el-col :span="3">
          <el-switch
            @change="exshowSymbol"
            active-color="#13ce66"
            inactive-color="#d8d8d8"
            v-model="series.showSymbol"
          ></el-switch>
        </el-col>
        <el-col :span="5">
          <el-select @change="exsymbolSize" size="mini" v-model="series.symbolSize">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in symbolSizeOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select @change="exsymbol" size="mini" v-model="series.symbol">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in symbolOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <gradient-picker @change="exitemColor" size="mini" v-model="series.itemColor"></gradient-picker>
        </el-col>
      </el-row>
      <el-row v-show="series.symbolSize == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusSymbolSize"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusSymbolSize"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
    </div>
    <!-- 柱状图设置 -->
    <div v-show="type == 'bar' || type == 'pictorialBar'">
      <el-row style="margin-top: 15px;">
        <el-col :span="6">Bar color</el-col>
        <el-col :span="3">
          <gradient-picker @change="exbarColor" size="mini" v-model="series.barColor"></gradient-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">Bar width</el-col>
        <el-col :span="6">
          <el-select @change="exbarWidth" size="mini" v-model="series.barWidth">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barWidthOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barWidth == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusBarWidth"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarWidth"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="type == 'bar'">
        <el-col :span="6">Bar corner radius</el-col>
        <el-col :span="8">
          <el-select @change="exborderRadius" size="mini" v-model="series.borderRadius">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in radiusOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div v-show="series.borderRadius == 'custom'">
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="Slide to modify the size of the upper left corner" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius1"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="Swipe to modify the size of the upper right corner" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius2"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="Slide to modify the size of the lower left corner" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius3"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="Swipe to modify the size of the lower right corner" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excusBorderRadius"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.radius4"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">px</el-col>
        </el-row>
      </div>
      <el-row style="margin-top: 15px;" v-show="type == 'pictorialBar'">
        <el-col :span="6">Bar shape</el-col>
        <el-col :span="6">
          <el-select @change="exsymbol1" size="mini" v-model="series.symbol1">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in symbolOption1"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">Bar minimum height</el-col>
        <el-col :span="6">
          <el-select @change="exbarMinHeight" size="mini" v-model="series.barMinHeight">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barMinHeightOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barMinHeight == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :show-input-controls="false"
              @change="excusBarMinHeight"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarMinHeight"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="!chart_style.includes('stack')">
        <el-col :span="8">Bar gap</el-col>
        <el-col :span="6">
          <el-select @change="exbarGap" size="mini" v-model="series.barGap">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barGapOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barGap == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusBarGap"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarGap"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">%</el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="8">Bar category gap</el-col>
        <el-col :span="6">
          <el-select @change="exbarCategoryGap" size="mini" v-model="series.barCategoryGap">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barCategoryGapOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-show="series.barCategoryGap == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusbarCategoryGap"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusbarCategoryGap"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">%</el-col>
      </el-row>
    </div>
    <!-- 数据标签 -->
    <el-row style="margin-top: 15px;">
      <el-col :span="1">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="6" class="title">Show data labels</el-col>
      <el-col :span="17">
        <el-switch
          @change="exshowLabel"
          active-color="#13ce66"
          inactive-color="#d8d8d8"
          v-model="series.showLabel"
        ></el-switch>
      </el-col>
    </el-row>
    <div v-show="series.showLabel">
      <el-row style="margin-top: 15px;">
        <el-col :span="6">Label display format</el-col>
        <el-col :span="10">
          <el-select @change="exformatter" size="mini" v-model="series.formatter">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in formatterOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">Decimal places</el-col>
        <el-col :span="6">
          <el-select @change="exvalueDigit" size="mini" v-model="series.valueDigit">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueDigitOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">Value ratio</el-col>
        <el-col :span="6">
          <el-select @change="exvalueRatio" size="mini" v-model="series.valueRatio">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in valueRatioOption"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">Prefix value</el-col>
        <el-col :span="18">
          <el-input @change="exprefixVal" size="mini" v-model="series.prefixVal"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" class="title">Suffix value</el-col>
        <el-col :span="18">
          <el-input @change="exsuffixVal" size="mini" v-model="series.suffixVal"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="5">
          <el-tooltip :open-delay="500" content="Label position" placement="top">
            <el-select @change="extextPos" size="mini" v-model="series.textPos">
              <el-option
                :key="i"
                :label="item.label"
                :value="item.value"
                v-for="(item , i) in textPosOption"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-col>
        <el-col :span="5">
          <el-checkbox-group @change="exfontPlace" size="mini" v-model="series.fontPlace">
            <el-checkbox-button label="bold">B</el-checkbox-button>
            <el-checkbox-button label="italic" style="fontStyle: italic;">I</el-checkbox-button>
          </el-checkbox-group>
        </el-col>
        <el-col :span="5">
          <el-select @change="exfontSize" size="mini" v-model="series.fontSize">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item , i) in fontSizeOption"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <gradient-picker :label="true" @change="exfzColor" size="mini" v-model="series.fzColor"></gradient-picker>
        </el-col>
      </el-row>
      <div v-show="series.textPos == 'custom'">
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="Swipe to modify the horizontal distance" placement="top">
              <el-slider
                :max="500"
                :min="-200"
                :show-input-controls="false"
                @change="exoffset"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.offsetX"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">%</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-tooltip :open-delay="500" content="Swipe to modify the vertical distance" placement="top">
              <el-slider
                :max="200"
                :min="-200"
                :show-input-controls="false"
                @change="exoffset"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.offsetY"
              ></el-slider>
            </el-tooltip>
          </el-col>
          <el-col :span="1" class="input_content">%</el-col>
        </el-row>
      </div>
      <el-row v-if="series.fontSize == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-tooltip :open-delay="500" content="Swipe to modify font size" placement="top">
              <el-slider
                :show-input-controls="false"
                @change="excustomSize"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.customSize"
              ></el-slider>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">文字对齐方式</el-col>
        <el-col :span="5">
          <el-tooltip :open-delay="500" content="Text horizontal alignment" placement="top">
            <el-select @change="exalign" size="mini" v-model="series.align">
              <el-option
                :key="i"
                :label="item.label"
                :value="item.value"
                v-for="(item , i) in alignOption"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-col>
        <el-col :span="5">
          <el-tooltip :open-delay="500" content="Text vertical alignment" placement="top">
            <el-select @change="exverticalAlign" size="mini" v-model="series.verticalAlign">
              <el-option
                :key="i"
                :label="item.label"
                :value="item.value"
                v-for="(item , i) in verticalAlignOption"
              ></el-option>
            </el-select>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row v-show="series.verticalAlign == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusAlign"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusAlignX"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
      <el-row v-show="series.verticalAlign == 'custom'">
        <el-col :span="22">
          <div class="input">
            <el-slider
              :min="-100"
              :show-input-controls="false"
              @change="excusAlign"
              input-size="mini"
              show-input
              style="padding-left: 10px;"
              v-model="series.cusAlignY"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="1" class="input_content">px</el-col>
      </el-row>
    </div>
    <!-- 堆叠图 -->
    <div v-show="chart_style != 'costComposition' && type != 'pictorialBar'">
      <el-row style="margin-top: 15px;">
        <el-col :span="1">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="6" class="title">Set as a stacked chart</el-col>
        <el-col :span="17">
          <el-switch
            @change="exStack"
            active-color="#13ce66"
            inactive-color="#d8d8d8"
            v-model="series.showStack"
          ></el-switch>
        </el-col>
      </el-row>
      <div v-show="series.showStack">
        <el-row style="margin-top: 15px;">
          <el-col :span="6" class="title">Stack name</el-col>
          <el-col :span="17">
            <el-input @change="exstackValue" size="mini" v-model="series.stackValue"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px;" v-show="type == 'bar'">
          <el-col :span="6" class="title">Gap between categories</el-col>
          <el-select @change="exbarCategoryGap " size="mini" v-model="series.barCategoryGap">
            <el-option
              :key="i"
              :label="item.label"
              :value="item.value"
              v-for="(item,i) in barCategoryGapOption"
            ></el-option>
          </el-select>
        </el-row>
        <el-row v-show="series.barCategoryGap == 'custom'">
          <el-col :span="22">
            <div class="input">
              <el-slider
                :min="-100"
                :show-input-controls="false"
                @change="excusBarCategoryGap"
                input-size="mini"
                show-input
                style="padding-left: 10px;"
                v-model="series.cusbarCategoryGap"
              ></el-slider>
            </div>
          </el-col>
          <el-col :span="1" class="input_content">%</el-col>
        </el-row>
      </div>
    </div>
    <div v-show="type == 'line'">
      <el-row style="margin-top: 15px;">
        <el-col :span="1">
          <i class="el-icon-menu"></i>
        </el-col>
        <el-col :span="6" class="title">Set as area chart</el-col>
        <el-col :span="17">
          <el-switch
            @change="exArea"
            active-color="#13ce66"
            inactive-color="#d8d8d8"
            v-model="show"
          ></el-switch>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="series.showArea">
        <el-col :span="6" class="title">Area color</el-col>
        <el-col :span="18">
          <gradient-picker @change="exArea" size="mini" v-model="series.areaColor"></gradient-picker>
        </el-col>
      </el-row>
    </div>
  </el-collapse-item>
</template>

<script>
import * as t from '@/utils/importUtil'

export default {
  data() {
    return {
      totalArr: [],
      series: {
        lineWidth: 2,
        cuslineWidth: 2,
        lineType: "solid",
        lineStyle: [],
        lineColor: null,
        itemColor: null,
        barColor: null,
        symbolSize: 3,
        cusSymbolSize: 3,
        showSymbol: true,
        symbol: "emptyCircle",
        symbol1: "circle",
        barWidth: null,
        cusbarWidth: 0,
        barMinHeight: 0,
        cusbarMinHeight: 0,
        barGap: "30%",
        cusbarGap: 0,
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        showLabel: false,
        valueRatio: "1",
        valueDigit: "default",
        prefixVal: "",
        suffixVal: "",
        textPos: "inside",
        offsetX: 0,
        offsetY: 0,
        fontPlace: [],
        fzColor: null,
        fontSize: 10,
        customSize: 0,
        showStack: false,
        showArea: false,
        formatter: "{c}",
        stackValue: "Default category",
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        areaColor: null,
        align: "left",
        verticalAlign: "middle",
        cusAlignX: 0,
        cusAlignY: 0,
        radio: 0,
        xradio: 0,
        z: 2,
        borderRadius: 0,
        radius1: 0,
        radius2: 0,
        radius3: 0,
        radius4: 0,
        tpFormat: "{abc}",
        tpText: "",
        tpRatio: "1",
        tpDigit: "default"
      },
      sindex: 0,
      oseries: {},
      tindex: 0,
      comCirculation: {
        start: false,
        time: "3"
      },
      lineWidthOption: [
        { value: 1, label: "1px" },
        { value: 2, label: "2px" },
        { value: 3, label: "3px" },
        { value: 4, label: "4px" },
        { value: 5, label: "5px" },
        { value: 6, label: "6px" },
        { value: 7, label: "7px" },
        { value: 8, label: "8px" },
        { value: "custom", label: "Custom" }
      ],
      lineTypeOption: [
        { value: "solid", label: "Solid" },
        { value: "dashed", label: "Dashed" },
        { value: "dotted", label: "Dotted" }
      ],
      symbolSizeOption: [
        { value: 2, label: "2px" },
        { value: 3, label: "3px" },
        { value: 6, label: "6px" },
        { value: 8, label: "8px" },
        { value: 10, label: "10px" },
        { value: 12, label: "12px" },
        { value: 14, label: "14px" },
        { value: 16, label: "16px" },
        { value: "custom", label: "Custom" }
      ],
      symbolOption: [
        { value: "emptyCircle", label: "Empty Circle" },
        { value: "circle", label: "Circle" },
        { value: "emptyRect", label: "Empty Rectangle" },
        { value: "rect", label: "Rectangle" },
        { value: "roundRect", label: "Rounded Rectangle" },
        { value: "emptyTriangle", label: "Empty Triangle" },
        { value: "triangle", label: "Triangle" },
        { value: "emptyDiamond", label: "Empty Diamond" },
        { value: "diamond", label: "Diamond" },
        { value: "pin", label: "Pin" },
        { value: "arrow", label: "Arrow" },
        { value: "line", label: "Line" }
      ],
      symbolOption1: [
        { value: "circle", label: "Circle" },
        { value: "rect", label: "Rectangle" },
        { value: "roundRect", label: "Rounded Rectangle" },
        { value: "triangle", label: "Triangle" },
        { value: "diamond", label: "Diamond" },
        { value: "pin", label: "Pin" },
        { value: "arrow", label: "Arrow" },
        { value: "none", label: "None" }
      ],
      barWidthOption: [
        { value: null, label: "Auto" },
        { value: 10, label: "Narrow" },
        { value: 30, label: "Normal" },
        { value: 50, label: "Wide" },
        { value: "custom", label: "Custom" }
      ],
      barMinHeightOption: [
        { value: 0, label: "Default" },
        { value: 5, label: "Short" },
        { value: 10, label: "Normal" },
        { value: 30, label: "Tall" },
        { value: "custom", label: "Custom" }
      ],
      barGapOption: [
        { value: "30%", label: "Default" },
        { value: "50%", label: "Far" },
        { value: "40%", label: "Normal" },
        { value: "20%", label: "Near" },
        { value: "0%", label: "Overlap" },
        { value: "-10%", label: "Stagger" },
        { value: "custom", label: "Custom" }
      ],
      valueRatioOption: [
        { value: "100", label: "Multiply by 100" },
        { value: "10", label: "Multiply by 10" },
        { value: "1", label: "Default" },
        { value: "0.1", label: "Divide by 10" },
        { value: "0.01", label: "Divide by 100" },
        { value: "0.001", label: "Divide by 1000" },
        { value: "0.0001", label: "Divide by ten thousand" },
        { value: "0.00001", label: "Divide by hundred thousand" },
        { value: "0.000001", label: "Divide by one million" },
        { value: "0.0000001", label: "Divide by ten million" },
        { value: "0.00000001", label: "Divide by one hundred million" },
        { value: "0.000000001", label: "Divide by one billion" }
      ],
      valueDigitOption: [
        { value: "default", label: "Auto Display" },
        { value: 0, label: "Integer" },
        { value: 1, label: "1 Decimal Place" },
        { value: 2, label: "2 Decimal Places" },
        { value: 3, label: "3 Decimal Places" },
        { value: 4, label: "4 Decimal Places" },
        { value: 5, label: "5 Decimal Places" },
        { value: 6, label: "6 Decimal Places" },
        { value: 7, label: "7 Decimal Places" },
        { value: 8, label: "8 Decimal Places" }
      ],
      textPosOption: [
        { value: "top", label: "Top" },
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
        { value: "bottom", label: "Bottom" },
        { value: "inside", label: "Inside Center" },
        { value: "insideLeft", label: "Inside Left" },
        { value: "insideRight", label: "Inside Right" },
        { value: "insideTop", label: "Inside Top" },
        { value: "insideBottom", label: "Inside Bottom" },
        { value: "insideTopLeft", label: "Inside Top Left" },
        { value: "insideBottomLeft", label: "Inside Bottom Left" },
        { value: "insideTopRight", label: "Inside Top Right" },
        { value: "insideBottomRight", label: "Inside Bottom Right" },
        { value: "custom", label: "Custom" }
      ],
      fontSizeOption: [
        { value: 6, label: "6px" },
        { value: 8, label: "8px" },
        { value: 10, label: "10px" },
        { value: 12, label: "12px" },
        { value: 14, label: "14px" },
        { value: 16, label: "16px" },
        { value: 18, label: "18px" },
        { value: 20, label: "20px" },
        { value: 22, label: "22px" },
        { value: 24, label: "24px" },
        { value: 30, label: "30px" },
        { value: 36, label: "36px" },
        { value: "custom", label: "Custom" }
      ],
      alignOption: [
        { value: "left", label: "Left Align" },
        { value: "center", label: "Center Align" },
        { value: "right", label: "Right Align" }
      ],
      verticalAlignOption: [
        { value: "top", label: "Top Align" },
        { value: "middle", label: "Middle Align" },
        { value: "bottom", label: "Bottom Align" },
        { value: "custom", label: "Custom" }
      ],
      barCategoryGapOption: [
        { value: "20%", label: "Default" },
        { value: "40%", label: "Far" },
        { value: "30%", label: "Normal" },
        { value: "10%", label: "Near" },
        { value: "custom", label: "Custom" }
      ],
      radiusOption: [
        { value: 0, label: "No Default" },
        { value: "custom", label: "Custom" }
      ],
      tpFormatOption: [
        { value: "{abc}", label: "Series Name + Data Name + Data" },
        { value: "{bc}", label: "Data Name + Data" },
        { value: "{ac}", label: "Series Name + Data" }
      ]
    };
  },
  components: {
      ...t.importComp(t)
  },
  computed: {
    totalArr1() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var flag = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.area;
      var series = {
        lineWidth: 2,
        cuslineWidth: 2,
        lineType: "solid",
        lineStyle: [],
        lineColor: null,
        itemColor: null,
        barColor: null,
        symbolSize: 3,
        cusSymbolSize: 3,
        showSymbol: true,
        symbol: "emptyCircle",
        symbol1: "circle",
        barWidth: null,
        cusbarWidth: 0,
        barMinHeight: 0,
        cusbarMinHeight: 0,
        barGap: "30%",
        cusbarGap: 0,
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        showLabel: false,
        valueRatio: "1",
        valueDigit: "default",
        prefixVal: "",
        suffixVal: "",
        textPos: "inside",
        offsetX: 0,
        offsetY: 0,
        fontPlace: [],
        fzColor: null,
        fontSize: 10,
        customSize: 0,
        showStack: false,
        showArea: false,
        formatter: "{c}",
        stackValue: "Default category",
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        areaColor: null,
        align: "left",
        verticalAlign: "middle",
        cusAlignX: 0,
        cusAlignY: 0,
        radio: 0,
        xradio: 0,
        z: 2,
        borderRadius: 0,
        radius1: 0,
        radius2: 0,
        radius3: 0,
        radius4: 0,
        tpFormat: "{abc}",
        tpText: "",
        tpRatio: "1",
        tpDigit: "default"
      };
      var arr = [];
      for (var i = 0; i < this.seriesOption.length; i++) {
        var item = "item" + i;
        item = generator.deepCopy(series);
        if (flag) {
          item.showArea = true;
        }
        if (
          (this.chart_type == "line" && this.chart_style == "label") ||
          this.chart_style == "stackRatio"
        ) {
          item.showLabel = true;
        }
        // 如果是堆叠图, 默认showStack为true
        if (this.chart_style.includes("stack")) {
          item.showStack = true;
        }
        arr.push(item);
      }
      return arr;
    },
    chart_id() {
      var chart_id = this.$store.state.chartSetting.chartCurrent;
      if (!chart_id) {
        return;
      }
      this.config = generator.getOptionByRouter(
        this.$store.state.chartSetting,
        {
          router: "series"
        }
      );
      this.oseries = {
        lineWidth: 2,
        cuslineWidth: 2,
        lineType: "solid",
        lineStyle: [],
        lineColor: null,
        itemColor: null,
        barColor: null,
        symbolSize: 3,
        cusSymbolSize: 3,
        showSymbol: true,
        symbol: "emptyCircle",
        symbol1: "circle",
        barWidth: null,
        cusbarWidth: 0,
        barMinHeight: 0,
        cusbarMinHeight: 0,
        barGap: "30%",
        cusbarGap: 0,
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        showLabel: false,
        valueRatio: "1",
        valueDigit: "default",
        prefixVal: "",
        suffixVal: "",
        textPos: "inside",
        offsetX: 0,
        offsetY: 0,
        fontPlace: [],
        fzColor: null,
        fontSize: 10,
        customSize: 0,
        showStack: false,
        showArea: false,
        formatter: "{c}",
        stackValue: "Default category",
        barCategoryGap: "20%",
        cusbarCategoryGap: 0,
        areaColor: null,
        align: "left",
        verticalAlign: "middle",
        cusAlignX: 0,
        cusAlignY: 0,
        radio: 0,
        xradio: 0,
        z: 2,
        borderRadius: 0,
        radius1: 0,
        radius2: 0,
        radius3: 0,
        radius4: 0,
        tpFormat: "{abc}",
        tpText: "",
        tpRatio: "1",
        tpDigit: "default"
      };
      if (
        (this.chart_type == "line" && this.chart_style == "label") ||
        this.chart_style == "stackRatio"
      ) {
        this.oseries = {
          lineWidth: 2,
          cuslineWidth: 2,
          lineType: "solid",
          lineStyle: [],
          lineColor: null,
          itemColor: null,
          barColor: null,
          symbolSize: 3,
          cusSymbolSize: 3,
          showSymbol: true,
          symbol: "emptyCircle",
          symbol1: "circle",
          barWidth: null,
          cusbarWidth: 0,
          barMinHeight: 0,
          cusbarMinHeight: 0,
          barGap: "30%",
          cusbarGap: 0,
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          showLabel: true,
          valueRatio: "1",
          valueDigit: "default",
          prefixVal: "",
          suffixVal: "",
          textPos: "inside",
          offsetX: 0,
          offsetY: 0,
          fontPlace: [],
          fzColor: null,
          fontSize: 10,
          customSize: 0,
          showStack: false,
          showArea: false,
          formatter: "{c}",
          stackValue: "Default category",
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          areaColor: null,
          align: "left",
          verticalAlign: "middle",
          cusAlignX: 0,
          cusAlignY: 0,
          radio: 0,
          xradio: 0,
          z: 2,
          borderRadius: 0,
          radius1: 0,
          radius2: 0,
          radius3: 0,
          radius4: 0,
          tpFormat: "{abc}",
          tpText: "",
          tpRatio: "1",
          tpDigit: "default"
        };
      }
      // 如果是堆叠图, 默认showStack为true
      if (this.chart_style.includes("stack")) {
        this.oseries = {
          lineWidth: 2,
          cuslineWidth: 2,
          lineType: "solid",
          lineStyle: [],
          lineColor: null,
          itemColor: null,
          barColor: null,
          symbolSize: 3,
          cusSymbolSize: 3,
          showSymbol: true,
          symbol: "emptyCircle",
          symbol1: "circle",
          barWidth: null,
          cusbarWidth: 0,
          barMinHeight: 0,
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          cusbarMinHeight: 0,
          barGap: "30%",
          cusbarGap: 0,
          showLabel: false,
          valueRatio: "1",
          valueDigit: "default",
          prefixVal: "",
          suffixVal: "",
          textPos: "inside",
          offsetX: 0,
          offsetY: 0,
          fontPlace: [],
          fzColor: null,
          fontSize: 10,
          customSize: 0,
          showStack: true,
          showArea: false,
          formatter: "{c}",
          stackValue: "Default category",
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          areaColor: null,
          align: "left",
          verticalAlign: "middle",
          cusAlignX: 0,
          cusAlignY: 0,
          radio: 0,
          xradio: 0,
          z: 2,
          borderRadius: 0,
          radius1: 0,
          radius2: 0,
          radius3: 0,
          radius4: 0,
          tpFormat: "{abc}",
          tpText: "",
          tpRatio: "1",
          tpDigit: "default"
        };
      }
      if (this.chart_style == "stackRatio") {
        this.oseries = {
          lineWidth: 2,
          cuslineWidth: 2,
          lineType: "solid",
          lineStyle: [],
          lineColor: null,
          itemColor: null,
          barColor: null,
          symbolSize: 3,
          cusSymbolSize: 3,
          showSymbol: true,
          symbol: "emptyCircle",
          symbol1: "circle",
          barWidth: null,
          cusbarWidth: 0,
          barMinHeight: 0,
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          cusbarMinHeight: 0,
          barGap: "30%",
          cusbarGap: 0,
          showLabel: true,
          valueRatio: "1",
          valueDigit: "default",
          prefixVal: "",
          suffixVal: "",
          textPos: "inside",
          offsetX: 0,
          offsetY: 0,
          fontPlace: [],
          fzColor: null,
          fontSize: 10,
          customSize: 0,
          showStack: true,
          showArea: false,
          formatter: "{c}",
          stackValue: "Default category",
          barCategoryGap: "20%",
          cusbarCategoryGap: 0,
          areaColor: null,
          align: "left",
          verticalAlign: "middle",
          cusAlignX: 0,
          cusAlignY: 0,
          radio: 0,
          xradio: 0,
          z: 2,
          borderRadius: 0,
          radius1: 0,
          radius2: 0,
          radius3: 0,
          radius4: 0,
          tpFormat: "{abc}",
          tpText: "",
          tpRatio: "1",
          tpDigit: "default"
        };
      }
      if (this.chart_style == "contain") {
        this.oseries.barGap = "-100%";
      }
      if (this.chart_type == "line" && this.chart_style == "smooth") {
        this.oseries.lineStyle = ["smooth"];
      }
      var option = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.config.option;
      var option1 = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.config.option1;
      if (option) {
        // var series =
        //   option[
        //     this.$store.state.chartSetting.chartList[
        //       this.$store.state.chartSetting.chartCurrent
        //     ].defaultOption.config.sindex
        //   ]
        // this.series = generator.deepCopy(option1.series)

        // 兼容之前做的图
        if (option1.sindex || option1.sindex == 0) {
          this.sindex = option1.sindex;
        } else {
          this.sindex = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.config.sindex;
        }
        this.totalArr = generator.deepCopy(option);
        this.series = generator.deepCopy(this.totalArr[this.sindex]);
        if (option1 && option1.comCirculation) {
          this.comCirculation = option1.comCirculation;
        } else {
          this.comCirculation = {
            start: false,
            time: "3"
          };
        }
      } else {
        this.series = generator.deepCopy(this.oseries);
        this.totalArr = generator.deepCopy(this.totalArr1);
        this.sindex = 0;
        this.tindex = 0;
      }
      return chart_id;
    },
    seriesOption() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var series = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.series;
      var arr = [];
      for (var i = 0; i < series.length + 1; i++) {
        if (i == 0) {
          arr[0] = "General settings";
        } else {
          arr[i] = series[i - 1].name;
        }
      }
      if (this.chart_style == "costComposition") {
        arr.splice(1, 1);
      }
      return arr;
    },
    seriesValue: {
      get() {
        if (!this.seriesOption) {
          return;
        }
        return this.seriesOption[this.sindex];
      },
      set(val) {
        if (!this.seriesOption) {
          return;
        }
        this.sindex = this.seriesOption.findIndex(item => item == val);
        this.series = this.totalArr[this.sindex];
        // var series = this.$store.state.chartSetting.chartList[
        //   this.$store.state.chartSetting.chartCurrent
        // ].defaultOption.series
        // var customType = this.$store.state.chartSetting.chartList[
        //   this.$store.state.chartSetting.chartCurrent
        // ].defaultOption.customType
        // customType = customType ? customType : series[0].type
        // if (this.sindex == 0) {
        //   this.tindex = this.typeOption.findIndex(
        //     item => item.value == customType
        //   )
        // } else {
        //   this.tindex = this.typeOption.findIndex(
        //     item => item.value == series[this.sindex - 1].type
        //   )
        // }

        this.delMarkAdd();
      }
    },
    chart_pro: function() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[0];
    },
    chart_type() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[1];
    },
    chart_style() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      return this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[2];
    },
    typeOption() {
      if (this.chart_style == "costComposition") {
        return [{ value: "bar", label: "Bar" }];
      } else {
        return [
          { value: "line", label: "Line" },
          { value: "bar", label: "Bar" },
          { value: "pictorialBar", label: "Pictorial bar" }
        ];
      }
    },
    data() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var arr = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.seriesData;
      return arr;
    },
    speArr() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      // if (this.series.formatter == '{special}') {
      var arr = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].defaultOption.seriesData;
      var speArr = [];
      if (arr && arr.length > 1) {
        for (var i = 0; i < arr[0].length; i++) {
          speArr.push((arr[0][i] / arr[1][i]) * 100);
        }
      }
      return speArr;
      // }
    },
    formatterOption() {
      if (this.chart_style == "stackRatio") {
        return [
          { value: "{b}", label: "仅数据" },
          { value: "{c}", label: "仅百分比" },
          { value: "{bc}", label: "Series名+百分比" },
          { value: "{pc}", label: "数据+百分比" },
          { value: "{prc}", label: "数据+人+百分比" },
          { value: "{bcd}", label: "Series名+数据+百分比" }
        ];
      } else {
        return [
          { value: "{c}", label: "仅数据" },
          { value: "{bc}", label: "Series名+数据" },
          { value: "{percent}", label: "仅百分比" },
          { value: "{special}", label: "显示左侧百分比" }
        ];
      }
    },
    type: {
      get() {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        if (this.chart_pro == "echarts") {
          // var sindex
          // if (this.sindex == 0) {
          //   sindex = 0
          // } else {
          //   sindex = this.sindex - 1
          // }
          var series = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.series;
          var customType = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.customType;
          customType = customType ? customType : series[0].type;
          if (this.sindex == 0) {
            this.tindex = this.typeOption.findIndex(
              item => item.value == customType
            );
          } else {
            this.tindex = this.typeOption.findIndex(
              item => item.value == series[this.sindex - 1].type
            );
          }
          // // 如果是面积图,显示折线图
          // if(this.tindex == -1 && customType == 'area'){
          //   this.tindex = 0
          // }
          return this.typeOption[this.tindex].value;
        }
      },
      set(val) {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        if (this.chart_pro == "echarts") {
          var series = this.$store.state.chartSetting.chartList[
            this.$store.state.chartSetting.chartCurrent
          ].defaultOption.series;
          this.tindex = this.typeOption.findIndex(item => item.value == val);
          if (this.sindex == 0) {
            this.$store.state.chartSetting.chartList[
              this.$store.state.chartSetting.chartCurrent
            ].defaultOption.customType = val;

            for (var i = 0; i < series.length; i++) {
              series[i].type = val;
            }
          } else {
            series[this.sindex - 1].type = val;
          }
        }
        this.delMarkAdd();
        generator.changeChartOption();
      }
    },
    // 当前Series的索引
    // sindex() {
    //   console.dir(this.seriesValue)
    //   var index = this.seriesOption.findIndex(item => {
    //     return item == this.seriesValue
    //   })
    //   // if (index > 0) {
    //   //   index = --index
    //   // }
    //   if (
    //     this.chart_style == 'costComposition' &&
    //     this.seriesValue != 'General settings'
    //   ) {
    //     index = 1
    //   }
    //   return index
    // },
    chart_style: function() {
      if (!this.$store.state.chartSetting.chartCurrent) {
        return;
      }
      var style = this.$store.state.chartSetting.chartList[
        this.$store.state.chartSetting.chartCurrent
      ].chartAllType.split("|")[2];
      return style;
    },
    // 是否显示面积图,选图是面积图时默认显示
    show: {
      get() {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        var flag = this.$store.state.chartSetting.chartList[
          this.$store.state.chartSetting.chartCurrent
        ].defaultOption.area;
        if (flag) {
          this.series.showArea = true;
        } else {
          this.series.showArea = false;
        }
        return this.series.showArea;
      },
      set(val) {
        if (!this.$store.state.chartSetting.chartCurrent) {
          return;
        }
        this.$store.state.chartSetting.chartList[
          this.$store.state.chartSetting.chartCurrent
        ].defaultOption.area = val;
        this.series.showArea = val;
      }
    },
    showPercent() {
      if (this.chart_style == "stackRatio" || this.chart_style == "contain") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    delMarkAdd() {
      generator.addLine = false;
      generator.addPoint = false;
      generator.addArea = false;
      var series = {
        series: this.series,
        data: this.data,
        speArr: this.speArr,
        showPercent: this.showPercent,
        totalArr: this.totalArr,
        seriesOption: this.seriesOption,
        sindex: this.sindex,
        oseries: this.oseries,
        type: this.chart_type,
        total: this.total,
        comCirculation: this.comCirculation
      };
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "config",
        key: "option",
        value: this.totalArr
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "config",
        key: "option1",
        value: series
      });
      // var index = this.totalArr.findIndex(
      //   item => item.seriesValue == this.seriesValue
      // )
      // this.$store.commit({
      //   type: 'updateChartOptionItem',
      //   router: 'config',
      //   key: 'sindex',
      //   value: index
      // })
    },
    normalMethod() {
      // 折线图设置
      if (this.type == "line") {
        var step, smooth;
        if (this.series.lineStyle.includes("step")) {
          step = true;
        }
        if (this.series.lineStyle.includes("smooth")) {
          smooth = true;
        }
        // 折线图General settings
        if (this.seriesValue == "General settings") {
          if (this.series.lineWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "lineStyle/width",
              value: this.series.lineWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/type",
            value: this.series.lineType
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/color",
            value: this.series.lineColor
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "step",
            value: step
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "smooth",
            value: smooth
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "showSymbol",
            value: this.series.showSymbol
          });
          if (this.series.symbolSize != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "symbolSize",
              value: this.series.symbolSize
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle",
            value: {
              color: this.series.itemColor
            }
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "symbol",
            value: this.series.symbol
          });
          // 单独设置
        } else {
          if (this.series.lineWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "lineStyle/width/" + (this.sindex - 1),
              value: this.series.lineWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/type/" + (this.sindex - 1),
            value: this.series.lineType
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "lineStyle/color/" + (this.sindex - 1),
            value: this.series.lineColor
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "step/" + (this.sindex - 1),
            value: step
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "smooth/" + (this.sindex - 1),
            value: smooth
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "showSymbol/" + (this.sindex - 1),
            value: this.series.showSymbol
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/" + (this.sindex - 1),
            value: {
              color: this.series.itemColor
            }
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "symbol/" + (this.sindex - 1),
            value: this.series.symbol
          });
          if (this.series.symbolSize != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "symbolSize/" + (this.sindex - 1),
              value: this.series.symbolSize
            });
          }
        }
      }
      // 柱状图设置
      if (this.type == "bar" || this.type == "pictorialBar") {
        if (this.seriesValue == "General settings") {
          if (this.series.barWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barWidth",
              value: this.series.barWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/color",
            value: this.series.barColor
          });
          // if (this.series.barGap != 'custom') {
          //   this.$store.commit({
          //     type: 'updateChartOptionItem',
          //     router: 'series',
          //     key: 'barGap',
          //     value: this.series.barGap
          //   })
          // }
          if (this.series.barCategoryGap != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barCategoryGap",
              value: this.series.barCategoryGap
            });
          }
        } else {
          if (this.series.barWidth != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barWidth/" + (this.sindex - 1),
              value: this.series.barWidth
            });
          }
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/color",
            index: this.sindex - 1,
            value: this.series.barColor
          });
          if (this.series.barCategoryGap != "custom") {
            this.$store.commit({
              type: "updateChartOptionItem",
              router: "series",
              key: "barCategoryGap/" + (this.sindex - 1),
              value: this.series.barCategoryGap
            });
          }
          // if (this.series.barGap != 'custom') {
          //   this.$store.commit({
          //     type: 'updateChartOptionItem',
          //     router: 'series',
          //     key: 'barGap/' + (this.sindex - 1),
          //     value: this.series.barGap
          //   })
          // }
        }
      }
      // General settings
      var fontWeight, fontStyle;
      if (this.series.fontPlace.indexOf("bold") > -1) {
        fontWeight = true;
      }
      if (this.series.fontPlace.indexOf("italic") > -1) {
        fontStyle = true;
      }
      var fun;
      if (this.series.formatter == "{special}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // var data = series.speArr[params.dataIndex];
          // var flag = false;
          // // 如果data是NaN,data设为0
          // if (data !== data) {
          //   flag = true;
          // }
          // if (series.series.valueDigit == "default") {
          //   if (flag) {
          //     return "---";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       luckysheet.floatTool.multiply(data, series.series.valueRatio) +
          //       "%" +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // } else {
          //   if (flag) {
          //     return "---";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       luckysheet.floatTool
          //         .multiply(data, series.series.valueRatio)
          //         .toFixed(series.series.valueDigit) +
          //       "%" +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          var data = series.speArr[params.dataIndex]
          var flag = false
          // 如果data是NaN,data设为0
          if (data !== data) {
            flag = true
          }
          if (option.valueDigit == 'default') {
            if (flag) {
              return '---'
            } else {
              return (
                option.prefixVal.trim() +
                luckysheet.floatTool.multiply(data, option.valueRatio) +
                '%' +
                option.suffixVal.trim()
              )
            }
          } else {
            if (flag) {
              return '---'
            } else {
              return (
                option.prefixVal.trim() +
                luckysheet.floatTool
                  .multiply(data, option.valueRatio)
                  .toFixed(option.valueDigit) +
                '%' +
                option.suffixVal.trim()
              )
            }
          }
        };
      }
      if (this.series.formatter == "{c}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // // 如果是负数,加个负号
          // var flag =
          //   series.data[params.seriesIndex][params.dataIndex] >= 0
          //     ? true
          //     : false;

          // if (series.series.valueDigit == "default") {
          //   if (params.value == 0 && series.type == "bar") {
          //     return "";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       (flag ? "" : "-") +
          //       luckysheet.floatTool.multiply(
          //         params.value,
          //         series.series.valueRatio
          //       ) +
          //       (series.showPercent ? "%" : "") +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // } else {
          //   if (params.value == 0 && series.type == "bar") {
          //     return "";
          //   } else {
          //     return (
          //       series.series.prefixVal.trim() +
          //       (flag ? "" : "-") +
          //       luckysheet.floatTool
          //         .multiply(params.value, series.series.valueRatio)
          //         .toFixed(series.series.valueDigit) +
          //       (series.showPercent ? "%" : "") +
          //       series.series.suffixVal.trim()
          //     );
          //   }
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          // 如果是负数,加个负号
          var flag =
            series.data[params.seriesIndex][params.dataIndex] >= 0
              ? true
              : false

          if (option.valueDigit == 'default') {
            if (params.value == 0) {
              return ''
            } else {
              return (
                option.prefixVal.trim() +
                (flag ? '' : '-') +
                luckysheet.floatTool.multiply(params.value, option.valueRatio) +
                (series.showPercent ? '%' : '') +
                option.suffixVal.trim()
              )
            }
          } else {
            if (params.value == 0) {
              return ''
            } else {
              return (
                option.prefixVal.trim() +
                (flag ? '' : '-') +
                luckysheet.floatTool
                  .multiply(params.value, option.valueRatio)
                  .toFixed(option.valueDigit) +
                (series.showPercent ? '%' : '') +
                option.suffixVal.trim()
              )
            }
          }
        };

      }

      if (this.series.formatter == "{bc}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   return (
          //     params.seriesName +
          //     series.series.prefixVal.trim() +
          //     luckysheet.floatTool.multiply(
          //       params.value,
          //       series.series.valueRatio
          //     ) +
          //     (series.showPercent ? "%" : "") +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   return (
          //     params.seriesName +
          //     series.series.prefixVal.trim() +
          //     luckysheet.floatTool
          //       .multiply(params.value, series.series.valueRatio)
          //       .toFixed(series.series.valueDigit) +
          //     (series.showPercent ? "%" : "") +
          //     series.series.suffixVal.trim()
          //   );
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          if (option.valueDigit == 'default') {
            return (
              params.seriesName +
              option.prefixVal.trim() +
              luckysheet.floatTool.multiply(params.value, option.valueRatio) +
              (series.showPercent ? '%' : '') +
              option.suffixVal.trim()
            )
          } else {
            return (
              params.seriesName +
              option.prefixVal.trim() +
              luckysheet.floatTool
                .multiply(params.value, option.valueRatio)
                .toFixed(option.valueDigit) +
              (series.showPercent ? '%' : '') +
              option.suffixVal.trim()
            )
          }

        };

      }
      if (this.series.formatter == "{bcd}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // var flag =
          //   series.data[params.seriesIndex][params.dataIndex] >= 0
          //     ? true
          //     : false;
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     params.seriesName +
          //     "\n" +
          //     "\n" +
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim() +
          //     "  " +
          //     (flag ? "" : "-") +
          //     params.value +
          //     "%"
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }
          //   return (
          //     params.seriesName +
          //     "\n" +
          //     "\n" +
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim() +
          //     "  " +
          //     (flag ? "" : "-") +
          //     Number(params.value).toFixed(series.series.valueDigit) +
          //     "%"
          //   );
          // }

          var series = args[0]
          var index = args[1]
          var params = args[2]
          var option = series.totalArr[index + 1]
          var flag =
            series.data[params.seriesIndex][params.dataIndex] >= 0
              ? true
              : false
          if (option.valueDigit == 'default') {
            var data = luckysheet.floatTool.multiply(
              series.data[params.seriesIndex][params.dataIndex],
              option.valueRatio
            )
            if (parseInt(Math.abs(data) / 10000) > 0) {
              data = data / 10000 + '万'
            }
            // if (parseInt(data).toString().length >= 9) {
            //   data = data / 100000000 + '亿'
            // }
            return (
              params.seriesName +
              '\n' +
              '\n' +
              option.prefixVal.trim() +
              data +
              option.suffixVal.trim() +
              '  ' +
              (flag ? '' : '-') +
              params.value +
              '%'
            )
          } else {
            var data = luckysheet.floatTool
              .multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              .toFixed(option.valueDigit)
            if (parseInt(Math.abs(data) / 10000) > 0) {
              data = (data / 10000).toFixed(option.valueDigit) + '万'
            }
            // if (parseInt(data).toString().length >= 9) {
            //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
            // }
            return (
              params.seriesName +
              '\n' +
              '\n' +
              option.prefixVal.trim() +
              data +
              option.suffixVal.trim() +
              '  ' +
              (flag ? '' : '-') +
              Number(params.value).toFixed(option.valueDigit) +
              '%'
            )
          }

        };

      }
      if (this.series.formatter == "{b}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }

          //   return (
          //     series.series.prefixVal.trim() +
          //     data +
          //     series.series.suffixVal.trim()
          //   );
          // }

            var series = args[0]
            var index = args[1]
            var params = args[2]
            var option = series.totalArr[index + 1]
            if (option.valueDigit == 'default') {
              var data = luckysheet.floatTool.multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = data / 10000 + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = data / 100000000 + '亿'
              // }
              return option.prefixVal.trim() + data + option.suffixVal.trim()
            } else {
              var data = luckysheet.floatTool
                .multiply(
                  series.data[params.seriesIndex][params.dataIndex],
                  option.valueRatio
                )
                .toFixed(option.valueDigit)
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = (data / 10000).toFixed(option.valueDigit) + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
              // }

              return option.prefixVal.trim() + data + option.suffixVal.trim()
            }

        };

      }
      if (this.series.formatter == "{pc}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     data +
          //     "  " +
          //     series.series.prefixVal.trim() +
          //     params.value +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }
          //   return (
          //     data +
          //     "  " +
          //     series.series.prefixVal.trim() +
          //     Number(params.value).toFixed(series.series.valueDigit) +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // }

            var series = args[0]
            var index = args[1]
            var params = args[2]
            var option = series.totalArr[index + 1]
            if (option.valueDigit == 'default') {
              var data = luckysheet.floatTool.multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = data / 10000 + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = data / 100000000 + '亿'
              // }
              return (
                data +
                '  ' +
                option.prefixVal.trim() +
                params.value +
                '%' +
                option.suffixVal.trim()
              )
            } else {
              var data = luckysheet.floatTool
                .multiply(
                  series.data[params.seriesIndex][params.dataIndex],
                  option.valueRatio
                )
                .toFixed(option.valueDigit)
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = (data / 10000).toFixed(option.valueDigit) + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
              // }
              return (
                data +
                '  ' +
                option.prefixVal.trim() +
                Number(params.value).toFixed(option.valueDigit) +
                '%' +
                option.suffixVal.trim()
              )
            }
        };

      }
      if (this.series.formatter == "{prc}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];
          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = data / 10000 + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = data / 100000000 + '亿'
          //   // }
          //   return (
          //     data +
          //     "人  " +
          //     series.series.prefixVal.trim() +
          //     params.value +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool
          //     .multiply(
          //       series.data[params.seriesIndex][params.dataIndex],
          //       series.series.valueRatio
          //     )
          //     .toFixed(series.series.valueDigit);
          //   if (parseInt(Math.abs(data) / 10000) > 0) {
          //     data = (data / 10000).toFixed(series.series.valueDigit) + "万";
          //   }
          //   // if (parseInt(data).toString().length >= 9) {
          //   //   data = (data / 100000000).toFixed(series.series.valueDigit) + '亿'
          //   // }
          //   return (
          //     data +
          //     "人  " +
          //     series.series.prefixVal.trim() +
          //     Number(params.value).toFixed(series.series.valueDigit) +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // }

            var series = args[0]
            var index = args[1]
            var params = args[2]
            var option = series.totalArr[index + 1]
            if (option.valueDigit == 'default') {
              var data = luckysheet.floatTool.multiply(
                series.data[params.seriesIndex][params.dataIndex],
                option.valueRatio
              )
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = data / 10000 + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = data / 100000000 + '亿'
              // }
              return (
                data +
                '人  ' +
                option.prefixVal.trim() +
                params.value +
                '%' +
                option.suffixVal.trim()
              )
            } else {
              var data = luckysheet.floatTool
                .multiply(
                  series.data[params.seriesIndex][params.dataIndex],
                  option.valueRatio
                )
                .toFixed(option.valueDigit)
              if (parseInt(Math.abs(data) / 10000) > 0) {
                data = (data / 10000).toFixed(option.valueDigit) + '万'
              }
              // if (parseInt(data).toString().length >= 9) {
              //   data = (data / 100000000).toFixed(option.valueDigit) + '亿'
              // }
              return (
                data +
                '人  ' +
                option.prefixVal.trim() +
                Number(params.value).toFixed(option.valueDigit) +
                '%' +
                option.suffixVal.trim()
              )
            }
        };

      }
      if (this.series.formatter == "{percent}") {
        fun = function(...args) {
          // var series = args[0];
          // var params = args[1];

          // var total = [];
          // for (var i = 0; i < series.data.length; i++) {
          //   var sum = 0;
          //   for (var j = 0; j < series.data[i].length; j++) {
          //     sum += series.data[i][j];
          //   }
          //   total.push(sum);
          // }

          // if (series.series.valueDigit == "default") {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );

          //   return (
          //     series.series.prefixVal.trim() +
          //     (data / total[params.seriesIndex]) * 100 +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // } else {
          //   var data = luckysheet.floatTool.multiply(
          //     series.data[params.seriesIndex][params.dataIndex],
          //     series.series.valueRatio
          //   );

          //   return (
          //     series.series.prefixVal.trim() +
          //     ((data / total[params.seriesIndex]) * 100).toFixed(
          //       series.series.valueDigit
          //     ) +
          //     "%" +
          //     series.series.suffixVal.trim()
          //   );
          // }

          var series = args[0];
          var index = args[1]
          var params = args[2];
          var option = series.totalArr[index + 1]

          var total = [];
          for (var i = 0; i < series.data.length; i++) {
            var sum = 0;
            for (var j = 0; j < series.data[i].length; j++) {
              sum += series.data[i][j];
            }
            total.push(sum);
          }

          if (option.valueDigit == "default") {
            var data = luckysheet.floatTool.multiply(
              series.data[params.seriesIndex][params.dataIndex],
              option.valueRatio
            );

            return (
              option.prefixVal.trim() +
              (data / total[params.seriesIndex]) * 100 +
              "%" +
              option.suffixVal.trim()
            );
          } else {
            var data = luckysheet.floatTool.multiply(
              series.data[params.seriesIndex][params.dataIndex],
              option.valueRatio
            );

            return (
              option.prefixVal.trim() +
              ((data / total[params.seriesIndex]) * 100).toFixed(
                option.valueDigit
              ) +
              "%" +
              option.suffixVal.trim()
            );
          }
        };
      }

      if (this.seriesValue == "General settings") {
        var obj = {
          show: this.series.showLabel,
          fontSize: this.series.fontSize,
          color: this.series.fzColor,
          fontStyle: fontStyle ? "italic" : "normal",
          fontWeight: fontWeight ? "bold" : "normal",
          formatter: fun,
          formatter1: typeof fun == "function" ? fun + "" : fun,
          valueRatio: this.series.valueRatio,
          valueDigit: this.series.valueDigit,
          prefixVal: this.series.prefixVal,
          suffixVal: this.series.suffixVal,
          align: this.series.align,
          compatibility: true
        };
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label",
          value: generator.deepCopy(obj)
        });
        if (this.series.textPos != "custom") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position",
            value: this.series.textPos
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position",
            value: [this.series.offsetX + "%", this.series.offsetY + "%"]
          });
        }
        for (var a = 0; a < this.totalArr.length; a++) {
          this.totalArr[a] = generator.deepCopy(this.series);
        }
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/" + (this.sindex - 1),
          value: {
            show: this.series.showLabel,
            fontSize: this.series.fontSize,
            color: this.series.fzColor,
            fontStyle: fontStyle ? "italic" : "normal",
            fontWeight: fontWeight ? "bold" : "normal",
            formatter: fun,
            formatter1: typeof fun == "function" ? fun + "" : fun,
            valueRatio: this.series.valueRatio,
            valueDigit: this.series.valueDigit,
            prefixVal: this.series.prefixVal,
            suffixVal: this.series.suffixVal,
            align: this.series.align,
            compatibility: true
          }
        });
        if (this.series.textPos != "custom") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position/" + (this.sindex - 1),
            value: this.series.textPos
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/position/" + (this.sindex - 1),
            value: [this.series.offsetX + "%", this.series.offsetY + "%"]
          });
        }
        var sindex = this.seriesOption.findIndex(
          item => item == this.seriesValue
        );
        this.totalArr[sindex] = generator.deepCopy(this.series);
      }
    },
    // exType(newV) {
    //   var series = this.$store.state.chartSetting.chartList[
    //     this.$store.state.chartSetting.chartCurrent
    //   ].defaultOption.series
    //   if (this.seriesValue == 'General settings') {
    //     for (var i = 0; i < series.length; i++) {
    //       series[i].type = newV
    //     }
    //   } else {
    //     series[this.sindex - 1].type = newV
    //   }
    //   this.normalMethod()
    //   this.delMarkAdd()
    //   generator.changeChartOption()
    // },
    exlineWidth(newV) {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    exlineColor() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    excusLineWidth(newV) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "lineStyle/width",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "lineStyle/width",
          index: this.sindex - 1,
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exlineType() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exlineStyle() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exshowSymbol() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsymbolSize(newV) {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusSymbolSize(newV) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbolSize",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusSymbolSize",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbolSize/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusSymbolSize/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsymbol() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarWidth(newV) {
      this.delMarkAdd();
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
    },
    excusBarWidth(newV) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barWidth",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarWidth",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barWidth/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarWidth/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarMinHeight(newV) {
      this.delMarkAdd();
      if (newV != "custom") {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barMinHeight",
            value: this.series.barMinHeight
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barMinHeight/" + (this.sindex - 1),
            value: this.series.barMinHeight
          });
        }
        this.delMarkAdd();
        generator.changeChartOption();
      }
    },
    excusBarMinHeight(newV) {
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barMinHeight",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarMinHeight",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barMinHeight/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarMinHeight/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarGap(newV) {
      if (newV != "custom") {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barGap",
            value: this.series.barGap
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "barGap/" + (this.sindex - 1),
            value: this.series.barGap
          });
        }
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusBarGap(newV) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barGap",
          value: newV + "%"
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarGap",
          value: newV + "%"
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barGap/" + (this.sindex - 1),
          value: newV + "%"
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarGap/" + (this.sindex - 1),
          value: newV + "%"
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarCategoryGap() {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusbarCategoryGap(val) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap",
          value: val + "%"
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap/" + (this.sindex - 1),
          value: val + "%"
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exshowLabel() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exitemColor() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exvalueDigit(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exvalueRatio(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsuffixVal(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exprefixVal(newV) {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    extextPos() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exfontPlace() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exfzColor() {
      this.delMarkAdd();
      this.normalMethod();
      generator.changeChartOption();
    },
    exfontSize() {
      if (this.series.fontSize != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excustomSize(newV) {
      this.normalMethod();
      var fontWeight, fontStyle;
      if (this.series.fontPlace.indexOf("bold") > -1) {
        fontWeight = true;
      }
      if (this.series.fontPlace.indexOf("italic") > -1) {
        fontStyle = true;
      }
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/fontSize",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/fontSize/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exStack(newV) {
      this.normalMethod();
      if (!newV) {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack",
            value: null
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack/" + (this.sindex - 1),
            value: null
          });
        }
      } else {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack",
            value: this.series.stackValue
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack1",
            value: this.series.stackValue
          });
        } else {
          var index = this.seriesOption.findIndex(
            item => item == this.seriesValue
          );
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack/" + (this.sindex - 1),
            value: this.totalArr[index].stackValue
          });
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "stack1/" + (this.sindex - 1),
            value: this.totalArr[index].stackValue
          });
        }
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exstackValue(newV) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "stack",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "stack/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarCategoryGap(newV) {
      if (newV != "custom") {
        this.normalMethod();
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusBarCategoryGap(newV) {
      this.normalMethod();
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap",
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarCategoryGap",
          value: newV
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "barCategoryGap/" + (this.sindex - 1),
          value: newV
        });
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "cusbarCategoryGap/" + (this.sindex - 1),
          value: newV
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exArea(newV) {
      this.normalMethod();
      if (!newV) {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle",
            value: null
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle/" + (this.sindex - 1),
            value: null
          });
        }
      } else {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle",
            value: {
              color: this.series.areaColor
            }
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "areaStyle/" + (this.sindex - 1),
            value: {
              color: this.series.areaColor
            }
          });
        }
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exbarColor() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exformatter() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exoffset() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exalign() {
      this.normalMethod();
      this.delMarkAdd();
      generator.changeChartOption();
    },
    excusAlign() {
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/offset",
          value: [this.series.cusAlignX, this.series.cusAlignY]
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "label/offset",
          index: this.sindex - 1,
          value: [this.series.cusAlignX, this.series.cusAlignY]
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exverticalAlign(val) {
      if (val != "custom") {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/verticalAlign",
            value: val
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "label/verticalAlign",
            index: this.sindex - 1,
            value: val
          });
        }
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    exAxis(val) {
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "yAxisIndex",
          value: val
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "yAxisIndex",
          index: this.sindex - 1,
          value: val
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exXAxis(val) {
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "xAxisIndex",
          value: val
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "xAxisIndex",
          index: this.sindex - 1,
          value: val
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    addLevel(){
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "z",
          value: this.series.z+1
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "z",
          index: this.sindex - 1,
          value: this.series.z+1
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exborderRadius(val) {
      if (val != "custom") {
        if (this.seriesValue == "General settings") {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/barBorderRadius",
            value: val
          });
        } else {
          this.$store.commit({
            type: "updateChartOptionItem",
            router: "series",
            key: "itemStyle/barBorderRadius",
            index: this.sindex - 1,
            value: val
          });
        }
        generator.changeChartOption();
      }
      this.delMarkAdd();
    },
    excusBorderRadius() {
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "itemStyle/barBorderRadius",
          value: [
            this.series.radius1,
            this.series.radius2,
            this.series.radius3,
            this.series.radius4
          ]
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "itemStyle/barBorderRadius",
          index: this.sindex - 1,
          value: [
            this.series.radius1,
            this.series.radius2,
            this.series.radius3,
            this.series.radius4
          ]
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    exsymbol1(val) {
      if (this.seriesValue == "General settings") {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbol",
          value: val
        });
      } else {
        this.$store.commit({
          type: "updateChartOptionItem",
          router: "series",
          key: "symbol",
          index: this.sindex - 1,
          value: val
        });
      }
      this.delMarkAdd();
      generator.changeChartOption();
    },
    excirculation() {
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "config",
        key: "comCirculation",
        value: this.comCirculation
      });
      this.delMarkAdd();
      generator.changeChartOption();
    },
    extpFormat() {
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpFormat",
        index: this.sindex - 1,
        value: this.series.tpFormat
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpRatio",
        index: this.sindex - 1,
        value: this.series.tpRatio
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpDigit",
        index: this.sindex - 1,
        value: this.series.tpDigit
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpText",
        index: this.sindex - 1,
        value: this.series.tpText
      });
      this.$store.commit({
        type: "updateChartOptionItem",
        router: "series",
        key: "tpKey",
        value: this.sindex - 1
      });

      this.delMarkAdd();
      generator.changeChartOption();
    }
  }
};
</script>

<style>
</style>
