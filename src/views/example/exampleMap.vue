<template>
  <div id="regMap" class="main-wrap" style="height:101%">
    <div style="padding:0 10px 24px;height: calc(100% - 87px);min-height: 408px">
      <div id="container" ></div>
    </div>
    <div class="info">
        <h4 id='status'></h4><hr>
        <p id='result'></p><hr>
        <p >由于众多浏览器已不再支持非安全域的定位请求，为保位成功率和精度，请升级您的站点到HTTPS。</p>
    </div>
  </div>
  
</template>

<script>
  // import AMapUI from 'AMapUI'
  import Vue from 'vue'
  import api from 'api'
  import globalMixins from '../../utils/mixins'
  // 查询电梯注册码
  
  export default {
    // mixins: [globalMixins],


    data() {
     return{

     }
    },
    
    
    mounted() {

      //创建地图
      var map = new AMap.Map('container', {
        // center: [113.920652, 22.499146],
        // mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
        // mapStyle: 'amap://styles/db9065b28cc027a6a3240fc2ae093125',
        zoom: 20, //设置地图的缩放级别
      });
      //---------------------------------------------------------------
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            panToLocation:false,
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete'){
                onComplete(result)
            }else{
                onError(result)
            }
        });
      });
      // map.setCenter(113.920652, 22.499146)
      
      // console.log("center__" + map.setCenter(113.920652, 22.499146))
      //解析定位结果
      function onComplete(data) {
          document.getElementById('status').innerHTML='定位成功'
          var str = [];
          str.push('定位结果：' + data.position);
          str.push('定位类别：' + data.location_type);
          if(data.accuracy){
              str.push('精度：' + data.accuracy + ' 米');
          }//如为IP精确定位结果则没有精度信息
          str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
          document.getElementById('result').innerHTML = str.join('<br>');
      }
      //解析定位错误信息
      function onError(data) {
          document.getElementById('status').innerHTML='定位失败'
          document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
      }
      console.log("center===" + map.getCenter())
      // map.setCenter([113.920652, 22.499146])
      //------------------------------------------
      function initPage(DistrictCluster, $) {

          var distCluster = new DistrictCluster({
              map: map, //所属的地图实例
              zIndex:11,
              getPosition: function(item) {

                  if (!item) {
                      return null;
                  }

                  var parts = item.split(',');

                  //返回经纬度
                  return [parseFloat(parts[0]), parseFloat(parts[1])];
              },
              renderOptions: {
                  //基础样式
                  featureStyle: {
                      fillStyle: 'rgba(102,170,0,0.5)', //填充色
                      lineWidth: 2, //描边线宽
                      strokeStyle: 'rgb(31, 119, 180)', //描边色
                      //鼠标Hover后的样式
                      hoverOptions: {
                          fillStyle: 'rgba(255,255,255,0.2)'
                      }
                  },
                  //特定区划级别的默认样式
                  featureStyleByLevel: {
                      //全国
                      country: {
                          fillStyle: 'rgba(49, 163, 84, 0.8)'
                      },
                      //省
                      province: {
                          fillStyle: 'rgba(116, 196, 118, 0.7)'
                      },
                      //市
                      city: {
                          fillStyle: 'rgba(161, 217, 155, 0.6)'
                      },
                      //区县
                      district: {
                          fillStyle: 'rgba(199, 233, 192, 0.5)'
                      }
                  },
                  //直接定义某写区划面的样式
                  getFeatureStyle: function(feature, dataItems) {

                      if (dataItems.length > 3000) {

                          return {
                              fillStyle: 'red'
                          };
                          
                      } else if (dataItems.length > 1000) {
                          return {
                              fillStyle: 'orange'
                          };
                      }

                      return {};
                  }
              }
          });

          window.distCluster = distCluster;

          $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
          $.get('http://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {

              $('#loadingTip').remove();

              var data = csv.split('\n');

              distCluster.setData(data);
          });
      }

      //加载相关组件
      AMapUI.load(['ui/geo/DistrictCluster', 'lib/$'], function(DistrictCluster, $) {

          //启动页面
          initPage(DistrictCluster, $);
      })
    },
    methods:{
      
    }
    
  }
</script>
<style lang="stylus">
// @import '../../assets/stylus/utilities'
// @import '../../assets/stylus/colors'
#regMap
  
  #container 
    width: 100%;
    margin: 0px;
    height: 100%;
    border-radius: 0 0 10px 10px
  .amap-ui-district-cluster-marker span
    display:unset;
 
</style>





