<template>
    <div class="container">
        <panel-group :count_new="count_new" :count_process="count_process" :count_finished="count_finished" @onSelect="goToPage" />
        <div>
            <h2 class="pb-10 text-xl">Daily Job Status</h2>
            <chart-dashboard-daily-jobs
                :days="weeklyDays"
                :newjobs="weeklyNewJobs"
                :in_process="weeklyInProcess"
                :finished="weeklyFinished"
            ></chart-dashboard-daily-jobs>
        </div>
    </div>
</template>

<script>
    import PanelGroup from "./component/PanelGroup";
    export default {
        name: "index",
        components: {
            PanelGroup,
        },
        mounted() {
            // this.getCounter();
            // this.getReport();

        },
        data(){
            return {
                weeklyDays: [],
                weeklyNewJobs: [],
                weeklyInProcess: [],
                weeklyFinished: [],

                count_new: 0,
                count_process: 0,
                count_finished: 0
            }
        },
        methods: {
            getReport(){
                axios.get('/admin/dashboard/reports').then((response) => {
                    const {newjobs,in_process,finished} = response.data;
                    console.log(newjobs,in_process,finished);

                    if (newjobs){
                        this.weeklyNewJobs = newjobs.map((e)=>{
                            return e.total;
                        })
                        this.weeklyDays = newjobs.map((e)=>{
                            return e.day;
                        })
                    }
                    if (in_process){
                        this.weeklyInProcess = in_process.map((e)=>{
                            return e.total;
                        })
                        this.weeklyDays = in_process.map((e)=>{
                            return e.day;
                        })
                    }
                    if (finished){
                        this.weeklyFinished = finished.map((e)=>{
                            return e.total;
                        })
                        this.weeklyDays = finished.map((e)=>{
                            return e.day;
                        })
                    }

                    console.log(this.weeklyNewJobs);
                    console.log(this.weeklyDays);

                }).catch((e)=>{

                }).finally(()=>{

                });
            },
            getCounter(){
                axios.get('/admin/dashboard/jobstatus').then((response) => {
                    const data = response.data;
                    if (typeof data === 'object' && Array.isArray(data)){
                        data.filter(d=>{
                            if (d.job_status === 'New'){
                                this.count_new = d.total;
                            }
                            if (d.job_status === 'In Process'){
                                this.count_process = d.total;
                            }
                            if (d.job_status === 'Finished'){
                                this.count_finished = d.total;
                            }
                        });
                    }
                    // const {count_new,count_process,count_finished} = response.data;
                    //
                    // this.count_new = count_new;
                    // this.count_process = count_process;
                    // this.count_finished = count_finished;

                }).catch((e)=>{

                }).finally(()=>{

                });
            },
            getTodaysCounter(){
                axios.get('/admin/dashboard/todays_counter').then((response) => {
                    // const {count_new,count_process,count_finished} = response.data;
                    //
                    // this.count_new = count_new;
                    // this.count_process = count_process;
                    // this.count_finished = count_finished;

                }).catch((e)=>{

                }).finally(()=>{

                });
            },
            goToPage(page){
                switch (page) {
                    case 'newjobs':
                        this.$router.push({'name':'new-jobs'});
                        break;
                    case 'in_process':
                        this.$router.push({'name':'processing-jobs'});
                        break;
                    case 'finished':
                        this.$router.push({'name':'finished-jobs'});
                        break;
                }
            }

        }
    }
</script>

<style scoped>

</style>
