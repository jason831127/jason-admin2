import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'

export default () => {
  Vue.use(Element, { locale })
}
