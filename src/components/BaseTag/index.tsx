import { defineComponent, computed, type PropType } from 'vue'
import './tag.less'

type IPropsType = 'dark' | 'light' | 'outline' | 'light-outline'
type IPropsStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type IPropsSize = 'mini' | 'small' | 'large'

export default defineComponent({
	name: 'BaseTag',
	props: {
		type: {
			type: String as PropType<IPropsType>,
			default: 'light'
		},
		status: {
			type: String as PropType<IPropsStatus>,
			default: 'primary'
		},
		size: {
			type: String as PropType<IPropsSize>,
			default: 'small'
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	emits: ['click', 'close'],
	setup(props, { slots, emit }) {
		const className = computed(() => {
			const classArr = ['base-tag']
			if (props.type) {
				classArr.push(`base-tag-${props.type}`)
			}
			if (props.size) {
				classArr.push(`base-tag-size-${props.size}`)
			}
			if (props.status) {
				classArr.push(`base-tag-status-${props.status === 'info' ? 'gray' : props.status}`)
			}
			return classArr
		})

		const handleClick = () => {
			emit('click')
		}

		const handleClose = (event: MouseEvent) => {
			event.stopPropagation()
			emit('close')
		}

		const CloseIcon = (
			<span class="base-tag-close-btn" onClick={e => handleClose(e)}>
				<icon-close class="close-icon" />
			</span>
		)

		return () => (
			<span class={className.value} onClick={handleClick}>
				{slots.default?.()}
				{props.closable && CloseIcon}
			</span>
		)
	}
})
