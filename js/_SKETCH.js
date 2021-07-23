const q = ((sketch) => {
  let qt, points;

  sketch.setup = () => {
    sketch.createCanvas(500, 500);
    qt = new QuadTree(5, new Rect(sketch.width / 2, sketch.height / 2, sketch.width, sketch.height));

    points = [];
    for (let i = 0; i < 150; i++) {
      let newPoint = new QtPoint(Math.random() * sketch.width, Math.random() * sketch.height);
      points.push(newPoint)
      qt.insert(newPoint);
    }
  }

  drawQuadTree = (qt) => {
    sketch.rect(qt.rect.x, qt.rect.y, qt.rect.w, qt.rect.h);
    if (qt.hasDivisions) {
      drawQuadTree(qt.nw);
      drawQuadTree(qt.ne);
      drawQuadTree(qt.sw);
      drawQuadTree(qt.se);
    }
  }

  sketch.mouseClicked = () => {
    const newPoint = new QtPoint(sketch.mouseX, sketch.mouseY);
    points.push(newPoint)
    qt.insert(newPoint);
  }


  sketch.draw = () => {
    sketch.background(255)

    sketch.stroke(0)
    sketch.strokeWeight(2);
    for (let point of points) {
      sketch.point(point.x, point.y);
    }

    sketch.rectMode(sketch.CENTER);
    sketch.stroke(0, 0, 0, 30);
    sketch.noFill();
    drawQuadTree(qt);

    // CONNECTIONS
    for (let point of points) {
      let arr = [];

      let mouseRect = new Rect(point.x, point.y, 200, 200);
      qt.query(mouseRect, arr);

      // for (let z of points) {
      //   if (point != z && Math.abs(point.x - z.x) < 200 && Math.abs(point.y - z.y) < 200)
      //     arr.push(z);
      // }

      for (let s of arr) {
        sketch.line(point.x, point.y, s.x, s.y);
      }
    }

    // FPS
    sketch.noStroke();
    sketch.fill(0);
    sketch.text(Math.round(sketch.frameRate()), 30, 30);

    // XRAY
    // let mouseRect = new Rect(sketch.mouseX, sketch.mouseY, 100, 100);
    // let arr = [];
    // qt.query(mouseRect, arr);
    // sketch.stroke(255, 0, 0);
    // sketch.noFill();
    // sketch.rect(sketch.mouseX, sketch.mouseY, 100, 100);
    // for (let s of arr) {
    //   sketch.point(s.x, s.y);
    // }
  }

})

new p5(q);
