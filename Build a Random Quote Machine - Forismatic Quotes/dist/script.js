// Quote API and GET, credits to forismatic.com for API functionality
function quoteUp() {
  url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  return (
    $.getJSON(url, function (data) {
      var author = data.quoteAuthor;
      var quote = data.quoteText;
      if (data.quoteAuthor == "")
      {
        var author = "Anonymous";

      } else
      {
        var author = data.quoteAuthor;
      }

      $("#text").html(quote);
      $("#author").html("- " + author);
      $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" - ' + author));
    }));};

// document ready
$(document).ready(function () {
  quoteUp();
  $('#new-quote').on('click', quoteUp);

});


// footer copyright details
var intYear = new Date().getFullYear();
// get current year
var replaceYear = "CopyrightYearHere";
// Substitution text
//Copyright year
$('#copyright').each(function () {$(this).text($(this).text().replace(replaceYear, intYear));
});