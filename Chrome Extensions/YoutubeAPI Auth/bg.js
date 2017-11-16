var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
// script.src = "https://apis.google.com/js/api.js?onload=check";
script.src = "https://apis.google.com/js/client.js?onload=check";
head.appendChild(script);