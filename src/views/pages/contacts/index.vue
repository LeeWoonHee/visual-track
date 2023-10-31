<template>
  <section class="contacts-wrapper relative text-white">
    <div class="contact-info lg:px-60 lg:py-60 px-10 py-30">
      <div class="blex-left lg:text-7xl text-4xl lg:pl-20">
        <div>
<!--          <img class="logo" src="@/assets/images/logo/vt-logo.svg" alt=""/>-->
          <svg class="logo" width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81.1236 0H3.87641C1.73554 0 0 1.73549 0 3.87637V30.3437H19.6634L34.624 45.3044L40.1335 39.7948L22.9069 22.5681L22.9061 22.5689L22.8918 22.5546H7.79167V7.79167H77.2083V22.5546H62.8447L62.844 22.554L62.8434 22.5546H62.8237L55.0346 30.3437H55.0543L34.4392 50.9588L25.5271 42.0467L17.7354 34.255H0V81.1236C0 83.2645 1.73554 85 3.87641 85H81.1236C83.2645 85 85 83.2645 85 81.1236V34.255H67.7007L67.6945 34.2611L67.689 34.2557L37.0323 64.9123L42.5419 70.4218L70.917 42.0467H77.2083V77.2083H7.79167V42.0467H14.508L34.4398 61.9785L39.9494 56.469L39.9487 56.4683L66.0734 30.3437H85V3.87637C85 1.73549 83.2645 0 81.1236 0Z" fill="white"/>
          </svg>
        </div>
        <div>
          CONTACT US
        </div>
      </div>
      <div class="lg:text-normal text-2xs lg:pl-20">
        <a class="font-frag" href="mailto:sunny@visualofftrack.com">sunny@visualofftrack.com</a>
        <div class="font-frag">No. 706, 17, Achasan-ro, Seongdong-gu, Seoul</div>
      </div>
    </div>
    <div class="blex-top lg:absolute block lg:flex contact-content lg:px-0 px-30">
      <div class="lg:mr-40 lg:py-0 py-30">
        <div class="text-2xl lg:text-4xl">
          LOCATION
        </div>
        <div class="font-frag text-2xs lg:text-md" @mouseover="mouseOverLocation" @mouseleave="mouseLeaveLocation">
          No. 706, 17, Achasan-ro,<br>
          Seongdong-gu, Seoul
        </div>
      </div>
      <div class="lg:mr-40 lg:py-0 py-30">
        <div class="text-2xl lg:text-4xl">
          PHONE
        </div>
        <a class="font-frag text-2xs lg:text-md" href="tel:+8210-5067-9242">
          +8210-5067-9242
        </a>
      </div>
      <div class="lg:mr-40 lg:py-0 py-30">
        <div class="text-2xl lg:text-4xl">
          E-mail
        </div>
        <a class="font-frag text-2xs lg:text-md" href="mailto:sunny@visualofftrack.com">
          sunny@visualofftrack.com
        </a>
      </div>
      <div class="lg:py-0 py-30">
        <div class="text-2xl lg:text-4xl">
          general inquiries
        </div>
        <a class="font-frag text-2xs lg:text-md" href="mailto:sunny@visualofftrack.com">
          sunny@visualofftrack.com
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import {EventBus} from "@/EventBus"

export default {
  name: 'contact',
  methods: {
    mouseOverLocation() {
      EventBus.$emit('cursor-content', {
        type: 'img',
        src: '/images/SunnyMap.png'
      })
    },
    mouseLeaveLocation() {
      EventBus.$emit('cursor-content', null)
    }
  },
  mounted () {
    EventBus.$emit('loaded')
  }
}

</script>
<style scoped lang="scss">
section.contacts-wrapper::v-deep {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #000000;
  position: relative;

  .logo {
    width: 32px !important;
    height: 32px !important;
    margin-top: 5px;
    margin-right : 16px;

  }

  &::before {
    content: '';
    position: absolute;
    top: 23px;
    left: 23px;
    width: calc(100% - 46px);
    height: 1px;
    background: #fff;
    transition: all .2s linear;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 23px;
    left: 23px;
    width: calc(100% - 46px);
    height: 1px;
    background: #fff;
    transition: all .2s linear;
  }

  .contact-content {
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }

  @media screen and(max-width: 1024px) {
    &::before {
      top: 20px;
      left: 15px;
      width: calc(100% - 30px);
    }

    &::after {
      bottom:32px;
      left: 15px;
      width: calc(100% - 30px);
    }

    .contact-content {
      top: unset;
      left: unset;
      transform: unset;
    }
    .logo {
      width: 28px !important;
      height: 28px !important;
      margin-top:0;
      margin-right : 6px;
    }
  }
}
</style>