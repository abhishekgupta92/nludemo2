var menuRight = document.getElementById( 'cbp-spmenu-s2' );
var showRight = document.getElementById( 'showRight' );

function toggleMenu() {
	classie.toggle( showRight, 'active'); 
    classie.toggle( menuRight, 'cbp-spmenu-open' );
}

function openMenu() {
	classie.addClass( showRight, 'active'); 
    classie.addClass( menuRight, 'cbp-spmenu-open' );	
}

function closeMenu() {
	classie.removeClass( showRight, 'active'); 
    classie.removeClass( menuRight, 'cbp-spmenu-open' );	
}

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
		closeMenu();
    }
});

showRight.onclick = function() {
	toggleMenu();
};