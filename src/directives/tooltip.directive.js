export default {
  bind(el, { value, modifiers }) {
    M.Tooltip.init(el, {
      html: value
    })
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}