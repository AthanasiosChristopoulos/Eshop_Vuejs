<script>
  export default {
    methods: {
      go_edit() {
        this.$router.push('/edit');
      },
      go_shop() {
        this.$router.push('/shop');
      }
    }
  }

</script>

<template>
  <div class="circles">
    <div class="circle" v-on:click="go_edit()">
      <h2>Edit</h2>
    </div>
    <div class="circle" v-on:click="go_shop()">
      <h2>Shop</h2>
    </div>
    <div class="circle">
      <h2>Orders</h2>
    </div>
  </div>

</template>

<style scoped>
  .circles {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .circle {
    border-radius: 50%;
    background-color: red ;
    margin:40px;
    border: 3px solid black;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }

  .circle:hover {
    background-color: greenyellow;
    transform: scale(1.2); 
  }

  .circle h2 {
    padding: 50px;

  }

</style>