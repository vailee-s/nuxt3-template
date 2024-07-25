import presetIcons from '@unocss/preset-icons'

export default defineNuxtConfig({
  srcDir: 'src',
  devtools: true,
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    // pinia plugin - https://pinia.esm.dev
    '@pinia/nuxt',
    // unocss plugin - https://github.com/unocss/unocss
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    // https://github.com/huntersofbook/huntersofbook/tree/main/packages/naive-ui-nuxt
    '@huntersofbook/naive-ui-nuxt',
  ],
  build: {
    transpile: ['@headlessui/vue'],
  },
  unocss: {
    uno: false,
    preflight: false,
    icons: true,
    presets: [
      presetIcons({
        scale: 1.2,
        extraProperties: {
          display: 'inline-block',
        },
      }),
    ],
    safelist: ['i-twemoji-flag-us-outlying-islands', 'i-twemoji-flag-turkey'],
  },

  // localization - i18n config
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
      { code: 'tr', file: 'tr-TR.json' },
    ],
    defaultLocale: 'tr',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    // vueI18n: {
    //   legacy: false,
    //   locale: 'tr',
    //   fallbackLocale: 'tr',
    //   availableLocales: ['en', 'tr'],
    // },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt', './type.d.ts'],
      },
    },
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'color-mode',
  },

  tailwindcss: {
    configPath: './tailwind.config.js',
  },

  vite: {
    logLevel: 'info',
  },
  ssr: true,
  nitro: {
    routeRules: {
      '/api/*': {
        proxy: 'http://127.0.0.1:8099',
      },
    },
    devProxy: {
      '/api/*': {
        target: 'http://127.0.0.1:8099/api/*',
        changeOrigin: true,
      },
    },
  },
  // routeRules: {
  //   '/api/**': { proxy: { to: 'http://127.0.0.1:8099/**' } },
  // },
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'postcss-px-to-viewport-8-plugin': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: (file:string) => {
          let num = 1920;
          if (file.indexOf('mobile') !== -1) {
            num = 375;
          }
          return num;
        }, // UI设计稿的宽度
        // viewportHeight: 667, // UI
        unitPrecision: 6, // 转换后的精度，即小数点位数
        // propList: 当有些属性的单位我们不希望转换的时候，可以添加在数组后面，并在前面加上!号，如propList: ["*","!letter-spacing"],这表示：所有css属性的属性的单位都进行转化，除了letter-spacing的
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        // viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        // fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        exclude: [/node_modules/i],
        // 转换的黑名单，在黑名单里面的我们可以写入字符串，只要类名包含有这个字符串，就不会被匹配。比如selectorBlackList: ['wrap'],它表示形如wrap,my-wrap,wrapper这样的类名的单位，都不会被转换
        selectorBlackList: ['ignore', 'van'], // 指定不转换为视窗单位的类名，
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
        // include: [/node_modules/],
        landscape: false, // 是否处理横屏情况
      },
    },
  },
})
