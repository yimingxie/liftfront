<template>
  <div id="staffDetails">
    <div class="bread-nav">
      <router-link to="/staff">
        <span>员工管理</span>
      </router-link>
      <em>/</em>
      <span class="on">{{getStaffInfo.name}} - 员工详情</span>
    </div>
    <div class="main-wrap" >
      <div class="row" >
        <div class="panel" style="padding:0">
          <!-- <el-avatar shape="square" :size="210" :fit="fits" :src="url" class="s_pic" style=""></el-avatar> -->
          <div class="s_pic" style="">
            <img :src="url"  alt="" width="210" height="210"/>
          </div>
          <div class="s_contain">
            <router-link :to="{ name: 'editStaff', params: { staffId: this.$route.params.staffId }}"><span class="s_de_edit" ></span></router-link>

            <p class="s_de_name">{{getStaffInfo.name}}
              <img v-if="getStaffInfo.gender == '0'" src="../../assets/images/hs/female.png"  alt="" />
              <img v-else src="../../assets/images/hs/male.png"  alt="" />
            </p>
            <p class="s_de_department">{{departmentName}}</p>
            <div class="s_de_details">
              <ul>
                <li><span class="tie">手机号码：</span><span >{{getStaffInfo.account}}</span></li>
                <li><span class="tie">出生日期：</span>
                  <span v-if="getStaffInfo.birthday">{{ getStaffInfo.birthday | dateformat(dateFormat)}} &nbsp;{{ birthdayFrom}}</span>
                  <span v-else>--</span>
                </li>
                <li><span class="tie">从业资格证：</span><span style="color: #4272FF;">从业资格证.jpg</span></li>
                <li><span class="tie">从业日期：</span>
                  <span v-if="getStaffInfo.empTime">{{ getStaffInfo.empTime | dateformat(dateFormat)}} &nbsp;{{ empTimeFrom}}</span>
                  <span v-else>--</span>
                </li>
                <li><span class="tie">入职日期：</span>
                  <span v-if="getStaffInfo.entryTime">{{ getStaffInfo.entryTime | dateformat(dateFormat)}} &nbsp;{{ entryTimeFrom}}</span>
                  <span v-else>--</span>
                </li>
                <li><span class="tie">管辖电梯数：</span><span>{{ elevatorTotal }}部</span></li>
                <li><span class="tie">管辖区域：</span>
                  <span v-if="getStaffInfo.areaName">{{ getStaffInfo.areaName }}</span>
                  <span v-else>--</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" >
          
        <div class="panel" :class="open ? '':'closePanel'">
          <div class="title" style="border-bottom:none">
            <!-- <div class="label1">管辖电梯<span class="open" @click="open = !open" v-text="open ? '收起' : '展开'"></span></div> -->
            <div class="label1">管辖电梯
              <!-- <span class="open">展开</span> -->
            </div>
          </div>
        
          <!-- 表格 Start -->
          <div style="position:relative;display:flex;">
            &nbsp;
            <el-table :data="elevatorList">
              <el-table-column prop="regCode" label="电梯编号">
              </el-table-column>
          
              <el-table-column prop="areaName" label="区域-片区">
              </el-table-column>
              
              <el-table-column  label="使用地点">
                <template slot-scope="scope">
                  <span v-html="scope.row.address"></span>
                </template>
              </el-table-column>
             
             
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                  2.prevent就相当于..event.preventDefault() -->
                  <el-button @click.native.prevent="goDetection(scope.row.regCode)" type="text">查看详情
                  </el-button>
                 
                </template>
              </el-table-column>
            </el-table>
            &nbsp;
          </div>
          <!-- 表格 End -->
          
          <!-- 分页 Start -->
          <div class="pagination_block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 30]"
              :page-size="staffMLiftParam.limit"
              :current-page="staffMLiftParam.offset"
              layout="prev, pager, next, sizes, jumper"
              :total="totalPageSize">
            </el-pagination>
          </div>
          <!-- 分页 End -->

        </div>
        
      </div>

      <div class="row" >
          
        <div class="panel">
          <div class="title" style="border-bottom:none"><div class="label1">作业记录</div></div>
          
          <!-- 表格 Start -->
          <div style="position:relative;;display:flex;">
            &nbsp;
            <el-table :data="jobRecord">
              <el-table-column prop="taskId" label="工单编号">
              </el-table-column>
          
              <el-table-column label="作业类型">
                <template slot-scope="scope">
                  <span v-html="typeText[scope.row.type]" :style="{'color': getTypeColor(typeText[scope.row.type])}"></span>
                </template>
              </el-table-column>
              
              <el-table-column prop="elevCode" label="作业电梯">
              </el-table-column>
          
              <el-table-column label="处理进度">
                <template slot-scope="scope">
                  <span >{{statusText[scope.row.status]}}</span>
                </template>
              </el-table-column>
              
              <el-table-column prop="recordTime" label="完成时间">
              </el-table-column>
            
              <el-table-column label="操作" width="75">
                <template slot-scope="scope">
                  <!-- 1.在封装好的组件上使用，所以要加上.native才能click
                  2.prevent就相当于..event.preventDefault() -->
                  <el-button @click.native.prevent="goToDetail(scope.$index, scope.row)" type="text">查看详情
                  </el-button>
                 
                </template>
              </el-table-column>
            </el-table>
            &nbsp;
          </div>
          <!-- 表格 End -->
          
          <!-- 分页 Start -->
          <div class="pagination_block">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :page-sizes="[10, 20, 30]"
              :page-size="taskListParams.limit"
              :current-page="taskListParams.offset"
              layout="prev, pager, next, sizes, jumper"
              :total="totalPageSize2">
            </el-pagination>
          </div>
          <!-- 分页 End -->

        </div>
        
      </div>

     
   
      <fotter></fotter>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from 'api'
