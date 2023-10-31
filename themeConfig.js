/*=========================================================================================
  File Name: themeConfig.js
  Description: Theme configuration
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

// MAIN COLORS - VUESAX THEME COLORS
export const colors = {
  dark: '#1E1E1E',
  white: '#ffffff',
  black: '#000',
  gray: '#6A6A6A',
  main: '#316BEB',
  second: '#1D284C',
  success: '#00A0E9',
  primary: '#b20000',
  info: '#44C19A',
  danger: '#E93F34',
  warning: '#FBE056',
  gRed: 'radial-gradient(129.1% 117.53% at 49.47% 49.26%, #DE0101 0%, #580000 100%)'
}

// CONFIGS
const themeConfig = {
  disableCustomizer: false,       // options[Boolean] : true, false(default)
  disableThemeTour: false,       // options[Boolean] : true, false(default)
  footerType: 'static',    // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: false,       // options[Boolean] : true, false(default)
  mainLayoutType: 'vertical',  // options[String]  : vertical(default) / horizontal
  navbarColor: '#fff',      // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: 'floating',  // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: 'zoom-fade', // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  rtl: false,       // options[Boolean] : true, false(default)
  sidebarCollapsed: false,       // options[Boolean] : true, false(default)
  theme: 'light',     // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: 'userInfo'

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
}

import Vue from 'vue'
import Vuesax from 'vuesax'

Vue.use(Vuesax, {
  theme: {colors},
  rtl: themeConfig.rtl
})

export default themeConfig
