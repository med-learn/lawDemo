
 //var a = Handlebars;

 function initTemplates(){
   $.get( "temp", function( data ) {
        startListen(data.templates);
        console.log("dataLoaded");

   });
 }
var templates;

function startListen(tmpl){
   templates = tmpl;
   updateDisplay($("#search-input").val());
}


function updateDisplay(searchString){

  var raw_template = $('#contract-template').html();
  var template = Handlebars.compile(raw_template);
  var placeHolder = $("#contract-search-res");

  placeHolder.empty();

  var filterd = getFilterdData(templates,searchString);
  var html = filterd.map(function(group) {console.log(group);return template({contracts:group});});
  //var html = template({contracts:["MIKE","IKE"]});
   // Render the posts into the page
   placeHolder.append(html);
}

function getFilterdData(templates,searchString){
    if(searchString.length<2)
     return [];
    templates = templates.filter(function (elem) {return elem.toLowerCase().includes(searchString.toLowerCase());});
    var curGroup,id=1;
    var groups = [], maxInRow = 5;
    while (templates.length > 0){
      curGroup = templates.splice(0, maxInRow);
      groups.push(curGroup.map(function(e) { return {name:e,link:"edit/"+e}} ));
    }


      return groups;
}


function activateSearch(){
  var firstKey=true;
  $("#search-input").keyup(
    function()
    {
      if(firstKey)
        $(".search-container").addClass("clicked");
      firstKey=false;
      updateDisplay($("#search-input").val());
    });
}

$( document ).ready(function() {
initTemplates();

activateSearch();






console.log( "ready!" );
});
