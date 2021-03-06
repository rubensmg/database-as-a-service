(function($) {


    /**
     * setup JQuery's AJAX methods to setup CSRF token in the request before sending it off.
     * http://stackoverflow.com/questions/5100539/django-csrf-check-failing-with-an-ajax-post-request
     */
     
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
     
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
     
    $.ajaxSetup({
         beforeSend: function(xhr, settings) {
             if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                 // Only send the token to relative URLs i.e. locally.
                 xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
             }
         }
    });

    
    // Document READY
    $(function() {

        
        var databaseinfra = new DatabaseInfra();
        
        // hide endpoint?
        databaseinfra.hide_endpoint();
        
        // update plans
        databaseinfra.update_plans();
        
        // update environments
        databaseinfra.update_environments();
        
        $("#id_engine").on("change", function() {
            databaseinfra.engine_changed();
        });
        
        $("#id_plan").on("change", function(event, initial_environment_id) {
            databaseinfra.update_environments(initial_environment_id);
        });

         if ($("#id_cs_dbinfra_attributes-0-ip").val() == ""){
            $("#cs_dbinfra_attributes-group").hide();
        }else{
            $("#cs_dbinfra_attributes-group").show();
        }

    });

})(django.jQuery);
