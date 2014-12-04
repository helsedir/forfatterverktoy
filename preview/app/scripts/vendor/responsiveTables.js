function responsiveTables() {

  loopTables(document);
  //When accordions are opened
  $('.recommendationheader, .aboutguidelineicon, .rationallink, .practicaladvicelink, .picosummarylink, .resp-accordion').click(function () {

    var context;

    if ($(this).hasClass('recommendationheader')) {
      context = $(this).closest('.Recommendation').find('.textContainer');
    }

    else if ($(this).hasClass('aboutguidelineicon')) {
      context = $(this).closest('.pageheader').find('.aboutexpand');
    }

    else if ($(this).hasClass('picosummarylink')) {
      context = $(document).find('.picosummary');
    }

    /*else if ($(this).find('.rationallink') || $(this).find('.practicaladvicelink')) {
      context = $(this).closest('.tabs').find('.resp-tabs-container');

    }*/

    window.setTimeout(function(){
      loopTables(context);
    }, 100); //Timeout function can be removed if not using angular
  })
}

function loopTables(context) {
  $(context).find('table').each(function (index) { //find all tables
    var width = $(this).width();
    var containerWidth = $(this).parent().width();
    //console.log('width: '+width+' container: '+containerWidth);
    //console.log(this);
    if (containerWidth > 0 && width > containerWidth) {
      addDataHeaders(this); //prepare table for breaking
      $(this).addClass('breakTable');
    }
  });
}

function addDataHeaders(table) {
  var headers = [];

  $(table).find('tr').each(function (yindex) {
    if (yindex == 0) {
      $(this).addClass('hidden'); //always hide first row when breaking
    }
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
