jQuery(function($) {
  $(document).ready(function() {
      $('.menus-toggle > a').on('click', function(){
            $('.menus').toggleClass('hidden');

            var h = $('.navigation').outerHeight(true);
            $('.header-wrapper').css('margin-top', h + 'px');

            console.log(h);

      });
  });
});