import RadioGroup from "../../components/RadioGroup";
import SearchInput from "../../components/SearchInput";
import fotter from "../../views/common/fotter";
import moment from 'moment';
import newArea from "../../utils/newArea";

export default {
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      getStaffInfo:[],
      totalPageSize:0,
      // queryParam:{
      //   offset:1,
      //   limit:10,
      //   column: "create_time",
      //   order: false,
      //   queryStr: "",
      //   corpId:window.localStorage.getItem('corpId')
      // },
      fits:'cover',
      url: '',
      open: false,
      jobRecord:[],
      elevatorTotal:[],
      departmentName:'',
      birthdayFrom:'',
      entryTimeFrom:'',
      empTimeFrom:'',
      elevatorList:[],
      elevatorTotal:0,
      taskListParams:{
        userId: this.$route.params.staffId,
        limit: 10,
        offset: 0
      },
      totalPageSize2:0,
      statusText:{
        0:'无计划',
        1000:'可派单',
        2000:'未派单',
        3000:'已派单',
        4000:'已接单',
        5000:'已关闭',
        6000:'已超时',
        7000:'已完成',
      },
      typeText:{
        1015:'例行维保',
        1090:'季度维保',
        1180:'半年维保',
        1365:'年度维保',
        2000:'故障处理',
        4000:'事故救援',
      },
      staffMLiftParam:{
        userId:this.$route.params.staffId,
        limit:10,
        offset:1
      }
    }
  },
  components: {
    'fotter': fotter,
  },
  mounted() {
    this.getAllAccountData()
    // 获取员工管辖电梯
    this.getStaffManageLift()
    // 获取员工作业记录
    this.getStaffTaskList()
    console.log("params==" + this.$route.params.staffId)
    // console.log("111111111111111::" + moment("20121031", "YYYYMMDD").fromNow())
  },
  methods: {
    moment,
    getTypeColor(type){
      var color =  ''
      if(type == '故障处理'){
        color = '#FFA90B'
      } else if(type == '事故救援'){
        color = '#E9645D'
      }
      return color
    },
    // 跳转到诊断
    goDetection(regCode) {
      this.$router.push({
        path: '/detection-panel',
        query: {
          regCode: regCode
        }
      })
    },
    // 查询账户详情
    getAllAccountData(){
      api.accountApi.getStaffDetails(this.$route.params.staffId).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.getStaffInfo = res.data.data.staffInfo
          var areaName1 = newArea.getAreaName(this.getStaffInfo.areaCode).join('  ')
          Vue.set(this.getStaffInfo, 'areaName', areaName1)

          this.departmentName = res.data.data.departmentName
          this.elevatorTotal = res.data.data.elevatorTotal
          this.birthdayFrom = moment(moment(this.getStaffInfo.birthday).format('YYYYMMDD'),'YYYYMMDD').fromNow().replace("前","").replace("内","")
          this.entryTimeFrom = moment(moment(this.getStaffInfo.entryTime).format('YYYYMMDD'),'YYYYMMDD').fromNow().replace("前","").replace("内","")
          this.empTimeFrom = moment(moment(this.getStaffInfo.empTime).format('YYYYMMDD'),'YYYYMMDD').fromNow().replace("前","").replace("内","")
          console.log("this.birthdayFrom---" + this.birthdayFrom)

          // this.elevatorList = res.data.data.elevatorList
          this.totalPageSize = res.data.data.elevatorTotal
          // this.url = "http://192.168.100.7:8080/domino/view/image?filename=" + this.getStaffInfo.avatarUrl
          this.url = api.accountApi.viewPic(this.getStaffInfo.avatarUrl)
          
          // this.elevatorList.forEach(item =>{
          //   var areaName = newArea.getAreaName(item.areaCode).join('')
          //   Vue.set(item, 'areaName', areaName)
          // })
          
          // 获取头像
          
          // this.jobRecord = res.data.data.jobRecord
          // this.jobRecord = res.data.data.jobRecord

          // this.totalPageSize = res.data.data.total

        } else {
          this.getStaffInfo = []
        }
        
        // console.log("res.data.code" + res.data.data.records[0])s
      }).catch((res) => {
        
      })
     
    },
    // 获取员工管辖电梯
    getStaffManageLift(){
      console.log("this.staffMLiftParam==" + JSON.stringify(this.staffMLiftParam))
      api.accountApi.getStaffManageLift(this.staffMLiftParam).then((res) => {
        if(res.data.code === 200 && res.data.message === 'success'){
          this.elevatorList = res.data.data.elevList
          // this.totalPageSize = res.data.data.count
          this.elevatorList.forEach(item =>{
            var areaName = newArea.getAreaName(item.areaCode).join('')
            Vue.set(item, 'areaName', areaName)
          })
        } else {
          this.elevatorList = []
        }
        
      })
    },
    // 跳转到工单详情
    goToDetail(index,row){
      this.$router.push({name: 'missionDetail', params: {'id': row.taskId}})
    },
    // 展开
    // open(){
      // 作业记录
    getStaffTaskList(){
      api.accountApi.staffTaskList(this.taskListParams).then((res) => {
        this.jobRecord = res.data.data.records || []
        this.totalPageSize2 = res.data.data.total
      })
    },
    // },
    // 每页条数变化
    handleSizeChange(val) {
      this.staffMLiftParam.limit = val
      // console.log(`每页 ${val} 条`);
      this.getStaffManageLift()
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.staffMLiftParam.offset = val
      // console.log(`当前页: ${val}`);
      this.getStaffManageLift()
    },
    // 每页条数变化
    handleSizeChange2(val) {
      this.taskListParams.limit = val
      // console.log(`每页 ${val} 条`);
      this.getStaffTaskList()
    },

    // 当前页变化
    handleCurrentChange2(val) {
      this.taskListParams.offset = val
      // console.log(`当前页: ${val}`);
      this.getStaffTaskList()
    },
    

  },
}
</script>

