function MirrorStream(){
	var t = this;
	//.pipe doesn't forward errors
	this.on("pipe", function(p){
		p.on("error", function(e){
			t.emit("error", e);
		});
	});
}

require("util").inherits(MirrorStream, require("stream"));

MirrorStream.prototype.write = function(c){
	this.emit("data", c);
};

MirrorStream.prototype.end = function(c){
	if(c) this.write(c);
	this.emit("end");
};

MirrorStream.prototype.writable = true;
MirrorStream.prototype.readable = true;

module.exports = MirrorStream;