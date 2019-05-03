;(function () {
  'use strict'

  var navContainer = document.querySelector('.navigation-container')
  var navToggle = document.querySelector('.navigation-toggle')

  navToggle.addEventListener('click', toggleNavigation)
  // don't let click events propagate outside of navigation container
  navContainer.addEventListener('click', concealEvent)

  var menuPanel = navContainer.querySelector('[data-panel=menu]')
  if (!menuPanel) return

  var navState = getNavState()
  var menuState = getMenuState(navState, navContainer.dataset.component, navContainer.dataset.version)

  navContainer.querySelector('.context').addEventListener('click', function () {
    var currentPanel = navContainer.querySelector('.is-active[data-panel]')
    var activatePanel = currentPanel.dataset.panel === 'menu' ? 'explore' : 'menu'
    currentPanel.classList.toggle('is-active')
    navContainer.querySelector('[data-panel=' + activatePanel + ']').classList.toggle('is-active')
  })

  find('.nav-toggle', menuPanel).forEach(function (btn) {
    var li = btn.parentElement.parentElement.parentElement
    btn.addEventListener('click', function () {
      btn.classList.toggle('nav-toggle-rotate')
      li.classList.toggle('is-active')
      menuState.expandedItems = getExpandedItems()
      saveNavState()
    })
    var navItemSpan = findNextElement(btn, '.nav-text')
    if (navItemSpan) {
      navItemSpan.style.cursor = 'pointer'
      navItemSpan.addEventListener('click', function () {
        li.classList.toggle('is-active')
        menuState.expandedItems = getExpandedItems()
        saveNavState()
      })
    }
  })

  // Set ids to all nav-items to that we can refer to them when saving/restoring them
  find('.nav-item', menuPanel).forEach(function (item, idx) {
    item.setAttribute('data-id', 'menu-' + item.dataset.depth + '-' + idx)
  })

  var expandedItems = menuState.expandedItems || (menuState.expandedItems = [])

  if (expandedItems.length) {
    find(
      expandedItems
        .map(function (itemId) {
          return '.nav-item[data-id="' + itemId + '"]'
        })
        .join(','),
      menuPanel
    ).forEach(function (item) {
      item.classList.add('is-active')
    })
  }

  var currentPageItem = menuPanel.querySelector('.is-current-page')
  if (currentPageItem) {
    // Make the current element bold (notice that since we changed the structure of the nav
    // to introduce a flexbox the old selectors didn't work)
    const flexContainer = currentPageItem.firstElementChild
    if (flexContainer) {
      const navElement = flexContainer.getElementsByClassName('nav-link') ||
        flexContainer.getElementsByClassName('nav-text')
      if (navElement) {
        navElement[0].classList.add('nav-bold')
      }
    }
    activateCurrentPath(currentPageItem).forEach(function (itemId) {
      if (expandedItems.indexOf(itemId) < 0) expandedItems.push(itemId)
    })
  }

  saveNavState()

  scrollItemIntoView(menuState.scroll || 0, menuPanel, currentPageItem && currentPageItem.querySelector('.nav-link'))

  menuPanel.addEventListener('scroll', function () {
    menuState.scroll = Math.round(menuPanel.scrollTop)
    saveNavState()
  })

  function rotateCaret (parent) {
    const flexContainer = parent.firstElementChild
    if (flexContainer && flexContainer.classList.contains('nav-flex-container')) {
      const buttonElements = flexContainer.getElementsByTagName('button')
      if (buttonElements && buttonElements.length > 0) {
        if (!buttonElements[0].classList.contains('nav-toggle-rotate')) {
          buttonElements[0].classList.add('nav-toggle-rotate')
        }
      }
    }
  }

  function activateCurrentPath (navItem) {
    var ids = [navItem.dataset.id]
    var ancestorClasses
    var ancestor = navItem.parentNode

    while (!(ancestorClasses = ancestor.classList).contains('nav-menu')) {
      if (ancestor.tagName === 'LI' && ancestorClasses.contains('nav-item')) {
        ancestorClasses.add('is-active', 'is-current-path')
        ids.push(ancestor.dataset.id)
      }
      ancestor = ancestor.parentNode
    }
    navItem.classList.add('is-active')
    return ids
  }

  function toggleNavigation (e) {
    if (navToggle.classList.contains('is-active')) return closeNavigation(e)
    document.documentElement.classList.add('is-clipped--nav')
    navToggle.classList.add('is-active')
    navContainer.classList.add('is-active')
    window.addEventListener('click', closeNavigation)
    // don't let this event get picked up by window click listener
    concealEvent(e)
  }

  /**
   * If user clicks on a left nav pane link that is pointing to a fragment in the current page
   * and we are in small screens where the pane takes up the whole screen we want the left pane
   * to be collapsed
   */
  Array.prototype.slice.call(document.querySelectorAll('a.nav-link')).forEach((element) => {
    element.addEventListener('click', (event) => {
      event.stopPropagation()
      if (window.matchMedia('(max-width: 768px)').matches &&
          (navToggle.classList.contains('is-active')) &&
          element.pathname === window.location.pathname) {
        return closeNavigation(event)
      }
    })
  })

  function closeNavigation (e) {
    if (e.which === 3 || e.button === 2) return
    document.documentElement.classList.remove('is-clipped--nav')
    navToggle.classList.remove('is-active')
    navContainer.classList.remove('is-active')
    window.removeEventListener('click', closeNavigation)
    // don't let this event get picked up by window click listener
    concealEvent(e)
  }

  function concealEvent (e) {
    e.stopPropagation()
  }

  function getExpandedItems () {
    return find('.is-active', menuPanel).map(function (item) {
      return item.dataset.id
    })
  }

  function getNavState () {
    var data = window.sessionStorage.getItem('nav-state')
    return data && (data = JSON.parse(data)).__version__ === '1' ? data : { __version__: '1' }
  }

  function getMenuState (navState, component, version) {
    var key = version + '@' + component
    return navState[key] || (navState[key] = {})
  }

  function saveNavState () {
    window.sessionStorage.setItem('nav-state', JSON.stringify(navState))
  }

  function scrollItemIntoView (scrollPosition, parent, el) {
    if (!el) return (parent.scrollTop = scrollPosition)

    var margin = 10
    //var y = el.getBoundingClientRect().top - parent.getBoundingClientRect().top
    var y = el.offsetTop

    if (y < scrollPosition) {
      parent.scrollTop = y - margin
    } else if (y - parent.offsetHeight + el.offsetHeight > scrollPosition) {
      parent.scrollTop = y - parent.offsetHeight + el.offsetHeight + margin
    } else {
      parent.scrollTop = scrollPosition
    }
  }

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }

  function findNextElement (from, selector) {
    var el
    if ('nextElementSibling' in from) {
      el = from.nextElementSibling
    } else {
      el = from
      while ((el = el.nextSibling) && el.nodeType !== 1);
    }
    return el && selector ? el[el.matches ? 'matches' : 'msMatchesSelector'](selector) && el : el
  }

  /**
   * Rotate carets for active items with greater depth than zero
   */
  Array.prototype.slice.call(document.querySelectorAll('.nav-item.is-active'))
    .forEach(function (activeElement) {
      // level 0 aren't really candidates
      if (parseInt(activeElement.getAttribute('data-depth')) === 0) {
        return
      }

      rotateCaret(activeElement)
    })
})()

