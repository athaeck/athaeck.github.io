<template>
    <div>
        <Menu />

        <slot />

        <div class="footer">
            <!-- <Footer /> -->
        </div>
    </div>
</template>>

<script>
import Menu from "../components/core/layout/menu.vue"


export default {
    name: "DefaultLayout",
    components: {
        Menu
    }
}

</script>