<template>
  <el-collapse-item name="4">
    <template slot="title">
      {{ setItem.modalName }}
    </template>
    <!-- Display tooltip switch -->
    <chart-base-switch :switchValue.sync="cursor.show">
      <div slot="title">{{ setItem.show }}</div>
    </chart-base-switch>

    <!-- Tooltip style -->
    <chart-base-label :router="router + '/label'" :baseLabelOption="cursor.label">
      <div slot="title">{{ setItem.label }}</div>
    </chart-base-label>

    <!-- Background color -->
    <el-row style="margin-top: 10px;">
      <el-col :span="6">{{ setItem.background }}</el-col>
      <el-col :span="3">
        <el-color-picker size="mini" v-model="cursor.backgroundColor"></el-color-picker>
      </el-col>
    </el-row>

    <!-- Tooltip trigger condition -->
    <chart-base-select :selectOption="triggerMethodArr" :selectValue.sync="cursor.triggerOn">
      <div slot="select">{{ setItem.trigger }}</div>
    </chart-base-select>

    <!-- Tooltip trigger type -->
    <chart-base-select :selectOption="triggerTypeArr" :selectValue.sync="cursor.triggerType">
      <div slot="select">{{ setItem.type }}</div>
    </chart-base-select>

    <!-- Indicator configuration -->
    <div v-if="cursor.triggerType != 'item'">
      <chart-base-select
          :selectOption="lineStyleOption"
          :selectValue.sync="cursor.axisPointer.style.type"
      >
        <div slot="select">{{ setItem.lineType }}</div>
      </chart-base-select>
      <chart-base-select
          :selectOption="lineWeightOption"
          :selectValue.sync="cursor.axisPointer.style.width"
      >
        <div slot="select">{{ setItem.lineWidth }}</div>
      </chart-base-select>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">{{ setItem.color }}</el-col>
        <el-col :span="3">
          <el-color-picker size="mini" v-model="cursor.axisPointer.style.color"></el-color-picker>
        </el-col>
      </el-row>
      <chart-base-select :selectOption="axisPointerArr" :selectValue.sync="cursor.axisPointer.type">
        <div slot="select">{{ setItem.axisType }}</div>
      </chart-base-select>
    </div>

    <!-- Tooltip float position -->
    <chart-base-select
        v-if="cursor.triggerType == 'item'"
        :selectOption="posOption"
        :selectValue.sync="cursor.position"
    >
      <div slot="select">{{ setItem.position }}</div>
    </chart-base-select>

    <!-- Mouse tooltip format -->
    <el-row style="margin-top: 15px;">
      <el-col :span="2">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="8">{{ setItem.suffix }}</el-col>
    </el-row>

    <el-row :key="i" style="margin-top: 15px;" v-for="(item , i) in seriesOption">
      <el-col :span="6">{{ item }}</el-col>
      <el-col :span="4">
        <!-- Mouse tooltip suffix -->
        <chart-base-input :hideCol="true" :placeholder="setItem.placeholder"></chart-base-input>
      </el-col>
      <el-col :span="6">
        <!-- Value ratio -->
        <chart-base-select
            :tooltip="setItem.ratio"
            :selectOption="ratioOption"
            :selectValue.sync="cursor.format[i].ratio"
            :hideCol="true"
        ></chart-base-select>
      </el-col>
      <el-col :span="6">
        <!-- Decimal places -->
        <chart-base-select
            :tooltip="setItem.digit"
            :selectOption="digitOption"
            :selectValue.sync="cursor.format[i].digit"
            :hideCol="true"
        ></chart-base-select>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>

<script>
// Importing required dependencies and data
import * as t from "@/utils/importUtil";
import {
  fontSizeOption,
  lineStyleOption,
  lineWeightOption,
  posOption,
  ratioOption,
  digitOption,
} from "@/data/chartJson";
import transEN from "@/data/en";

export default {
  components: {
    ...t.importComp(t),
  },
  props: {
    router: String,
    chartAllType: String,
    cursorOption: Object,
    lang: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      cursor: {}, // Tooltip settings
      fontSizeOption: t.deepCopy(fontSizeOption),
      lineStyleOption: t.deepCopy(lineStyleOption),
      lineWeightOption: t.deepCopy(lineWeightOption),
      posOption: t.deepCopy(posOption),
      ratioOption: t.deepCopy(ratioOption),
      digitOption: t.deepCopy(digitOption),
      triggerTypeArr: [
        { value: "item", label: "Item Graphic Trigger" },
        { value: "axis", label: "Axis Trigger" },
      ],
      axisPointerArr: [
        { value: "line", label: "Straight Pointer" },
        { value: "shadow", label: "Shadow Pointer" },
        { value: "cross", label: "Crosshair Pointer" },
      ],
      triggerMethodArr: [
        { value: "mousemove", label: "Mouse Move" },
        { value: "click", label: "Left Click / Mouse Hover" },
        { value: "mousemove|click", label: "Simultaneous" },
      ],
      setItem: {},
    };
  },
  mounted() {
    this.setItem = transEN["chartCursor"];
  },
  watch: {
    cursorOption: {
      handler(newVal) {
        if (t.isEqual(this.cursor, newVal)) {
          return;
        }
        this.cursor = t.deepCopy(newVal);
      },
      immediate: true,
      deep: true,
    },
    cursor: {
      handler: function (newVal, oldVal) {
        // Re-render when values change
        if (oldVal) {
          this.changeCursor();
        }
      },
      deep: true,
      immediate: true,
    },
    lang(val) {
      this.setItem = transEN["chartCursor"];
    },
  },
  computed: {
    seriesOption() {
      var arr = [];
      for (var i = 0; i < this.cursor.format.length; i++) {
        arr.push(this.cursor.format[i].seriesName);
      }
      return arr;
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeCursor() {
      const updateObj = {
        updateObj: t.deepCopy(this.cursor),
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
  },
};
</script>

<style>
</style>