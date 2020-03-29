<template>
<div>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
    </swiper-slide>
    <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
  </swiper>
  <i class="iconfont icon-card-hero ai-center"></i>
  </div>
</template>
<style lang="scss">
.w-100{
  width: 100%;
}
</style>
<script>
  export default {
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    }
  }
</script>