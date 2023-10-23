import { LensIcon } from '../icons/LensIcon.ts'
import { getContainerStyle, getTextStyle } from '../types/utils.ts'
import { Theme, Size } from '../types/types.ts'
import { 
  computed,
  defineComponent,
  type PropType,
  h as _h,
  getCurrentInstance,
} from 'vue-demi'

export const ShareToLens = defineComponent({
  name: 'ShareToLens',
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
  emits: {
    click: null
  },
  setup (props, { emit }) {
    const shareUrl = computed(() => {
      let shareUrl = `https://${props.domain}/?text=${encodeURIComponent(props.content)}`

      if (props.url) {
        shareUrl = shareUrl + `&url=${props.url}`
      }
      if (props.via) {
        shareUrl = shareUrl + `&via=${encodeURIComponent(props.via)}`
      }
      if (props.hashtags) {
        shareUrl = shareUrl + `&hashtags=${props.hashtags}`
      }

      return shareUrl
    })

    const vm = getCurrentInstance();
    const h = _h.bind(vm);

    function navigate () {
      emit('click')
      window.open(shareUrl.value, '_newtab')
    }

    return () => 
    h(
      'button',
      {
        class: 'lensButton',
        style: [props.containerStyle || getContainerStyle(props.theme, props.size)],
        onClick: () => navigate(),
        on: { click: () => navigate() }
      },
      [
        props.icon ? 
        h(props.icon) :
        h(LensIcon, {
          theme: props.theme,
          size: props.size,
          iconBackgroundColor: props.iconBackgroundColor,
          iconForegroundColor: props.iconForegroundColor
        }),
        h('p', 
          { style: [props.textStyle || getTextStyle(props.theme, props.size)] }, 
          props.title
        )
      ]
    )
  }
})