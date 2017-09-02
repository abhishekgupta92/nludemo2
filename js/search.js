
var queue = [];
var showSuggestions = function (e) {
    // on pressing of enter we need to exit this as the suggestions are no longer needed
    if (e.which == 13) {
        return;
    }

    if ($('#searchHeader').val().indexOf('return of unsecured lending ') > -1) {
        closeSearchBar();
        return;
    }

    // if the modified card is there... change its text
    // TODOALPHA
    if ($('.sidenavModified').hasClass('isActive') != false) {

        if ($('.sidenavModified.isActive').length == 0) {

            var string =$('.srch-container input').val(),
                substring = "unsecured";
            if (string.indexOf(substring) !== -1) { 
                $('.modifiedfirstText2:first').text($('.srch-container input').val()); 
            }

            else {
                $('.modifiedfirstText:first').text($('.srch-container input').val());
            }
            // $('.trending-text').text($('.srch-container input').val());
        }
    }

        var str = this.value;
        $('.box').addClass('search');
        $('.search-container-parent.buttons').hide();
        $('.nav-cust').addClass("isActive");
        $('.srch-container').addClass("isActive");
        $('.search-container-parent.searchSuggest').addClass('isActive');
        $('.fall-back').addClass('isActive');
        $('.searchicon').addClass('Active');
        $('.box.first ').addClass('isActive');

        if ($('.sidenavModified').hasClass('isActive') == false) {
            $('.trending_box_container').addClass('isSearchActive');
            $('.trending_box_container').removeClass('isActive');
        }
        setTimeout(showRecent, 100);
    };

    function addSearchCard() {
        $('.box').removeClass('selected');
        // DO it when there is no active search card
        if ($('.sidenavModified.isActive').length == 0) {
            var string = $('#searchHeader').val(),
                substring = "unsecured";
            if (string.indexOf(substring) !== -1) {
                var cardHTML = `<div class="sidenavModified isActive" id="sidenavModified">
            <div class="box" style="margin: 25px auto;
                    width: 320px;
                    padding: 0px;
                    box-shadow: 0 2px 51px 0 rgba(60, 98, 159, 0.15)">
                    <div style="position: relative; padding: 10px;"><img id="pinmodified" style="position: absolute; top: 24px; right: 22px;" src="../images/ic-pin-red.png"></div>
                <div class="modifiedfirstText2" style="padding: 9%;">
                    `+ $('#searchHeader').val() + `
                </div>
            <hr id="modifiedHR" style="margin: 0;">
                    <div class="save-cancel" style="display: flex; justify-content: space-around; margin-bottom: 0%;">
                    <button class="modified-cancel" id="modifiedSave" style="outline: none; width: 40%; padding-right: 42px; border: 0px; background: #ffffff; color: orange; height: 48px; border-right: 1px solid #ccc;">Cancel</button>
                    <button class="modified-save" onclick="ModifiedSave()" id="modifiedSave" style="height:46;">Save</button></div></div>`;
            } else {
                var cardHTML = `<div class="sidenavModified isActive" id="sidenavModified">
            <div class="box" style="margin: 25px auto;
                    width: 320px;
                    padding: 0px;
                    box-shadow: 0 2px 51px 0 rgba(60, 98, 159, 0.15)">
                    <div style="position: relative; padding: 10px;"><img id="pinmodified" style="position: absolute; top: 24px; right: 22px;" src="../images/ic-pin-red.png"></div>
                <div class="modifiedfirstText" style="padding: 9%;">
                    `+ $('#searchHeader').val() + `
                </div>
            <hr id="modifiedHR" style="margin: 0;">
                    <div class="save-cancel" style="display: flex; justify-content: space-around; margin-bottom: 0%;">
                    <button class="modified-cancel" id="modifiedSave" style="outline: none; width: 40%; padding-right: 42px; border: 0px; background: #ffffff; color: orange; height: 48px; border-right: 1px solid #ccc;">Cancel</button>
                    <button class="modified-save" onclick="ModifiedSave()" id="modifiedSave" style="height:46;">Save</button></div></div>`;
            }
        }
        $(cardHTML).prependTo('#sidenav').hide().slideDown("fast");
    }

    $('#searchHeader').on('keyup', function (e) {
        if (e.which == 13) {
            var searchTxt = $('#searchHeader').val();
            addSearchCard();
            // removeHeaderButtons();
            $.ajax({
                type: "POST",
                url: baseApiUrl + 'search',
                data: { "search": searchTxt },
                success: function (data) {
                    if (data.chart_type == "streamo")
                        drawSteamGraph(data);
                    else if (data.chart_type == 'double') {
                        if (data.dual == false)
                            barChart("single", data)();
                        else
                            barChart("double", data)();
                    }
                    else if (data.chart_type == 'map')
                        generateMapView(data);
                }
            });

            closeSearchBar();
            e.preventDefault();
        }
    });

    document.getElementById("searchHeader").addEventListener("keyup", showSuggestions);
    document.getElementById("searchHeader").addEventListener("click", function () {
        if ($('.sidenavModified').hasClass('isActive') == false) // modified card is not open) // TODOALPHA
        { var txt = $('.srch-container input').val(""); }
        else { var txt = $('.srch-container input').val(); }
        showSuggestions({ "which": 0 });
    });

    function closeSearchBar() {
        $('.nav-cust').removeClass("isActive");
        $('.srch-container').removeClass("isActive");
        $('.search-container-parent.searchSuggest').removeClass('isActive');
        $('.fall-back').removeClass('isActive');
        $('.searchicon').removeClass('Active');
        $('.box.first ').removeClass('isActive');
        $('.search-container-parent.searchSuggest').html("");
        $('.search-container-parent.buttons').show();
        if ($('.sidenavModified').hasClass('isActive') == false) {
            $('.trending_box_container').removeClass('isSearchActive');
            $('.trending_box_container').addClass('isActive');
        }
        $('.box').removeClass('search');
    }

    document.getElementById("nav-cust").addEventListener("focusout", function () {
        setTimeout(function () {
            closeSearchBar();
        }, 100);
    });

    function loadingStateOn() {

    };
    function loadingStateOff() {

    };
    var loadTimeout = 2000;

    function updateSearchResult(func_name, query) {
        // loadingStateOn();
        var txt = $('.srch-container input').val(query);
        eval(func_name + "()");
        // setTimeout(loadingStateOff, loadTimeout);
    }

    function showRecent() {
        var txt = $('.srch-container input').val();
        var localQueries = (txt.match("^what is the return of *")) ? product_queries : queries;
        if (txt.match("^what is the return of unsecured lending")) {
            $('.srch-container input').keypress(function (e) {
                if (e.which == 13) {
                    unsecuredLoans();
                }
            })
        }
        $('.search-container-parent.searchSuggest').html("");
        for (index in localQueries) {
            var ele = `<div onclick='updateSearchResult("` + localQueries[index][1] + `","` + localQueries[index][0] + `")' style="cursor:pointer;"><p class="search-suggestions">` + localQueries[index][0] + `</p></div>`;
            $('.search-container-parent.searchSuggest').append(ele);
        }
    }


