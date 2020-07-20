<template>
    <div class="container card">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="align-text-baseline-middle">User Roles</span>



                <div class="float-right">
                    <el-input size="medium" placeholder="Search..." v-model="search" class="input-with-select align-top" style="width: 250px;" clearable @clear="loadData" @keyup.enter.native="loadData">
                        <el-button slot="append" icon="el-icon-search" @click="loadData"></el-button>
                    </el-input>
                    <el-button type="primary" @click="onAdd" v-if="$auth.hasPermission('role.add')">Add</el-button>
                </div>

            </div>
            <el-table
                :data="data.items"
                :default-sort = "{prop: 'date', order: 'descending'}"
                @sort-change="sort_change"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="Name"
                    sortable>
                </el-table-column>
                <el-table-column
                    width="180"
                    label="Action">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            v-if="$auth.hasPermission('role.edit')"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>

                        <el-popconfirm
                            v-if="$auth.hasPermission('role.delete')"
                            @onConfirm="handleDelete(scope.$index, scope.row)"
                            confirmButtonText='OK'
                            cancelButtonText='No, Thanks'
                            icon="el-icon-info"
                            iconColor="red"
                            title="Are you sure to delete this?"
                        >
                            <el-button
                                slot="reference"
                                size="mini"
                                type="danger">Delete</el-button>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="mt-4 text-right"
                :background="false"
                :page-size="data.per_page"
                :current-page="data.current_page"
                background
                layout="prev, pager, next"
                :total="data.total"
                @current-change="pageChange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                search: '',
                data:{
                    sort_by: '',
                    sort_order: '',
                    per_page: 5,
                    current_page: 1,
                    total: 4,
                    items: []
                },
            }
        },
        mounted() {
            console.log(this.$auth.user);
            this.loadData();
        },
        methods: {
            loadData(){
                const self = this;
                axios.get('/admin/role',{
                    params:{
                        page: this.data.current_page,
                        rows: this.data.per_page,
                        sort: this.data.sort_by,
                        order: this.data.sort_order,
                        s: this.search
                    }
                }).then(function (response) {
                    self.data.items = response.data.data;
                    self.data.total = parseInt(response.data.meta.total);
                    self.data.current_page = parseInt(response.data.meta.current_page);
                    self.data.per_page = parseInt(response.data.meta.per_page);
                });
            },
            searchResult(){

            },
            formatter(row, column) {
                return row.address;
            },
            sort_change(sort){
                this.data.sort_by = sort.prop;
                if (sort.order === 'ascending'){
                    this.data.sort_order = 'a';
                } else if (sort.order === 'descending'){
                    this.data.sort_order = 'd';
                } else {
                    this.data.sort_by = '';
                    this.data.sort_order = '';
                }
                this.loadData();
            },
            pageChange(page){
                this.data.current_page = page;
                this.loadData();
            },
            onAdd(){
                this.$router.push({name:'add_user_role'});
            },
            handleEdit(index, row){
                console.log(index,row);

                this.$router.push({name: 'edit_user_role', params: { id: row.id, data: row }});
            },
            handleDelete(index, row){
                const self = this;
                axios.delete('/admin/role/'+row.id).then(function (response) {
                    if(response.data.status === 'success'){
                        self.$message({
                            showClose: true,
                            message: response.data.message,
                            type: 'success'
                        });
                        self.$router.push({
                            name: 'user_roles'
                        });
                    } else if(response.data.status === 'error'){
                        self.$message({
                            showClose: true,
                            message: response.data.message,
                            type: 'error'
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
