<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="name" label="头像">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.avatar" alt="" style="width: 30px; border-radius: 50%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="评分" width="150">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.score" disabled text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="评分类型">
        <template slot-scope="scope">
          <span v-if="scope.row.score >= 4">满意</span>
          <span v-else>不满意</span>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTime" label="评价时间"></el-table-column>
      <el-table-column prop="text" label="内容" width="100"></el-table-column>
      <el-table-column prop="text" label="推荐" width="180px">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.recommend">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="text" label="时间">
        <template slot-scope="scope">{{
          scope.row.rateTime | timers
          }}</template>
      </el-table-column>
      <el-table-column label="操作" widrh="200px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editTrue(scope.row)" circle></el-button>
          <el-button type="success" icon="el-icon-check" size="small" @click="dialogFormVisible = true" circle>
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="del(scope.row.index)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageChange"
        :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 添加 -->

    <el-dialog title="添加" :visible.sync="dialogFormVisible" :model="add">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="add.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="add.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="editShow" :model="add">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="edit.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="edit.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editForm">确 定</el-button>
      </div>
    </el-dialog>
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
        tableData: [],
        pageChange: 0,
        pageSize: 15,
        total: 0,
        dialogFormVisible: false,
        add: {
          username: "",
          text: "",
        },
        editShow:false,
        edit:{
          username: "",
          text: "",
        }
      };
    },
    filters: {
      timers(val) {
        var time = new Date(val * 1000);
        var timeStr = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        return timeStr;
      },
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    // 组件方法
    methods: {
      fetchData() {
        this.$axios
          .get("https://api.it120.cc/maxinglong/mock/echartData/tableData")
          .then((res) => {
            // console.log(res)
            let data = JSON.parse(res);
            this.tableData = data.data.table;
            this.total = data.data.total;
          });
      },
      handleSizeChange(size) {
        console.log(size);
        this.pageSize = size;
        this.fetchData();
      },
      handleCurrentChange(num) {
        this.pageChange = num;
        this.fetchData();
      },
      // 增
      addForm() {
        this.tableData.unshift(this.add)
        this.$message.success("添加成功")
        // console.log(list)
        this.dialogFormVisible = false
      },
      // 删
      del(index) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          this.$message.success("删除成功")
        }).catch(()=>{
          this.$message("您已取消删除")
        })
      },
      // 改
      editTrue(row){
        console.log(row)
        this.editShow=true
        this.edit=row
        this.edit.text=row.text
      },
      editForm(){
        this.editShow=false
        this.$message.success("修改成功")
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
      this.fetchData();
    },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped>
  ::v-deep .el-table th,
  ::v-deep .el-table td {
    text-align: center !important;
  }
</style>