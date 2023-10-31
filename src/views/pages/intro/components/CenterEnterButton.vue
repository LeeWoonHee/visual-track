<template>

<div
    v-if="$store.state.windowWidth > 1024"
    class="enter-hover-animation"
    @click="$emit('click', 'enter')"
>
  <div class="button-container-3">
    <div class="mas">[&nbsp;&nbsp;&nbsp;ENTER&nbsp;&nbsp;&nbsp;]</div>
    <button class="glitch" data-text="ENTER" type="button" name="Hover">[&nbsp;&nbsp;&nbsp;ENTER&nbsp;&nbsp;&nbsp;]</button>
  </div>
</div>
</template>
<script>

</script>
<style
    scoped
    lang="scss"
>

@mixin button($color,
$url,
$x1,
$y1,
$bor,
$col) {
  background: $color;
  -webkit-mask: url($url);
  mask: url($url);
  -webkit-mask-size: $x1 $y1;
  mask-size: $x1 $y1;
  border: $bor;
  color: $col;
}
.enter-hover-animation::v-deep{
  position:fixed;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
  width: 180px;
  overflow:hidden;
  .button-container-3 {
    position: relative;
    width: 180px;
    height: 50px;
    margin:0 auto;
    font-weight: 700;
    transition: 0.5s;
    padding:0;
    .mas {
      position: absolute;
      color: #000;
      text-align: center;
      width: 180px;
      height: 50px;
      font-size: 30px;
      margin-top: 1px;
      font-weight: 700;
      border-radius: 8px;
      background-color:#fff;
      border:1px solid #000;
      box-sizing: border-box;
    }
    button {
      width: 101%;
      height: 50px;
      font-size: 30px;
      font-weight: 700;
      box-sizing:border-box;
      @include button(#000, "https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png",
          7200%,
          100%,
          none,
          #fff);
      cursor: pointer;
      -webkit-animation: ani2 0.7s steps(70) forwards;
      animation: ani2 0.7s steps(70) forwards;

      &:hover {
        -webkit-animation: ani 0.7s steps(70) forwards;
        animation: ani 0.7s steps(70) forwards;
      }
    }
  }
}
.glitch {
  position: relative;
  margin: 0 auto;
  text-align: center;
  text-transform: uppercase;
  transform: scale3d(1,1,1);


  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -5px;
    right: 0;
    overflow: hidden;
    //clip: rect(0, 20000px, 0, 0);
  }

  &::before {
    left: 2px;
    text-shadow: 1px 0 green;
    animation: glitch-effect 3s infinite linear alternate-reverse;
  }

  &::after {
    left: -1px;
    text-shadow: -1px 0 red;
    animation: glitch-effect 2s infinite linear alternate-reverse;
  }
}

@keyframes glitch-effect{

  @for $i from 0 through 20{
    #{percentage($i*(1/20))}{
      clip:rect(random(100)+px,9999px,random(100)+px,0);
    }
  }

}
@-webkit-keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }

  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}

@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }

  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
@-webkit-keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}
@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

</style>