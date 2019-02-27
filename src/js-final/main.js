"use strict";

var current = document.querySelector('#current');
var imgs = document.querySelector('.imgs');
var img = document.querySelectorAll('.imgs img');
var opacity = 0.6;
img[0].style.opacity = opacity;
imgs.addEventListener('click', imgClick);

function imgClick(e) {
  img.forEach(function (img) {
    return img.style.opacity = 1;
  });
  current.src = e.target.src;
  current.classList.add('fade-in');
  setTimeout(function () {
    return current.classList.remove('fade-in');
  }, 500);
  e.target.style.opacity = opacity;
}