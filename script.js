
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mobileNav');
  if (btn && nav) btn.addEventListener('click', function(){ nav.classList.toggle('hidden'); });
})();
