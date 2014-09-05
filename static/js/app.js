
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/';
    var apiKey = '99b4f3ecef69fffcf9e7b251fa336b31';


    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: '99b4f3ecef69fffcf9e7b251fa336b31'
        },function(res) {
            config = res;
            console.log(config);
            if(config){
                callback(config);   
            }else{
                initialize(callback);
            }
            
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });

        $('.btn-now-showing').click(function() {
            loadNowShowing();
        });

        loadNowShowing();

        $('.btn-up-coming').click(function() {
            upcoming();
            
        });

        upcoming();

        $('.btn-popular').click(function() {
            popular();
            
        });

        popular();

        $('.btn-top-rated').click(function() {
            toprated();
            
        });

        toprated();
    }
    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    function displayMovies(data) {
        var template_values = {
            'config': config,
            'result': data
        };
        writeTemplate("tpl-movie-list",template_values,"movies-list");
        
     
        
    }

    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function upcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function popular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function toprated() {
        var topratedUrl = baseUrl + 'movie/top-rated';
        $('.movies-list').html('');
        $.get(topratedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    
    

    function viewMovie(id){
    $(".movie-list").hide();
    console.log(id);
    url = baseUrl + "movie/"+id;
    reqParam = {api_key:apiKey};
    $.get(url,reqParam,function(response){

        $("#title").html(response.original_title);
        $("#overview").html(response.overview);
        if(response.tagline){
            $("#tagline").html(response.tagline);
        }else{
            $("#tagline").html("No Tagline available");
        }
        });
        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){
            console.log(response);
            writeTemplate("tpl-trailer",response,"trailer");
        });

        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
            var template_values = {
                'config': config,
                'result': response
            };
            writeTemplate("tpl-casts",template_values,"casts");
        });

        url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var template_values = {
                "similar": response,
                "config": config
            };
            console.log(template_values.similar.results)
            writeTemplate("tpl-similar",template_values,"similar");
        });
        url = baseUrl + "movie/"+id+"/images";
        $.get(url,reqParam,function(response){
            var template_values = {
                "backdrop": response,
                "config": config
            };
            console.log(template_values.similar.results)
            writeTemplate("tpl-backdrop",template_values,"backdrop");
        });
}
function writeTemplate(sourceID,values,outputID){
        var html = getTemplate(sourceID,values)

        $("#"+outputID).html(html);
    }
    function getTemplate(sourceID,values){
        var source   = $("#"+sourceID).html();
        var template = Handlebars.compile(source);  
        var html = template(values);
        return html;
    }
$(document).ready(function(){
    $(".btn-top-rated, .btn-popular, .btn-up-coming, .btn-now-showing").click(function(){
        $(".movie-view").hide();
        $("#movies-list").show();
    });
    initialize(setEventHandlers);
});