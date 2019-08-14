<template>
  <div>
    <a href="#" @click="doLogin">Continue With Blockstack</a>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { userSession } from "@/user";
@Component
export default class Login extends Vue {
  mounted() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(d => {
        window.location.href = window.location.origin + "/app";
      });
    }
  }
  doLogin() {
    userSession.redirectToSignIn(
      window.location.origin,
      window.location.origin + "/manifest.json",
      ["store_write", "publish_data"]
    );
  }
}
</script>


<style>
</style>
