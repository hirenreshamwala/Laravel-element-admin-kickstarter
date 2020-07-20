<template>
    <el-row :gutter="40" class="panel-group">
        <el-col>
            <h2 class="pb-10 text-xl">Todays Job</h2>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
            <div class="card-panel" @click="handleClick('newjobs')">
                <div class="card-panel-icon-wrapper icon-people text-center sm:text-right sm:w-full md:w-auto lg:w-auto xl:w-auto">
                    <svg-icon icon-class="new-job" class-name="card-panel-icon" />
                    <count-to :start-val="0" :end-val="count_new" :duration="2600" class="card-panel-num sm:text-xl md:hidden lg:hidden xl:hidden" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        New Jobs
                    </div>
                    <count-to :start-val="0" :end-val="count_new" :duration="2600" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
            <div class="card-panel" @click="handleClick('in_process')">
                <div class="card-panel-icon-wrapper icon-message text-center sm:text-right  sm:w-full md:w-auto lg:w-auto xl:w-auto">
                    <svg-icon icon-class="processing-job" class-name="card-panel-icon" />
                    <count-to :start-val="0" :end-val="count_process" :duration="3000" class="card-panel-num sm:text-xl md:hidden lg:hidden xl:hidden" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        In Process
                    </div>
                    <count-to :start-val="0" :end-val="count_process" :duration="3000" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" class="card-panel-col">
            <div class="card-panel" @click="handleClick('finished')">
                <div class="card-panel-icon-wrapper icon-money text-center sm:text-right  sm:w-full md:w-auto lg:w-auto xl:w-auto">
                    <svg-icon icon-class="finished-job" class-name="card-panel-icon" />
                    <count-to :start-val="0" :end-val="count_finished" :duration="3200" class="card-panel-num sm:text-xl md:hidden lg:hidden xl:hidden" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        Finished
                    </div>
                    <count-to :start-val="0" :end-val="count_finished" :duration="3200" class="card-panel-num" />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import CountTo from 'vue-count-to'

    export default {
        components: {
            CountTo
        },
        props: {
            count_new: {
                type: Number,
                default: 0
            },
            count_process: {
                type: Number,
                default: 0
            },
            count_finished: {
                type: Number,
                default: 0
            },
        },
        methods: {
            handleClick(type) {
                this.$emit('onSelect', type)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .panel-group {
        margin-top: 18px;


        .card-panel-col {
            margin-bottom: 32px;
        }

        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);

            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }

                .icon-people {
                    background: #40c9c6;
                }

                .icon-message {
                    background: #36a3f7;
                }

                .icon-money {
                    background: #f4516c;
                }

                .icon-shopping {
                    background: #34bfa3
                }
            }

            .icon-people {
                color: #40c9c6;
            }

            .icon-message {
                color: #36a3f7;
            }

            .icon-money {
                color: #f4516c;
            }

            .icon-shopping {
                color: #34bfa3
            }

            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }

            .card-panel-icon {
                float: left;
                font-size: 48px;
            }

            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;

                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }

                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }

    @media (max-width:550px) {
        .card-panel-description {
            display: none;
        }
        .show-xs {
            display: block;
        }

        .card-panel-icon-wrapper {
            float: none !important;
            width: 100%;
            height: 100%;
            margin: 0 !important;

            .svg-icon {
                display: block;
                margin: 14px auto !important;
                float: none !important;
            }
        }
    }
</style>
