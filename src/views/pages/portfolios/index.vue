<template>
  <section
      class="portfolio-wrapper relative text-white blex"
      ref="portfolio-wrapper"
  >
    <div class="portfolio">
      <div
          class="portfolio-content"
          ref="portfolio-content"
      >
        <div class="blex-left portfolio-content-title">
          <svg class="logo mr-10" width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81.1236 0H3.87641C1.73554 0 0 1.73549 0 3.87637V30.3437H19.6634L34.624 45.3044L40.1335 39.7948L22.9069 22.5681L22.9061 22.5689L22.8918 22.5546H7.79167V7.79167H77.2083V22.5546H62.8447L62.844 22.554L62.8434 22.5546H62.8237L55.0346 30.3437H55.0543L34.4392 50.9588L25.5271 42.0467L17.7354 34.255H0V81.1236C0 83.2645 1.73554 85 3.87641 85H81.1236C83.2645 85 85 83.2645 85 81.1236V34.255H67.7007L67.6945 34.2611L67.689 34.2557L37.0323 64.9123L42.5419 70.4218L70.917 42.0467H77.2083V77.2083H7.79167V42.0467H14.508L34.4398 61.9785L39.9494 56.469L39.9487 56.4683L66.0734 30.3437H85V3.87637C85 1.73549 83.2645 0 81.1236 0Z" fill="white"/>
          </svg>
          <div class="lg:text-2xl md:text-xl text-md flex-1 relative">
              <div class="portfolio-description" @click="showTooltip">
                {{ portfolios[index - 1].title }}
              </div>
          </div>

        </div>

        <div class="portfolio-content-video">
          <div v-if="isShow" class="tooltip-text">
            {{ portfolios[index - 1].title }}
          </div>
          <youtube-media
              v-if="load"
              :player-width="playerWidth"
              :player-height="playerHeight"
              :player-vars="{start: 0, autoplay: 1}"
              :video-id="videoId(portfolios[index - 1].link)"
          ></youtube-media>
        </div>
        <div class="portfolio-content-desc lg:text-3xs md:text-4xs text-6xs w-full blex-between">
          <div class="portfolio-content-desc-wrapper">
            <vue-typer
                :text="portfolios[index - 1].description"
                :type-delay="30"
            ></vue-typer>
          </div>
          <a
              class="youtube-outlink"
              v-if="portfolios[index - 1] && portfolios[index - 1].link"
              target="_blank"
              :href="portfolios[index - 1].link"
          >
            <mdicon name="youtube"></mdicon>
          </a>
        </div>
      </div>
    </div>
    <div class="portfolio-img-list">
      <div class="portfolio-img-shadow"></div>
      <image-list
          ref="image-list"
          :images="portfolios"
          @change="(newIndex) => index = newIndex"
      ></image-list>
    </div>
  </section>
</template>

