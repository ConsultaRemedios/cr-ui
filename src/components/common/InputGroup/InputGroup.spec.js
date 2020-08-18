import { mount } from '@vue/test-utils';
import InputGroup from './InputGroup.vue';
import BaseButton from './../BaseButton';
import BaseInput from './../BaseInput';

describe('InputGroup', () => {
  it('matches the snapshot', () => {
    const wrapper = mount(InputGroup, {
      slots: {
        default: [
          BaseButton,
          BaseInput,
        ]
      }
    });

    const input = wrapper.findComponent(BaseInput);
    const button = wrapper.findComponent(BaseButton);

    expect(input.classes()).toContain('customInput');
    expect(button.classes()).toContain('customButton');
    expect(wrapper.element).toMatchSnapshot();
  });
})
