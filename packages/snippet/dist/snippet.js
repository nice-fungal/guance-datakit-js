/* guancecom load from cdn */
!function(a,t,e,n){var o=a[n]=a[n]||{q:[]},r=["onReady","init","addAction","setGlobalContext","setUser"];
o.factory=function(r){return function(){var e=Array.prototype.slice.call(arguments);return o.q.push(function(){var t=a[n
];t[r].apply(t,e)}),o}};for(var c=0;c<r.length;c+=1){var s=r[c];o[s]=o.factory(s)}var i=t.createElement(e),t=(i.async=1,
i.src="https://static.guance.com/browser-sdk/v3/dataflux-rum.js",t.getElementsByTagName(e)[0]);
t.parentNode.insertBefore(i,t)}(window,document,"script","DATAFLUX_RUM");
/* guancecom pre-start */
!function(n,t){var a=n[t],i=(new Date).getTime();a.onReady(function(){var e=(new Date).getTime();(a=n[t]).addAction(
"PRE_START",{action_message:"cost:"+(e-i)+"ms"})})}(window,"DATAFLUX_RUM");

/* guancecom set-agent */
!function(o){var e=o.DATAFLUX_RUM,o=o.head.agent;e.setGlobalContext({device:{device:o.device.type,
browser:o.browser.name,browser_version:o.browser.version,browser_version_major:o.browser.major,os:o.os.name,
os_version:o.os.version,os_version_major:o.os.major}})}(window);


/* guancecom init */
!function(n,t){var h = n[t];
h.init({});
}(window,"DATAFLUX_RUM");
