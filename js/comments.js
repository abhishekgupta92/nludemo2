$('.bigCol').dblclick(function(eventData) {
	var mouseX = eventData.originalEvent.clientX;
    var mouseY = eventData.originalEvent.clientY;       
    // create a marker using CSS #TODO
    addSidebar(true);
    addCommentButton(commentArray.length+1, "toggleMenu", "comment-btn"+commentArray.length+1, mouseX, mouseY)
	openMenu();
    
})

//sidenav comments
function addCommentButton(txt, funcname, btnId, xpos, ypos){
	$('#'+btnId).remove();
	var idTxt = "";
	if (btnId) { var idTxt = `id="`+btnId+`"`}
	var ele = `<button class="comment-btn" `+idTxt+` onclick="`+funcname+`()">`+txt+`</button>`;
    $('body #commentsIndex').append(ele);
    $('#'+btnId).css('top', ypos - 24 +'px'); //or wherever you want it
    $('#'+btnId).css('left', xpos - 24 +'px');
}
