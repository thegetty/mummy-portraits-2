//
// CUSTOMIZED FILE
// updated snippet fo GA4
//
import { html } from '#lib/common-tags/index.js'

/**
 * Google Analytics
 * @param      {Object}  eleventyConfig
 * @param      {Object}  data
 */
export default function (eleventyConfig) {
  const { googleId } = eleventyConfig.globalData.config.analytics
  return function (params) {
    if (!googleId) return ''
    return html`
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleId}');</script>
    `
  }
}
