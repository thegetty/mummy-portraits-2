---
title: Glossary
layout: page
classes:
  - backmatter
order: 180
---

{% for def in glossary.entries %}

**{{ def.term }}.** {{ def.definition }}

{% endfor %}