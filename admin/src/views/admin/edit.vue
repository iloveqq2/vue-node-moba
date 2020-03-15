<template>
    <div>
        <h1>{{this.id?'新建':'修改'}}管理员</h1>
        <el-form  label-width="120px" @submit.native.prevent="save()">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input typae="password" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props:{
        id:{}
    },
    data(){
        return {
            model:{
                username:'',
                password:''
            },
            parents:[],
        }
    },
    methods:{
        async save(){
            if (this.id) {
                await this.$http.put(`rest/admin_user/${this.id}`, this.model);
            } else {
                await this.$http.post(`rest/admin_user`, this.model);
            }
            // await this.$http.put(`rest/categories/${this.id}`,this.model)
            this.$router.push('/admin/list')
            this.$message({
                type:'success',
                message:'修改成功'
            })
        },
        async fetch(){
            console.log('aaaaa')
            const res = await this.$http.get(`rest/admin_user/${this.id}`)
            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$http.get(`rest/admin_user`)
            this.parents = res.data
        },
    },
    created(){
        this.id && this.fetch();
        this.fetchParents();
    }
}
</script>