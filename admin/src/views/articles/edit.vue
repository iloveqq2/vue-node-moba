<template>
  <div>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <!-- <el-input  v-model="model.body"></el-input> -->
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        categories: []
      },
      categories: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
   async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

      var formData = new FormData();
      formData.append("file", file);
      let res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

    //   axios({
    //     url: "https://fakeapi.yoursite.com/images",
    //     method: "POST",
    //     data: formData
    //   })
    //     .then(result => {
    //       let url = result.data.url; // Get url from response
    //       Editor.insertEmbed(cursorLocation, "image", url);
    //       resetUploader();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post(`rest/articles`, this.model);
      }
      // await this.$http.put(`rest/categories/${this.id}`,this.model)
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "修改成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchcategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchcategories();
  }
};
</script>