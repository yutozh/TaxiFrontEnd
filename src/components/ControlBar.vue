<template>
  <div class="control-bar">
    <div class="summary-container">
      <p>数据总览</p>
      <div class="statistic-item-summary">
        <table>
          <tr>
            <td>轨迹总数</td>
            <td>{{ statisticSummary.pathCount }}</td>
            <td>车辆总数</td>
            <td>{{ statisticSummary.carCount }}</td>
          </tr>
          <tr>
            <td colspan="1">数据时间范围</td>
            <td colspan="3">{{ statisticSummary.startTime | dateFormat }} - {{ statisticSummary.endTime | dateFormat
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="tools-container">
      <div class="tools-datetimepicker">
        <p>选择时间范围</p>
        <input id="datetimepicker1" type="text" onfocus="this.blur()">
        <input id="datetimepicker2" type="text" onfocus="this.blur()">
      </div>

      <div class="tools-areaSelect">
        <p>
          区域选择
          <input type="radio" name="area" :value="0" v-model="areaSelect.type"/>不限
          <input type="radio" name="area" :value="1" v-model="areaSelect.type"/>起终点相同
          <input type="radio" name="area" :value="2" v-model="areaSelect.type"/>起终点不同
        </p>

        <div class="tools-areaSelect-1" v-if="areaSelect.type===1">
          指定区域范围
          <span v-if="!selectedArea[0].selected">
            <button @click="clickSelect(0,'manual')">手动选择</button>
            <button @click="clickSelect(0,'auto')">常用范围</button>
            <button @click="clickSelect(0,'file')">导入文件</button>
          </span>
          <span v-else>
            <span>已选择1个区域</span>
            <button @click="clickSelect(0,'delete')">取消选择</button>
          </span>
        </div>
        <div class="tools-areaSelect-2" v-if="areaSelect.type===2">
          <p>
            指定起点范围
            <span v-if="!selectedArea[1].selected">
            <button @click="clickSelect(1,'manual')">手动选择</button>
            <button @click="clickSelect(1,'auto')">常用范围</button>
            <button @click="clickSelect(1,'file')">导入文件</button>
          </span>
            <span v-else>
            <span>已选择1个区域</span>
            <button @click="clickSelect(1,'delete')">取消选择</button>
          </span>
          </p>
          <p>
            指定终点范围
            <span v-if="!selectedArea[2].selected">
            <button @click="clickSelect(2,'manual')">手动选择</button>
            <button @click="clickSelect(2,'auto')">常用范围</button>
            <button @click="clickSelect(2,'file')">导入文件</button>
          </span>
            <span v-else>
            <span>已选择1个区域</span>
            <button @click="clickSelect(2,'delete')">取消选择</button>
          </span>
          </p>
        </div>
      </div>
      <button @click="clickStartSearch">查询</button>
    </div>
    <div class="statistic-container">
      <div class="statistic-item">
        <p>数据统计</p>
        <div class="statistic-item-result">
          轨迹总数:<span>{{ statisticInfo.count }}</span>
          平均车速:<span>{{ statisticInfo.avgSpeed }} KM/h</span>
          平均里程:<span>{{ statisticInfo.avgMile }} KM</span>
        </div>
      </div>
      <div class="statistic-item">
        <p>数据分布</p>
        <div id="statistic-item-info"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import '../assets/datetimepicker/jquery.datetimepicker.full'
  import moment from 'moment'
  import echarts from "echarts"

  export default {
    name: "control-bar",
    data() {
      return {
        pickTime: {start: 0, end: 0},
        areaSelect: {
          type: 0,
          // area1: [],
          // area2: []
        },
        chart: null,
        chartOption:{
          title: [{
            text: '车速分布',
            textStyle:{
              color: 'white',
              fontSize: 15
            },
            x: 60,
            y: 0
          },{
            text: '里程分布',
            textStyle:{
              color: 'white',
              fontSize: 15
            },
            x: 250,
            y: 0
          }],
          grid: [
            {x: '7%', y: '12%', width: '40%', height: '50%'},
            {x2: '7%', y: '12%', width: '40%', height: '50%'}],
          tooltip: {},
          legend: {
            data: ['销量1']
          },
          xAxis: [
            {
              gridIndex: 0,
              data: ["<5", "5-10", "10-20", "20-30", "30-40", ">40"],
              axisLine: {lineStyle: {color: 'white'}}
            },
            {
              gridIndex: 1,
              data: ["<2", "2-5", "5-8", "8-12", "12-16", ">16"],
              axisLine: {lineStyle: {color: 'white'}}
            }
          ],
          yAxis: [
            {gridIndex: 0, min: 0, axisLine: {lineStyle: {color: 'white'}}},
            {gridIndex: 1, min: 0, axisLine: {lineStyle: {color: 'white'}}},
          ],
          series: [
            {
              name: '车速统计',
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 0,
              itemStyle: {
                normal: {label: {show: true}},
                emphasis: {label: {show: true}}
              },
              data: []
            }
            ,
            {
              name: '里程统计',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                normal: {label: {show: true}},
                emphasis: {label: {show: true}}
              },
              tooltip: {
                trigger: 'item',
                formatter: "{c} 公里"
              },
              data: []
            }
          ]
        }
      }
    },
    props: {
      selectedArea: Array,
      statisticSummary: Object,
      statisticInfo: Object
    },
    watch:{
      statisticInfo:{
        // immediate:true,
        deep: true,
        handler:function(v){
          // 指定图表的配置项和数据
          if(this.chart !== null){
            this.chartOption.series[0].data = v.barSpeed
            this.chartOption.series[1].data = v.barMile
            // 使用刚指定的配置项和数据显示图表。
            this.chart.setOption(this.chartOption);
          }
        }
      }
    },
    mounted() {
      $.datetimepicker.setLocale('zh');
      $('#datetimepicker1').datetimepicker({
        onChangeDateTime: (e) => {
          this.pickTime.start = parseInt(moment(e).format("X"))
        }
      });
      $('#datetimepicker2').datetimepicker({
        onChangeDateTime: (e) => {
          this.pickTime.end = parseInt(moment(e).format("X"))
        }
      });
      this.initEcharts()
    },
    methods: {
      clickSelect(num, type) {
        this.$emit('clickSelect', num, type)
      },
      clickStartSearch() {
        // 点击开始查询，传递选择的时间以及区域查询的类型
        this.$emit('clickSearch', this.pickTime, this.areaSelect.type)
      },
      initEcharts() {
        this.chart = echarts.init(document.getElementById('statistic-item-info'), 'light')

        // 指定图表的配置项和数据
        this.chartOption.series[0].data = this.statisticInfo.barSpeed
        this.chartOption.series[1].data = this.statisticInfo.barMile

        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(this.chartOption);
      }
    },
    filters: {
      dateFormat(timestamp) {
        return moment.unix(timestamp).format("YYYY-MM-DD hh:mm:ss")
      }
    }
  }
</script>

<style scoped>
  .control-bar {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 400px;
    background: rgba(0, 0, 0, 0.48);
    color: white;
    text-align: left;
    padding: 2px;
  }

  .summary-container, .tools-container, .statistic-container {
    border: 0.5px dashed grey;
    border-radius: 1px;
    margin: 20px;
  }

  .statistic-item-summary table {
    border-collapse: collapse;
  }

  .statistic-item-summary table td {
    border: 1px solid whitesmoke;
    margin: 0;
    padding: 5px;
  }

  .statistic-item-summary, .statistic-item-result {
    font-weight: lighter;
    font-size: small;
    text-align: center;
  }

  .statistic-item-result span {
    color: aqua;
  }

  #statistic-item-info {
    width: 400px;
    height: 280px;
  }
</style>
<style>
  @import "../assets/datetimepicker/jquery.datetimepicker.css";
</style>
