var YT_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm, pageToken, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyB2ky77MkDC6a-gwVmcoFPDtNHrMegbcRA',
    q: searchTerm,
    pageToken: ''
  }
  $.getJSON(YT_BASE_URL, query, callback);
}


function displayYTSearchData(data) {

  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += '<a href=https://www.youtube.com/watch?v='+item.id.videoId+' target=blank><img src='+ item.snippet.thumbnails.medium.url +'></a><a href=https://www.youtube.com/channel/'+item.snippet.channelId+'>More from '+item.snippet.channelTitle+'</a>';
    });

  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function getNextResult(searchTerm, pageToken, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyB2ky77MkDC6a-gwVmcoFPDtNHrMegbcRA',
    q: searchTerm,
    pageToken: pageToken
  }
  $.getJSON(YT_BASE_URL, query, callback);
}



function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, '', displayYTSearchData);
  });
}

$(function(){watchSubmit();});
