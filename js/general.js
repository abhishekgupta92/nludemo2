function addHeaderButton(txt, funcname, btnId){
	var idTxt = "";
	if (btnId) { var idTxt = `id="`+btnId+`"`}
	var ele = `<button class="search-btn" `+idTxt+` onclick="`+funcname+`()">`+txt+`</button>`;
	$('.search-container-parent.buttons').append(ele);
}

function removeHeaderButtons(){
    $('.search-container-parent.buttons').html("");
    $('body #commentsIndex').html("");
}

$('.box.first').click(function() {
	query = "What have been the product trends for TEST in the last 12 months?";
	var txt = $('.srch-container input').val(query);
	drawSteamGraph();
    $('.box').removeClass("selected");
	removeHeaderButtons();
	addHeaderButton("VS INFLATION", "addInflationGraph", "inflateBtn");
	addHeaderButton("VS GDP", "doNothing");
});

function unsecuredLoans() {
	singleBarChart();
	removeHeaderButtons();
	addHeaderButton("FOR NBFC", "unsecuredNBFC", "nbfcButton");
	addHeaderButton("VS RISK", "doubleBarChartOk");
	addSearchCard();
}

function unsecuredNBFC() {
	var list = $('#searchHeader').val().split(' ');
	var x = list[list.length-1];
	list[list.length-1]="NBFC";
	list.push(x);
    $('.modifiedfirstText2').text(list.join(' '));
	$('#searchHeader').val(list.join(' '));
	singleBarChartNBFC();
	removeHeaderButtons();
    
	addHeaderButton("VS RISK", "doubleBarChartOk");
}

function doubleBarChartOk() {
    $('.modifiedfirstText2').text($('#searchHeader').val()+" vs RISK");
	$('#searchHeader').val($('#searchHeader').val()+" vs RISK");
	removeHeaderButtons();
	doubleBarChart();
    
	addHeaderButton("SHOW OPPORTUNITIES GEOGRAPHICALLY", "mapViewDedo", "thisismapview");
}

function mapViewDedo() {
    $('.modifiedfirstText2').text($('#searchHeader').val()+", by state");
	$('#searchHeader').val($('#searchHeader').val()+", by state");
	$('#thisismapview').remove();
	generateMapView();
}

function addInflationGraph() {
    // UPDATE SEARCH QUERY
    // TODOALPHA
    // UPDATE MODIFIED CARD IS THERE
    $('.srch-container input').val("What have been the product trends for TEST in the last 12 months vs inflation");
    $('.modifiedfirstText').text("What have been the product trends for TEST in the last 12 months vs inflation");
	$('#inflateBtn').remove();
	plotLineGraph();
}

function doNothing() {
	$('.modifiedfirstText').text($('#searchHeader').val()+" vs GDP");
	$('#searchHeader').val($('#searchHeader').val()+" vs GDP");
}

function ModifiedSave(){
	$('#pinmodified').addClass('isDisable');
    $('.save-cancel').addClass('isDisable');
    $('.trending_box_container').addClass('isActive');
    $('.sidenavModified').removeClass('isActive');
    $('#modifiedHR').remove();
    $('#modifiedSave').remove();

    //empty the search bar
    $('#searchHeader').val("");
    
//  $("<div class='box selected' style='height:400px;'>HI THIS IS ME</div>").prependTo('#sidenav').hide().slideDown();
}

function ModifiedSave2(){
	// $('#trending2').addClass('isActive');
	$('#trending2').addClass('isCalled')
	$('#pinmodified').addClass('isDisable');
    $('.save-cancel').addClass('isDisable');
    $('.trending_box_container').addClass('isActive');
    $('.sidenavModified').removeClass('isActive');
    $('#modifiedHR').remove();
    $('#modifiedSave').remove();

    //empty the search bar
    $('#searchHeader').val("");
    
//  $("<div class='box selected' style='height:400px;'>HI THIS IS ME</div>").prependTo('#sidenav').hide().slideDown();
}

baseApiUrl = "http://52.66.179.123:4000/";
