import { ElTag, type TagProps } from 'element-plus'
import { ref, useSlots, type CSSProperties, defineExpose } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import { generateElColor } from '@/utils/color'

const ElementTag = (props: Partial<TagProps>): JSX.Element => {
  const slots = useSlots()
  const tagRef = ref<InstanceType<typeof ElTag>>()

  let elStyles: CSSProperties = {}
  if (props.color) {
    const colors = generateElColor(props.color)
    elStyles = colors
    elStyles.backgroundColor = `var(${colors['--el-color-primary-light-5']})`
  }

  defineExpose({
    tagRef
  })

  return (
    <ElTag {...props} style={elStyles}>
      {slots}
    </ElTag>
  )
}

export default ElementTag
