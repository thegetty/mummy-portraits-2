//
// CUSTOMIZED FILE
// Add all annotation image layers to PDF output, with alt text, lines 24–66
// css is used to stack or grid them
// Add aria-describedby support to image tags
//
import escape from 'html-escape'
import { html } from '#lib/common-tags/index.js'
import path from 'node:path'

/**
 * Renders an image with a caption in print output
 *
 * @param      {Object}  eleventyConfig  eleventy configuration
 * @param      {Object}  figure          Figure data
 *
 * @return     {String}  HTML containing an <img> element and a caption
 */
export default function (eleventyConfig) {
  const figureCaption = eleventyConfig.getFilter('figureCaption')
  const figureLabel = eleventyConfig.getFilter('figureLabel')

  const { imageDir } = eleventyConfig.globalData.config.figures

  return function (figure) {
    const {
      alt,
      annotations=[],
      caption,
      credit,
      described_by_id,
      id,
      isExternalResource,
      label,
      src,
      staticInlineFigureImage
    } = figure

    const labelElement = figureLabel({ caption, id, label })

    const describedByAttribute = described_by_id ? `aria-describedby="${escape(described_by_id)}"` : ''

    if (annotations.length > 0) { 

      let lengthClass = ''
      let itemsLength = annotations[0].items.length
      if (itemsLength % 5 === 0) {
        lengthClass = `q-figure__layers-group--5`
      } else if (itemsLength % 4 === 0) {
        lengthClass = `q-figure__layers-group--4`
      } else if (itemsLength % 3 === 0) {
        lengthClass = `q-figure__layers-group--3`
      } else if (itemsLength % 2 === 0) {
        lengthClass = `q-figure__layers-group--2`
      } else {
        lengthClass = `q-figure__layers-group--1`
      }

      for (const annotation of annotations) {

        let baseLayer = ''
        if (annotation.input == 'checkbox') {
          const baseSrc = path.join(imageDir, src)
          baseLayer = html`<img alt="${alt}" class="q-figure__image" src="${baseSrc}" />`
        }

        let layers = '';
        for (const item of annotation.items) {
          const layerSrc = path.join(imageDir, item.src)
          const layerAlt = item.alt ? item.alt : ''
          layers += html`<img alt="${layerAlt}" class="q-figure__image test-this-sucker" src="${layerSrc}" />`
        }

        return html`
          <div class="q-figure__layers-group q-figure__layers-group--${annotation.input} ${lengthClass}">
            ${baseLayer}
            ${layers}
          </div>
          ${figureCaption({ caption, content: labelElement, credit })}
        `
      }
    }

    // this has to come after annotations, because radio-button
    // annotations don't have any src
    if (!src && !staticInlineFigureImage) return ''

    /**
     * NB: Image assets can be: external, in the asset dir, or in the IIIF directory
     **/
    let imageSrc
    switch (true) {
      case figure.isSequence:
        imageSrc = figure.staticInlineFigureImage
        break
      case figure.isCanvas || figure.isImageService:
        imageSrc = figure.printImage
        break
      case isExternalResource && src:
        imageSrc = src
        break
      default:
        imageSrc = path.posix.join(imageDir, src)
    }

    return html`
      <img alt="${escape(alt)}" class="q-figure__image" src="${imageSrc}" ${describedByAttribute} />
      ${figureCaption({ caption, content: labelElement, credit })}
    `
  }
}
