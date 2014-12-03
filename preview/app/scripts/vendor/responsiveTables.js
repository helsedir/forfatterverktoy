//$(responsiveTables());
function responsiveTables() {

  $('table').each(function (index) {
    var width = $(this).width();
    var containerWidth = $(this).parent().width();
    console.log("width: "+width);
    console.log("container "+containerWidth);
    if (width > containerWidth) {
      addDataHeaders(this);
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
