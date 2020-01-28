import verge from 'verge';
import { breakpointByWidth } from './utils';

export const getCurrentBreakpoint = () => breakpointByWidth(verge.viewportW());
export const isExtraLarge = () => getCurrentBreakpoint() === 'xl';
export default getCurrentBreakpoint;
