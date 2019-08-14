<template>
    <Login />
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "@/views/Login.vue";

@Component({
  components: {
    Login
  }
})
export default class Landing extends Vue {}
</script>