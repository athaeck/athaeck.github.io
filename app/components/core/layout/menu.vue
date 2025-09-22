<template>
    <div class="nav-container">

    </div>
</template>

<script>
import Logo from "../../theme/logo.vue"
export default {
    name: "Menü",
    components: {
        Logo
    },
    data() {
        return {
            show: false,
            changed: false
        }
    },
    methods: {
        clickedMenu() {
            // working
            this.show = false;
            this.changed = false;
        },
        toggleButton() {
            if (this.show == true) {
                this.show = false;
                this.changed = false;
            } else {
                this.show = true;
                this.changed = true;
            }
            // this.show = !this.show
        }
    }
}

</script>

<style scoped></style>