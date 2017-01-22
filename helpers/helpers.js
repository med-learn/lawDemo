var helpers = {
  isActive: function(a,b)
  {
    if(a==b)
     return "active";
    return "";
  },

  test: function()
  {
    return "file2";
  },

  getFileName: function(fileName)
  {
    console.log(fileName);
    switch(fileName){
      case "Waiver Of Liability":
        return "file1";

      case "Car Selling Contract":
        return "file3";

      default:
        console.log("default");
        return "file2";
    }
  }


};

module.exports = helpers;
