function bad_apple(){
	var reader = new BadAppleFrameReader();
    var screen = document.getElementById('screen');
	function displayFrame(frame){
        var html = [];
        var lastBit = false;
        var c = 0;
        var r = 0;
        for (var i=0; i<frame.length; i++) {
            var d = frame[i];
            while (d >= 128 - c){
                d -= 128 - c;
            if (lastBit){
                html.push('<div class="white" style="width:'+(128-c)*4+'px;top:'+r*4+'px;left:'+c*4+'px;"></div>');
            }
                c = 0;
                r ++;
            }
            if (lastBit){
            html.push('<div class="white" style="width:'+d*4+'px;top:'+r*4+'px;left:'+c*4+'px;"></div>');
            }
            c += d;
            lastBit = !lastBit;
        }
        html = html.join('');
        screen.innerHTML = html;
	}
	var statusDom = document.getElementById('status');
	function displayStatus(msg){
		statusDom.innerHTML = msg;
	}
	setInterval(function (){
        var frame = null;
        if (!window.pause) reader.available(function (n){
	        if (n <= 0) {
	            displayStatus('播放结束');
	        } else {
	            displayStatus('播放中');
	            frame = reader.read();
	        }
	    });
	    if (frame == null) {
	        displayStatus('暂停中...');
	    } else {
	        displayFrame(frame);
            frame = null;
        }
	}, 1000/15);
    document.onclick = function (){
        window.pause = !window.pause;
    };
}