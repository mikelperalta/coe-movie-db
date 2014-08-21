$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'cae620ff3f12488013dc1c9785960efe';


    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: 'cae620ff3f12488013dc1c9785960efe'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
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
            return  false;
        });

        loadNowShowing();
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
        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            var htmlStr = [
                            '<div class="col-md-4 portfolio-item">',
                                '<a href="#">',
                                    '<img class="img-responsive" src="' + imageSrc + '" alt="">',
                                '</a>',
                                '<h3>',
                                    '<a href="#">' + movie.title +'</a>',
                                '</h3>',
                            '</div>'
                            ];
            $('.movies-list').append($(htmlStr.join('')));
        });
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
    initialize(setEventHandlers);

});