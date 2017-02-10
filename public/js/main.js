//var a = Handlebars;

function initTemplates() {
    $.get("temp", function(data) {
        startListen(data.templates);
        console.log("dataLoaded");

    });
}
var templates;

function startListen(tmpl) {
    templates = tmpl;
    updateSearchDisplay($("#search-input").val());
}


function updateSearchDisplay(searchString) {

    var raw_template = $('#contract-template').html();
    var template = Handlebars.compile(raw_template);
    var placeHolder = $("#contract-search-res");

    placeHolder.empty();

    var filterd = getFilterdData(templates, searchString);

    var groups = toGroups(filterd);

    var html = groups.map(function(group) { console.log(group); return template({ contracts: group }); });
    //var html = template({contracts:["MIKE","IKE"]});
    // Render the posts into the page
    placeHolder.append(html);
}

function updateLblDisplay(searchLabels) {

    var raw_template = $('#contract-template').html();
    var template = Handlebars.compile(raw_template);
    var placeHolder = $("#contract-search-res");

    placeHolder.empty();

    var filterd = templates.slice();

    if (searchLabels.length > 1)
        filterd = getLblsFilter(templates, searchLabels);

    var groups = toGroups(filterd);

    var html = groups.map(function(group) { console.log(group); return template({ contracts: group }); });
    //var html = template({contracts:["MIKE","IKE"]});
    // Render the posts into the page
    placeHolder.append(html);
}

function getFilterdData(templates, searchString) {
    return templates.filter(function(elem) { return elem.cname.toLowerCase().includes(searchString.toLowerCase()); });
}

function toGroups(toGroups) {
    var curGroup, id = 1;
    var groups = [],
        maxInRow = 6;
    while (toGroups.length > 0) {
        curGroup = toGroups.splice(0, maxInRow);
        groups.push(curGroup.map(function(e) {
            var lblWithIcon = setIconToLbl(e.labels);
            return { name: e.cname, labels: lblWithIcon, link: "edit/" + e.cname }
        }));
    }
    return groups;
}

function getLblsFilter(templates, searchString) {
    return templates.filter(function(elem) {
        lbls = elem.labels.map(function(e) { return e.toLowerCase(); });
        return lbls.includes(searchString.toLowerCase());
    });

    //return toGroups(templates);
}

function setIconToLbl(labels) {
    var lblIconStruct = (labels.map(function(e) {
        var iconClass = "";
        if (e.toLowerCase().includes("private"))
            iconClass = "glyphicon glyphicon-lock";
        if (e.toLowerCase().includes("public"))
            iconClass = "glyphicon glyphicon-globe";
        if (e.toLowerCase().includes("shared"))
            iconClass = "glyphicon glyphicon-cloud";
        return { lbl: e, icon: iconClass };
    }));

    return lblIconStruct;
}

function activateSearch() {
    var firstKey = true;
    $("#search-input").keyup(
        function() {
            if (firstKey)
                $(".search-container").addClass("clicked");
            firstKey = false;
            updateSearchDisplay($("#search-input").val());
        });

    $("#search-lbls-input").keyup(
        function() {
            if (firstKey)
                $(".search-container").addClass("clicked");
            firstKey = false;
            updateLblDisplay($("#search-lbls-input").val());
        });
}

function lblClicked(sender) {
    $("#search-lbls-input").val($(sender)[0].innerText.trim());
    updateLblDisplay($("#search-lbls-input").val());
}

$(document).ready(function() {
    initTemplates();

    activateSearch();

    console.log("ready!");
});