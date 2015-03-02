var colorCount = 0;
//The code we used in class was "shuffle($('.cards').length);".  However, when I tested it out in the console.log, I learned that .length returns the wrong value and starts as zero, and goes into negative.  The original count literally goes on forever, even though it stops shuffling on screen, because it's never able to return to zero again.  Hence, I added a separate counter that gets ++ each time a new color is added.

var colorStart = 0;
//I didn't like the way the original code started at the end and worked backwards, so this allows me to start from the start and work forward.
var colorGradients = 128;

//you can set the base number of color lines here. The number of lines = colorGradients * 6.  Each line is set 1 px high in css.  So in this case, the total display would be 6 * 128 = 768px high.
//This value for colorGradients should ideally be a factor of 256.  Otherwise, you'll end up with color banding.

var delay;
//I wanted the delay to be variable based on the number of color gradients.  This way, the shuffle will complete at about the same time that Kermit is done with his solo, regardless of the number of lines.

    function Color(r, g, b) {
      this.red = r;
      this.green = g;
      this.blue = b;
      this.toHTML = function() {
        return "<li class='color' " + "style='background-color:rgb(" + this.red + "," + this.green + "," + this.blue + "); opacity:1;'></li>";
//instead of generating text, we generate a colored line
      }
    }

var countUp = new Array();
var countDown = new Array();

//It took me a while to figure out a mathematical way to generate a rainbow.  You basically need six variations where one channel is at 0, one channel is at 255, and the last channel is either counting up from 0-255 or counting down from 255-0.  The countUp and countDown arrays map out the last one.

var countGenerator = function(intervals) {
//The countGenerator creates an the countUp and countDown arrays based on the number of invervals set in the colorGradients at the beginning.
	var increment = 255 / (intervals - 1);
//I found that if you do "intervals" instead of "(intervals - 1)", then you have some colors repeat themselves.  This isn't noticeable if you set the colorGradients to 128, but it is noticeable if you set it to a smaller number, like 8.

//	console.log(intervals);
//	console.log(increment);
	for (var i = 0; i < (intervals - 1); i++) {
		countUp.push((Math.floor(i * increment)))
	};
	for (var i = 0; i < (intervals - 1); i++) {
		countDown.push(255 - (Math.floor(i * increment)))
	};
	//console.log(countUp);
	//console.log(countDown);
}

    function Rainbow(redCount, greenCount, blueCount) {
//This is the same basic code we used in class, only instead of generating rank and suit, we generate color channels.
      var thisRainbow = this;
      this.red = redCount;
      this.green = greenCount;
      this.blue = blueCount;
      $.each(thisRainbow.red, function() {
        var red = this;
        $.each(thisRainbow.green, function() {
          var green = this;
	        $.each(thisRainbow.blue, function() {
	          var blue = this;
	          var color = new Color(red, green, blue);
	          $('#rainbow').append(color.toHTML());
	          colorCount++;
//	        console.log(colorCount);
	        });
        });
      });
    }

    var shuffle = function(m) {
    console.log(m);
      var rand, $rand;
      rand = Math.floor(Math.random() * colorStart++);
      $('li:eq(' + colorStart + ')').
        after($('li:eq(' + rand + ')')).
        insertBefore($('li:eq(' + rand + ')'));
        m--;
      if(m) {
        setTimeout(shuffle, delay, m);
      }
    };


countGenerator(colorGradients);
var rainbow = new Rainbow([255], countUp, [0]);
var rainbow = new Rainbow(countDown, [255], [0]);
var rainbow = new Rainbow([0], [255], countUp);
var rainbow = new Rainbow([0], countDown, [255]);
var rainbow = new Rainbow(countUp, [0], [255]);
var rainbow = new Rainbow([255], [0], countDown);
//There was no easy way to get a single function that generated a rainbow spectrum, so instead I had to break it down into 6 spectrums where two channels have 1 value and 1 channel either counts up or counts down.

var delay = (56000 / colorCount);

//console.log(delay);

shuffle(colorCount);
