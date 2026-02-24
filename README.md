This is the repository for *Mummy Portraits of Roman Egypt, Volume 2: Emerging Research from the APPEAR Project*, edited by Marie Svoboda and Caroline R. Cartwright. This digital book was first published February 24, 2026, by the J. Paul Getty Museum. It is available online at https://www.getty.edu/publications/mummy-portraits-2/ and may be downloaded there free of charge in multiple formats.

## About the Book

Just over a thousand funerary portraits from Roman Egypt, most of which were separated from their interred mummified remains, survive in museums around the world. These fascinating ancient paintings offer an unparalleled opportunity for viewers to come face-to-face with people who lived and died some two thousand years ago.

The international collaboration known as APPEAR (Ancient Panel Paintings: Examination, Analysis, and Research) was launched in 2013 to promote the study of these objects and gather research findings into a shared database. This second volume of *Mummy Portraits of Roman Egypt* contains seventeen scholarly papers from the APPEAR conference hosted in 2022 at the Allard Pierson Museum, Amsterdam. Conservators, scientists, and scholars presented new research on topics such as technical imaging; non-destructive analytical techniques; provenance and collecting; treatment histories; connoisseurship and forgeries; comparisons of works across institutions; and scientific studies of woods, pigments, coatings, and binders. With the most up-to-date information available about the production, materiality, function, and history of these painted funerary artifacts, this volume will be a valuable resource to all who research ancient art. 

## Using this Repository

This is one in series of multiformat publications using [Quire](http://quire.getty.edu)™, Getty’s multiformat publishing tool. 

We are dedicated to maintaining this publication for years to come at the permanent URL, https://www.getty.edu/publications/mummy-portraits-2/, and in its various formats and incarnations. For any updates to the book, we will be following something between an app and traditional book publication model. Updates will only be made in regulated chunks as formal revisions and new editions and will always be thoroughly documented here in the repository, as well as in the revision history included with each of the book’s many formats.

The primary content pieces of the book can be found in the `content` directory. The `main` branch represents the current, published edition at all times, and the `revisions` branch, when present, will show changes currently under consideration. We invite you to submit suggestions or corrections via pull request on the revisions branch, by posting an issue, or by emailing us at [pubsinfo@getty.edu](mailto:pubsinfo@getty.edu).

## Development Notes

This project was last built with the following software versions:

- Node 22.10.0
- Quire CLI 1.0.0-rc.33

### Branches

| branch | about |
| --- | --- |
| `main` | The primary branch |
| `first-pages`, `second-pages`, `final-team-pages`, `final-department-pages`, `final-pages`| Versions of the project at various staages |
| `forthcoming` | A static placeholder page that was displayed at the book’s final URL on getty.edu prior to publication |
| `revisions` | Any revisions currently under consideration but not yet published |

### Figure Images Submodule

Some of figure images for *Mummy Portraits, Volume 2* are licensed from third parties for use exclusively in this publication. As such, they are kept in a separate, private repository, https://github.com/thegetty/mummy-portraits-2-images/, which is linked to this main publication repository as a submodule in `content/_assets/images/figures/`. When cloning this repo for further development, you’ll permissions for the private repository and will need to clone recursively in order to clone both the main repo and the submodule.

```
git clone --recursive https://github.com/thegetty/mummy-portraits-2.git
```

### Previewing the Online Edition Locally

1. Install Node.js 22.10.0 and verify with with `node --version`

2. Install the Quire CLI with `npm install -g @thegetty/quire-cli@1.0.0-rc.33`

3. Clone this repository and select the appropriate branch

4. Run `npm install` to install the project dependencies (this just needs to be done once when first cloning the project, or whenever the core template/code files are updated)

5. Change the `url` in `content/_data/publication.yaml` to `http://localhost:8080/`

6. See the preview with `quire preview`

### Creating a PDF Version

1. Temporarily switch `url` in publication.yaml to `url: 'http://localhost:8080'`

2. Run `quire build`

3. If the PDF will be sent to digital printer, run the following command to ensure color profiles are correct:

    ```
    magick mogrify -profile bin/adobe-rgb-1998.icm _site/iiif/**/print-image.jpg
    ```

4. With PrinceXML 15.3 installed, run `quire pdf --lib prince`

### Creating an EPUB Version

1. Temporarily switch `url` in publication.yaml to `url: 'http://localhost:8080'`

2. Run `quire build`

3. Use a tool like the ePub Zip-Unzip script to unzip the resulting `epubjs.epub` file.

4. In the resulting `epubjs` unzipped directory, open `epubjs/ops/package.opf` add the following metadata items:

        ```
        <meta property="schema:accessibilitySummary">This publications meets baseline accessibility standards</meta>
        <meta name="schema:accessMode" content="textual" />
        <meta name="schema:accessMode" content="visual" />
        <meta name="schema:accessModeSufficient" content="textual" />
        <meta name="schema:accessModeSufficient" content="visual" />
        <meta name="schema:accessibilityFeature" content="alternativeText" />
        <meta name="schema:accessibilityFeature" content="structuralNavigation" />
        <meta name="schema:accessibilityFeature" content="tableOfContents" />
        <meta name="schema:accessibilityHazard" content="noFlashingHazard" />
        <meta name="schema:accessibilityHazard" content="noMotionSimulationHazard" />
        <meta name="schema:accessibilityHazard" content="noSoundHazard" />
        ```

5. Delete the original EPUB file and use the same tool to repackage the raw files into a new EPUB

6. Run the resulting file through epubcheck-5.0.0 and Ace by DAISY accessibility checker to ensure there aren't any validation or accessibility errors or warnings.

### Customizations

**_includes/components/page-header.js**
**_layouts/essay.liquid**
**_layouts/page.liquid**
**_plugins/filters/index.js**
**_plugins/filters/lastName.js**
**_plugins/shortcodes/contributors.js**
**content/_assets/styles/print.scss**
**content/_data/config.yaml**
Added support for better PDF running heads

**_includes/components/analytics.js**
**_layouts/base.11ty.js**
Add support for google analytics 4

**_includes/components/copyright/licensing.js** 
Updated licensing language

**_includes/components/figure/image/print.js**
**_plugins/figures/annotation/index.js**
Add all annotation image layers to PDF output; and ensure each layer has alt text

**_includes/components/figure/image/print.js**
**_includes/components/figure/image/image-tag.js**
Add aria-describedby support to image tags

**_includes/components/icons-cc/index.js**
Add cc icons to PDF output

**_includes/components/license-icons.js**
Remove icons from EPUB output to avoid validation issues with SVGs

**_layouts/cover.liquid**
Display multilayered cover image in animated quadrants

**_layouts/pdf-cover-page.liquid**
Handle cover page title same as other elements, remove MLA citation

**_plugins/filters/getContributor.js**
Use local contributor sort_as value if given

**_plugins/markdown/index.js**
Add plugins for subscript and superscript

**_plugins/shortcodes/contributors.js**
Fix contributor list oxford commas issue

**_includes/components/navigation.js** 
Change truncation from 34 characters to 40

## License

© 2026 J. Paul Getty Trust

The text of this work is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="license">Creative Commons Attribution-NonCommercial 4.0 International License</a>. All images are reproduced with the permission of the rights holders acknowledged in the captions and are expressly excluded from the CC BY-NC license covering the rest of this publication. These images may not be reproduced, copied, transmitted, or manipulated without consent from the owners, who reserve all rights.