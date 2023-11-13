export const camelCaseItemProps = (props: Record<string, any>) => {
  const newProps = {} as Record<string, any>;

  Object.keys(props).forEach(key => {
    if (key === 'itemprop') newProps['itemProp'] = props[key];
    else if (key === 'itemscope') newProps['itemScope'] = props[key];
    else if (key === 'itemtype') newProps['itemType'] = props[key];
    else newProps[key] = props[key];
  });
  return newProps;
};
