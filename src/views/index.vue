<template>
  <div class="wrapper">
    <el-container>
      <el-aside width="200px" id="aside">
        <h2>login</h2>
        <!-- 侧边栏 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#424F63"
          text-color="#fff"
          active-text-color="#ffd04b"
        
          :collapse="isCollapse"
          router
          
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/Form">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>表格管理</span>
            </template>
            <el-menu-item index="/Form">
              <span slot="title">基本表格</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <span slot="title">排序表格</span>
            </el-menu-item>
            <el-menu-item index="2-3">
              <span slot="title">筛选表格</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图表管理</span>
            </template>
            <el-menu-item index="/eatch">
              <span slot="title">柱状图</span>
            </el-menu-item>
            <el-menu-item index="/LineChart">
              <span slot="title">折线图</span>
            </el-menu-item>
            <el-menu-item index="/PieChart">
              <span slot="title">饼图</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>表单管理</span>
            </template>
            <el-menu-item index="/RenderForm">
              <span slot="title">渲染表单</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">系统管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-menu"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
          <el-menu-item index="/test">
            <i class="el-icon-menu"></i>
            <span slot="title">测试</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header_left">

            <span @click="showCheck">|||</span>

            <h3>VUE-ADMIN 后台管理系统</h3>
          </div>

          <div class="header_right">
            <div class="users">
              <i class="el-icon-user"></i>
              <span>luichooy</span>
            </div>
            <i class="el-icon-question"></i>
            <i class="el-icon-switch-button" @click="outLogin"></i>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {isCollapse:false,};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    outLogin() {
      this.$confirm("您将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/admin");
          this.$message.success("您已退出成功");
        })
        .catch(() => {
          this.$message("您已取消退出登录");
        });
    },
    showCheck(){
      console.log(1111)
     if(this.isCollapse==true){
       this.isCollapse=false
      aside.style.width='200px'
     }else{
       this.isCollapse=true
       aside.style.width='60px'
       
     }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {},
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
};
</script> 
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color:#fff;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header_left {
    width: 230px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }
  .header_right {
    display: flex;
    width: 250px;
    justify-content: space-around;
    color: rgb(56, 46, 46);
    i {
      font-size: 20px;
    }
    .users {
      width: 80px;
      display: flex;
      justify-content: space-between;
    }
  }
}

.el-aside {
 
  background-color: #424F63;
  color: rgb(53, 30, 105);
  height: 680px;
  height: 100%;
  h2 {
    text-align: center;
    color: #65CEA7;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
