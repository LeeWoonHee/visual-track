module.exports = {
  publicPath           : '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack     : {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pluginOptions        : {
    s3Deploy: {
      awsProfile       : 'vt-s3-deployer',
      region           : 'ap-northeast-2',
      bucket           : 'visualtrack.io',
      uploadConcurrency: 3,
      registry         : undefined,
      overrideEndpoint : false,
      createBucket     : true,
      staticHosting    : true,
      assetPath        : 'dist',
      assetMatch       : '**',
      deployPath       : '/',
      acl              : 'bucket-owner-full-control',
      pwa              : false,
      enableCloudfront : true,
      cloudfrontId     : 'E2DCIT5MTLT3TG',
      pluginVersion    : '4.0.0-rc3',
      staticIndexPage  : 'index.html',
      staticErrorPage  : 'index.html'
    }
  }
}

