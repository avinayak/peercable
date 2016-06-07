function log(str,level,timeout) {
	if(DEBUG){
		if(!timeout)
			timeout=5000;
		var logline=$("<div style='padding:2px;border-radius:2px;'>&nbsp"+str+"&nbsp</div>");
		 if(level=='warn')
			logline.css("background-color", "gold");
		else if(level=='danger')
			logline.css("background-color", "orangered");
		else if(level=='success')
			logline.css("background-color", "chartreuse");
		setTimeout(function(){$(logline).fadeOut(1000);},timeout);
		$("#log").append(logline);
		if(!level) level='Info';
		console.log('[LOG]',level,': ',str);
	}
}

socket.emit('hola',
	{data:{ 'session_id':session_id,'self_id':self_id }}
);

// socket.on('news', function (data) { 
// 	log(data);
// });