!function(){"use strict";var t=document.querySelector(".navigation-container"),e=document.querySelector(".navigation-toggle");e.addEventListener("click",function(n){if(e.classList.contains("is-active"))return r(n);document.documentElement.classList.add("is-clipped--nav"),e.classList.add("is-active"),t.classList.add("is-active"),window.addEventListener("click",r),l(n)}),t.addEventListener("click",l);var n=t.querySelector("[data-panel=menu]");if(n){var a,i=(a=window.sessionStorage.getItem("nav-state"))&&"1"===(a=JSON.parse(a)).__version__?a:{__version__:"1"},s=function(t,e,n){var a=n+"@"+e;return t[a]||(t[a]={})}(i,t.dataset.component,t.dataset.version);t.querySelector(".context").addEventListener("click",function(){var e=t.querySelector(".is-active[data-panel]"),n="menu"===e.dataset.panel?"explore":"menu";e.classList.toggle("is-active"),t.querySelector("[data-panel="+n+"]").classList.toggle("is-active")}),v(".nav-toggle",n).forEach(function(t){var e=t.parentElement.parentElement.parentElement;t.addEventListener("click",function(){t.classList.toggle("nav-toggle-rotate"),e.classList.toggle("is-active"),s.expandedItems=d(),u()});var n=function(t,e){var n;if("nextElementSibling"in t)n=t.nextElementSibling;else for(n=t;(n=n.nextSibling)&&1!==n.nodeType;);return n&&e?n[n.matches?"matches":"msMatchesSelector"](e)&&n:n}(t,".nav-text");n&&(n.style.cursor="pointer",n.addEventListener("click",function(){e.classList.toggle("is-active"),s.expandedItems=d(),u()}))}),v(".nav-item",n).forEach(function(t,e){t.setAttribute("data-id","menu-"+t.dataset.depth+"-"+e)});var c=s.expandedItems||(s.expandedItems=[]);c.length&&v(c.map(function(t){return'.nav-item[data-id="'+t+'"]'}).join(","),n).forEach(function(t){t.classList.add("is-active")});var o=n.querySelector(".is-current-page");if(o){const t=o.firstElementChild;if(t){const e=t.getElementsByClassName("nav-link")||t.getElementsByClassName("nav-text");e&&e[0].classList.add("nav-bold")}(function(t){var e,n=[t.dataset.id],a=t.parentNode;for(;!(e=a.classList).contains("nav-menu");)"LI"===a.tagName&&e.contains("nav-item")&&(e.add("is-active","is-current-path"),n.push(a.dataset.id)),a=a.parentNode;return t.classList.add("is-active"),n})(o).forEach(function(t){c.indexOf(t)<0&&c.push(t)})}u(),function(t,e,n){if(!n)return e.scrollTop=t;var a=n.offsetTop;a<t?e.scrollTop=a-10:a-e.offsetHeight+n.offsetHeight>t?e.scrollTop=a-e.offsetHeight+n.offsetHeight+10:e.scrollTop=t}(s.scroll||0,n,o&&o.querySelector(".nav-link")),n.addEventListener("scroll",function(){s.scroll=Math.round(n.scrollTop),u()}),Array.prototype.slice.call(document.querySelectorAll("a.nav-link")).forEach(t=>{t.addEventListener("click",n=>{if(n.stopPropagation(),window.matchMedia("(max-width: 768px)").matches&&e.classList.contains("is-active")&&t.pathname===window.location.pathname)return r(n)})}),Array.prototype.slice.call(document.querySelectorAll(".nav-item.is-active")).forEach(function(t){0!==parseInt(t.getAttribute("data-depth"))&&function(t){const e=t.firstElementChild;if(e&&e.classList.contains("nav-flex-container")){const t=e.getElementsByTagName("button");t&&t.length>0&&(t[0].classList.contains("nav-toggle-rotate")||t[0].classList.add("nav-toggle-rotate"))}}(t)})}function r(n){3!==n.which&&2!==n.button&&(document.documentElement.classList.remove("is-clipped--nav"),e.classList.remove("is-active"),t.classList.remove("is-active"),window.removeEventListener("click",r),l(n))}function l(t){t.stopPropagation()}function d(){return v(".is-active",n).map(function(t){return t.dataset.id})}function u(){window.sessionStorage.setItem("nav-state",JSON.stringify(i))}function v(t,e){return[].slice.call((e||document).querySelectorAll(t))}}();
!function(){"use strict";var e=document.querySelector("article.doc"),t=document.querySelector(".toolbar");function n(n){n&&(window.location.hash="#"+this.id,n.preventDefault()),window.scrollTo(0,function t(n,o){return e.contains(n)?t(n.offsetParent,n.offsetTop+o):o}(this,0)-t.getBoundingClientRect().bottom)}window.addEventListener("load",function e(t){var o,i;(o=window.location.hash)&&(i=document.getElementById(o.slice(1)))&&(n.bind(i)(),setTimeout(n.bind(i),0)),window.removeEventListener("load",e)}),Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function(e){var t,o;(t=e.hash.slice(1))&&(o=document.getElementById(t))&&e.addEventListener("click",n.bind(o))})}();
!function(){"use strict";var e=document.querySelector(".page-versions .versions-menu-toggle");if(e){var t=document.querySelector(".page-versions");e.addEventListener("click",function(e){t.classList.toggle("is-active"),e.stopPropagation()}),window.addEventListener("click",function(){t.classList.remove("is-active")})}}();
document.addEventListener("DOMContentLoaded",function(){});
function handleWhitelabeling(){const e=document.getElementsByTagName("html")[0].classList.contains("enterprise-persona"),t=new URLSearchParams(window.location.search);t.has("wl-domain")&&(t.get("wl-domain").match(/^[\w-]+\.restcomm\.com$/)||t.get("wl-domain").match(/^localhost(:[0-9]*)*$/))&&window.sessionStorage.setItem("wl-domain",t.get("wl-domain")),e&&doWlLocalParameterseplacements();if((["restcomm.com","www.restcomm.com","staging-cpaas-enablement-docs.restcomm.com","eu.restcomm.com","jp.restcomm.com","cloud.restcomm.com","cpaas-enablement-docs.restcomm.com","localhost","my.restcomm.com","staging-restcomm.com","dev.staging-restcomm.com"].every(e=>window.location.hostname!==e)||window.sessionStorage.getItem("wl-domain"))&&e){const e="wl-settings";let t,o=!1;(t=window.sessionStorage.getItem(e))&&(applyWhitelabeling(JSON.parse(t)),o=!0);let n=window.location.hostname,a=window.location.protocol;window.sessionStorage.getItem("wl-domain")&&(n=window.sessionStorage.getItem("wl-domain"),a="https:"),fetch(a+"//"+n+"/sps/public").then(e=>e.json()).then(t=>{window.sessionStorage.setItem(e,JSON.stringify(t)),o||applyWhitelabeling(t)}).catch(e=>{console.error("Fetching of whitelabeling settings failed; falling back to default styles. Reason: "+e),applyWhitelabeling(null)})}else e&&doWlParameterSEOReplacements(null)}function applyWhitelabeling(e){if(e){const t=e.data.whitelabeling.general,o={"--rc-logo-img":"logo"};if(t.documentation_link&&t.documentation_link.length>0&&t.documentation_link.match(/^http(s)?:\/\/.*$/)&&window.location.replace(t.documentation_link),t.documentation_link&&0!==t.documentation_link.length||window.location.replace(window.location.origin),Object.entries(o).forEach(([e,o])=>{o in t?document.documentElement.style.setProperty(e,t[o]):console.error("Key: "+o+" doesn't exist in general json")}),"logo"in t||document.documentElement.style.setProperty("--rc-logo-img","url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)"),t.favicon){let e=Array.prototype.slice.call(document.getElementsByTagName("link")).find(e=>"icon"===e.getAttribute("rel"));e&&(e.href=t.favicon)}const n=e.data.whitelabeling.styling,a={"--rc-primary-nav-bg-color":"main_bg_color","--rc-primary-nav-text-color":"primary_color","--rc-secondary-nav-bg-color":"contrast_color","--rc-secondary-nav-text-color":"primary_tabs_text_color","--rc-footer-bg-color":"contrast_color","--rc-footer-text-color":"primary_tabs_text_color","--rc-button-bg-color":"primary_color","--rc-button-text-color":"button_primary_text_color","--rc-text-color":"main_text_color","--rc-table-border-color":"muted_text_color","--rc-link-color":"link_text_color","--rc-secondary-nav-link-color":"link_text_color","--rc-heading-color":"contrast_color","--rc-border-radius":"input_border_radius"};if(Object.entries(a).forEach(([e,t])=>{t in n?document.documentElement.style.setProperty(e,n[t]):console.error("Key: "+t+" doesn't exist in styling json")}),t.application_name&&t.application_name.length>0){let e=document.getElementsByTagName("title")[0].textContent;e.match(/^Restcomm Enterprise Documentation/)&&(e=e.replace(/^Restcomm/,t.application_name)),document.getElementsByTagName("title")[0].textContent=e.replace(/- .*$/,"- "+t.application_name+" docs")}}else document.documentElement.style.setProperty("--rc-logo-img","url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)");doWlParameterTextReplacements(e),doWlParameterSEOReplacements(e),document.getElementsByTagName("body")[0].style.display="block"}function normalizeDefaultText(e){let t=e;return"$INFER_FROM_DOMAIN"===e?t=window.location.hostname.match(/\.restcomm.com$/)?window.location.hostname.replace(".restcomm.com",""):window.location.hostname.match(/^localhost$/)?window.location.hostname:window.location.hostname.substr(0,window.location.hostname.lastIndexOf(".")):"$DOMAIN"===e&&(t=window.location.hostname),t}function doWlParameterTextReplacements(e){const t=e?e.data.whitelabeling.general:null;Array.prototype.slice.call(document.getElementsByClassName("replacement-parm")).forEach(o=>{const n=o.getAttribute("data-parm-key");if(e&&n in t)console.debug("Found key: "+n+", replacing with: "+t[n]),o.textContent=t[n],"A"===o.tagName&&o.setAttribute("href",t[n]);else{if(console.error("Key: "+n+" doesn't exist in replacement string json; falling back to defaults"),o.hasAttribute("data-default-text")){let e=o.getAttribute("data-default-text");o.textContent=normalizeDefaultText(e)}o.hasAttribute("data-default-link")&&"A"===o.tagName&&o.setAttribute("href",o.getAttribute("data-default-link"))}})}function doWlParameterSEOReplacements(e){let t=document.getElementsByTagName("meta")&&document.getElementsByTagName("meta").description,o=document.getElementsByTagName("meta")&&document.getElementsByTagName("meta").keywords;const n=e?e.data.whitelabeling.general:null;[t,o].forEach(t=>{if(t&&t.content){let o=t.content;if(o){console.log("Meta tag before: "+o);const a=o.match(/#\{.+?\}/g);a&&a.forEach(t=>{const a=t.match(/^#(.+?)$/)[1],s=JSON.parse(a);console.log("Meta match: "+s.spsParm),e&&s.spsParm in n?(console.debug("Found key: "+s.spsParm+", replacing with: "+n[s.spsParm]),o=o.replace(new RegExp('#{.*?"'+s.spsParm+'".*?}',"g"),n[s.spsParm])):(n?console.error("SEO key: "+s.spsParm+" doesn't exist in SPS response; falling back to default"):console.error("No SPS response available; falling back to defaults for key: "+s.spsParm),o=o.replace(new RegExp('#{.*?"'+s.spsParm+'".*?}',"g"),s.defaultText?normalizeDefaultText(s.defaultText):""))}),console.log("Meta tag after: "+t),t.content=o}}})}function doWlLocalParameterseplacements(){Array.prototype.slice.call(document.getElementsByClassName("local-link")).forEach(e=>{e.textContent=e.textContent.replace("$DOMAIN",window.location.hostname),"A"===e.tagName&&e.setAttribute("href",e.getAttribute("href").replace("$DOMAIN",window.location.hostname))})}document.addEventListener("DOMContentLoaded",function(){let e=Array.prototype.slice.call(document.querySelectorAll(".navbar-enterprise-item"),0);if(0!==e.length){const t=window.sessionStorage.getItem("active-enterprise-tab");e.forEach(function(e){t&&e.textContent===t&&e.classList.toggle("active-tab"),e.addEventListener("click",function(e){e.stopPropagation(),window.sessionStorage.setItem("active-enterprise-tab",e.target.textContent)})})}const t=document.getElementsByTagName("html")[0].classList.contains("enterprise-persona");if(t){let e=Array.prototype.slice.call(document.getElementsByClassName("footer-usecase-item"),0);0!==e.length&&e.forEach(function(e){e.addEventListener("click",function(e){e.stopPropagation(),window.sessionStorage.setItem("active-enterprise-tab","Tutorials")})});let t=Array.prototype.slice.call(document.getElementsByClassName("footer-products-item"),0);0!==t.length&&t.forEach(function(e){e.addEventListener("click",function(e){e.stopPropagation(),window.sessionStorage.setItem("active-enterprise-tab","Reference")})})}const o=document.querySelector(".navigation-menu");o&&o.addEventListener("mouseenter",function(e){e.target.classList.contains("is-active")&&e.target.focus()});const n=document.getElementsByClassName("header-logo-link")[0];if(!t||"restcomm.com"!==window.location.hostname&&"www.restcomm.com"!==window.location.hostname||(n.href="/docs/1.0/enterprise/"),document.getElementsByTagName("body")[0].classList.contains("status-404")){const e=document.getElementsByClassName("header-logo-link")[0];window.location.pathname.includes("/enterprise/")?(document.getElementsByTagName("html")[0].classList.add("enterprise-persona"),e.href=window.location.protocol+"//"+window.location.host+"/docs/1.0/enterprise",document.getElementById("footer-voice-link").href="/docs/1.0/enterprise/api/voice-category.html",document.getElementById("footer-sms-link").href="/docs/1.0/enterprise/api/sms-category.html",document.getElementById("terms-link").href="/docs/1.0/enterprise/terms.html"):(document.getElementsByTagName("html")[0].classList.add("csp-persona"),e.href=window.location.protocol+"//"+window.location.host+"/docs/1.0",document.getElementById("footer-voice-link").href="/docs/1.0/programmable.html",document.getElementById("footer-sms-link").href="/docs/1.0/programmable.html",document.getElementById("terms-link").href="/docs/1.0/support.html")}let a=0;Array.prototype.slice.call(document.getElementsByClassName("nav-icon-sms")).forEach(e=>{a++>0&&e.classList.remove("nav-icon-sms")}),Array.prototype.slice.call(document.getElementsByClassName("samplecode-container")).forEach(e=>{e.textContent=e.textContent.replace("mycompany.restcomm.com",window.location.hostname)}),window.hljs.initHighlighting(),handleWhitelabeling();const s=document.querySelector("a.header-logo-link");null!==s&&s.addEventListener("click",function(){window.sessionStorage.removeItem("active-enterprise-tab")});const l=document.querySelector("button.navbar-enterprise-burger");null!==l&&l.addEventListener("click",function(e){e.stopPropagation();const t=document.querySelector(".navbar-enterprise-container");null!==t&&(t.classList.toggle("is-active"),l.classList.toggle("is-active"))}),document.getElementsByTagName("body")[0].addEventListener("click",function(){const e=document.querySelector("button.navbar-enterprise-burger"),t=document.querySelector(".navbar-enterprise-container");t&&e&&t.classList.contains("is-active")&&e.classList.contains("is-active")&&(t.classList.toggle("is-active"),e.classList.toggle("is-active"))})});