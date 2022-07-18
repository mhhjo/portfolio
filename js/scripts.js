/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

//// 스크롤 이동 이벤트 Vanila JS
(function(){
    // 문법 오류 checking
    "use strict";

    /* pan and content_wrap CSS scrolls */
    var view_part = document.querySelectorAll(".panel").length, 
                    scdir, hold = false;

    function _scrollY(obj){
        var slength, plength, pan, step = 100,
            vh = window.innerHeight / 100,
            vmin = Math.min(window.innerHeight, window.innerWidth) / 100;

        if ((this !== undefined && this.id == 'content_wrap') || (obj !== undefined && obj.id === 'content_wrap')){
            pan = this || obj;
            plength = parseInt(pan.offsetHeight / vh);
        }
        if(pan === undefined){
            return;
        }

        plength = plength || parseInt(pan.offsetHeight / vmin);
		slength = parseInt(pan.style.transform.replace('translateY(', ''));
		
		if (scdir === 'up' && Math.abs(slength) < (plength - plength / view_part)) { // scroll 방향 위(view는 아래로)
			slength = slength - step;
		} else if (scdir === 'down' && slength < 0) { // scroll 방향 아래(view는 위로)
			slength = slength + step;
		} else if (scdir === 'top') { // scroll top(처음 section으로 돌아감)
			slength = 0;
		} else if (scdir === 'introSec'){ // introduce section
			slength = -100;
		} else if (scdir === 'skillSec'){ // skill section
			slength = -200;
		} else if (scdir === 'portSec'){ // portfolio section
			slength = -300;
		} else if (scdir === 'conSec'){ // contact section
			slength = -400;
		}
		if (hold === false) {
			hold = true;
			pan.style.transform = 'translateY(' + slength + 'vh)';
			setTimeout(function() {
				hold = false;
			}, 1000);
		}
		console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / view_part));

		// 스크롤에 따른 nav 변화
		const navbarBg = document.body.querySelector('#mainNav');

		if(slength < 0){
			navbarBg.classList.add('navbar-shrink');		
		}else{
			navbarBg.classList.remove('navbar-shrink');
		}
    }

    /* swipe detection on touchscreen devices */
    function _swipe(obj) {
		var swdir,
			sX,
			sY,
			dX,
			dY,
			threshold = 100,
			/*[min distance traveled to be considered swipe]*/
			slack = 50,
			/*[max distance allowed at the same time in perpendicular direction]*/
			alT = 500,
			/*[max time allowed to travel that distance]*/
			elT, /*[elapsed time]*/
			stT; /*[start time]*/
		obj.addEventListener('touchstart', function(e) {
			var tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
			stT = new Date().getTime();
			//e.preventDefault();
		}, false);

		obj.addEventListener('touchmove', function(e) {
			e.preventDefault(); // wheel 이벤트 저지
		}, false);

		obj.addEventListener('touchend', function(e) {
			var tchs = e.changedTouches[0];
			dX = tchs.pageX - sX;
			dY = tchs.pageY - sY;
			elT = new Date().getTime() - stT;
			if (elT <= alT) {
				if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
					swdir = (dX < 0) ? 'left' : 'right';
				} else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
					swdir = (dY < 0) ? 'up' : 'down';
				}
				if (obj.id === 'content_wrap') {
					if (swdir === 'up') {
						scdir = swdir;
						_scrollY(obj);
					} else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
						scdir = swdir;
						_scrollY(obj);

					}
					e.stopPropagation();
				}
			}
		}, false);
				

	}

    /* assignments */
	var content_wrap = document.getElementById('content_wrap');
	content_wrap.style.transform = 'translateY(0)';
	content_wrap.addEventListener('wheel', function(e) { // view 상에서 wheel 동작 시에 일어나는 이벤트
		if (e.deltaY < 0) {
			scdir = 'down';
		}
		if (e.deltaY > 0) {
			scdir = 'up';
		}
		e.stopPropagation();
	});

    // 휠 돌릴 때 _scrollY function 동작
	content_wrap.addEventListener('wheel', _scrollY);

	_swipe(content_wrap);
	var tops = document.querySelectorAll('.top'); // top 버튼 지정
	for (var i = 0; i < tops.length; i++) { 
		tops[i].addEventListener('click', function() {
			scdir = 'top';
			_scrollY(content_wrap);
		});
	}

	
	//// 각 section에 해당하는 버튼 클릭시 이동 이벤트
	// next_btn 에 대한 이벤트(다음 section 만큼만 이동한다)
	document.getElementById("next_intro").addEventListener("click", () =>{
		scdir = 'up';
		_scrollY(content_wrap);
	})
	// introduce
	document.getElementById("intro_section").addEventListener("click", () =>{
		scdir = 'introSec';
		_scrollY(content_wrap);
	})
	// skill
	document.getElementById("skill_section").addEventListener("click", () =>{
		scdir = 'skillSec';
		_scrollY(content_wrap);
	})
	// portfolio
	document.getElementById("port_section").addEventListener("click", () =>{
		scdir = 'portSec';
		_scrollY(content_wrap);
	})
	// contact
	document.getElementById("con_section").addEventListener("click", () =>{
		scdir = 'conSec';
		_scrollY(content_wrap);
	})

	
})();






// // 기본 js
// window.addEventListener('DOMContentLoaded', event => {

//     // Navbar shrink function
//     var navbarShrink = function () {
//         const navbarCollapsible = document.body.querySelector('#mainNav');
//         if (!navbarCollapsible) {
//             return;
//         }
//         if (window.scrollY === 0) {
//             navbarCollapsible.classList.remove('navbar-shrink')
//         } else {
//             navbarCollapsible.classList.add('navbar-shrink')
//         }

//     };

//     // Shrink the navbar 
//     navbarShrink();

//     // Shrink the navbar when page is scrolled
//     document.addEventListener('scroll', navbarShrink);

//     // Activate Bootstrap scrollspy on the main nav element
//     const mainNav = document.body.querySelector('#mainNav');
//     if (mainNav) {
//         new bootstrap.ScrollSpy(document.body, {
//             target: '#mainNav',
//             offset: 74,
//         });
//     };

//     // Collapse responsive navbar when toggler is visible
//     const navbarToggler = document.body.querySelector('.navbar-toggler');
//     const responsiveNavItems = [].slice.call(
//         document.querySelectorAll('#navbarResponsive .nav-link')
//     );
//     responsiveNavItems.map(function (responsiveNavItem) {
//         responsiveNavItem.addEventListener('click', () => {
//             if (window.getComputedStyle(navbarToggler).display !== 'none') {
//                 navbarToggler.click();
//             }
//         });
//     });

// });