;(function () {
  'use strict'

  var article = document.querySelector('article.doc')
  var toolbar = document.querySelector('.toolbar')

  function computePosition (el, sum) {
    if (article.contains(el)) {
      return computePosition(el.offsetParent, el.offsetTop + sum)
    } else {
      return sum
    }
  }

  function jumpToAnchor (e) {
    if (e) {
      window.location.hash = '#' + this.id
      e.preventDefault()
    }
    window.scrollTo(0, computePosition(this, 0) - toolbar.getBoundingClientRect().bottom)
  }

  window.addEventListener('load', function jumpOnLoad (e) {
    var hash, target
    if ((hash = window.location.hash) && (target = document.getElementById(hash.slice(1)))) {
      jumpToAnchor.bind(target)()
      setTimeout(jumpToAnchor.bind(target), 0)
    }
    window.removeEventListener('load', jumpOnLoad)
  })

  Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (el) {
    var hash, target
    if ((hash = el.hash.slice(1)) && (target = document.getElementById(hash))) {
      el.addEventListener('click', jumpToAnchor.bind(target))
    }
  })
})()

;(function () {
  'use strict'

  var toggle = document.querySelector('.page-versions .versions-menu-toggle')
  if (!toggle) return

  var selector = document.querySelector('.page-versions')

  toggle.addEventListener('click', function (e) {
    selector.classList.toggle('is-active')
    // don't let this event get smothered
    e.stopPropagation()
  })

  window.addEventListener('click', function () {
    selector.classList.remove('is-active')
  })
})()

