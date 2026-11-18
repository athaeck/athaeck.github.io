// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Planning prototypes and agent tooling, not part of the site.
  ignores: ['.scratch/', '.agents/', '.claude/'],
})
