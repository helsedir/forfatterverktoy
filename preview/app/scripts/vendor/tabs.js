$('#tab_footer1').keydown(function (ev) {
    if (ev.which == 13) {
        var x = window.scrollX, y = window.scrollY;
        document.getElementById('footer_content_categories').focus();
        window.scrollTo(x, y);
    }
});
$('#tab_footer2').keydown(function (ev) {
    if (ev.which == 13) {
        var x = window.scrollX, y = window.scrollY;
        document.getElementById('footer_content_alphabetical').focus();
        window.scrollTo(x, y);
    }
});

$("span[role='tab']").click(function () {
    if ($(this).hasClass('tabs_header')) {
        $("span[role='tab'].tabs_header").attr("aria-selected", "false"); //deselect all the tabs
        $(this).attr("aria-selected", "true"); // select this tab
        $(this).blur();
        var tabpanid = $(this).attr("aria-controls"); //find out what tab panel this tab controls
        var tabpan = $("#" + tabpanid);
        $("div[role='tabpanel'].tabpanel_header").attr("aria-hidden", "true"); //hide all the panels
        $("div[role='tabpanel'].tabpanel_header").hide();
        tabpan.attr("aria-hidden", "false"); // show our panel
        tabpan.show(); // show our panel
    }
    if ($(this).hasClass('tabs_footer')) {
        $("span[role='tab'].tabs_footer").attr("aria-selected", "false"); //deselect all the tabs
        $(this).attr("aria-selected", "true"); // select this tab
        $(this).blur();
        var tabpanid = $(this).attr("aria-controls"); //find out what tab panel this tab controls
        var tabpan = $("#" + tabpanid);
        $("div[role='tabpanel'].tabpanel_footer").attr("aria-hidden", "true"); //hide all the panels
        $("div[role='tabpanel'].tabpanel_footer").hide();
        tabpan.attr("aria-hidden", "false"); // show our panel
        tabpan.show(); // show our panel
    }
});

$("span[role='tab']").keydown(function (ev) {
    if (ev.which == 13) {
        $(this).click();
    }
});

//This adds keyboard function that pressing an arrow left or arrow right from the tabs toggle the tabs.
$("span[role='tab']").keydown(function (ev) {
    if ((ev.which == 39) || (ev.which == 37)) {
        var selected = $(this).attr("aria-selected");
        if (selected == "true") {
            if ($(this).hasClass('tabs_header')) {
                $("span.tabs_header[aria-selected='false']").attr("aria-selected", "true").focus();
                $(this).blur();
                $(this).attr("aria-selected", "false");
                var tabpanid = $("span.tabs_header[aria-selected='true']").attr("aria-controls");
                var tabpan = $("#" + tabpanid);
                $("div.tabpanel_header[role='tabpanel']").attr("aria-hidden", "true");
                $("div.tabpanel_header[role='tabpanel']").hide();
                tabpan.attr("aria-hidden", "false");
                tabpan.show();
            } else {
                $("span.tabs_footer[aria-selected='false']").attr("aria-selected", "true").focus();
                $(this).blur();
                $(this).attr("aria-selected", "false");
                var tabpanid = $("span.tabs_footer[aria-selected='true']").attr("aria-controls");
                var tabpan = $("#" + tabpanid);
                $("div.tabpanel_footer[role='tabpanel']").attr("aria-hidden", "true");
                $("div.tabpanel_footer[role='tabpanel']").hide();
                tabpan.attr("aria-hidden", "false");
                tabpan.show();
            }
        }
    }
});

$('#tab_header1').keydown(function (ev) {
    if (ev.which == 13) {
        var x = window.scrollX, y = window.scrollY;
        $('#content_categories').focus();
        window.scrollTo(x, y);
        return false;
    }
    return true;
});

$('#tab_header2').keydown(function (ev) {
    if (ev.which == 13) {
        var x = window.scrollX, y = window.scrollY;
        $('#content_alphabetical').focus();
        window.scrollTo(x, y);
        return false;
    }
    return true;
});