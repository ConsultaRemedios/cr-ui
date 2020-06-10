import { mount } from '@vue/test-utils';
import PopperJS from 'popper.js';
import Vue from 'vue';
import BaseTooltip from './BaseTooltip.vue';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  const Popper = jest.fn(() => {
    return {
      destroy: jest.fn(),
      update: jest.fn(),
      scheduleUpdate: jest.fn(),
    };
  });

  Popper.placements = PopperJS.placements;

  return Popper;
});

describe('BaseTooltip', () => {
  let wrapper;

  const mountWithParent = (opts = {}) => {
    const { props } = opts;

    const defaultProps = {
      show: true,
    };

    const Component = Vue.component('with-parent', {
      render(h) {
        return h('div', { class: 'parent' }, [
          h(BaseTooltip, {
            props: { defaultProps, ...props },
          }, [
            'Tooltip Example'
          ])
        ]);
      }
    });

    return mount(Component).find(BaseTooltip);
  };

  const mountWithRect = (position = 'top', fixed = false) => {
    const localWrapper = mount(BaseTooltip, {
      propsData: { position, fixed, show: true }
    });

    localWrapper.vm.reference.getBoundingClientRect = jest.fn(() => {
      return { y: 100, x: 100, height: 60, width: 200 };
    });

    localWrapper.vm.content.getBoundingClientRect = jest.fn(() => {
      return { height: 40, width: 60 };
    });

    localWrapper.vm.$mount();

    return localWrapper;
  };

  beforeAll(() => {
    Object.defineProperty(document.body, 'offsetHeight', {
      get() { return 800; },
    });

    window.scrollY = 0;
    window.innerWidth = 600;
  });

  afterEach(() => {
    wrapper.destroy();
    jest.clearAllTimers();
  });

  describe('Lifecycle', () => {
    describe('#mounted', () => {
      describe('Instance variables', () => {
        describe('When tooltip has no parent', () => {
          it('assigns body as reference element', () => {
            wrapper = mountWithRect();
            expect(wrapper.vm.reference).toEqual(document.body);
          });
        });

        describe('When tooltip has parent', () => {
          it('assigns it as reference element', () => {
            wrapper = mountWithParent();
            expect(wrapper.vm.reference.className).toEqual('parent');
          });
        });
      });

      it('moves component element to the end of body', () => {
        wrapper = mountWithParent();
        expect(wrapper.vm.$el).toEqual(document.body.lastElementChild);
      });

      it('calls initPopper method', () => {
        const initPopper = jest.fn();

        wrapper = mount(BaseTooltip, {
          propsData: { show: true },
          methods: { initPopper }
        });

        expect(initPopper).toHaveBeenCalledTimes(1);
      });
    });

    describe('#destroyed', () => {
      it('calls destroyPopper method', () => {
        const destroyPopper = jest.fn();

        wrapper = mount(BaseTooltip, {
          propsData: { show: true },
          methods: { destroyPopper }
        });
        wrapper.destroy();

        expect(destroyPopper).toHaveBeenCalledTimes(1);
      });

      it('moves element from body to reference element', () => {
        wrapper = mount(BaseTooltip, {
          propsData: { show: true }
        });

        jest.spyOn(wrapper.vm.reference, 'appendChild');
        wrapper.destroy();

        expect(wrapper.vm.reference.appendChild).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.reference.appendChild).toHaveBeenCalledWith(wrapper.vm.$el);
      })
    });
  });

  describe('Methods', () => {
    describe('#initPopper', () => {
      it('creates a Popper', () => {
        wrapper = mountWithRect();
        wrapper.vm.initPopper();

        expect(wrapper.vm.popper).not.toBeNull()
      });

      it('instantiates popper properly when "fixed" prop is "false"', () => {
        wrapper = mountWithRect();
        wrapper.vm.initPopper();

        expect(PopperJS).toHaveBeenCalledWith(
          wrapper.vm.reference,
          wrapper.vm.content,
          {
            placement: 'top',
            removeOnDestroy: true,
            positionFixed: false,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: 'window',
              },
            },
          }
        );
      });

      it('instantiates popper properly when "fixed" prop is "true"', () => {
        wrapper = mountWithRect('top', true);
        wrapper.vm.initPopper();

        expect(PopperJS).toHaveBeenCalledWith(
          wrapper.vm.reference,
          wrapper.vm.content,
          {
            placement: 'top',
            removeOnDestroy: true,
            positionFixed: false,
            modifiers: {
              preventOverflow: {
                enabled: true,
                boundariesElement: 'window',
              },
            },
          }
        );
      });
    });

    describe('#updatePopper', () => {
      describe('When popper is already created', () => {
        it('calls "update" method from Popper', () => {
          wrapper = mountWithRect();
          wrapper.vm.initPopper();
          wrapper.vm.updatePopper();

          expect(wrapper.vm.popper.update).toHaveBeenCalled();
        });
      });
    });

    describe('#destroyPopper', () => {
      it('destroy a Popper', () => {
        wrapper = mountWithRect();
        wrapper.vm.initPopper();
        wrapper.vm.destroyPopper();

        expect(wrapper.vm.popper).toBeNull()
      });
    });
  });

  describe('Watchers', () => {
    describe('#show', () => {
      describe('When show is true', () => {
        it('calls updatePopper', async () => {
          const updatePopper = jest.fn();

          wrapper = mount(BaseTooltip, {
            propsData: { show: false },
            methods: { updatePopper }
          });

          updatePopper.mockClear();
          wrapper.setProps({ show: true });

          await wrapper.vm.$nextTick();

          expect(updatePopper).toHaveBeenCalledTimes(1);
        });
      });

      describe('When show is false', () => {
        it('does not call updatePopper', (done) => {
          const updatePopper = jest.fn();

          wrapper = mount(BaseTooltip, {
            propsData: { show: true },
            methods: { updatePopper }
          });

          updatePopper.mockClear();
          wrapper.setProps({ show: false });

          wrapper.vm.$nextTick(() => {
            expect(updatePopper).not.toHaveBeenCalled();
            done();
          });
        });
      });
    });
  });

  describe('Snapshots', () => {
    const mountForSnapshot = (position, show = true, theme = 'light') => {
      return mount(BaseTooltip, {
        propsData: { position, show, theme },
        slots: {
          default: 'Example tooltip text'
        }
      });
    }

    it('matches Snapshot when show is false', () => {
      expect(mountForSnapshot('top', false).element).toMatchSnapshot();
    });

    it('matches Snapshot when position is top', () => {
      expect(mountForSnapshot().element).toMatchSnapshot();
    });

    it('matches Snapshot when position is bottom', () => {
      expect(mountForSnapshot('bottom').element).toMatchSnapshot();
    });

    it('matches Snapshot when position is left', () => {
      expect(mountForSnapshot('left').element).toMatchSnapshot();
    });

    it('matches Snapshot when position is right', () => {
      expect(mountForSnapshot('right').element).toMatchSnapshot();
    });

    it('matches Snapshot when theme is dark', () => {
      expect(mountForSnapshot('right', true, 'dark').element).toMatchSnapshot();
    });
  });
});
