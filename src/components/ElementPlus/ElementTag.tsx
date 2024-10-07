import { ElTag, type TagProps } from 'element-plus'
import { useSlots, type CSSProperties } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import { generateElColor } from '@/utils/color'

const ElementTag = (props: Partial<TagProps>): JSX.Element => {
  const slots = useSlots()
  let elStyles: CSSProperties = {}
  if (props.color) {
    const colors = generateElColor(props.color)
    elStyles = colors
    elStyles.backgroundColor = `var(${colors['--el-color-primary-light-5']})`
  }

  return (
    <ElTag {...props} style={elStyles}>
      {slots}
    </ElTag>
  )
}

export default ElementTag
