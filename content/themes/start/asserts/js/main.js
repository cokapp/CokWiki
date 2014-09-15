jQuery(function($) {
  $(document).ready(function() {

var jPM = $.jPanelMenu({
    menu: '#left-col',
    trigger: '.wiki-sidebar-toggle a',
    openPosition: '180px'
});
jPM.on();

      // $('.wiki-sidebar-toggle').on('click', function(){
      // 	var left = $('#left-col');

      // 	if(left.css('display') == 'none'){
      // 		left.css('display', 'block');
      // 	}else{
      // 		left.css('display', 'none');
      // 	}
      // });

  });
});
