# code-snippets
*Various small snippets of code and useful hacks*

**This document is written in [github flavored markdown](https://help.github.com/articles/github-flavored-markdown/). On github.com, you see the markdown converted to various tags (lists, bold/italic, headers, links, etc.) Open the file in a text editor to see examples of markdown, and follow the structure of the examples when creating new entries.**

##urban-website
- [templates/large-iframe.html](templates/large-iframe.html): Code example for iframe that allows us to embed iframes into our site at a width greater than the width of the content well. it also makes the iframe react responsively and break consistently along our site's break-points.

- [templates/buttons.html](templates/buttons.html): Code example for various types of buttons for off-site features that mimic on-site styles.

- [templates/header.html](templates/header.html): Code example of persistent feature template header for off-site features that mimics on-site behavior.

- [templates/logos.html](templates/logos.html): pre-coded svg versions of Urban's logo for use in various applications. All logos link back to urban.org

- [templates/text.html](templates/text.html): CSS-ified version of Urban's site-wide text styles for use in off-site features and interactives

- [templates/urban-selects.html](templates/urban-selects.html): Code version of Urban dropdown menus.

- [templates/urban-scrubber.html](templates/urban-scrubber.html): Code version of Urban scrubbable selector.

- [templates/switch.html](templates/switch.html): Code version of Urban on/off toggle switch.

- [templates/metadata.html](templates/metadata.html): Easy metadata maker for Urban projects

##urban charts
- [css/charts.css](css/charts.css): Styles for Urban charts

###chart types
- [templates/tilegrid-map](templates/tilegrid-map.html): State tile grid map - SVG, colored using d3

- [js/linechart-longdata.js](js/linechart-longdata.js): Line chart using long data (i.e. data columns = group, year, value)

- [js/linechart-widedata.js](js/linechart-widedata.js): Line chart with a legend using wide data (i.e. data columns = year, valuegroup1, valuegroup2) - shows how to call multiple graphs to their own divs on the same page
