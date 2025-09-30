This is the repository for *Mummy Portraits of Roman Egypt, Volume 2: Emerging Research from the APPEAR Project*, edited by Marie Svoboda and Caroline R. Cartwright. This digital book was first published Month, DD, YYYY, by the J. Paul Getty Museum. It is available online at https://www.getty.edu/publications/mummy-portraits-2/ and may be downloaded there free of charge in multiple formats.

## About the Book

TK

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
| `first-pages`, `second-pages`, `final-pages`| Versions of the project at various staages |
| `forthcoming` | A static placeholder page that was displayed at the book’s final URL on getty.edu prior to publication |
| `revisions` | Any revisions currently under consideration but not yet published |
| `prototype` | An early prototype of the project built to verify final manuscript prep |

### Figure Images Submodule

Some of figure images for *Mummy Portraits, Volume 2* are licensed from third parties for use exclusively in this publication. As such, they are kept in a separate, private repository, https://github.com/thegetty/mummy-portraits-2-images/, which is linked to this main publication repository as a submodule in `content/_assets/images/figures/`. When cloning this repo for further development, you’ll permissions for the private repository and will need to clone recursively in order to clone both the main repo and the submodule.

```
git clone --recursive https://github.com/thegetty/mummy-portraits-2.git
```

### Previewing the Online Edition Locally

1. Install Node.js 20.18.1 and verify with with `node --version`

2. Install the Quire CLI with `npm install -g @thegetty/quire-cli@1.0.0-rc.25`

3. Clone this repository and select the appropriate branch

4. Run `npm install` to install the project dependencies (this just needs to be done once when first cloning the project, or whenever the core template/code files are updated)

5. Change the `url` in `content/_data/publication.yaml` to `http://localhost:8080/`

6. See the preview with `quire preview`

### Creating a PDF Version

1. Run `quire build`

2. If the PDF will be sent to digital printer, run the following command to ensure color profiles are correct:

    ```
    magick mogrify -profile bin/adobe-rgb-1998.icm _site/iiif/**/print-image.jpg
    ```

3. With PrinceXML 15.3 installed, run `quire pdf --lib prince`

### Creating an EPUB Version

TK

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

**_includes/components/copyright/licensing.js** 
Updated licensing language

**_includes/components/figure/image/print.js**
Add all annotation image layers to PDF output

**_includes/components/icons-cc/index.js**
Add cc icons to PDF output

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
