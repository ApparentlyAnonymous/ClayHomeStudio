(function(){
  // Footer year
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mobileNav');
  if (btn && nav) btn.addEventListener('click', function(){ nav.classList.toggle('hidden'); });

  // Interactive pottery wheel
  var wheelGroup = document.getElementById('wheelGroup');
  var progressRingActive = document.getElementById('progressRingActive');
  var potShape = document.getElementById('potShape');
  var wheelSection = document.getElementById('hero');

  if (wheelGroup && progressRingActive && wheelSection && potShape) {
    var r = 120;
    var circumference = 2 * Math.PI * r;
    progressRingActive.style.strokeDasharray = String(circumference);
    progressRingActive.style.strokeDashoffset = String(circumference);

    function clamp(n, min, max){ return Math.max(min, Math.min(n, max)); }

    function onScroll(){
      var rect = wheelSection.getBoundingClientRect();
      var viewH = window.innerHeight || document.documentElement.clientHeight;
      var total = rect.height + viewH;
      var prog = clamp((viewH - rect.top) / total, 0, 1);

      // Spin ~4 turns
      var rotation = prog * 4 * 360;
      wheelGroup.setAttribute('transform', 'rotate(' + rotation.toFixed(2) + ',150,150)');

      // Progress ring
      var offset = circumference * (1 - prog);
      progressRingActive.style.strokeDashoffset = String(offset);

      // Subtle pot morph
      var t = prog;
      var topX = 150;
      var topY = 95 - (t * 12);
      var midIn = 140 - (t * 8);
      var midOut = 170 + (t * 8);
      var belly = 190 - (t * 6);
      var baseY = 210 + (t * 2);
      var d = [
        'M', topX, topY,
        'C', topX+10, topY+15, midOut, 120 + (t*8), midOut, 140,
        'C', midOut, belly, midIn, 190, midIn, baseY,
        'C', midIn, baseY+10, midOut, baseY+10, midOut, baseY,
        'C', midOut, 190, midIn, belly, midIn, 140,
        'C', midIn, 120 + (t*8), topX-10, topY+15, topX, topY, 'Z'
      ].join(' ');
      potShape.setAttribute('d', d);
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    onScroll();
  }
})();
