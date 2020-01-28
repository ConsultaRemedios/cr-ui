import { shallowMount } from '@vue/test-utils';
import BaseIcon from './BaseIcon.vue';

describe('BaseIcon component', () => {
  it('matches the snapshot', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: {
        id: 'favorite.icon'
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
