import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import CollapsedCard from '../../../element-plus/components/collapse-card/collapse-card.vue'

describe('collapsed card modules', () => {
  test('collapsed card snapshot', () => {
    const wrapper = mount(CollapsedCard)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
