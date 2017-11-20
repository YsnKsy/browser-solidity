var yo = require('yo-yo')
// -------------- copyToClipboard ----------------------
const copy = require('clipboard-copy')
var addTooltip = require('./tooltip')
// -------------- styling ----------------------
var csjs = require('csjs-inject')
var remix = require('ethereum-remix')
var styleGuide = remix.ui.styleGuide
var styles = styleGuide()

var css = csjs`
  .copyIcon {
    margin-left: 5px;
    cursor: pointer;
  }
`

module.exports = function copyToClipboard (getContent) {
  var copyIcon = yo`<i title="Copy value to clipboard" class="${css.copyIcon} fa fa-clipboard" aria-hidden="true"></i>`
  copyIcon.style.color = styles.remix.icon_Color_CopyToClipboard
  copyIcon.onmouseenter = function (event) { copyIcon.style.color = styles.remix.icon_HoverColor_CopyToClipboard }
  copyIcon.onmouseleave = function (event) { copyIcon.style.color = styles.remix.icon_Color_CopyToClipboard }
  copyIcon.onclick = (event) => {
    event.stopPropagation()
    var copiableContent = getContent()
    if (copiableContent) {   // module `copy` keeps last copied thing in the memory, so don't show tooltip if nothing is copied, because nothing was added to memory
      copy(copiableContent)
      addTooltip(event)
    }
  }
  return copyIcon
}
