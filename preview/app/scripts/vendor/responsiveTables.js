function responsiveTables() {

  loopTables();
  //When accordions are opened
  $('.recommendationheader, .aboutguidelineicon, .rationallink, .practicaladvicelink').click(function () {
    window.setTimeout(function(){
      loopTables();
    }, 10);
  })
}

function loopTables() {
  $('table').each(function (index) { //find all tables
    var width = $(this).width();
    var containerWidth = $(this).parent().width();
    if (width > containerWidth) {
      addDataHeaders(this); //prepare table for breaking
      $(this).addClass('breakTable');
    }
  });
}

function addDataHeaders(table) {
  var headers = [];

  $(table).find('tr').each(function (yindex) {
    $(this).find('td').each(function (xindex) {
      if (yindex == 0) {
        headers.push(this.innerText);
      }
      else {
        $(this).attr('data-th', headers[xindex]);
      }
    });
  });
}
