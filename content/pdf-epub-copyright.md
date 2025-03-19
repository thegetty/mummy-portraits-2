---
layout: page
order: 5
classes:
  - copyright-page
outputs:
  - epub
  - pdf
toc: false
menu: false 
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

Distributed in the United States and Canada by the University of&nbsp;Chicago&nbsp;Press

Distributed outside the United States and Canada by Yale University&nbsp;Press,&nbsp;London

</div>
<div class="cip-data no-break-container">

{{ publication.library_of_congress_cip | markdownify }}

</div>


