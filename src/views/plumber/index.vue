<template>
  <div>
    <el-card>
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        @click="addBtn"
      >添加管理员</el-button>
      <el-table :data="userList" style="width: 100%" header-align="center">
        <el-table-column type="index" label="ID" width="50" />
        <el-table-column prop="name" label="用户名" width="280" />
        <el-table-column prop="collegeType" label="所属学院" width="280" />
        <el-table-column prop="status" label="是否启用" width="280">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="handlePlumberStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column width="280">
          <template>
            <el-button type="primary" size="mini" round>编辑</el-button>
            <el-button type="danger" size="mini" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加修改弹出框 -->
    <el-dialog
      :title="title"
      :visible.sync="showDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="管理员名称">
          <el-input v-model="userFormInfo.name" />
        </el-form-item>
        <el-form-item label="选择学院">
          <el-select
            v-model="userFormInfo.collegeType"
            placeholder="请选择活动区域"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userFormInfo.pwd" type="password" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="userFormInfo.status">
            <el-radio checked label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAddEditPlumber"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addPlumber,
  updatePlumber,
  delPlumber,
  getPlumberList,
  updatePlumberStatus
} from '@/api/plumber'
export default {
  name: '',
  components: {},
  data() {
    return {
      showDialogVisible: false,
      title: '',
      userFormInfo: {
        id: 0,
        name: 'admin',
        pwd: 123456,
        collegeType: 1,
        status: 1
      },
      userList: [
        {
          id: 0,
          name: 'admin',
          pwd: 123456,
          collegeType: 1,
          status: 1
        }
      ]
    }
  },
  created() {},
  mounted() {
    this.plumberList()
  },
  methods: {
    // 添加管理员按钮
    addBtn() {
      this.title = '添加管理员'
      this.showDialogVisible = true
    },
    // 修改管理员按钮
    editBtn() {
      this.title = '修改管理员'
      this.showDialogVisible = true
    },
    // 删除管理员
    async handleDelPlumber(id) {
      await delPlumber(id).then((res) => {
        if (res.code === 200) {
          this.$message({ type: 'success', message: res.msg })
        }
      })
    },
    // 添加修改管理员
    async handleAddEditPlumber() {
      // is id send dialog
      // yes=>edit
      if (this.userFormInfo.id) {
        await updatePlumber(this.userFormInfo).then((res) => {
          if (res.code === 200) {
            this.$message({ type: 'success', message: res.msg })
          }
        })
        this.showDialogVisible = false
        return this.plumberList()
      } else {
        // no => add
        await addPlumber(this.userFormInfo).then((res) => {
          if (res.code === 200) {
            this.$message({ type: 'success', message: res.msg })
          }
        })
        this.showDialogVisible = false
        return this.plumberList()
      }
    },
    // 获取管理员列表
    async plumberList() {
      await getPlumberList().then((res) => {
        if (res.code === 200) {
          this.$message({ type: 'success', message: res.msg })
        }
        this.userList = res.data
      })
    },
    // 处理switch状态
    async handlePlumberStatus(plumberInfo) {
      await updatePlumberStatus(plumberInfo.id).then((res) => {
        if (res.code === 200) {
          this.$message({ type: 'success', message: res.msg })
          this.getPlumberList()
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
