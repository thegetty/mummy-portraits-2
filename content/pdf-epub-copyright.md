---
title: Copyright
layout: page
order: 5
classes:
  - copyright-page
outputs:
  - epub
  - pdf
toc: false
menu: false 
page_pdf_output: false
---

{{ config.quire_credit_line }}

{{ publication.description.online_edition }}

{% copyright %}

First edition {{ publication.pub_date | date: "%Y" }}

{{ publication.revision_statement | markdownify }}

<div class="publisher no-break-container">

{% for press in publication.publisher %}
**Published by the {{ press.name }}, {{ press.location }}**
{{ press.address | markdownify }}
{% endfor %}

</div>
<div class="project-team no-break-container">

{% for person in publication.project_team %}
- {{ person | markdownify }}
{% endfor %}

</div>
<div class="distribution no-break-container">

Distributed in the United States and Canada by <br />the University of&nbsp;Chicago&nbsp;Press

Distributed outside the United States and Canada by Yale&nbsp;University&nbsp;Press,&nbsp;London

</div>
<div class="cip-data no-break-container">

{{ publication.library_of_congress_cip | markdownify }}

</div>
<div class="cover-image-credits pdf-column-break-before">

Front cover: Mummy portrait of a man, Greek/Roman/Egyptian, second century CE (detail, fig. 13.6)

Illustration Credits {.illustration-credits-heading}

Every effort has been made to contact the owners and photographers of illustrations reproduced here whose names do not appear in the captions. Anyone having further information concerning copyright holders is asked to contact Getty Publications so this information can be included in future printings.

All papers collected in this work were peer reviewed through a single-masked process in which the reviewers remained anonymous. 

Authorized Product Safety Representative in the European Union: Easy Access System Europe, Mustamäe tee 50, 10621 Tallinn, Estonia, [gpsr.requests@easproject.com](mailto:gpsr.requests@easproject.com)

</div>



