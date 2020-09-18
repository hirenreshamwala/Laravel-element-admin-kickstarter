<template>
    <div class="container card" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="align-text-baseline-middle">Customers</span>
                <div class="float-right">
                    <el-input size="medium" placeholder="Search..." v-model="search" class="input-with-select align-top" style="width: 250px;" clearable @clear="loadData" @keyup.enter.native="loadData">
                        <el-button slot="append" icon="el-icon-search" @click="loadData"></el-button>
                    </el-input>

                    <el-button type="primary" @click="onAdd" v-if="$auth.hasPermission('customer.add')">Add</el-button>
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
                    prop="contact_number"
                    label="Tel"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="Email"
                    sortable>
                </el-table-column>
				<el-table-column
					prop="city"
					label="City"
					sortable>
				</el-table-column>
				<el-table-column
					prop="state"
					label="State"
					sortable>
				</el-table-column>
                <el-table-column
                    v-if="$auth.hasPermission('customer.edit') || $auth.hasPermission('customer.delete')"
                    label="Action">
                    <template slot-scope="scope">
                        <el-button
                            v-if="$auth.hasPermission('customer.edit')"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-popconfirm
                            v-if="$auth.hasPermission('customer.delete')"
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
    import {fetchList, destroy} from '@/api/customer';
    export default {
        name: "index",
        data(){
            return {
                loading: false,
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
            this.loadData();
        },
        methods: {
            loadData(){
                this.loading = true;
                fetchList({
                    page: this.data.current_page,
                    rows: this.data.per_page,
                    sort: this.data.sort_by,
                    order: this.data.sort_order,
                    s: this.search
                }).then((response)=>{
                    this.data.items = response.data;
                    this.data.total = parseInt(response.meta.total);
                    this.data.current_page = parseInt(response.meta.current_page);
                    this.data.per_page = parseInt(response.meta.per_page);
                }).finally(()=>{
                    this.loading = false;
                });
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
                if(this.$auth.hasPermission('customer.add'))
                    this.$router.push({name:'add_customer'});
            },
            handleEdit(index, row){
                if(this.$auth.hasPermission('customer.edit'))
                    this.$router.push({name: 'edit_customer', params: { id: row.exid, data: row }});
            },
            handleDelete(index, row){
                this.loading = true;
                destroy(row.exid).then((response) => {
                    const {success, error, message} = response;
                    if (success){
                        this.$message({
                            showClose: true,
                            message: message || 'Customer removed successfully.',
                            type: 'success'
                        });
                        this.loadData();
                    } else if (error){
                        this.$message({
                            showClose: true,
                            message: message || 'Unable to remove the customer.',
                            type: 'error'
                        });
                    }
                }).finally(()=>{
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>