<style lang="stylus">
#staffDetails
  .bread-nav
    padding: 0 20px;
    height: 52px;
    line-height: 52px;
    background: #fff;
    border-bottom: 1px solid #e9e9e9;
    span 
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      &.on
        color: #34414C;
    em
      display: inline-block;
      font-size: 16px;
      color: #7e8a95;
      margin: 0 10px;

  
  .s_contain
    height 210px
    padding: 33px 0
    margin-left:220px
  .s_pic
    height 210px
    width 210px
    position:absolute;
    box-shadow: 0 8px 20px -12px rgba(66,114,255,0.30);
    img
      border-radius: 8px 0 0 8px;
  .s_de_edit
    background url('../../assets/images/hs/edit.png') no-repeat center;
    width 14px
    height 14px
    display: inline-block
    position absolute 
    top 35px 
    right 26px
    cursor pointer
  .s_de_name
    font-size: 24px;
    margin-left: 36px
  .s_de_department
    font-size: 14px;
    color: #7E8A95;
    margin 10px 0 20px 36px
  .s_de_details 
    li
      float left
      font-size: 14px;
      padding: 5px 7px 5px 37px;
      min-width: 201px;
      max-width: 301px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    .tie
      font-size: 12px;
      color: #7E8A95;
  .open
    color: #4272FF;
    float: right;
    font-size: 14px;
    margin-right: 28px
    cursor pointer
  .closePanel
    // height: 303px;
    overflow: hidden;

</style>
