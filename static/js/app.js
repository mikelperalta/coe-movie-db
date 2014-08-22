$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'c5fac6e46b8c503b90d975d5a4a6292b';


    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: 'c5fac6e46b8c503b90d975d5a4a6292b'
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

        $('.btn-upcoming').click(function() {
            loadUpcoming();
            return  false;
        });

        loadUpcoming();

        $('.btn-popular').click(function() {
            loadPopular();
            return  false;
        });

        loadPopular();

        $('.btn-top-rated').click(function() {
            loadTopRated();
            return  false;
        });

        loadTopRated();

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
                            '<li>',
                                '<a href="#">',
                                    '<img class="img-responsive" src="' + imageSrc + '" alt="">',
                                '</a>',
                                '<h3>',
                                    '<a href="#">' + movie.title +'</a>',
                                '</h3>',
                            '</li>'
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

    function loadUpcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadTopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        $('.movies-list').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
    
    initialize(setEventHandlers);

});