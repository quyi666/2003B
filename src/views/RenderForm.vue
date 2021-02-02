<template>
  <div>
    <el-card class="box-card">
      <div class="box">
        <p class="text">上报时间</p>
        <el-col :span="6">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </div>
      <div class="box">
        <p class="text">性别</p>
        <el-col :span="6">
          <el-select v-model="form.region" placeholder="性别">
            <el-option label="男" value="shanghai"></el-option>
            <el-option label="女" value="beijing"></el-option>
            <el-option label="不明" value="beijing"></el-option>
          </el-select>
        </el-col>
      </div>
      <div class="box">
      <el-col :span="4">
        <p class="text">民族</p>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </div>
      <div class="box">
        <p class="text">年收入</p>
        <el-col :span="5">
          <el-input-number
            v-model="num"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-col>
      </div>
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
      <div class="box">
        <p class="text">您习惯在食物和水中放糖吗</p>
        <el-col :span="4">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-col>
      </div>
      <div>
        <p class="text">导丝的使用情况</p>
        <tr>
          <td>编号		 	</td>
          <td>名称</td>
          <td>直径 （单位：inch）</td>
          <td>操作</td>
        
        </tr>
          <el-form
            ref="form"
            :rules="formRules"
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
        
      </div>
    </el-card>
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
      input: "",
      form: {
        date1: "",
        region: ["男", "女", "不明"],
      },
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
      num: 1,
      radio: "1",
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

<style scoped>
.text {
  text-align: left;
}
.box {
  height: 150px;
}
tr{
width: 1000px;


}
td{
width: 220px;
  text-align: center;
  

}
 .el-form{
  margin-left: 20px;
  text-align: left;
 }        
.el-input{
width: 160px;
  margin-left: 40px;
}
.dynamicItem{
  margin-left: 20px;
}
</style>
