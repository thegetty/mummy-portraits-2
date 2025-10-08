---
title: Half Title Page
layout: base.11ty.js
classes:
  - half-title-page
order: 2
outputs:
  - epub
  - pdf
toc: false
page_pdf_output: false
---

<section class="half-title">

{% if publication.short_title %}
  {{ publication.short_title | markdownify }}
{% elsif publication.title %}
  {{ publication.title | markdownify }}
{% endif %}

</section>
