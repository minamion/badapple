function BadAppleFrameReader(){
    this.i = 0;
    this.parts = [];
}
BadAppleFrameReader.prototype._downloadPart = function (iPart, fn){
    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('type', 'text/javascript');
    scriptEl.onload = scriptEl.onreadystatechange = function (){
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            fn();
            this.onload = this.onreadystatechange = null;
        }
    };
    scriptEl.setAttribute('src', 'BadApple!!/BadApple!!'+iPart+'.js');
    document.getElementsByTagName('head')[0].appendChild(scriptEl);
};
BadAppleFrameReader.prototype.available = function (fn){
    var iPart = Math.floor(this.i / 90);
    this.parts[iPart-1] = null;
    if (this.parts[iPart] == null) {
        this.parts[iPart] = [];
        var reader = this;
        this._downloadPart(iPart, function (){
            reader.parts[iPart] = window.__bad_apple_frames;
            if (reader.parts[iPart].length &&reader.parts[iPart].length > 0) {
                fn();
            } else {
                throw new Error('data format error!');
            }
        });
    } else {
        fn();
    }
    var iPart1 = Math.floor((this.i + 90) / 90);
    if (iPart1 <=36 && this.parts[iPart1] == null) {
        this.parts[iPart1] = [];
        var reader = this;
        this._downloadPart(iPart1, function (){
            reader.parts[iPart1] = window.__bad_apple_frames;
            if (reader.parts[iPart1].length &&reader.parts[iPart1].length > 0) {
                fn();
            } else {
                throw new Error('data format error!');
            }
        });
    }
    return true;
};
BadAppleFrameReader.prototype.read = function (){
    var frame_data = this.parts[Math.floor(this.i / 90)][this.i % 90];
    this.i ++;
    return frame_data;
};