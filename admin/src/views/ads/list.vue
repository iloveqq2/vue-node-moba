<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称" width="140"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`确定要删除分类"${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`);
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        }
      });
      // const res =await this.
    }
  },
  created() {
    this.fetch();
  }
};
</script>