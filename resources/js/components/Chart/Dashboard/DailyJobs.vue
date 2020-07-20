<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>

    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    import resize from '../mixins/resize'

    const animationDuration = 6000

    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300px'
            },
            days: {
                type: Array,
                default: function () { return [] }
            },
            newjobs: {
                type: Array,
                default: function () { return [] }
            },
            in_process: {
                type: Array,
                default: function () { return [] }
            },
            finished: {
                type: Array,
                default: function () { return [] }
            }
        },
        watch:{
            days: function () {
                this.initChart();
            },
            newjobs: function () {
                this.initChart();
            },
            in_process: function () {
                this.initChart();
            },
            finished: function () {
                this.initChart();
            }
        },
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')

                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow' //'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: 10,
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: this.days,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    }],
                    series: [{
                        name: 'New Jobs',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: this.newjobs,
                        animationDuration
                    }, {
                        name: 'In Process Jobs',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: this.in_process,
                        animationDuration
                    }, {
                        name: 'Finished Jobs',
                        type: 'bar',
                        stack: 'vistors',
                        barWidth: '60%',
                        data: this.finished,
                        animationDuration
                    }]
                })
            }
        }
    }
</script>
