var markMap = {"mark1":"name","mark2":"type"};

function bindChange($frame,cName){
  $curElem = $frame.find('.'+cName);
  $curElem.bind("DOMSubtreeModified",function(){
      //console.log($(this).text());
      $curElem.unbind("DOMSubtreeModified");
      $curElem.not(this).text($(this).text());
      console.log($(this).text());
      bindChange($frame,cName);
  });
}


function macroCheck($frame,cName){
  return function() {
      $curElem = $frame.find('.'+cName);
      var last = markMap[cName];
      var valText;
      var currentNode = tinymce.activeEditor.selection.getNode();
      $curElem.each(function(key,value){
        valText =$(value).text();
        if(last!=valText){
          console.log("last:"+last+" "+valText);
          $curElem.not(currentNode).text(valText);
           markMap[cName] = valText;
        }
      });
    };
}

function initMacros(){
  var $frame = $( "iframe" ).contents();
  var cNames = Object.keys(markMap);

  for(var i=0;i<cNames.length;++i){
    console.log(cNames[i]);
    setInterval(macroCheck($frame,cNames[i]),400);
  }
}

$( window ).load(function() {

  //$frame.find(".mark1").click(function(){alert("CLK !");});
  //  bindChange($frame,"mark1");
initMacros();

});
