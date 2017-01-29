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
    updateDisplay($("#search-input").val());
}


function updateDisplay(searchString) {

    var raw_template = $('#contract-template').html();
    var template = Handlebars.compile(raw_template);
    var placeHolder = $("#contract-search-res");

    placeHolder.empty();

    var filterd = getFilterdData(templates, searchString);
    var html = filterd.map(function(group) { console.log(group); return template({ contracts: group }); });
    //var html = template({contracts:["MIKE","IKE"]});
    // Render the posts into the page
    placeHolder.append(html);
}

function getFilterdData(templates, searchString) {
    //if (searchString.length < 2)
    //  return [];
    templates = templates.filter(function(elem) { return elem.cname.toLowerCase().includes(searchString.toLowerCase()); });
    var curGroup, id = 1;
    var groups = [],
        maxInRow = 6;
    while (templates.length > 0) {
        curGroup = templates.splice(0, maxInRow);
        groups.push(curGroup.map(function(e) {
            var lblWithIcon = setIconToLbl(e.labels);
            return { name: e.cname, labels: lblWithIcon, link: "edit/" + e.cname }
        }));
    }


    return groups;
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
            updateDisplay($("#search-input").val());
        });
}

$(document).ready(function() {
    initTemplates();

    activateSearch();

    console.log("ready!");
});