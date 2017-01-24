var config = {};

config = $.extend(config, {
    menubar:false,
    statusbar: false,
    resize: false,
    width: "100%",
    height: '100%',
    autoresize: true
});


function resize() {
    setTimeout(function () {
        // Main container
        $("#mainContainer").css("margin-top",($("#navBar").outerHeight()-2)+"px");

        var max = $('.mce-tinymce')
              .css('border', 'none')
              .parent().outerHeight();

        // Menubar
        max += -$('.mce-menubar.mce-toolbar').outerHeight();

        // Toolbar
        max -= $('.mce-toolbar-grp').outerHeight();

        // Random fix lawl - why 1px? no one knows
        max -= 1;


        // Set the new height
        $('.mce-edit-area').height(max);
    }, 200);
}
$(window).on('resize', function () {
    resize();
});

// Setup plugins
config.toolbar = ["undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent "];


// Choose selector
config.selector = ".fill-div";



// Set content once initialized
config.init_instance_callback = function (editor) {
    resize();
};

var TMCE = tinyMCE.init(config);