<script>
import { EventBus } from '@/EventBus'
import ImageList from '@/views/pages/portfolios/components/ImageList.vue'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  name      : 'index',
  components: { ImageList },
  props     : {
    indexFromMain: {
      type   : Number,
      default: null
    }
  },
  data      : () => ({
    portfolios  : [
      // 1  BTS 'BUTTER' Special Performance Video  "Directing BTS in this bright and upbeat performance videos was a joy. Their dedication and professionalism were inspiring, matched only by their warm personalities. Set in a light-filled studio, their funky energy came to life as we collaborated seamlessly. Their moves and the vibrant setting melded perfectly, turning this project into a celebration of creativity and passion."  https://www.youtube.com/watch?v=DbXMjAYSa68
      {
        index      : 1,
        title      : 'BTS \'BUTTER\' Special Performance Video',
        description: 'Directing BTS in this bright and upbeat performance videos was a joy. Their dedication and professionalism were inspiring, matched only by their warm personalities. Set in a light-filled studio, their funky energy came to life as we collaborated seamlessly. Their moves and the vibrant setting melded perfectly, turning this project into a celebration of creativity and passion.',
        link       : 'https://www.youtube.com/watch?v=DbXMjAYSa68'
      },
      //2  NewJeans 'Super Shy' Dance Practive Video  "Stepping into the dance practice room with NewJeans for 'Super Shy' was like a burst of sunshine! These five girls, young and well-mannered, brought a sweet and kind energy that was downright infectious. Their retro, pop, and trendy moves unfolded in a seemingly effortless dance, perfectly reflecting their warm personalities. Collaborating with such spirited and dedicated artists in a regular practice setting transformed this project into an unforgettable celebration of youth and creativity."  https://www.youtube.com/watch?v=wU2siJ2c5TA
      {
        index      : 2,
        title      : 'NewJeans \'Super Shy\' Dance Practive Video',
        description: 'Stepping into the dance practice room with NewJeans for \'Super Shy\' was like a burst of sunshine! These five girls, young and well-mannered, brought a sweet and kind energy that was downright infectious. Their retro, pop, and trendy moves unfolded in a seemingly effortless dance, perfectly reflecting their warm personalities. Collaborating with such spirited and dedicated artists in a regular practice setting transformed this project into an unforgettable celebration of youth and creativity.',
        link       : 'https://www.youtube.com/watch?v=wU2siJ2c5TA'
      },
      // 3  LE SSERAFIM (르세라핌) ‘ANTIFRAGILE’ Special Performance Video  "Filming 'Antifragile' with LE SSERAFIM was nothing short of thrilling. In a setting filled with shipping containers, these five hardworking and beautiful girls delivered an edgy and unique performance that was downright addictive. The fire spark effects? They added a touch of magic to every move. But what really stood out was their chemistry, their cute interactions, and their absolute dedication to the craft. It wasn't just a dance; it was a dance with spirit, a shared moment of creativity that I'm proud to have been a part of."  https://www.youtube.com/watch?v=dzwuR99Ry98
      {
        index      : 3,
        title      : 'LE SSERAFIM (르세라핌) ‘ANTIFRAGILE’ Special Performance Video',
        description: 'Filming \'Antifragile\' with LE SSERAFIM was nothing short of thrilling. In a setting filled with shipping containers, these five hardworking and beautiful girls delivered an edgy and unique performance that was downright addictive. The fire spark effects? They added a touch of magic to every move. But what really stood out was their chemistry, their cute interactions, and their absolute dedication to the craft. It wasn\'t just a dance; it was a dance with spirit, a shared moment of creativity that I\'m proud to have been a part of.',
        link       : 'https://www.youtube.com/watch?v=dzwuR99Ry98'
      },
      // 4  [XG TAPE #3-B] Nothin' (JURIN, COCONA)  "Working on 'Nothin'' with Jurin and Cococa of XG was a lesson in reinvention. On top of shipping containers, classic cars, and bikes, they performed a rap cover that was hip hop at its slickest. Their rewritten lyrics turned an old classic into something fresh and swag-filled. Their eye-catching performance, filled with hype and dynamic moves, wasn't just a cover—it was a reinvention. Working with such well-trained artists who could take something old and make it trendy again was both a joy and an inspiration."  https://www.youtube.com/watch?v=6s6fXHYiWvo
      {
        index      : 4,
        title      : '[XG TAPE #3-B] Nothin\' (JURIN, COCONA)',
        description: 'Working on \'Nothin\' with Jurin and Cococa of XG was a lesson in reinvention. On top of shipping containers, classic cars, and bikes, they performed a rap cover that was hip hop at its slickest. Their rewritten lyrics turned an old classic into something fresh and swag-filled. Their eye-catching performance, filled with hype and dynamic moves, wasn\'t just a cover—it was a reinvention. Working with such well-trained artists who could take something old and make it trendy again was both a joy and an inspiration.',
        link       : 'https://www.youtube.com/watch?v=6s6fXHYiWvo'
      },
      // 5  강다니엘(KANGDANIEL) - Don't Tell (Feat. Jessi) M/V  "Creating 'Don't Tell' with Kang Daniel and Jessi was like a classy dance in a high-end hotel. Our fourth collaboration, this performance music videos was filled with Latin vibes and posh elegance. Daniel's humor and humility, Jessi's flair, and the talent of many made it not just a project but a joyful creation. It was more than a shoot; it was a gathering of friends crafting something uniquely stylish and fun."  https://www.youtube.com/watch?v=z7H4ZTeVHxk
      {
        index      : 5,
        title      : '강다니엘(KANGDANIEL) - Don\'t Tell (Feat. Jessi) M/V',
        description: 'Creating \'Don\'t Tell\' with Kang Daniel and Jessi was like a classy dance in a high-end hotel. Our fourth collaboration, this performance music videos was filled with Latin vibes and posh elegance. Daniel\'s humor and humility, Jessi\'s flair, and the talent of many made it not just a project but a joyful creation. It was more than a shoot; it was a gathering of friends crafting something uniquely stylish and fun.',
        link       : 'https://www.youtube.com/watch?v=z7H4ZTeVHxk'
      },
      //6  저스트절크 - 1973 천마를 깨우다  "Dancing under a glass ceiling with Just Just Dance Crew was an experience of cinematic magic. Their dark, cool, and suave moves transformed the dome into a stage for creativity. Open to ideas and fun to work with, they turned a dance performance into a collaboration of vision and style. It was a project full of surprises and joy, led by some truly inspiring artists."  https://www.youtube.com/watch?v=CYz4Np34wbs&t
      {
        index      : 6,
        title      : '저스트절크 - 1973 천마를 깨우다',
        description: 'Dancing under a glass ceiling with Just Just Dance Crew was an experience of cinematic magic. Their dark, cool, and suave moves transformed the dome into a stage for creativity. Open to ideas and fun to work with, they turned a dance performance into a collaboration of vision and style. It was a project full of surprises and joy, led by some truly inspiring artists.',
        link       : 'https://www.youtube.com/watch?v=CYz4Np34wbs&t'
      },
      // 7  [CHOREOGRAPHY] j-hope ‘MORE’ Dance Practice (MAMA 2022 ver.)  "Organized chaos took form in dance as I worked with J Hope on his 'MORE' Dance Practice for MAMA 2022. Cool, grungey, and utterly captivating, the collaboration was a blend of professionalism and fun. J Hope's humility and pleasure to work with made the entire process not just a practice but a celebration of dance. It was a project I won't soon forget."  https://www.youtube.com/watch?v=H26Jg_eMqBM
      {
        index      : 7,
        title      : '[CHOREOGRAPHY] j-hope ‘MORE’ Dance Practice (MAMA 2022 ver.)',
        description: 'Organized chaos took form in dance as I worked with J Hope on his \'MORE\' Dance Practice for MAMA 2022. Cool, grungey, and utterly captivating, the collaboration was a blend of professionalism and fun. J Hope\'s humility and pleasure to work with made the entire process not just a practice but a celebration of dance. It was a project I won\'t soon forget.',
        link       : 'https://www.youtube.com/watch?v=H26Jg_eMqBM'
      },
      // 8  [WDBZ Dance Album] #4. The Finesse by Y2  "Dancing in a forest and shack with Wedemboyz for 'The Finesse' by Y2 was a cool and hostile experiment in creativity. Their unique style and willingness to take risks made this more than a dance videos; it was a collaborative adventure. Fun, professional, humble, and chill, working with them was a true pleasure, and the result was something uniquely fresh."  https://www.youtube.com/watch?v=dyiPrKew6sY
      {
        index      : 8,
        title      : '[WDBZ Dance Album] #4. The Finesse by Y2',
        description: 'Dancing in a forest and shack with Wedemboyz for \'The Finesse\' by Y2 was a cool and hostile experiment in creativity. Their unique style and willingness to take risks made this more than a dance videos; it was a collaborative adventure. Fun, professional, humble, and chill, working with them was a true pleasure, and the result was something uniquely fresh.',
        link       : 'https://www.youtube.com/watch?v=dyiPrKew6sY'
      },
      // 9  LUN8(루네이트) | "SAAY - Talk 2 Me Nice" Dance Performance  "Filming 'Talk 2 Me Nice' with Lun8 was all about that slick, noir vibe. In a white studio, under a perfect spotlight, we just clicked. They were new but full of promise, and we brought sexy back, just like that. It was fun, natural, and I'm really looking forward to seeing them shine in the industry."  https://www.youtube.com/watch?v=OMZSCz24Tsg&t
      {
        index      : 9,
        title      : 'LUN8(루네이트) | "SAAY - Talk 2 Me Nice" Dance Performance',
        description: 'Filming \'Talk 2 Me Nice\' with Lun8 was all about that slick, noir vibe. In a white studio, under a perfect spotlight, we just clicked. They were new but full of promise, and we brought sexy back, just like that. It was fun, natural, and I\'m really looking forward to seeing them shine in the industry.',
        link       : 'https://www.youtube.com/watch?v=OMZSCz24Tsg&t'
      },
      // 10  비(RAIN) X SMF - DOMESTIC (팔각정) MV  "Teaming up with Rain and dance crews from MNET's SMF for 'Domestic' was like a family reunion with an adrenaline boost. At a historic palace in South Korea, we ignited the set with fire effects, creating a hype and dynamic masterpiece. Having worked with each crew before, it felt amazing to bring everyone together. And working with Rain? An absolute honor. We danced hard, laughed harder, and put together the hardest hitting dance videos ever. Pure fun, pure energy!"  https://www.youtube.com/watch?v=3P8GqaecZJg
      {
        index      : 10,
        title      : '비(RAIN) X SMF - DOMESTIC (팔각정) MV',
        description: 'Teaming up with Rain and dance crews from MNET\'s SMF for \'Domestic\' was like a family reunion with an adrenaline boost. At a historic palace in South Korea, we ignited the set with fire effects, creating a hype and dynamic masterpiece. Having worked with each crew before, it felt amazing to bring everyone together. And working with Rain? An absolute honor. We danced hard, laughed harder, and put together the hardest hitting dance videos ever. Pure fun, pure energy!',
        link       : 'https://www.youtube.com/watch?v=3P8GqaecZJg'
      },
      // 11  [XG TAPE #3-A] Two Tens (HARVEY, MAYA)  "Jumping back into the world of XG, this time with Harvey and Maya, was like catching up with old friends. For 'Two Tens,' a rap cover of Cordae and Anderson Paak's hit, we cranked up the chill vibes and let the sick lyrics flow. Inside a school bus, but hey, that's not the point! These two are cool as ice on camera and sweet angels off it. I played around with the idea of day and night to capture their unique but complementary styles. Different but meant to be together, just like Harvey and Maya. A blast to work on, and I'm proud of what we created!"  https://www.youtube.com/watch?v=d8zXh3dyGbE
      {
        index      : 11,
        title      : '[XG TAPE #3-A] Two Tens (HARVEY, MAYA)',
        description: 'Jumping back into the world of XG, this time with Harvey and Maya, was like catching up with old friends. For \'Two Tens,\' a rap cover of Cordae and Anderson Paak\'s hit, we cranked up the chill vibes and let the sick lyrics flow. Inside a school bus, but hey, that\'s not the point! These two are cool as ice on camera and sweet angels off it. I played around with the idea of day and night to capture their unique but complementary styles. Different but meant to be together, just like Harvey and Maya. A blast to work on, and I\'m proud of what we created!',
        link       : 'https://www.youtube.com/watch?v=d8zXh3dyGbE'
      },
      // 12  프로미스나인 (fromis_9) 'WE GO' Performance Video  "Filming 'WE GO' with Fromis_9 was like a day in paradise. Up on a massive rooftop with blue skies and a city view, we danced under the sun and let the bright, happy vibes flow. These nine beautiful artists worked their magic, shining even in the hot sun. Honestly, it felt like filming angels, and the perfect blue sky that day just added to the magic. They were hardworking, lovely, and a joy to be around. It was a day to remember, and I can't wait for everyone to see the sunshine we captured together!"  https://www.youtube.com/watch?v=8uOBj0pINT8
      {
        index      : 12,
        title      : '프로미스나인 (fromis_9) \'WE GO\' Performance Video',
        description: 'Filming \'WE GO\' with Fromis_9 was like a day in paradise. Up on a massive rooftop with blue skies and a city view, we danced under the sun and let the bright, happy vibes flow. These nine beautiful artists worked their magic, shining even in the hot sun. Honestly, it felt like filming angels, and the perfect blue sky that day just added to the magic. They were hardworking, lovely, and a joy to be around. It was a day to remember, and I can\'t wait for everyone to see the sunshine we captured together!',
        link       : 'https://www.youtube.com/watch?v=8uOBj0pINT8'
      },
      // 13  [CHOREOGRAPHY] BTS (방탄소년단) '달려라 방탄 (Run BTS)' Dance Practice  "Shooting 'Run BTS' in a simple dance practice room turned into an extraordinary experience. The energy, power, and jaw-dropping choreography from BTS and 20 to 30 dancers brought the space to life. The magic of this project? Captured in one take without any fancy post-production. It was pure talent and passion from a world-famous group that never stops working hard. The videos went viral with 103 million views on YouTube, and I couldn't be prouder. This one was all about the performance, and being a part of it was an absolute thrill!"  https://www.youtube.com/watch?v=aqW4xXUgmno
      {
        index      : 13,
        title      : '[CHOREOGRAPHY] BTS (방탄소년단) \'달려라 방탄 (Run BTS)\' Dance Practice',
        description: 'Shooting \'Run BTS\' in a simple dance practice room turned into an extraordinary experience. The energy, power, and jaw-dropping choreography from BTS and 20 to 30 dancers brought the space to life. The magic of this project? Captured in one take without any fancy post-production. It was pure talent and passion from a world-famous group that never stops working hard. The videos went viral with 103 million views on YouTube, and I couldn\'t be prouder. This one was all about the performance, and being a part of it was an absolute thrill!',
        link       : 'https://www.youtube.com/watch?v=aqW4xXUgmno'
      },
      // 14  [WDBZ Dance Album] #1. KING KING by DUCKWRTH  "Working with WDBZ on 'KING KING' was like sculpting a dance masterpiece from a simple block of marble. The concept was minimal and straightforward, but the powerful, hard-hitting moves transformed it into something extraordinary. We're good friends, and it's always a blast working together, but this project had a serious edge. WDBZ's commitment to investing so much in production for just a dance videos was a bold move, and when it released, it really made a mark on the dance community. Collaborating with friends to create something that resonates so deeply is what makes my job incredibly fulfilling!"  https://www.youtube.com/watch?v=yVGj3rvpxWA
      {
        index      : 14,
        title      : '[WDBZ Dance Album] #1. KING KING by DUCKWRTH',
        description: 'Working with WDBZ on \'KING KING\' was like sculpting a dance masterpiece from a simple block of marble. The concept was minimal and straightforward, but the powerful, hard-hitting moves transformed it into something extraordinary. We\'re good friends, and it\'s always a blast working together, but this project had a serious edge. WDBZ\'s commitment to investing so much in production for just a dance videos was a bold move, and when it released, it really made a mark on the dance community. Collaborating with friends to create something that resonates so deeply is what makes my job incredibly fulfilling!',
        link       : 'https://www.youtube.com/watch?v=yVGj3rvpxWA'
      },
      // 15  fromis_9 (프로미스나인) 'DM' Performance Video  "Filming 'DM' with Fromis_9 was like having a dance party on a rooftop under the city lights. The girls, still the sweet angels I remember, brought warmth and charm to the cold winter night. It was our second time working together, and the familiarity helped us create something elegant and catchy. We had a blast, and getting closer with them made the whole experience even more special. It's always a pleasure working with Fromis_9, and I can't wait for our next project!"  https://www.youtube.com/watch?v=1TyYpFW8X9U
      {
        index      : 15,
        title      : 'fromis_9 (프로미스나인) \'DM\' Performance Video',
        description: 'Filming \'DM\' with Fromis_9 was like having a dance party on a rooftop under the city lights. The girls, still the sweet angels I remember, brought warmth and charm to the cold winter night. It was our second time working together, and the familiarity helped us create something elegant and catchy. We had a blast, and getting closer with them made the whole experience even more special. It\'s always a pleasure working with Fromis_9, and I can\'t wait for our next project!',
        link       : 'https://www.youtube.com/watch?v=1TyYpFW8X9U'
      },
      // 16  HYO 효연 'Second (Feat. 비비 (BIBI))' MV  "Crafting the vivid and lively world of 'Second' with Hyoyeon was an unforgettable adventure. It was a blend of pop energy, unforgettable dance breaks, and dynamic sets that took us from desert camping to nighttime partying. What stood out most was Hyoyeon's professionalism and friendly attitude, which made the entire process not only fun but also a great learning experience. This music videos was a memorable project, filled with creativity and joy, and I'm grateful to have been a part of it!"  https://www.youtube.com/watch?v=rthppvDJ2fA
      {
        index      : 16,
        title      : 'HYO 효연 \'Second (Feat. 비비 (BIBI))\' MV',
        description: 'Crafting the vivid and lively world of \'Second\' with Hyoyeon was an unforgettable adventure. It was a blend of pop energy, unforgettable dance breaks, and dynamic sets that took us from desert camping to nighttime partying. What stood out most was Hyoyeon\'s professionalism and friendly attitude, which made the entire process not only fun but also a great learning experience. This music videos was a memorable project, filled with creativity and joy, and I\'m grateful to have been a part of it!',
        link       : 'https://www.youtube.com/watch?v=rthppvDJ2fA'
      },
      // 17  [Special Performance] 강다니엘(KANGDANIEL) - PARANOIA  "Diving into the darker side of K-pop with 'Paranoia' was a game-changer for me. At a time when the industry was leaning toward bright and vivid themes, Kang Daniel and I chose to break the trend. We embraced the essence of the song, infusing it with powerful dance and a haunting dark aesthetic. Not only did this project mark the beginning of many collaborations with the friendly and talented Kang Daniel, but it also played a pivotal role in establishing my name in the videos industry. 'Paranoia' remains a milestone, a vivid memory of taking a creative risk that truly paid off."  https://www.youtube.com/watch?v=S7WWoEu8aAs
      {
        index      : 17,
        title      : '[Special Performance] 강다니엘(KANGDANIEL) - PARANOIA',
        description: 'Diving into the darker side of K-pop with \'Paranoia\' was a game-changer for me. At a time when the industry was leaning toward bright and vivid themes, Kang Daniel and I chose to break the trend. We embraced the essence of the song, infusing it with powerful dance and a haunting dark aesthetic. Not only did this project mark the beginning of many collaborations with the friendly and talented Kang Daniel, but it also played a pivotal role in establishing my name in the videos industry. \'Paranoia\' remains a milestone, a vivid memory of taking a creative risk that truly paid off.',
        link       : 'https://www.youtube.com/watch?v=S7WWoEu8aAs'
      },
      // 18  THE 8 '海城 (Hai Cheng)' Official MV    https://www.youtube.com/watch?v=C_eSHj7W54E
      {
        index      : 18,
        title      : 'THE 8 \'海城 (Hai Cheng)\' Official MV',
        description: 'Working with The8 on \'Hai Cheng\' was a dream come true. The song was a beautiful blend of traditional Chinese music and modern pop, and we wanted to create a videos that would reflect that. We took inspiration from the song\'s lyrics and the traditional Chinese elements in the music, and we created a videos that was both elegant and powerful. The8\'s talent and professionalism made the entire process a breeze, and I\'m grateful to have been a part of this project.',
        link       : 'https://www.youtube.com/watch?v=C_eSHj7W54E'
      },
      // 19  MCND 'W.A.T.1'ㅣTRACK VIDEO    https://www.youtube.com/watch?v=M8bTm-qqSvo
      {
        index      : 19,
        title      : 'MCND \'W.A.T.1\'ㅣTRACK VIDEO',
        description: 'MCND\'s \'W.A.T.1\' was a project that allowed me to explore a new side of K-pop. The song was a blend of hip-hop and pop, and we wanted to create a videos that would reflect that. We took inspiration from the song\'s lyrics and the traditional Chinese elements in the music, and we created a videos that was both elegant and powerful. The8\'s talent and professionalism made the entire process a breeze, and I\'m grateful to have been a part of this project.',
        link       : 'https://www.youtube.com/watch?v=M8bTm-qqSvo'
      },
      // 20  [THE 8 Contemporary ART] THE 8 - 深渊 (Abyss)    https://www.youtube.com/watch?v=nYY5tz-PTzY
      {
        index      : 20,
        title      : '[THE 8 Contemporary ART] THE 8 - 深渊 (Abyss)',
        description: 'THE 8 Contemporary ART] THE 8 - 深渊 (Abyss)',
        link       : 'https://www.youtube.com/watch?v=nYY5tz-PTzY'
      },
      // 21  [SPECIAL VIDEO] SEVENTEEN(세븐틴) - 'Ready to love' Confession day Ver.    https://www.youtube.com/watch?v=Pbwz5I1TPk0
      {
        index      : 21,
        title      : '[SPECIAL VIDEO] SEVENTEEN(세븐틴) - \'Ready to love\' Confession day Ver.',
        description: '[SPECIAL VIDEO] SEVENTEEN(세븐틴) - \'Ready to love\' Confession day Ver.',
        link       : 'https://www.youtube.com/watch?v=Pbwz5I1TPk0'
      },
      // 22  KINGDOM(킹덤) 'KARMA' MV    https://www.youtube.com/watch?v=XrcjZgjKzj0
      {
        index      : 22,
        title      : 'KINGDOM(킹덤) \'KARMA\' MV',
        description: 'KINGDOM(킹덤) \'KARMA\' MV',
        link       : 'https://www.youtube.com/watch?v=XrcjZgjKzj0'
      },
      // 23  LUN8(루네이트) | "NCT U - BOSS" Dance Cover    https://www.youtube.com/watch?v=tqNAYHiOgJE
      {
        index      : 23,
        title      : 'LUN8(루네이트) | "NCT U - BOSS" Dance Cover',
        description: 'LUN8(루네이트) | "NCT U - BOSS" Dance Cover',
        link       : 'https://www.youtube.com/watch?v=tqNAYHiOgJE'
      },
      // 24  LUN8(루네이트) | "EXO - Monster" Dance Cover    https://www.youtube.com/watch?v=TSMVnsZMzsU
      {
        index      : 24,
        title      : 'LUN8(루네이트) | "EXO - Monster" Dance Cover',
        description: 'LUN8(루네이트) | "EXO - Monster" Dance Cover',
        link       : 'https://www.youtube.com/watch?v=TSMVnsZMzsU'
      },
      // 25  fromis_9 (프로미스나인) 'Stay This Way' Performance Video    https://www.youtube.com/watch?v=9Upzg5NmudI
      {
        index      : 25,
        title      : 'fromis_9 (프로미스나인) \'Stay This Way\' Performance Video',
        description: 'fromis_9 (프로미스나인) \'Stay This Way\' Performance Video',
        link       : 'https://www.youtube.com/watch?v=9Upzg5NmudI'
      },
      // 26  박재범 (Jay Park) - '想到你 (Thoughts Of You) (Feat. pH-1 & 李大奔 BENZO)' Performance Video with MVP    https://www.youtube.com/watch?v=XLmIMOA1LKs
      {
        index      : 26,
        title      : '박재범 (Jay Park) - \'想到你 (Thoughts Of You) (Feat. pH-1 & 李大奔 BENZO)\' Performance Video with MVP',
        description: '박재범 (Jay Park) - \'想到你 (Thoughts Of You) (Feat. pH-1 & 李大奔 BENZO)\' Performance Video with MVP',
        link       : 'https://www.youtube.com/watch?v=XLmIMOA1LKs'
      },
      // 27  ENHYPEN (엔하이픈) 'Drunk-Dazed' Dance Performance Video (Summer Edition 'Destroyed World')    https://www.youtube.com/watch?v=JqdsBIS1cw8
      {
        index      : 27,
        title      : 'ENHYPEN (엔하이픈) \'Drunk-Dazed\' Dance Performance Video (Summer Edition \'Destroyed World\')',
        description: 'ENHYPEN (엔하이픈) \'Drunk-Dazed\' Dance Performance Video (Summer Edition \'Destroyed World\')',
        link       : 'https://www.youtube.com/watch?v=JqdsBIS1cw8'
      },
      // 28  CocaNButter - 'Mi Deh Yah' M/V    https://www.youtube.com/watch?v=ieAyyfD6l7w
      {
        index      : 28,
        title      : 'CocaNButter - \'Mi Deh Yah\' M/V',
        description: 'CocaNButter - \'Mi Deh Yah\' M/V',
        link       : 'https://www.youtube.com/watch?v=ieAyyfD6l7w'
      }
    ],
    index       : 1,
    load        : false,
    playerWidth : 0,
    playerHeight: 0,
    isShow : false,
    timer : null
  }),
  computed  : {},
  methods   : {
    videoId  : (url) => getIdFromURL(url),
    startTime: (url) => getTimeFromURL(url),
    windowResize() {
      this.load = false
      if (this.$store.state.windowWidth > 1024) {
        this.playerWidth = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientWidth - 152
        this.playerHeight = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientHeight - 292
      }
      else {
        this.playerWidth = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientWidth
        this.playerHeight = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientHeight - 161
      }
      this.$nextTick(() => {
        this.load = true
      })
    },
    showTooltip() {
      if(this.$store.state.windowWidth < 1024 ){
        this.isShow = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.isShow = false, 2500)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.indexFromMain){
        this.$refs['image-list'].goToIndex(this.indexFromMain)
      }
      if (this.$store.state.windowWidth > 1024) {
        this.playerWidth = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientWidth - 152
        this.playerHeight = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientHeight - 292
      }
      else {
        this.playerWidth = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientWidth
        this.playerHeight = this.$refs['portfolio-content'] && this.$refs['portfolio-content'].clientHeight - 161
      }
      this.load = true
      EventBus.$emit('loaded')
    })
    window.addEventListener('resize', this.windowResize)
  }
}

