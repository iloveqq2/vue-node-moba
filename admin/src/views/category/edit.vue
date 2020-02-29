<template>
    <div>
        <h1>新建分类 {{id}}</h1>
        <el-form  label-width="120px" @submit.native.prevent="save()">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">修改</el-button>
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
                name:''
            }
        }
    },
    methods:{
        async save(){
            await this.$http.put(`categories/${this.id}`,this.model)
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'修改成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`categories/${this.id}`)
            this.model = res.data
        }
    },
    created(){
        this.fetch();
    }
}
</script>