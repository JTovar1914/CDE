jQuery(function($) {
  $(document).ready(function() {
    var count_email = 1;
    $('.btn-add-friend').on('click', function () {
      if(count_email < 5){
          var height_all_email = 56 * count_email;
          if(count_email > 1)
              $('#close-email-'+count_email).css('visibility','hidden') ;
          count_email += 1;
          $('.all-friends-email').css('height', height_all_email+'') ;
          $('.friends-email-'+count_email).css('visibility','visible') ;
          $('#close-email-'+count_email).css('visibility','visible') ;
          $('span.friends-email-'+count_email+' input').addClass('wpcf7-validates-as-required');
          $('span.friends-email-'+count_email+' input').attr('aria-required', 'true');

          if(count_email == 5)
              $('.btn-add-friend').css('display', 'none');
      }
    });

    $('.btn-delete-search-email-friends,.btn-delete-search-email-friends-2').on('click', function () {
        var id = parseInt(this.id.split('close-email-')[1]);
        count_email -= 1;
        $('#close-email-'+count_email).css('visibility','visible') ;
        var height_all_email = 56 * (count_email-1);
        $('.all-friends-email').css('height', height_all_email+'') ;
        $('.friends-email-'+id).css('visibility','hidden') ;
        $('#close-email-'+id).css('visibility','hidden') ;

        $('span.friends-email-'+id+' input').removeClass('wpcf7-validates-as-required');
        $('span.friends-email-'+id+' input').removeAttr('aria-required');

        if(count_email < 5)
            $('.btn-add-friend').css('display', 'block');
    });

    $('div.invite-form').each(function(index) {
      var prefilVal = $(this).find('#prefil').text();
      $(this).find('#message').val(prefilVal);
    });
    
  });
});