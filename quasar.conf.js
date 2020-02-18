module.exports = function (ctx) {
  return {
    sourceFiles: {
      router: 'src/router/index.ts',
      store: 'src/store/index.ts'
    },
    boot: [
    ],
    css: [
      'app.sass'
    ],
    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'ru', // Quasar language pack
      all: 'auto',
      components: [],
      directives: [],
      plugins: [
        "Notify"
      ]
    },
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      showProgress: true,
      gzip: false,
      analyze: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      https: false,
      port: 80,
      open: true // opens browser window automatically
    },
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Chat on quasar',
        short_name: 'Chat on quasar',
        description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
      }
    },
    cordova: {
      id: 'org.cordova.quasar.app'
    },
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      bundler: 'packager', // 'packager' or 'builder'
      packager: {
      },

      builder: {
        appId: 'chat'
      },
      nodeIntegration: true,
      extendWebpack (cfg) {
      }
    }
  }
}
