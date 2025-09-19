//
// CUSTOMIZED FILE
// Add support for better PDF running heads
//
import { html } from '#lib/common-tags/index.js'
import path from 'node:path'

import checkFormat from '../../_plugins/collections/filters/output.js'

/**
 * Publication page header
 *
 * @param      {Object}  eleventyConfig
 */
export default function (eleventyConfig) {
  const contributors = eleventyConfig.getFilter('contributors')
  const markdownify = eleventyConfig.getFilter('markdownify')
  const pageTitle = eleventyConfig.getFilter('pageTitle')
  const slugify = eleventyConfig.getFilter('slugify')

  const { labelDivider } = eleventyConfig.globalData.config.pageTitle
  const { imageDir } = eleventyConfig.globalData.config.figures

  const pdfConfig = eleventyConfig.globalData.config.pdf

  const {
    runningHeadDefault,
    runningHeadRecto,
    runningHeadVerso,
  } = pdfConfig

  /**
   * @function checkPagePDF
   *
   * @param {Object} config pdf object from Quire config
   * @param {Array<string>,string,undefined} outputs outputs setting from page frontmatter
   * @param {bool} frontmatterSetting pdf page setting from page frontmatter
   *
   * Check if the PDF link should be generated for this page
   */
  const checkPagePDF = (config, outputs, frontmatterSetting) => {
    // Is the output being created?
    if (!checkFormat('pdf', { data: { outputs } })) {
      return false
    }

    // Are the footer links set?
    if (config.pagePDF.accessLinks.find((al) => al.header === true) === undefined) {
      return false
    }

    // Return the core logic check
    return (config.pagePDF.output === true && frontmatterSetting !== false) || frontmatterSetting === true
  }

  return function (params) {
    const {
      byline_format: bylineFormat,
      image,
      label,
      pageContributors,
      parentPage,
      short_title: shortTitle,
      subtitle,
      title,
      outputs,
      page_pdf_output: pagePDFOutput,
      key
    } = params

    const classes = ['quire-page__header', 'hero']

    if (title === 'title page' || title === 'half title page') {
      classes.push('is-screen-only')
    }

    const pageLabel = label
      ? `<span class="label">${label}<span class="visually-hidden">${labelDivider}</span></span>`
      : ''

    const imageElement = image
      ? html`
          <section
            class="${classes} hero__image"
            style="background-image: url('${path.join(imageDir, image)}');"
          >
          </section>
        `
      : ''

    const contributorsElement = pageContributors
      ? html`
          <div class="quire-page__header__contributor">
            ${contributors({ context: pageContributors, format: bylineFormat })}
          </div>
        `
      : ''

    function getPDFRunningHead(value) {

      let runningHead
      
      switch (value) {
        case 'title':
          runningHead = shortTitle
            ? markdownify(shortTitle)
            : markdownify(title)
          break
        case 'label':
          runningHead = label
            ? markdownify(label)
            : getPDFRunningHead(runningHeadDefault)
          break
        case 'section':
          if (!parentPage) {
            runningHead = getPDFRunningHead(runningHeadDefault)
          } else {
            runningHead = parentPage.short_title
            ? markdownify(parentPage.short_title)
            : markdownify(parentPage.title)
          }
          break
        case 'contributor':
          if (!pageContributors) {
            runningHead = getPDFRunningHead(runningHeadDefault)
          } else if (pageContributors.length > 7 ) {
            // Per the Chicago Manual of Style, only list the first 7 contributors
            const pageContributorsPartial = pageContributors.slice(0, 7)
            const lastNameList = contributors({ context: pageContributorsPartial, format: 'last-name' })
            runningHead = lastNameList.replace(', and ', ', ') + ', et al.'
          } else {
            runningHead = contributors({ context: pageContributors, format: 'last-name' })
          }
          break
        default:
          runningHead = ''
          break
      }
      
      return runningHead
    }

    const pdfRunningHeadElements = html`
      <span class="pdf-running-head pdf-running-head--recto pdf-running-head--${runningHeadRecto}" data-outputs-include="pdf">${getPDFRunningHead(runningHeadRecto)}</span>
      <span class="pdf-running-head pdf-running-head--verso pdf-running-head--${runningHeadVerso}" data-outputs-include="pdf">${getPDFRunningHead(runningHeadVerso)}</span>
    `

    let downloadLink = ''

    if (checkPagePDF(pdfConfig, outputs, pagePDFOutput)) {
      const text = pdfConfig.pagePDF.accessLinks.find((al) => al.header === true).label
      const href = path.join(pdfConfig.outputDir, `${pdfConfig.filename}-${slugify(key)}.pdf`)
      downloadLink = html`
        <div class="quire-download" data-outputs-exclude="epub,pdf">
          <a class="quire-download__link" href="${href}" download><span>${text}</span><svg class="quire-download__link__icon"><use xlink:href="#download-icon"></use></svg></a>
        </div>
      `
    }

    return html`
      <section class="${classes}">
        <div class="hero-body">
          <h1 class="quire-page__header__title" id="${slugify(title)}">
            ${pageLabel}
            ${pageTitle({ title, subtitle })}
          </h1>
          ${contributorsElement}
          ${downloadLink}
          ${pdfRunningHeadElements}
        </div>
      </section>
      ${imageElement}
    `
  }
}
