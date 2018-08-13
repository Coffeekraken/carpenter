import __throttle from 'coffeekraken-sugar/js/utils/functions/throttle';

// save scroll position
let scrollTimeout;
const onScroll = __throttle((e) => {
	sessionStorage.setItem('scrollTop', document.documentElement.scrollTop);
});
document.addEventListener('scroll', onScroll);
// restore scroll top if possible
const savedScrollTop = sessionStorage.getItem('scrollTop');
if (savedScrollTop) {
	setTimeout(() => {
		window.scrollTo(0,parseInt(savedScrollTop));
	});
}
