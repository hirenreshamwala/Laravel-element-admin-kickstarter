<template>
    <div>
        <router-view />
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
        props: ['appdata'],
        methods: {
            updateDrawer($event) {
                this.drawer = $event;
            }
        }
    };
</script>
