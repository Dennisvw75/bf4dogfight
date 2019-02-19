const btn = document.getElementById('btn');
const planesShow = document.getElementById('planes');
const planesItem = document.querySelectorAll('.planes__item');

btn.addEventListener('click', function() {
  planesShow.style.display = 'block';
});
