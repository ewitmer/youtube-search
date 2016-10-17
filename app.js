// single state variable
var YT_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

var state = {
    query: '',
    prevPage: '',
    nextPage: ''
};

// state modification functions
function getDataFromApi(searchTerm, pageToken, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyB2ky77MkDC6a-gwVmcoFPDtNHrMegbcRA',
    q: searchTerm,
    pageToken: pageToken
  }
  $.getJSON(YT_BASE_URL, query, callback);
}

function updatePageToken(date) {

}

// render functions
function displayYTSearchData(data) {
  state.nextPage = data.nextPageToken;
  state.prevPage = data.prevPageToken;
  console.log(state.prevPage)
  console.log(state.nextPage)
  console.log(state.query)
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

// event listeners
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    state.query = $(this).find('.js-query').val();
    var query = state.query
    getDataFromApi(query, '', displayYTSearchData);
    });
  };


    $('.js-previous').on('click',function(){
      getDataFromApi(state.query, state.prevPage, displayYTSearchData);
    })



    $('.js-next').on('click',function(){
      getDataFromApi(state.query, state.nextPage, displayYTSearchData);
    })


$(function(){watchSubmit();});
