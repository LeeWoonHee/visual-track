<template>
  <div class="remote-wrapper">
    <div class="remote-text">CLICK THIS REMOTE CONTROL TO MOVE</div>
    <div class="remote-button-row">
      <div class="remote-button" @click="$emit('click', 1)">
        <div class="remote-button-text"><div class="blex">1</div></div>
      </div>
      <div class="remote-button" @click="$emit('click', 2)">
        <div class="remote-button-text"><div class="blex">2</div></div>
      </div>
      <div class="remote-button" @click="$emit('click', 3)">
        <div class="remote-button-text"><div class="blex">3</div></div>
      </div>
      <div class="remote-button" @click="$emit('click', 4)">
        <div class="remote-button-text"><div class="blex">4</div></div>
      </div>
    </div>
    <div class="remote-button-row">
      <div class="remote-button-1/3" @click="$emit('click', 'prev')">
        <div class="remote-button-text">
          <mdicon name="skip-previous" size="18"></mdicon>
        </div>
      </div>
      <div class="remote-button-1/3" @click="$emit('click', 'play')">
        <div class="remote-button-text">
          <mdicon name="play" size="18"></mdicon>
        </div>
      </div>
      <div class="remote-button-1/3" @click="$emit('click', 'next')">
        <div class="remote-button-text">
          <mdicon name="skip-next" size="18"></mdicon>
        </div>
      </div>
    </div>
    <div class="remote-button-row">
      <div class="remote-button-full" @click="$emit('click', 'enter')">
        <div class="remote-button-text">
          enter
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Remote'
}
</script>
<style scoped lang="scss">
div.remote-wrapper {
  width: 140px;
  display: flex;
  border-radius: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/images/bg.png") repeat center;
  background-color: #000;
  border: 2px solid #555555;
  padding: 10px;
  position: absolute;
  right: 20px;
  bottom: 10%;

  .remote-text {
    position: absolute;
    font-size: 14px;
    top: -60%;
    color: #fff;
    text-align: center;
  }

  div.remote-button-row {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    & > .remote-button {
      position: relative;
      cursor: pointer;
      margin: 4px;

      &:hover {
        & > .remote-button-text {
          text-decoration: none;
          color: #555;
          background: #f5f5f5;
        }
      }

      & > .remote-button-text {
        display: block;
        text-align: center;
        font-weight: 900;
        background-color: #f7f7f7;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));
        background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7);
        color: #a7a7a7;
        width: 18px;
        height: 18px;
        padding-left: 2px;
        position: relative;
        line-height: 1.6em;
        border-radius: 50%;
        box-shadow: 0 3px 8px #aaa, inset 0 2px 3px #fff;
        font-size: 12px;
        .text-box{
          display:flex;
          display: -webkit-box;
          display: -ms-flexbox;
          justify-content: center;
          align-items: center;
          align-self: center;
          width: 100%;
          height: 100%;

          line-height:2;
        }
        &:before {

          content: "";
          display: block;
          background: #fff;
          border-top: 2px solid #ddd;
          position: absolute;
          top: -18px;
          left: -18px;
          bottom: -18px;
          right: -18px;
          z-index: -1;
          border-radius: 50%;
          box-shadow: inset 0px 8px 48px #ddd;
        }
      }

      &:before {
        content: "";
        display: block;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #fff;
        width: 100%;
        height: 1px;
        position: absolute;
        top: 50%;
        z-index: -1;
      }
    }


    & > .remote-button-1\/3 {
      position: relative;
      cursor: pointer;
      margin: 2px;


      &:hover {
        & > .remote-button-text {
          text-decoration: none;
          color: #555;
          background: #f5f5f5;
        }
      }

      & > .remote-button-text {
        display:flex;
        justify-content: center;
        text-align: center;
        font-weight: bolder;
        background-color: #f7f7f7;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));
        background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7);
        color: #a7a7a7;
        width: 30px;
        height: 18px;
        position: relative;
        line-height: 2;
        vertical-align: middle;
        border-radius: 30px;
        box-shadow: 0 3px 8px #aaa, inset 0 2px 3px #fff;
        font-size: 12px;

        span {
          svg {
            margin: auto;
          }
        }

        &:before {

          content: "";
          display: block;
          background: #fff;
          border-top: 2px solid #ddd;
          position: absolute;
          top: -18px;
          left: -18px;
          bottom: -18px;
          right: -18px;
          z-index: -1;
          border-radius: 50%;
          box-shadow: inset 0px 8px 48px #ddd;
        }
      }

      &:before {
        content: "";
        display: block;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #fff;
        width: 100%;
        height: 1px;
        position: absolute;
        top: 50%;
        z-index: -1;
      }
    }

    & > .remote-button-full {
      position: relative;
      cursor: pointer;
      margin: 4px;

      &:hover {
        & > .remote-button-text {
          text-decoration: none;
          color: #555;
          background: #f5f5f5;
        }
      }

      & > .remote-button-text {
        display:flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bolder;
        background-color: #f7f7f7;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));
        background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7);
        background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7);
        color: #a7a7a7;
        width: 115px;
        height: 18px;
        position: relative;
        line-height: 2;
        border-radius: 30px;
        box-shadow: 0 3px 8px #aaa, inset 0 2px 3px #fff;
        font-size: 12px;

        span {
          svg {
            margin: auto;
          }
        }

        &:before {

          content: "";
          display: block;
          background: #fff;
          border-top: 2px solid #ddd;
          position: absolute;
          top: -18px;
          left: -18px;
          bottom: -18px;
          right: -18px;
          z-index: -1;
          border-radius: 50%;
          box-shadow: inset 0px 8px 48px #ddd;
        }
      }

      &:before {
        content: "";
        display: block;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #fff;
        width: 100%;
        height: 1px;
        position: absolute;
        top: 50%;
        z-index: -1;
      }
    }
  }
}
</style>