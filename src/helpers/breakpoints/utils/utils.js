export const breakpointByWidth = (w) => {
  if (w > 0 && w < 576) return 'xs';
  if (w >= 576 && w < 768) return 'sm';
  if (w >= 768 && w < 992) return 'md';
  if (w >= 992 && w < 1200) return 'lg';
  return 'xl';
};

export default breakpointByWidth;