document.addEventListener('DOMContentLoaded', function () {
  /*
  var navbarToggles = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if (navbarToggles.length === 0) return
  navbarToggles.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation()
      el.classList.toggle('is-active')
      document.getElementById(el.dataset.target).classList.toggle('is-active')
      document.documentElement.classList.toggle('is-clipped--navbar')
    })
  })
  */

})

document.addEventListener('DOMContentLoaded', function () {
  let navbarEnterpriseItems = Array.prototype.slice.call(document.querySelectorAll('.navbar-enterprise-item'), 0)
  if (navbarEnterpriseItems.length === 0) return

  const activeEnterpriseTab = window.sessionStorage.getItem('active-enterprise-tab')

  navbarEnterpriseItems.forEach(function (el) {
    if (activeEnterpriseTab) {
      if (el.textContent === activeEnterpriseTab) {
        el.classList.toggle('active-tab')
      }
    }

    el.addEventListener('click', function (e) {
      e.stopPropagation()
      window.sessionStorage.setItem('active-enterprise-tab', e.target.textContent)
    })
  })

  const is404 = document.getElementsByTagName('body')[0].classList.contains('status-404')
  if (is404) {
    // TODO: Add handling for WL once the organization is clear
    const logoLink = document.getElementsByClassName('header-logo-link')[0]
    // Check if location belongs to CSP or Enterprise doc and set class so that it's styled accordingly
    if (window.location.pathname.includes('/api/')) {
      document.getElementsByTagName('html')[0].classList.add('enterprise-persona')
      logoLink.href = window.location.protocol + '//' + window.location.host + '/docs/1.0/api'
    } else {
      document.getElementsByTagName('html')[0].classList.add('csp-persona')
      logoLink.href = window.location.protocol + '//' + window.location.host + '/docs/1.0'
    }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const WL_DOMAIN = 'wl-domain'
  // if WL_DOMAIN is passed in the URL as search param, we need to use it after validating it
  if (urlParams.has(WL_DOMAIN) && (urlParams.get(WL_DOMAIN).match(/^[\w-]+\.restcomm\.com$/))) {
    // saving it to sessionStorage so that it saved only for the current session
    window.sessionStorage.setItem(WL_DOMAIN, urlParams.get(WL_DOMAIN))
  }

  // For restcomm.com, staging, cpaas (reverse proxied by restcomm.com) and localhost do not apply whitelabeling,
  // unless user specifically requests to do that with 'wl-domain' search param (for demonstration purposes).
  // Also, only apply WL settings for enterprise persona.
  if (((window.location.hostname !== 'restcomm.com' &&
    window.location.hostname !== 'www.restcomm.com' &&
    window.location.hostname !== 'staging-cpaas-enablement-docs.restcomm.com' &&
    window.location.hostname !== 'cpaas-enablement-docs.restcomm.com' &&
    window.location.hostname !== 'localhost') || window.sessionStorage.getItem(WL_DOMAIN)) &&
    document.getElementsByTagName('html')[0].classList.contains('enterprise-persona')) {
    // TODO: Check if should perform theming based on WL settings. This depends on
    //  - If docs are visited at <org>.restcomm.com, in which case we should do the theming
    //  - If we are at restcomm.com/docs we shouldn't
    // Hide all content until whitelabeling styles are properly applied asynchronously to avoid flickering
    //document.getElementsByTagName('body')[0].style.display = 'none'

    // Set favicon to empty, so that in case it's not returned by SPS or SPS is down we avoid the flickering effect
    let faviconElement = Array.prototype.slice.call(document.getElementsByTagName('link'))
      .find((item) => item.getAttribute('rel') === 'icon')
    if (faviconElement) {
      // empty gif
      faviconElement.href = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    }

    /* eslint-disable */
    // If WL is enabled either use same domain to request WL data, or domain specified in wl-domain
    let domain = window.location.hostname
    let protocol = window.location.protocol
    if (window.sessionStorage.getItem(WL_DOMAIN)) {
      domain = window.sessionStorage.getItem(WL_DOMAIN)
      protocol = 'https:'
    }
    fetch(protocol + '//' + domain + '/sps/public')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        handleWhitelabeling(json)
      })
      .catch((reason) => {
        // Fetching of whitelabeling settings failed
        console.error('Fetching of whitelabeling settings failed; falling back to default styles. Reason: ' + reason)
        handleWhitelabeling(null)
      })
    /* eslint-enable */
  }
  if (document.getElementsByTagName('html')[0].classList.contains('csp-persona')) {
    document.getElementsByTagName('body')[0].style.display = 'block'
  }

  const enterpriseLogoLink = document.querySelector('a.header-logo-link')
  if (enterpriseLogoLink !== null) {
    enterpriseLogoLink.addEventListener('click', function () {
      window.sessionStorage.removeItem('active-enterprise-tab')
    })
  }

  const enterpriseBurger = document.querySelector('button.navbar-enterprise-burger')
  if (enterpriseBurger !== null) {
    enterpriseBurger.addEventListener('click', function (event) {
      event.stopPropagation()
      const enterpriseContainer = document.querySelector('.navbar-enterprise-container')
      if (enterpriseContainer === null) return
      enterpriseContainer.classList.toggle('is-active')
      enterpriseBurger.classList.toggle('is-active')
    })
  }

  // close enterprise navbar hamburger if user clicks anywhere in the screen and its open
  document.getElementsByTagName('body')[0].addEventListener('click', function () {
    const enterpriseBurgerButton = document.querySelector('button.navbar-enterprise-burger')
    const enterpriseContainer = document.querySelector('.navbar-enterprise-container')
    if (enterpriseContainer.classList.contains('is-active') && enterpriseBurgerButton.classList.contains('is-active')) {
      enterpriseContainer.classList.toggle('is-active')
      enterpriseBurgerButton.classList.toggle('is-active')
    }
  })
})

