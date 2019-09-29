<template>
<!-- 勿删 -->
  <div>
    <div id="picList"></div>
    <div id="verificationCode" class="verificationCode">
      <canvas width="100" height="40" id="verifyCanvas"></canvas>
      <img @click="changeChecknum" id="code_img">
    </div>

  </div>
</template>
 
<script>
import { Checknum } from '../../utils/checknum'
export default {
  name: 'imgUpload',
 
  data () {
    return {
      option: {
        title: {
          text: '未来一周气温变化',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show:false,
          data:['最高气温','最低气温']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            color:'rgba(128, 128, 128, 0)',
            showSymbol :false,
            hoverAnimation :false,
            tooltip:{
              show:false,
            },
            
            markLine: {
              label:{
                formatter:'平均值: {c}',
                position:'20'
              },
              data: [
                {type: 'average', name: '平均值'}
              ],
              lineStyle:{
                color:'blue'
              }
            }
          },
          {
            name:'最低气温',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [
                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'},
                [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                }, {
                  symbol: 'circle',
                  label: {
                    normal: {
                      position: 'start',
                      formatter: '最大值'
                    }
                  },
                  type: 'max',
                  name: '最高点'
                }]
              ]
            }
          }
        ]
      }
    }
  },
  mounted(){
    var _this = this
    var myChart = this.$echarts.init(document.getElementById("picList"));
    myChart.setOption(_this.option);
    let  num = Checknum('code_img', 'verifyCanvas');
  },
  methods: {
    changeChecknum(){
      let num = Checknum('code_img', 'verifyCanvas');
      console.log("num:::" + num)
    }
  }
}
</script>
 
<style lang="stylus">
#picList
  width:100%
  height 500px
</style>