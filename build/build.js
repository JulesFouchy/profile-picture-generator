var gui = new dat.GUI();
var params = {
    Ratio: 0.8,
    Random_Seed: 0,
    N: 33,
    Export_Size: 600,
    Download_Image: function () {
        var pg = createGraphics(params.Export_Size / 2, params.Export_Size / 2);
        pg.background(0, 0);
        ppg(pg);
        pg.save();
    },
};
gui.add(params, "Ratio", 0, 1, 0.01);
gui.add(params, "Random_Seed", 0, 10000, 1);
gui.add(params, "N", 3, 40, 1);
gui.add(params, "Export_Size", 1, 2000, 1);
gui.add(params, "Download_Image");
var pp = function () {
    randomSeed(params.Random_Seed);
    noStroke();
    fill(random(255), random(255), random(255));
    translate(width / 2, height / 2);
    var r = height / 2;
    ellipse(0, 0, 2 * r);
    for (var i = 3; i < params.N; ++i) {
        var p = p5.Vector.fromAngle(random(TAU)).mult(r * (1 - params.Ratio));
        translate(p.x, p.y);
        fill(random(255), random(255), random(255), 255 / log(i));
        r *= params.Ratio;
        ellipse(0, 0, 2 * r);
    }
};
var ppg = function (pg) {
    pg.randomSeed(params.Random_Seed);
    pg.noStroke();
    pg.fill(pg.random(255), pg.random(255), pg.random(255));
    pg.translate(pg.width / 2, pg.height / 2);
    var r = pg.height / 2;
    pg.ellipse(0, 0, 2 * r);
    for (var i = 3; i < 150; ++i) {
        var p = p5.Vector.fromAngle(pg.random(TAU)).mult(r * (1 - params.Ratio));
        pg.translate(p.x, p.y);
        pg.fill(pg.random(255), pg.random(255), pg.random(255), 255 / log(i));
        r *= params.Ratio;
        pg.ellipse(0, 0, 2 * r);
    }
};
function draw() {
    background(0);
    pp();
}
function keyPressed() {
    if (key === ' ')
        params.Random_Seed = floor(random() * 1000);
    if (key == 's') {
        params.Download_Image();
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map