function handleWhitelabeling (json) {
  if (json) {
    // Handle general whitelabeling stuff like logo and favicon
    const generalJson = json.data.whitelabeling.general
    const generalMapping = {
      '--rc-logo-img': 'logo',
    }

    Object.entries(generalMapping).forEach(([key, value]) => {
      if (value in generalJson) {
        document.documentElement.style.setProperty(key, generalJson[value])
      } else {
        console.error('Key: ' + value + ' doesn\'t exist in general json')
      }
    })

    // If for some reason the whitelabeled log is missing from the structure
    // we shouldn't default to Restcomm's, but instead put an empty logo
    if (!('logo' in generalJson)) {
      document.documentElement.style.setProperty('--rc-logo-img',
        'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)')
    }

    // Handle favicon, where we can't use css vars, but need to update the <link> element in html head
    if (generalJson.favicon) {
      // Handle favicon
      let faviconElement = Array.prototype.slice.call(document.getElementsByTagName('link'))
        .find((item) => item.getAttribute('rel') === 'icon')

      if (faviconElement) {
        faviconElement.href = generalJson.favicon
      }
    }

    // Handle styling
    const stylingJson = json.data.whitelabeling.styling
    const styleMapping = {
      '--rc-primary-nav-bg-color': 'main_bg_color',
      '--rc-primary-nav-text-color': 'contrast_color',
      '--rc-secondary-nav-bg-color': 'primary_well_bg_color',
      '--rc-secondary-nav-text-color': 'main_text_color',
      '--rc-footer-bg-color': 'main_bg_color',
      '--rc-footer-text-color': 'contrast_color',
      '--rc-button-bg-color': 'primary_color', // 'button_primary_hover_bg_color',
      '--rc-button-text-color': 'button_primary_hover_text_color',
      '--rc-text-color': 'main_text_color',
      '--rc-table-border-color': 'muted_text_color',
      '--rc-link-color': 'link_text_color',
      '--rc-secondary-nav-link-color': 'link_text_color',
      '--rc-heading-color': 'button_primary_hover_bg_color',
      '--rc-border-radius': 'input_border_radius',
    }

    Object.entries(styleMapping).forEach(([key, value]) => {
      if (value in stylingJson) {
        document.documentElement.style.setProperty(key, stylingJson[value])
      } else {
        console.error('Key: ' + value + ' doesn\'t exist in styling json')
      }
    })
  } else {
    // Fetching of whitelabeling settings failed, use fallback, which means:
    // - Default restcomm colors
    // - No restcomm logo, below I'm using a very small transparent gif image
    document.documentElement.style.setProperty('--rc-logo-img',
      'url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)')
  }

  document.getElementsByTagName('body')[0].style.display = 'block'
}
