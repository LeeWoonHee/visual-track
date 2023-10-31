<template>
  <main>
    <div class="blex w-full">
      <div class="error-wrapper px-4 md:px-0 pt-40 pb-70 blex">
        <div class="w-full font-bold text-7xl md:text-8xl text-mainl blex text-main">
          4 0 4
        </div>
        <div class="text-main font-bold text-base md:text-3xl w-full text-center pt-5 md:pt-10 pb-3 md:pb-5">
          죄송합니다. 요청하신 페이지를 찾을 수 없습니다
        </div>
        <div class="text-center font-normal text-2xs md:text-lg text-black">
          잘못된 주소를 입력하셨거나,<br>
          찾으시는 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다
        </div>
        <div class="w-full md:w-7/10 pt-12">
          <router-link
              to="/"
              tag="div"
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

<style scoped lang="scss">
main::v-deep {
  .error-wrapper {
    max-width: 600px;
  }
}
</style>
