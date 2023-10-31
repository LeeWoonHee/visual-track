<template>
  <div class="scroll-down-animation">
    <div class="scroll-down-animation-container">
      <div class="chevron"></div>
      <div class="chevron"></div>
      <div class="chevron"></div>
      <span class="text">Scroll down</span>
    </div>
  </div>
</template>
<script>

</script>
<style scoped lang="scss">
.scroll-down-animation {
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  bottom:45px;
  .scroll-down-animation-container {
    position: relative;
    width: 24px;
    height: 24px;

    .chevron {
      position: absolute;
      top:15px;
      width: 20px;
      height: 4px;
      opacity: 0;
      transform: scale3d(0.5, 0.5, 0.5);
      animation: move 3s ease-out infinite;

      &:first-child {
        animation: move 3s ease-out 1s infinite;
      }

      &:nth-child(2) {
        animation: move 3s ease-out 2s infinite;
      }

      &::before, &::after {
        content: ' ';
        position: absolute;
        top: 0;
        height: 100%;
        width: 51%;
        background: #fff;
      }

      &::before {
        left: 0;
        transform: skew(0deg, 30deg);
      }

      &::after {
        right: 0;
        width: 50%;
        transform: skew(0deg, -30deg);
      }
    }

    .text {
      display: block;
      margin-left: -45px;
      font-size: 20px;
      letter-spacing: 1.6px;
      color: #fff;
      text-transform: uppercase;
      white-space: nowrap;
      opacity: .25;
      animation: pulse 2s linear alternate infinite;
    }
  }
}
@media screen and (max-width : 1024px){
 .scroll-down-animation{
   top:55%;
   .scroll-down-animation-container{
     height:10px;
     .chevron{
       top:-10px;
       width: 9px;
       height: 2px;
       transform: scale3d(0.1,0.1,0.1);
       animation: move 3s ease-out infinite;
       &::before, &::after {
         //height:10%;
       }
     }
     .text{
       font-size: 11px;
       margin-left: -30px;
       animation : none;
       opacity: 0.7;
     }
   }
 }
}
@keyframes move {
  25% {
    opacity: 1;

  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
}
@keyframes move-mobile {
  25% {
    opacity: 1;

  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
}


@keyframes pulse {
  to {
    opacity: 1;
  }
}
</style>