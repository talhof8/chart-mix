<template>
  <el-collapse-item name="3">
    <template slot="title">
      {{ setItem.modalName }}
    </template>

    <!-- 图例显示 -->
    <chart-base-switch :switchValue.sync="legend.show">
      <div slot="title">Show legend</div>
    </chart-base-switch>

    <div v-show="legend.show">
      <chart-base-label :router="router + '/label'" :baseLabelOption.sync="legend.label">
        <div slot="title">Legend style</div>
      </chart-base-label>

      <chart-base-select :selectOption="positionOption" :selectValue.sync="legend.position.value">
        <div slot="select">Legend position</div>
      </chart-base-select>

      <el-row v-if="legend.position.value === 'custom'">
        <chart-base-slider
            :baseSliderOption.sync="legend.position.offsetX"
            :unit="'%'"
            :content="'Slide to modify the horizontal offset'"
        ></chart-base-slider>

        <chart-base-slider
            :baseSliderOption.sync="legend.position.offsetY"
            :unit="'%'"
            :content="'Slide to modify the vertical offset'"
        ></chart-base-slider>
      </el-row>
      <chart-base-select :selectOption="dirOptions" :selectValue.sync="legend.position.direction">
        <div slot="select">Legend orientation</div>
      </chart-base-select>

      <!-- Legend size -->
      <chart-base-select :selectOption="sizeOption" :selectValue.sync="legend.width.value">
        <div slot="select">Legend width</div>
      </chart-base-select>
      <chart-base-select :selectOption="sizeOption" :selectValue.sync="legend.height.value">
        <div slot="select">Legend height</div>
      </chart-base-select>

      <!-- Custom legend size -->
      <chart-base-slider
          v-if="legend.width.value == 'custom'"
          :baseSliderOption.sync="legend.width.cusSize"
          :unit="'px'"
          :content="'Slide to modify the legend width'"
      ></chart-base-slider>
      <chart-base-slider
          v-if="legend.height.value == 'custom'"
          :baseSliderOption.sync="legend.height.cusSize"
          :unit="'px'"
          :content="'Slide to modify the legend height'"
      ></chart-base-slider>

      <!-- Legend Spacing -->
      <chart-base-select :selectOption="distanceOption" :selectValue.sync="legend.distance.value">
        <div slot="select">Legend spacing</div>
      </chart-base-select>

      <!-- Custom legend spacing -->
      <chart-base-slider
          v-if="legend.distance.value == 'custom'"
          :baseSliderOption.sync="legend.distance.cusGap"
          :unit="'px'"
          :content="'Slide to modify legend spacing'"
      >
        <div slot="title">Legend spacing</div>
      </chart-base-slider>
    </div>
  </el-collapse-item>
</template>

<script>
import {distanceOption, positionOption, sizeOption} from "@/data/chartJson";
import * as t from "@/utils/importUtil";
import transEN from "@/data/en";

export default {
  props: {
    legendOption: Object,
    chartAllType: String,
    router: String,
    lang: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      legend: {},
      positionOption: t.deepCopy(positionOption),
      sizeOption: t.deepCopy(sizeOption),
      distanceOption: t.deepCopy(distanceOption),
      dirOptions: [
        {value: "horizontal", label: "Horizontal"},
        {value: "vertical", label: "Vertical"},
      ],
      setItem: {}
    };
  },
  components: {
    ...t.importComp(t),
  },
  mounted() {
    this.setItem = transEN["chartLegend"];
  },
  watch: {
    legendOption: {
      handler(newVal) {
        if (t.isEqual(this.legend, newVal)) {
          return;
        }
        this.legend = t.deepCopy(newVal);
      },
      immediate: true,
      deep: true,
    },
    legend: {
      handler: function (newVal, oldVal) {
        if (oldVal) {
          this.changeLegend();
        }
      },
      deep: true,
      immediate: true,
    },
    lang(val) {
      this.setItem = transEN["chartLegend"];
    },
  },
  methods: {
    ...t.mapActions("chartSetting", ["updateChartItem"]),
    changeLegend() {
      const updateObj = {
        updateObj: t.deepCopy(this.legend),
        router: this.router,
      };
      this.updateChartItem(updateObj);
    },
  },
};
</script>

<style>
</style>

