<template>
    <div>
        <h1>{{id?'编辑':'新建'}}英雄</h1>
        <el-form  label-width="120px" @submit.native.prevent="save()">
            <el-tabs value="skills" type="border-card">
                <el-tab-pane name="basic" label="基础信息">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                            :headers="getAuthHeaders()"
                        
                            >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item of categories" :key="item._id"
                                :value="item._id" :label="item.name" 
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>                   
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item of items" :key="item._id"
                                :value="item._id" :label="item.name" 
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item of items" :key="item._id"
                                :value="item._id" :label="item.name" 
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="skills" label="技能">
                    <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item ,'icon', res.url)"
                                    :headers="getAuthHeaders()"
                                    >
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type='textarea' v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input type='textarea' v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-button size='small' type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                            
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top:1rem">
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props:{
        id:{},
        
    },
    data(){
        return {
            categories:[],
            items:[],
            model:{
                name:'',
                avatar:'',
                scores:{
                    difficult:0,
                    attack:0,
                    survive:0,
                    skills:0,
                },
            },
        }
    },
    methods:{
        afterUpload(res){
            console.log('uploaded')
            this.$set(this.model,'avatar',res.url)
            // this.model.icon = res.url
        },
        async fetchItems(){
           let res = await  this.$http.get(`rest/items`);
           this.items = res.data;
        },
        async fetchCategories(){
           let res = await  this.$http.get(`rest/categories`);
           this.categories = res.data;
        },
        async save(){
          
            if(this.id){
                 await this.$http.put(`rest/heroes/${this.id}`,this.model)
            }else{
                 await this.$http.post(`rest/heroes`,this.model)
            }
            this.$router.push('/heroes/list')
            this.$message({
                type:'success',
                message:'修改成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            // this.model = res.data;
            this.model = Object.assign({},this.model,res.data)
            // console.log(this.model)
        },
    },
    created(){
        this.id && this.fetch();
        this.fetchCategories();
        this.fetchItems();
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>