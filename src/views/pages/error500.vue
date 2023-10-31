<template>
  <main>
    <div class="blex w-full">
      <div class="error-wrapper px-4 md:px-0 pt-40 pb-70 blex">
        <div class="w-full font-bold text-7xl md:text-8xl text-mainl blex text-main">
          5 0 0
        </div>
        <div class="text-main font-bold text-base md:text-3xl w-full text-center pt-5 md:pt-10 pb-3 md:pb-5">
          사이트 이용에 불편을 드려 죄송합니다
        </div>
        <div class="text-center font-normal text-2xs md:text-lg text-black">
          서버 오류로 인해 서비스의 상태가 원활하지 않습니다<br>
          관리자에게 문의해 보시거나 잠시 후 다시 시도해 보시겠어요?
        </div>
        <div class="w-full md:w-7/10 pt-12">
          <router-link tag="div" to="/"
                       class="text-white text-lg md:text-xl py-4 px-16 md:px-20 bg-main blex font-normal cursor-pointer">
            메인으로
          </router-link>
          <div
              @click="$router.go(-1)"
              class="text-gray text-lg md:text-xl py-4 px-16 md:px-20 bg-whtie blex font-normal cursor-pointer border border-light-gray border-solid mt-4">
            이전 페이지로
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'error404'
}
</script>

<style scoped lang='scss'>
main::v-deep {
  .error-wrapper {
    max-width: 600px;
  }
}
</style>