</script>
<style
    scoped
    lang="scss"
>
section.portfolio-wrapper::v-deep {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #000000;
  position: relative;
  justify-content: flex-start;

  svg.logo {
    width: 32px;
    height: 32px;
  }

  &::before {
    content: '';
    position: fixed;
    top: 23px;
    left: 23px;
    width: calc(100% - 46px);
    height: 1px;
    z-index: 2;
    background: #fff;
    transition: all .2s linear;
  }

  .portfolio {
    width: calc(100% - 343px);
    height: 100%;
    background: #000;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: flex-end;

    .portfolio-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: space-between;
      padding: 56px 76px;

      .portfolio-content-title {
        width: 100%;
        height: 50px;

      }
      .portfolio-content-video{
        position:relative;
        .tooltip-text{
          display:block;
          position : absolute ;
          height:auto;
          top:0;
          left: 50%;
          transform : translateX(-50%);
          width: 288px;
          font-size:16px;
          padding:10px;
          z-index:400;
          background-color : #323232;
          color:#fff;
          border-radius:10px;

        }
      }
      .portfolio-content-desc {
        width: 100%;
        height: 130px;
        overflow: hidden;

        .portfolio-content-desc-wrapper {
          width: calc(100% - 50px);
          height: 130px;
          align-items: center;
          overflow: hidden;
          align-content: flex-end;
        }

        .youtube-outlink {
          position: relative;
          text-decoration: none;
          width: 50px;
          height: 130px;
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          color: #909090;

          &::after {
            position: absolute;
            content: '';
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            border-radius: 50%;
            border: 1px solid #909090;
            width: 30px;
            height: 30px;
          }

          &::before {
            position: absolute;
            content: '';
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 2px solid #909090;
            width: 40px;
            height: 40px;
          }
        }

        .vue-typer {
          font-family: 'fragmentMono', sans-serif;
          width: calc(100% - 60px);

          & .custom.char.typed {
            font-family: 'fragmentMono', sans-serif;
            color: #fff;
          }

          & .custom.caret {
            background-color: #fff;
          }
        }
      }
    }

  }

  .portfolio-img-list {
    margin-top: 130px;
    width: 343px;
    height: calc(100% - 130px);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;

    .portfolio-img-shadow {
      position: absolute;
      top: -1.3rem;
      height: 30px;
      width: 267px;
      z-index: 1;
      background: linear-gradient(#000000 41%, hsla(0, 2%, 51%, 0.3) 95%, hsla(0, 30%, 80%, 0.05));
    }
  }

  @media screen and (max-width: 1024px) {

    width: 100%;
    height: calc(var(--vh) * 100);
    justify-content: center;
    padding: 10px;



    .portfolio {
      width: 100%;
      height: calc(var(--vh) * 100 - 200px);
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;

      .portfolio-content {
        height: 100%;
        padding: 0;

        .portfolio-content-title {
          width: calc(100% - 36px - 4vw);
          height: 35px;
          flex-wrap: nowrap;

          svg.logo {
            width: 28px !important;
            height: 28px !important;
          }
          .vs-tooltip{
            font-size:20px !important;
          }
          .portfolio-description{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .portfolio-content-desc {
          width: 100%;
          height: 100px;
          padding: 15px 0;
          overflow: hidden;
          justify-content: flex-end;
          align-items: flex-start;
          position: relative;

          .portfolio-content-desc-wrapper {
            width: calc(100% - 60px);
            padding: 15px 0;
            height: auto;
            align-items: center;
            position: absolute;
            bottom: 0;
            left: 0;
          }

          .youtube-outlink {
            height: 70px;

            &::after {
            }

            &::before {
            }
          }

          .vue-typer {
            font-family: 'fragmentMono', sans-serif;
            width: calc(100% - 50px);

            & .custom.char.typed {
              font-family: 'fragmentMono', sans-serif;
              color: #fff;
            }

            & .custom.caret {
              background-color: #fff;
            }
          }
        }
      }

    }

    .portfolio-img-list {
      margin-top: 0;
      width: 100%;
      height: 120px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;

      .portfolio-img-shadow {
        visibility: hidden;
      }
    }
  }
}
</style>