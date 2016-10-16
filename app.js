var YT_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyB2ky77MkDC6a-gwVmcoFPDtNHrMegbcRA',
    q: searchTerm
  }
  $.getJSON(YT_BASE_URL, query, callback);
}


function displayYTSearchData(data) {

  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += '<img src='+ item.snippet.thumbnails.medium.url +'>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYTSearchData);
  });
}

$(function(){watchSubmit();});
