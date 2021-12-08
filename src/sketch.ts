// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Ratio: 0.8,
    Random_Seed: 0,
    N: 33,
    Export_Size: 600,
    Download_Image: () => {
        const pg = createGraphics(params.Export_Size/2, params.Export_Size/2)
        pg.background(0, 0)
        ppg(pg)
        pg.save()
    },
}
gui.add(params, "Ratio", 0, 1, 0.01)
gui.add(params, "Random_Seed", 0, 10000, 1)
gui.add(params, "N", 3, 40, 1)
gui.add(params, "Export_Size", 1, 2000, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

const pp = () => {
    randomSeed(params.Random_Seed)
    noStroke()
    fill(random(255), random(255), random(255))
    translate(width/2, height/2)
    let r = height/2
    ellipse(0, 0, 2*r)
    for (let i = 3; i < params.N; ++i) {
        const p = p5.Vector.fromAngle(random(TAU)).mult(r * (1 - params.Ratio));
        translate(p.x, p.y)
        fill(random(255), random(255), random(255), 255 / log(i))
        r *= params.Ratio
        ellipse(0, 0, 2*r)
    }
}

const ppg = (pg: p5.Graphics) => {
    pg.randomSeed(params.Random_Seed)
    pg.noStroke()
    pg.fill(pg.random(255), pg.random(255), pg.random(255))
    pg.translate(pg.width/2, pg.height/2)
    let r = pg.height/2
    pg.ellipse(0, 0, 2*r)
    for (let i = 3; i < 150; ++i) {
        const p = p5.Vector.fromAngle(pg.random(TAU)).mult(r * (1 - params.Ratio));
        pg.translate(p.x, p.y)
        pg.fill(pg.random(255), pg.random(255), pg.random(255), 255 / log(i))
        r *= params.Ratio
        pg.ellipse(0, 0, 2*r)
    }
}

function draw() {
    background(0)
    pp()
}

function keyPressed() {
    if (key === ' ')
        params.Random_Seed = floor(random() * 1000)
    if (key == 's') {
        params.Download_Image()
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}