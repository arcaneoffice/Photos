<template>
  <div class="banner-bg" :class="[isBannerShown ? 'open': 'close']">
    <div id="ph-banner">
      <h2 class="subtitle-1">Help us grow 🌱, support us on Product Hunt.</h2>
      <div class="buttons">
        <span class="subtitle-2 close-button" @click="closeBanner">Not now</span>
        <a
          href="http://bit.ly/BlackHolePh"
          target="_blank"
          class="button-2"
          @click="closeBanner"
        >Ok let’s go 🔥</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setTimeout } from "timers";
@Component({})
export default class ProductHuntBanner extends Vue {
  isBannerShown: boolean = false;
  mounted() {
    this.openBanner();
  }

  closeBanner() {
    this.isBannerShown = false;
    localStorage.setItem("have_seen_the_banner", "true");
  }

  openBanner() {
    if (!localStorage.getItem("have_seen_the_banner")) {
      setTimeout(() => {
        this.isBannerShown = true;
      }, 5000);
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-bg {
  background-color: $black-overlay-4;
  width: 100%;
  padding: 24px 0 16px;
  margin: -131px 0 0 0;
  transition: margin 450ms cubic-bezier(0.23, 1, 0.32, 1);

  @include until($tablet) {
    padding: 24px 24px 16px;
    margin: -158px 0 0 0;
  }
}

#ph-banner {
  max-width: 396px;
  margin: auto;
}

.subtitle-1 {
  margin: 0 0 24px;
  font-size: 17px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .close-button {
    border-bottom: 1px solid $black-high;
    color: $black-high;
    opacity: 0.6;
    cursor: pointer;
  }

  a {
    padding: 11px 22px 10px;
    line-height: 19px;
    background-color: $black-high;
    color: $white;
    border-radius: 5px;
    text-decoration: none;
  }
}

.open {
  margin: 0;
}

.close {
  margin: -131px 0 0 0;
  @include until($tablet) {
    margin: -158px 0 0 0;
  }
}
</style>
