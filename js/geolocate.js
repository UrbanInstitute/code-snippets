$.ajax({
    url: 'http://freegeoip.net/json/' + userip,
    dataType: 'jsonp',
    success: function(data){
      console.log(data)
      var str = JSON.stringify(data, null, 2);
      $("#jsonDump").html(str)
    },
    error: function(error){
    	console.log(error)
    }
});