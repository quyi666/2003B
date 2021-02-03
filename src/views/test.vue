<template>
    <div>
        <div class="box">
            <el-card class="box-card" style="width: 500px; height:200px">
                <p class="text">测试数据mock</p>
                <el-col :span="6">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-card>
            <el-card class="box-card" style="width: 500px; height:220px">
                <p class="text">评分组件</p>
                <p class="text-Form">size --- 控制每颗星星的大小，类型为string,备选值分别为24/36/48；

                    score --- 传递评分的分数，类型为number</p>
                <div class="block">
                    <el-rate v-model="value1"></el-rate>
                    <el-rate v-model="value2"></el-rate>
                    <el-rate v-model="value3"></el-rate>

                </div>
            </el-card>
        </div>
        <el-card class="box-card">
            <p class="text">病人组件</p>
            <p class="brzj">
                <span>病人基本情况 周学明 622301196502041310</span>

                <el-input style="width: 200px;" placeholder="请输入内容" >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="success" circle  @click="addForm">⬇</el-button>
            <div class="box-Form" v-show="add==true">
                <p > <span> 姓名：周学明</span>
                    <span> 性别：男</span>
                    <span> 身份证号：622829186403579462</span>
                </p>
                <p> <span> 姓名：周学明</span>
                    <span> 性别：男</span>
                    <span> 身份证号：622829186403579462</span>
                </p>
            </div>

            </p>
        </el-card>
        <el-card class="box-card">
            <p class="text">tableRadio 组件</p>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="" width="180"> </el-table-column>
                <el-table-column prop="name" label="" width="180"> </el-table-column>
                <el-table-column prop="address" label="0-1/周">
                  <el-radio v-model="radio" name="1"></el-radio>
                </el-table-column>
                <el-table-column prop="address" label="2-3/周">
                  <el-radio v-model="radio" name="2"></el-radio>
                </el-table-column>
                <el-table-column prop="address" label="4-5/周">
                  <el-radio v-model="radio" name="2"></el-radio>
                </el-table-column>
                <el-table-column prop="address" label="6-7/周">
                  <el-radio v-model="radio" name="3"></el-radio>
                </el-table-column>
              </el-table>
        </el-card>

        <el-card class="box-card">
            <p class="text">导丝的使用情况</p>
            <tr>
              <td>编号		 	</td>
              <td>名称</td>
              <td>直径 （单位：inch）</td>
              <td>操作</td>
            
            </tr>
              <el-form
                ref="form"
              
                :inline="true"
                :model="form"
                label-width="80px"
              >
                <div v-for="(item, index) in form.dynamicItem" :key="index">
                  <el-form-item :prop="'dynamicItem.' + index + '.name'">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item :prop="'dynamicItem.' + index + '.name'">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item :prop="'dynamicItem.' + index + '.phone'">
                    <el-input v-model="item.phone"></el-input>
                  </el-form-item>
                  <el-form-item class="dynamicItem">
                    <el-button
                      v-if="index + 1 == form.dynamicItem.length"
                      @click="addItem"
                      type="primary"
                      >增加</el-button
                    >
                    <el-button
                      v-if="index !== -1"
                      @click="deleteItem(item, index)"
                      type="danger"
                      >删除</el-button
                    >
                  </el-form-item>
                </div>
              </el-form>
            
            </el-card >
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
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                value1: 3,
                value2: 4,
                value3: 5,
                add:false,
                tableData: [
        {
          date: "",
          name: "早餐",
          address: "",
        },
        {
          date: "",
          name: "午餐",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "",
          name: "晚餐",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ],
      radio:'1',
      form: {
        dynamicItem: [
          {
            name: "",
            phone: "",
          },
        ],
      },
            };

        },
        // 计算属性
        computed: {},
        // 侦听器
        watch: {},
        // 组件方法
        methods: {
            addForm(){
                if(this.add==true){
                    this.add=false
                }else{
                    this.add=true
                }
            },
            addItem() {
      this.form.dynamicItem.push({
        name: "",
        phone: "",
      });
    },
    sure(form) {
      console.log(this.form.dynamicItem.length, "length");
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteItem(item, index) {
      this.form.dynamicItem.splice(index, 1);
      console.log(this.form.dynamicItem, "删除");
    },
        },
        // 以下是生命周期钩子   注：没用到的钩子请自行删除
        /**
         * 在实例初始化之后，组件属性计算之前，如data属性等
         */
        beforeCreate() { },
        /**
         * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
         */
        created() { },
        /**
         * 在挂载开始之前被调用：相关的 render 函数首次被调用。
         */
        beforeMount() { },
        /**
         * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
         * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
         */
        mounted() { },
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
        destroyed() { },
    };
</script>
<style lang="scss" scoped>
    .text {
        border-bottom: 1px solid #aaa;
        text-align: left;
    }

    .box {
        width: 100%;
        height: 250px;
        display: flex;

    }

    .box-card {
        margin: 8px;
        padding: 4px;
    }

    .text-Form {
        text-align: left;
    }

    .block {
        text-align: left;
    }
    .brzj{
        display: flex;
        justify-content:space-around;
    }
  
    .box-Form>p{
        width: 800px;
        text-align: left; 
        }
    .box-Form{
        width: 100%;
       
    }
    tr{
width: 1000px;


}
td{
width: 240px;
  text-align: left;
  

}
.el-form{
  margin-left: 20px;
  text-align: left;
 }        
.el-input{
width: 160px;
  margin-left: 60px;

}
  
</style>