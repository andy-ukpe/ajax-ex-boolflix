// https://api.themoviedb.org/3/movie/550?api_key=5066cdb600dc0c086c0b8b2fa68cff51
// 5066cdb600dc0c086c0b8b2fa68cff51
$(document).ready(function() {
  // catturo il valore di ricerca

  // se clicco il bottone inizia la ricerca
  $('button').click(function() {
    startSearching();
  });
  // se clicco invio inizia la ricerca
  $('input').keypress(function() {
    if(event.which === 13 || event.keyCode ===13){
      startSearching();
    }

  });

});
// funzione per iniziare la ricerca
function startSearching(){
  var query = $('#my-input').val();
    if(query != ' '){
      $('.container').html('');
      console.log(query);
      printMovies(query);
    }else {
      alert('inserire dei caratteri alfanumerici')
    }

};
// funzione per stampare la locandina
function printMovies(userKeyWords){
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/movie?api_key=5066cdb600dc0c086c0b8b2fa68cff51&query=ritorno al futuro",
      method: "GET",
      data:{
         language: "it-IT",
         query: userKeyWords,
      },
      success: function(data) {
        var movies = data.results;
        console.log(data.results);
        // stampo le locandine con titolo, lingua e voto attraverso un ciclo for

          // handlebars
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);


        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          var originalTitle = movie.original_title;
          console.log(originalTitle);
          var italianTitle = movie.title;
          console.log(italianTitle);
          var originalLanguage = movie.original_language;
          console.log(originalLanguage);
          var vote = movie.vote_average;
          console.log(vote);

          // completo il template handlebars
          var context = { originalTitle: originalTitle, italianTitle: italianTitle, language: originalLanguage, vote: vote};
          console.log(context);
          var html = template(context);
          // appendo il template all'html
          $('.container').append(html);
        }

      },
      error:function () {
        alert('si è verificato un errore');
      }
    });
}
