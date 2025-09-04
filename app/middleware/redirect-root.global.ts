export default defineNuxtRouteMiddleware((to) => {
  const defaultLocale = "de"

  if (to.path === "/") {
    return navigateTo(`/${defaultLocale}`)
  }
})