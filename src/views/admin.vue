<template>
  <div class="box">

    <h3 class="h3">VUE-ADMIN 后台管理系统</h3>
    <div class="loginBox">
      <!-- 表单 -->
      <el-form ref="form" :rules="rules" label-width="40px">
        <!-- 账号框 -->
        <el-form-item prop="name">
          <el-input class="account" v-model="name" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码框-->
        <el-form-item prop="password">
          <el-input class="password" v-model="password" type='password' prefix-icon="el-icon-unlock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 验证码框 -->
        <el-form-item class="form-Code">
          <div class="form-group" style="display: flex;">
            <div>
              <el-input type="text" id="code" prefix-icon="el-icon-monitor" v-model="code" class="code"
                placeholder="请输入您的验证码"></el-input>
            </div>
            <div class="login-code" @click="refreshCode">
              <!--验证码组件-->
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
          </div>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="Sign" @click="submitForm">登录系统</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>

<script>
  import SIdentify from '../store/sidentify'
  export default {
    // 组件名称
    name: 'demo',
    // 组件参数 接收来自父组件的数据
    props: [],
    // 局部注册的组件
    components: {
      SIdentify
    },
    // 组件状态值
    data() {
      return {
        name: "admin",
        password: "admin",
        rules: {
          name: [{
            required: true,
            message: '请输入账号不能为空',
            trigger: 'blur'
          },],
          password: [{
            required: true,
            message: '请输入密码不能为空',
            trigger: 'blur'
          },],

        },
        identifyCodes: "1234567890",
        identifyCode: "",
        code: "", //text框输入的验证码、
        ruleFrom:{}


      }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    // 组件方法
    methods: {
      // 验证码
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      },

      // 登录
      submitForm(){

        if(this.name.value==""||this.password.value==""||this.code.value!==this.identifyCode.text||this.code==""){
          
          this.$message.error('登录失败');
        
          // this.$router.push('/index')
        }else{
        
          this.$message.success('登录成功')
          this.$router.push('/index')
          let token='token'
          localStorage.setItem('token',token)
        }
         
        
      }
    },



    

    // 以下是生命周期钩子   注：没用到的钩子请自行删除
    /**
     * 在实例初始化之后，组件属性计算之前，如data属性等
     */
    beforeCreate() { },
    /**
     * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
     */
    created() {
      this.refreshCode()
    },
    /**
     * 在挂载开始之前被调用：相关的 render 函数首次被调用。
     */
    beforeMount() { },
    /**
     * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
     * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
     */
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    /**
     * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
     * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
     */
    beforeUpdate() { },
    /**
     * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
     * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
     */
    updated() { },
    /**
     * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
     */
    activated() { },
    /**
     * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
     */
    deactivated() { },
    /**
     * 实例销毁之前调用。在这一步，实例仍然完全可用。
     */
    beforeDestroy() { },
    /**
     * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
     * 所有的事件监听器会被移除，所有的子实例也会被销毁。
     */
    destroyed() { }
  }
</script>
<style lang='scss' scoped>
  .box {
    width: 100%;
    height: 750px;
    background: rgb(7, 219, 247);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginBox {
    width: 500px;
    height: 300px;
    position: absolute;
    top: 200px;
    left: 500px;
    background: #fff;
  }

  .account {
    width: 400px;
    margin-top: 20px;
  }

  .password {
    width: 400px;
  }

  .Verification_Code {
    width: 260px;
  }

  .Code-box {
    width: 100px;
    height: 35px;
    background: rgb(32, 20, 199);
    position: absolute;
    right: 60px;
    bottom: 3px;
  }

  .Sign {
    float: right;
    margin-right: 50px;
  }

  .h3 {
    position: absolute;
    top: 140px;
    left: 640px;
    color: #fff;
  }

  .code {
    width: 286px;
    height: 31px
  }

  .login-code {
    cursor: pointer;
  }
</style>