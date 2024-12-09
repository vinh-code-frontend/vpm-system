import { ElTag, ElIcon, type TagProps } from 'element-plus';
import { useSlots, type CSSProperties, resolveComponent, h, computed } from 'vue';
import { type JSX, Fragment } from 'vue/jsx-runtime';
import { generateElColor } from '@/utils/color';

interface Props extends TagProps {
  icon?: string;
  showIcon?: boolean;
}

const IconComponent = ({ iconName, showIcon }: { iconName: string; showIcon: boolean }): JSX.Element | null => {
  if (!showIcon) {
    return <Fragment />;
  }
  try {
    const DynamicComponent = resolveComponent(iconName);
    return <ElIcon>{h(DynamicComponent)}</ElIcon>;
  } catch {
    console.error(`Component "${iconName}" not found.`);
    return null;
  }
};

const BaseTag = (props: Partial<Props>): JSX.Element => {
  const slots = useSlots();
  const isShowIcon = computed(() => {
    const defaultShow = typeof props.showIcon !== 'boolean' ? true : props.showIcon;
    return typeof props.icon === 'string' && defaultShow;
  });
  console.log(props.showIcon);
  let elStyles: CSSProperties = {};
  if (props.color) {
    const colors = generateElColor(props.color);
    elStyles = colors;
    elStyles.backgroundColor = `var(${colors['--el-color-primary-light-5']})`;
  }

  return (
    <ElTag {...props} style={elStyles}>
      {isShowIcon.value ? (
        <div class="flex items-center gap-1">
          <IconComponent iconName={props.icon!} showIcon={isShowIcon.value} />
          <span>{slots?.default?.()}</span>
        </div>
      ) : (
        <span>{slots?.default?.()}</span>
      )}
    </ElTag>
  );
};

export default BaseTag;
