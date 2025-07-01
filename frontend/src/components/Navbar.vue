<script>
    export default {
        methods: {
            go_home() {
                this.$router.push('/');
            }
        }
    }
</script>

<template>
    <nav class="navbar">
       <div>
            <h1 class="nav_text">My E-shop </h1>
       </div>
       <div id="home">
            <i class="bi bi-house-fill" @click="go_home()"></i>
       </div>
    </nav>
</template>

<style scoped>

    .navbar {
        background-color: #9f63d3;
        top: 0;
        left: 0;
        width: 100%;
        height: 15%;
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 40px;
    }

    .nav_text {
        font-size: 20px;
        color: black;

    }

    #home {
        font-size: 30px;
        display: flex;
        justify-content: right;
        color: #22223b;
        cursor: pointer;
    }

</style>