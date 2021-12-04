const pkg = require('./package');


module.exports = {
  mode: 'universal',
  // server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0', // default: localhost
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: 'exam',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/summernote@0.8.16/lang/summernote-zh-TW.js' },
      { src: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js', defer: true },
      { src: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-auth.js', defer: true },
      { src: 'https://www.gstatic.com/firebasejs/5.10.1/firebase-database.js', defer: true }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.css' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/earlyaccess/notosanstc.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/eventBus',
    '~plugins/nuxt-quill-plugin.js',
    '@/plugins/components-ui'
    //{ src: '~plugins/google.js', ssr: false, injectAs: 'googleAuth' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets({isServer}) {
        const targets = isServer ? { node: 'current' } : { ie: 11 };
        return [
          [ require.resolve('@babel/preset-env'), { targets }  ]
        ];
      },
      plugins: [
        '@babel/syntax-dynamic-import',
        '@babel/transform-runtime',
        '@babel/transform-async-to-generator'
      ]
    },
    transpile: [ /^element-ui/ ],
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
};
