import { shallowMount } from '@vue/test-utils';
import snapshotDiff from 'snapshot-diff';
import SkeletonPlaceholder from './SkeletonPlaceholder.vue';

describe('SkeletonPlaceholder', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SkeletonPlaceholder);
  });

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('matches the snapshot when props are passed', () => {
    const localWrapper = shallowMount(SkeletonPlaceholder, {
      propsData: {
        width: '20px',
        height: '20px',
      },
    });

    expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
  });
});
