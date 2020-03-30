!function(){"use strict";var t=document.querySelector(".navigation-container"),e=document.querySelector(".navigation-toggle");e.addEventListener("click",function(n){if(e.classList.contains("is-active"))return r(n);document.documentElement.classList.add("is-clipped--nav"),e.classList.add("is-active"),t.classList.add("is-active"),window.addEventListener("click",r),l(n)}),t.addEventListener("click",l);var n=t.querySelector("[data-panel=menu]");if(n){var a,i=(a=window.sessionStorage.getItem("nav-state"))&&"1"===(a=JSON.parse(a)).__version__?a:{__version__:"1"},s=function(t,e,n){var a=n+"@"+e;return t[a]||(t[a]={})}(i,t.dataset.component,t.dataset.version);t.querySelector(".context").addEventListener("click",function(){var e=t.querySelector(".is-active[data-panel]"),n="menu"===e.dataset.panel?"explore":"menu";e.classList.toggle("is-active"),t.querySelector("[data-panel="+n+"]").classList.toggle("is-active")}),v(".nav-toggle",n).forEach(function(t){var e=t.parentElement.parentElement.parentElement;t.addEventListener("click",function(){t.classList.toggle("nav-toggle-rotate"),e.classList.toggle("is-active"),s.expandedItems=d(),u()});var n=function(t,e){var n;if("nextElementSibling"in t)n=t.nextElementSibling;else for(n=t;(n=n.nextSibling)&&1!==n.nodeType;);return n&&e?n[n.matches?"matches":"msMatchesSelector"](e)&&n:n}(t,".nav-text");n&&(n.style.cursor="pointer",n.addEventListener("click",function(){e.classList.toggle("is-active"),s.expandedItems=d(),u()}))}),v(".nav-item",n).forEach(function(t,e){t.setAttribute("data-id","menu-"+t.dataset.depth+"-"+e)});var c=s.expandedItems||(s.expandedItems=[]);c.length&&v(c.map(function(t){return'.nav-item[data-id="'+t+'"]'}).join(","),n).forEach(function(t){t.classList.add("is-active")});var o=n.querySelector(".is-current-page");if(o){const t=o.firstElementChild;if(t){const e=t.getElementsByClassName("nav-link")||t.getElementsByClassName("nav-text");e&&e[0].classList.add("nav-bold")}(function(t){var e,n=[t.dataset.id],a=t.parentNode;for(;!(e=a.classList).contains("nav-menu");)"LI"===a.tagName&&e.contains("nav-item")&&(e.add("is-active","is-current-path"),n.push(a.dataset.id)),a=a.parentNode;return t.classList.add("is-active"),n})(o).forEach(function(t){c.indexOf(t)<0&&c.push(t)})}u(),function(t,e,n){if(!n)return e.scrollTop=t;var a=n.offsetTop;a<t?e.scrollTop=a-10:a-e.offsetHeight+n.offsetHeight>t?e.scrollTop=a-e.offsetHeight+n.offsetHeight+10:e.scrollTop=t}(s.scroll||0,n,o&&o.querySelector(".nav-link")),n.addEventListener("scroll",function(){s.scroll=Math.round(n.scrollTop),u()}),Array.prototype.slice.call(document.querySelectorAll("a.nav-link")).forEach(t=>{t.addEventListener("click",n=>{if(n.stopPropagation(),window.matchMedia("(max-width: 768px)").matches&&e.classList.contains("is-active")&&t.pathname===window.location.pathname)return r(n)})}),Array.prototype.slice.call(document.querySelectorAll(".nav-item.is-active")).forEach(function(t){0!==parseInt(t.getAttribute("data-depth"))&&function(t){const e=t.firstElementChild;if(e&&e.classList.contains("nav-flex-container")){const t=e.getElementsByTagName("button");t&&t.length>0&&(t[0].classList.contains("nav-toggle-rotate")||t[0].classList.add("nav-toggle-rotate"))}}(t)})}function r(n){3!==n.which&&2!==n.button&&(document.documentElement.classList.remove("is-clipped--nav"),e.classList.remove("is-active"),t.classList.remove("is-active"),window.removeEventListener("click",r),l(n))}function l(t){t.stopPropagation()}function d(){return v(".is-active",n).map(function(t){return t.dataset.id})}function u(){window.sessionStorage.setItem("nav-state",JSON.stringify(i))}function v(t,e){return[].slice.call((e||document).querySelectorAll(t))}}();
!function(){"use strict";var e=document.querySelector("article.doc"),t=document.querySelector(".toolbar");function n(n){n&&(window.location.hash="#"+this.id,n.preventDefault()),window.scrollTo(0,function t(n,o){return e.contains(n)?t(n.offsetParent,n.offsetTop+o):o}(this,0)-t.getBoundingClientRect().bottom)}window.addEventListener("load",function e(t){var o,i;(o=window.location.hash)&&(i=document.getElementById(o.slice(1)))&&(n.bind(i)(),setTimeout(n.bind(i),0)),window.removeEventListener("load",e)}),Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function(e){var t,o;(t=e.hash.slice(1))&&(o=document.getElementById(t))&&e.addEventListener("click",n.bind(o))})}();
!function(){"use strict";var e=document.querySelector(".page-versions .versions-menu-toggle");if(e){var t=document.querySelector(".page-versions");e.addEventListener("click",function(e){t.classList.toggle("is-active"),e.stopPropagation()}),window.addEventListener("click",function(){t.classList.remove("is-active")})}}();
document.addEventListener("DOMContentLoaded",function(){});
function handleWhitelabeling(){const e=document.getElementsByTagName("html")[0].classList.contains("enterprise-persona"),t=new URLSearchParams(window.location.search);let o=!1;t.has("preview")&&"true"===t.get("preview")&&window.sessionStorage.setItem("preview","true"),window.sessionStorage.getItem("preview")&&(window.sessionStorage.removeItem("wl-settings"),o=!0),t.has("wl-domain")&&(t.get("wl-domain").match(/^[\w-]+\.restcomm\.com$/)||t.get("wl-domain").match(/^localhost(:[0-9]*)*$/))&&window.sessionStorage.setItem("wl-domain",t.get("wl-domain")),e&&doWlLocalParameterReplacements();if((["restcomm.com","www.restcomm.com","staging-cpaas-enablement-docs.restcomm.com","eu.restcomm.com","jp.restcomm.com","cloud.restcomm.com","cpaas-enablement-docs.restcomm.com","localhost"].every(e=>window.location.hostname!==e)||window.sessionStorage.getItem("wl-domain"))&&e){let e,t,n=!1;(e=window.sessionStorage.getItem("wl-settings"))&&(applyWhitelabeling(isEmptyObject(t=JSON.parse(e))?null:t),n=!0);let a=window.location.hostname,l=window.location.protocol;window.sessionStorage.getItem("wl-domain")&&(a=window.sessionStorage.getItem("wl-domain"),l="https:"),fetch(l+"//"+a+"/sps/public").then(e=>{const t=e.headers.get("server");return null!=t&&"nginx/1.17.3"===t&&window.sessionStorage.setItem("isNewVpc",!0),e.json()}).then(e=>{window.fetchIsComplete=!0,o?e&&e.data&&e.data.whitelabeling&&e.data.whitelabeling.general&&null!=e.data.whitelabeling.general.documentation_link&&(e.data.whitelabeling.general.documentation_link="/docs"):window.sessionStorage.setItem("wl-settings",JSON.stringify(e)),n||applyWhitelabeling(isEmptyObject(e)?null:e)}).catch(e=>{console.error("Fetching of whitelabeling settings failed; falling back to default styles. Reason: "+e),applyWhitelabeling(null)}).then(()=>{if(!0===window.pendingRedirect&&(console.debug("handleWhitelabeling, pending redirect is on, doing redirect to: "+JSON.stringify(t)),t&&t.data&&t.data.whitelabeling&&t.data.whitelabeling.general&&null!==t.data.whitelabeling.general.documentation_link)){const e=t.data.whitelabeling.general.documentation_link;e.length>0?window.location.replace(e):window.location.replace(window.location.origin)}})}else if(e){let e=Array.prototype.slice.call(document.getElementsByTagName("link")).find(e=>"icon"===e.getAttribute("rel"));e&&(e.href="/_/img/favicon.png"),handleTitle("Restcomm"),doWlParameterSEOReplacements(null),document.getElementsByTagName("body")[0].style.display="block"}else handleTitle(null),document.getElementsByTagName("body")[0].style.display="block"}function applyWhitelabeling(e){window.sessionStorage.getItem("isNewVpc")&&(document.body.innerHTML=document.body.innerHTML.replace(/restcomm\/2012-04-24/g,"api/2012-04-24"));let t=window.location.hostname;if(e){if(e.id&&"sandbox-usstaging.restcomm.com"===e.id){const e=document.querySelector("a[href*='How-to-use-the-Restcomm-WebRTC-Demo.html']");null!=e&&(e.parentElement.parentElement.parentElement.style.display="none");const t=document.querySelector("a[href*='Send-an-SMS-to-a-SIP-Phone.html']");null!=t&&(t.parentElement.parentElement.parentElement.style.display="none");const o=document.querySelector("a[href*='IVR-with-Restcomm-Visual-Designer.html']");null!=o&&(o.parentElement.parentElement.parentElement.style.display="none");const n=document.querySelector("a[href*='RVD-Quick-Start-Guide.html']");null!=n&&n.replaceWith("Quick Start Guide");const a=document.querySelector("p > a[href*='call-queue-overview.html']");null!=a&&a.remove();const l=document.querySelector("a[href*='call-queue-api.html']");null!=l&&l.remove();const i=document.querySelector("a[href*='call-queue-overview.html']");null!=i&&(i.style.textDecoration="none",i.removeAttribute("href"));const c=document.querySelector("p > a[href*='auto-attendant-overview.html']");null!=c&&c.remove();const r=document.querySelector("a[href*='auto-attendant-overview.html']");null!=r&&(r.style.textDecoration="none",r.removeAttribute("href"));const s=document.querySelector("p > a[href*='Phone-number-masking.html']");null!=s&&s.remove();const m=document.querySelector("a[href*='Phone-number-masking.html']");null!=m&&(m.style.textDecoration="none",m.removeAttribute("href"))}const o=e.data.whitelabeling.general,n={"--rc-logo-img":"logo"};if(o.documentation_link&&o.documentation_link.length>0&&o.documentation_link.match(/^http(s)?:\/\/.*$/))return void(window.fetchIsComplete?(console.debug("applyWhitelabeling, fetch is complete, doing redirect"),window.location.replace(o.documentation_link)):(console.debug("applyWhitelabeling, fetch is NOT complete, setting pending flag"),window.pendingRedirect=!0));if(null!=o.documentation_link&&0===o.documentation_link.length)return void(window.fetchIsComplete?window.location.replace(window.location.origin):window.pendingRedirect=!0);if(Object.entries(n).forEach(([e,t])=>{t in o?document.documentElement.style.setProperty(e,o[t]):console.info("Key: "+t+" doesn't exist in general json")}),"logo"in o||document.documentElement.style.setProperty("--rc-logo-img","url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)"),o.favicon){let e=Array.prototype.slice.call(document.getElementsByTagName("link")).find(e=>"icon"===e.getAttribute("rel"));e&&(e.href=o.favicon)}const a=e.data.whitelabeling.styling,l={"--rc-primary-nav-bg-color":"main_bg_color","--rc-primary-nav-text-color":"primary_color","--rc-secondary-nav-bg-color":"contrast_color","--rc-secondary-nav-text-color":"primary_tabs_text_color","--rc-footer-bg-color":"contrast_color","--rc-footer-text-color":"primary_tabs_text_color","--rc-button-bg-color":"primary_color","--rc-button-text-color":"button_primary_text_color","--rc-text-color":"main_text_color","--rc-table-border-color":"muted_text_color","--rc-link-color":"link_text_color","--rc-secondary-nav-link-color":"link_text_color","--rc-heading-color":"contrast_color","--rc-border-radius":"input_border_radius","--rc-category-sms-color":"sms_color","--rc-category-voice-color":"voice_color","--rc-category-rcml-color":"rcml_color","--rc-category-management-color":"management_color","--rc-category-solutions-color":"solutions_color"};Object.entries(l).forEach(([e,t])=>{if(a&&t in a){let o=a[t];"--rc-border-radius"===e&&(o+="px"),document.documentElement.style.setProperty(e,o)}else console.warn("Key: "+t+" doesn't exist in styling json")}),o.application_name&&o.application_name.length>0&&(t=o.application_name)}else document.documentElement.style.setProperty("--rc-logo-img","url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)");handleTitle(t),doWlParameterTextReplacements(e),doWlParameterSEOReplacements(e),document.getElementsByTagName("body")[0].style.display="block"}function handleTitle(e){let t=document.getElementsByTagName("title")[0].getAttribute("data-custom-title");document.getElementsByTagName("title")[0].textContent=e?t.replace(/Restcomm/g,e):t}function normalizeDefaultText(e){let t=e;return"$INFER_FROM_DOMAIN"===e?t=window.location.hostname.match(/\.restcomm.com$/)?window.location.hostname.replace(".restcomm.com",""):window.location.hostname.match(/^localhost$/)?window.location.hostname:window.location.hostname.substr(0,window.location.hostname.lastIndexOf(".")):"$DOMAIN"===e&&(t=window.location.hostname),t}function doWlParameterTextReplacements(e){const t=e?e.data.whitelabeling.general:null;Array.prototype.slice.call(document.getElementsByClassName("sps-text")).forEach(o=>{const n=o.getAttribute("data-parm-text");if(e&&n in t)console.debug("Found key: "+n+", replacing with: "+t[n]),o.textContent=t[n];else if(console.info("Key: "+n+" doesn't exist in replacement string json; falling back to defaults"),o.hasAttribute("data-default-text")){let e=o.getAttribute("data-default-text");o.textContent=normalizeDefaultText(e)}}),Array.prototype.slice.call(document.getElementsByClassName("sps-link")).forEach(o=>{if("A"===o.tagName){const n=o.getAttribute("data-parm-link");e&&n in t?(console.debug("Found key: "+n+", replacing with: "+t[n]),o.setAttribute("href",t[n])):(console.info("Key: "+n+" doesn't exist in replacement string json; falling back to defaults"),o.setAttribute("href",o.getAttribute("data-default-link")))}})}function doWlLocalParameterReplacements(){Array.prototype.slice.call(document.getElementsByClassName("non-sps-text")).forEach(e=>{e.textContent=e.textContent.replace("$DOMAIN",window.location.hostname)}),Array.prototype.slice.call(document.getElementsByClassName("non-sps-link")).forEach(e=>{"A"===e.tagName&&e.setAttribute("href",e.getAttribute("href").replace("$DOMAIN",window.location.hostname))})}function doWlParameterSEOReplacements(e){let t=document.getElementsByTagName("meta")&&document.getElementsByTagName("meta").description,o=document.getElementsByTagName("meta")&&document.getElementsByTagName("meta").keywords;const n=e?e.data.whitelabeling.general:null;[t,o].forEach(t=>{if(t&&t.content){let o=t.content;if(o){console.log("Meta tag before: "+o);const a=o.match(/#\{.+?\}/g);a&&a.forEach(t=>{const a=t.match(/^#(.+?)$/)[1],l=JSON.parse(a);console.log("Meta match: "+l.spsParm),e&&l.spsParm in n?(console.debug("Found key: "+l.spsParm+", replacing with: "+n[l.spsParm]),o=o.replace(new RegExp('#{.*?"'+l.spsParm+'".*?}',"g"),n[l.spsParm])):(n?console.info("SEO key: "+l.spsParm+" doesn't exist in SPS response; falling back to default"):console.info("No SPS response available; falling back to defaults for key: "+l.spsParm),o=o.replace(new RegExp('#{.*?"'+l.spsParm+'".*?}',"g"),l.defaultText?normalizeDefaultText(l.defaultText):""))}),console.log("Meta tag after: "+t),t.content=o}}})}function isEmptyObject(e){for(const t in e)if(e.hasOwnProperty(t))return!1;return JSON.stringify(e)===JSON.stringify({})}document.addEventListener("DOMContentLoaded",function(){let e=Array.prototype.slice.call(document.querySelectorAll(".navbar-enterprise-item"),0);if(0!==e.length){const t=window.sessionStorage.getItem("active-enterprise-tab");e.forEach(function(e){t&&e.textContent===t&&e.classList.toggle("active-tab"),e.addEventListener("click",function(e){e.stopPropagation(),window.sessionStorage.setItem("active-enterprise-tab",e.target.textContent)})})}if(document.getElementsByTagName("html")[0].classList.contains("enterprise-persona")){let e=Array.prototype.slice.call(document.getElementsByClassName("footer-usecase-item"),0);0!==e.length&&e.forEach(function(e){e.addEventListener("click",function(e){e.stopPropagation(),window.sessionStorage.setItem("active-enterprise-tab","Tutorials")})});let t=Array.prototype.slice.call(document.getElementsByClassName("footer-products-item"),0);0!==t.length&&t.forEach(function(e){e.addEventListener("click",function(e){e.stopPropagation(),window.sessionStorage.setItem("active-enterprise-tab","Reference")})})}const t=document.querySelector(".navigation-menu");if(t&&t.addEventListener("mouseenter",function(e){e.target.classList.contains("is-active")&&e.target.focus()}),document.getElementsByTagName("body")[0].classList.contains("status-404")){document.getElementsByClassName("header-logo-link")[0].href=window.location.protocol+"//"+window.location.host+"/docs","www.restcomm.com"!==window.location.hostname&&"restcomm.com"!==window.location.hostname&&"docs-staging-test.restcomm.com"!==window.location.hostname&&"restcomm.com.local"!==window.location.hostname?document.getElementsByTagName("html")[0].classList.add("enterprise-persona"):document.getElementsByTagName("html")[0].classList.add("csp-persona")}let o=0;Array.prototype.slice.call(document.getElementsByClassName("icomoon2-font-reference-sms")).forEach(e=>{o++>0&&e.classList.remove("icomoon2-font-reference-sms")}),Array.prototype.slice.call(document.getElementsByClassName("samplecode-container")).forEach(e=>{e.textContent=e.textContent.replace(/mycompany\.restcomm\.com/g,window.location.hostname)}),window.hljs.initHighlighting(),handleWhitelabeling();const n=document.querySelector("a.header-logo-link");null!==n&&n.addEventListener("click",function(){window.sessionStorage.removeItem("active-enterprise-tab")});const a=document.querySelector("button.navbar-enterprise-burger");null!==a&&a.addEventListener("click",function(e){e.stopPropagation();const t=document.querySelector(".navbar-enterprise-container");null!==t&&(t.classList.toggle("is-active"),a.classList.toggle("is-active"))}),document.getElementsByTagName("body")[0].addEventListener("click",function(){const e=document.querySelector("button.navbar-enterprise-burger"),t=document.querySelector(".navbar-enterprise-container");t&&e&&t.classList.contains("is-active")&&e.classList.contains("is-active")&&(t.classList.toggle("is-active"),e.classList.toggle("is-active"))})});