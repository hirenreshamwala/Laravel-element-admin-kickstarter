<template>
    <div>

    </div>
</template>

<script>
    export default {
        mounted() {
            const self = this;
        },
        data: () => ({
            drawer: null,
        }),
        props: ['appdata',"user"],
        methods: {
            updateDrawer($event) {
                this.drawer = $event;
            }
        }
    };
</script>
