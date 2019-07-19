import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      meta: {
        title: "登录",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/common/Login.vue'], resolve)
    },
    {
      path: "/map",
      name: "map",
      meta: {
        title: "异常处理地图",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/map/MapList.vue'], resolve)
    },
    {
      path: "/account",
      name: "Account",
      meta: {
        title: "账号管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Account.vue'], resolve)
    },
    {
      path: "/account/role/:aaa",
      name: "role",
      meta: {
        title: "角色管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Permission.vue'], resolve)
    },
    {
      path: "/example",
      name: "example",
      meta: {
        title: "一些例子",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/example/example.vue'], resolve)
    },
    {
      path: "/actApi",
      name: "actApi",
      meta: {
        title: "创建维保管理员的账户",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/aaa/account_api.vue'], resolve)
    },
    {
      path: "/roleApi",
      name: "roleApi",
      meta: {
        title: "为指定公司创建角色",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/aaa/role_api.vue'], resolve)
    },
    {
      path: "/manager_api",
      name: "manager_api",
      meta: {
        title: "创建需要管理的权限接口信息",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/aaa/manager_api.vue'], resolve)
    },
    {
      path: "/moduleApi",
      name: "moduleApi",
      meta: {
        title: "模块功能集合",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/aaa/module_api.vue'], resolve)
    },
    {
      path: "/corpApi",
      name: "corpApi",
      meta: {
        title: "企业API",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/aaa/corp_api.vue'], resolve)
    },
    
    {
      path: "/lift-list",
      name: "lift-list",
      meta: {
        title: "电梯列表页",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/lift/LiftList.vue'], resolve)
    },
    {
      path: "/lift-add",
      name: "lift-add",
      meta: {
        title: "电梯查询",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/lift/LiftAdd.vue'], resolve)
    },
    {
      path: "/lift-add-result",
      name: "lift-add-result",
      meta: {
        title: "电梯详情",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/lift/LiftAddResult.vue'], resolve)
    },
    {
      path: "/device",
      name: "device",
      meta: {
        title: "设备管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Device.vue'], resolve)
    },
    {
      path: "/device-detail",
      name: "device-detail",
      meta: {
        title: "设备管理详情",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/DeviceDetail.vue'], resolve)
    },
    {
      path: "/device-add-gi",
      name: "device-add-gi",
      meta: {
        title: "设备管理详情（通用）",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/DeviceAddGi.vue'], resolve)
    },
    {
      path: "/lift-device",
      name: "lift-device",
      meta: {
        title: "单部电梯设备列表",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/lift/LiftDevice.vue'], resolve)
    },
    {
      path: "/detection-query",
      name: "detection-query",
      meta: {
        title: "检测诊断查询",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/detection/DetectionQuery.vue'], resolve)
    },
    {
      path: "/detection",
      name: "detection",
      meta: {
        title: "检测诊断",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/detection/Detection.vue'], resolve)
    },
    {
      path: "/staff",
      name: "staff",
      meta: {
        title: "员工管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Staff.vue'], resolve)
    },
    {
      path: "/addStaff",
      name: "addStaff",
      meta: {
        title: "添加员工",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/AddStaff.vue'], resolve)
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "添加员工",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/example/register.vue'], resolve)
    },
    {
      path: "/staffDetails/:staffId",
      name: "staffDetails",
      meta: {
        title: "员工详情",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/StaffDetails.vue'], resolve)
    },
    {
      path: "/department",
      name: "department",
      meta: {
        title: "部门管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Department.vue'], resolve)
    },
    {
      path: "/center",
      name: "center",
      meta: {
        title: "部门管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/common/Center.vue'], resolve)
    },
    {
      path: "/mission",
      name: "mission",
      meta: {
        title: "任务管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/mission/MissionList.vue'], resolve)
    },
    {
      path: "/example",
      name: "example",
      meta: {
        title: "任务管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/example/example.vue'], resolve)
    },
    {
      path: "/upload",
      name: "upload",
      meta: {
        title: "上传",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/example/upload.vue'], resolve)
    },
    {
      path: "/Date",
      name: "Date",
      meta: {
        title: "任务管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./components/DateContainer.vue'], resolve)
    },
    {
      path: "/EditStaff/:staffId",
      name: "editStaff",
      meta: {
        title: "任务管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/EditStaff.vue'], resolve)
    },
  ]
})


// router.beforeEach((to, from, next) => {
//   // 判断当前的token是否存在
//   console.log(to.meta)
//   let token = window.localStorage.getItem("user-token")
//   if (to.matched.some(record => record.meta.auth) && (!token || token === null)) {
//     next({
//       path: "/login",
//       query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     })
//   } else {
//     next()
//   }
// })


router.beforeEach((to, from, next) => {
  // 设置标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


export default router

