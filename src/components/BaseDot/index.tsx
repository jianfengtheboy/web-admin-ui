import { defineComponent, type PropType } from 'vue'
import './dot.less'

type IPropsType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export default defineComponent({
	name: 'BaseDot',
	props: {
		animation: {
			type: Boolean,
			default: true
		},
		type: {
			type: String as PropType<IPropsType>,
			default: 'primary'
		}
	},
	setup(props) {
		return () => (
			<span
				class={[
					'base-dot',
					{ 'dot-processing': props.animation },
					`base-dot-${props.type === 'info' ? 'gray' : props.type}`
				]}
			/>
		)
	}
})
