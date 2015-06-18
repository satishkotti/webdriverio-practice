var breakpoint = {};
breakpoint.refreshValue = function () {
  this.value = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/["']/g, "");
};

$(window).resize(function () {
  breakpoint.refreshValue();
}).resize();

console.log(breakpoint.value);
if (breakpoint.value === 'Desktop|Laptop') {
  console.log('Desktop|Laptop breakpoint');
}
else {
  console.log('Some other breakpoint');
}