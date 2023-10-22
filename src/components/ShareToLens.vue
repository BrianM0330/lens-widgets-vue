<script lang="ts">
import LensIcon from './LensIcon.vue'
import { defineComponent, h, PropType } from 'vue-demi'
import { getContainerStyle, getTextStyle } from '../utils'
import { Theme, Size } from '../types'

export default defineComponent({
  props: {
    content: {
      type: String as PropType<string>,
      required: true
    },
    url: {
      type: String as PropType<string>,
      default: ''
    },
    via: {
      type: String as PropType<string>,
      default: ''
    },
    hashtags: {
      type: String as PropType<string>,
      default: ''
    },
    theme: {
      type: String as PropType<Theme>,
      default: Theme.default
    },
    size: {
      type: String as PropType<Size>,
      default: Size.small
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    containerStyle: {
      type: Object as PropType<Object>,
      default: undefined
    },
    textStyle: {
      type: Object as PropType<Object>,
      default: undefined
    },
    icon: {
      type: String as PropType<string>,
      default: ''
    },
    iconBackgroundColor: {
      type: String as PropType<string>,
      default: ''
    },
    iconForegroundColor: {
      type: String as PropType<string>,
      default: ''
    },
    domain: {
      type: String as PropType<string>,
      default: 'hey.xyz'
    }
  },
  computed: {
    shareUrl(): string {
      let shareUrl = `https://${this.domain}/?text=${encodeURIComponent(this.content)}`

      if (this.url) {
        shareUrl = shareUrl + `&url=${this.url}`
      }
      if (this.via) {
        shareUrl = shareUrl + `&via=${encodeURIComponent(this.via)}`
      }
      if (this.hashtags) {
        shareUrl = shareUrl + `&hashtags=${this.hashtags}`
      }

      return shareUrl
    }
  },
  methods: {
    navigate() {
      window.open(this.shareUrl, '_newtab')
    }
  },
  render() {
    return h(
      'button',
      {
        class: 'lensButton',
        style: [this.containerStyle || getContainerStyle(this.theme, this.size)],
        onClick: () => this.navigate()
      },
      [
        this.icon
          ? h(this.icon)
          : h(LensIcon, {
              theme: this.theme,
              size: this.size,
              iconBackgroundColor: this.iconBackgroundColor,
              iconForegroundColor: this.iconForegroundColor
            }),
        h('p', { style: [this.textStyle || getTextStyle(this.theme, this.size)] }, this.title)
      ]
    )
  }
})
</script>