class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

 class Face {
  constructor(...indices) {
    this.indices = indices;
  }
}

class Mesh {
  constructor() {
    this.vertices = [];
    this.faces = [];
  }

  addVertex(x, y, z) {
    this.vertices.push(new Vector3(x, y, z));
    return this.vertices.length - 1;
  }

  addFace(...indices) {
    this.faces.push(new Face(...indices));
  }
}

class TriakisTetrahedronCreator {
  constructor() {
    this.a = 5 / 3;
    this.mesh = null;
  }

  create() {
    this.initializeMesh();
    this.createVertices();
    this.createFaces();
    return this.mesh;
  }

  initializeMesh() {
    this.mesh = new Mesh();
  }

  createVertices() {
    this.createTetrahedronVertices();
    this.createMidEdgeVertices();
  }

  createTetrahedronVertices() {
    this.addVertex(this.a, this.a, this.a);
    this.addVertex(this.a, -this.a, -this.a);
    this.addVertex(-this.a, -this.a, this.a);
    this.addVertex(-this.a, this.a, -this.a);
  }

  createMidEdgeVertices() {
    this.addVertex(1, -1, 1);
    this.addVertex(-1, 1, 1);
    this.addVertex(1, 1, -1);
    this.addVertex(-1, -1, -1);
  }

  createFaces() {
    this.addFace(4, 0, 5);
    this.addFace(6, 1, 7);
    this.addFace(2, 4, 5);
    this.addFace(3, 6, 7);
    this.addFace(5, 0, 6);
    this.addFace(1, 4, 7);
    this.addFace(4, 2, 7);
    this.addFace(3, 5, 6);
    this.addFace(0, 4, 6);
    this.addFace(4, 1, 6);
    this.addFace(2, 5, 7);
    this.addFace(5, 3, 7);
  }

  addVertex(x, y, z) {
    this.mesh.addVertex(x, y, z);
  }

  addFace(...indices) {
    this.mesh.addFace(...indices);
  }
}

class RhombicDodecahedronCreator {
  constructor() {
    this.mesh = null;
  }

  create() {
    this.initializeMesh();
    this.createVertices();
    this.createFaces();
    return this.mesh;
  }

  initializeMesh() {
    this.mesh = new Mesh();
  }

  addVertex(x, y, z) {
    return this.mesh.addVertex(x, y, z);
  }

  addFace(...indices) {
    this.mesh.addFace(...indices);
  }

  createVertices() {
    this.createInnerVertices();
    this.createOuterVertices();
  }

  createInnerVertices() {
    this.addVertex(-1, 1, 1);
    this.addVertex(-1, 1, -1);
    this.addVertex(1, 1, -1);
    this.addVertex(1, 1, 1);
    this.addVertex(-1, -1, 1);
    this.addVertex(-1, -1, -1);
    this.addVertex(1, -1, -1);
    this.addVertex(1, -1, 1);
  }

  createOuterVertices() {
    this.addVertex(0, 2, 0);
    this.addVertex(0, -2, 0);
    this.addVertex(2, 0, 0);
    this.addVertex(-2, 0, 0);
    this.addVertex(0, 0, 2);
    this.addVertex(0, 0, -2);
  }

  createFaces() {
    this.addFace(8, 3, 10, 2);
    this.addFace(8, 0, 12, 3);
    this.addFace(8, 1, 11, 0);
    this.addFace(8, 2, 13, 1);
    this.addFace(9, 7, 12, 4);
    this.addFace(9, 6, 10, 7);
    this.addFace(9, 5, 13, 6);
    this.addFace(9, 4, 11, 5);
    this.addFace(4, 12, 0, 11);
    this.addFace(7, 10, 3, 12);
    this.addFace(6, 13, 2, 10);
    this.addFace(5, 11, 1, 13);
  }
}

class ScaleModifier {
  constructor(sx, sy, sz) {
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;
  }

  apply(mesh) {
    for (let v of mesh.vertices) {
      v.x *= this.sx;
      v.y *= this.sy;
      v.z *= this.sz;
    }
  }
}

class Button {
  constructor() {
    this.x = 10;
    this.y = 10;
  }

  onDraw() {
    push();
    translate(-width / 2, -height / 2);
    fill(128);
    rect(0, 0, 200, 20);
    pop();
  }
}

let normalsVisible = true;

class Workspace {
  constructor() {
    this.axisSize = 2000;
    this.xAxisVisible = false;
    this.yAxisVisible = false;
    this.zAxisVisible = false;
    this.gridVisible = true;
    this.rotationX = 0;
    this.rotationY = 0;
    this.scale = 100;
  }

  onDraw() {
    ambientLight(100);
    directionalLight(255, 255, 255, 1, 1, -1);
    directionalLight(127, 127, 127, -1, -1, 1);
    scale(this.scale);
    rotateX(this.rotationX);
    rotateY(this.rotationY);
    this.drawAxis(this.axisSize);
    this.drawGrid(1, 30, 30);
    fill(255);
    ambientMaterial(128, 128, 128);
  }

  drawAxis(axisSize) {
    if (this.xAxisVisible) {
      stroke(255, 0, 0);
      line(-axisSize, 0, 0, axisSize, 0, 0);
    }
    if (this.yAxisVisible) {
      stroke(0, 255, 0);
      line(0, -axisSize, 0, 0, axisSize, 0);
    }
    if (this.zAxisVisible) {
      stroke(0, 0, 255);
      line(0, 0, -axisSize, 0, 0, axisSize);
    }
  }

  drawGrid(size, rows, cols) {
    if (!this.gridVisible) return;
    stroke(74);
    noFill();
    push();
    rotateX(radians(-90));
    translate(-(cols * size) / 2, -(rows * size) / 2);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rect(j * size, i * size, size, size);
      }
    }
    pop();
  }

  onMouseWheel(amount) {
    this.scale -= amount * 0.1;
    if (this.scale < 0.01) this.scale = 0.01;
  }

  onMouseDragged(left) {
    if (!left) return;
    let rx = this.rotationX + (pmouseY - mouseY) * TWO_PI / 1000;
    let ry = this.rotationY - (pmouseX - mouseX) * TWO_PI / 1000;
    this.rotationX = rx;
    this.rotationY = ry;
  }
}

let pickingBuffer;
let selectedFaceIndex = -1;
let workspace = new Workspace();
let button = new Button();
let mesh;
let font;

function preload() {
  font = loadFont('/assets/ARIAL.TTF'); // sicherstellen, dass Datei vorhanden ist
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pickingBuffer = createGraphics(windowWidth, windowHeight, WEBGL);
  textFont('sans-serif'); // oder 'Arial', 'Georgia', etc.
  createMesh();
}

function createMesh() {
  // const cubeCreator = new CubeCreator(1);
  //  mesh = cubeCreator.create();
  
//  const rhombicCreator = new RhombicDodecahedronCreator();
//  mesh = rhombicCreator.create();
  
  const creator = new TriakisTetrahedronCreator();
  mesh = creator.create();

  // Optional: Transform the cube
  //const scale = new ScaleModifier(1, 3, 1);
  //scale.apply(mesh);
}

function draw() {
  smooth(8);
  background(58);
  workspace.onDraw();
  //drawPickingBuffer();
  drawMesh();
  // drawMesh2();
  //translate(3, 0, 0);
  //button.onDraw();
  drawUI();
}

function drawUI() {
	gl = this._renderer.GL;
	gl.disable(gl.DEPTH_TEST);
    noLights();
	camera();
	push();
	translate(-windowWidth / 2, -windowHeight / 2);
	drawMenuBar();
	pop();
	gl.enable(gl.DEPTH_TEST);
}

function drawMenuBar() {
	fill(0);
	noStroke();
	rect(0, 0, windowWidth, 30);
	
		fill(128);
	textSize(20);
	text('Hello World! ArtifactForms - JS Port Prototype', 100, 100);
}

function drawNormals() {

}

function drawMesh() {
  noStroke();
  fill(180);
  
  for (let face of mesh.faces) {
    if (face.indices.length < 3) continue;

    // Normale berechnen
    const a = mesh.vertices[face.indices[0]];
    const b = mesh.vertices[face.indices[1]];
    const c = mesh.vertices[face.indices[2]];
    const ab = createVector(b.x - a.x, b.y - a.y, b.z - a.z);
    const ac = createVector(c.x - a.x, c.y - a.y, c.z - a.z);
    const faceNormal = ab.cross(ac).normalize();

    beginShape();
    normal(faceNormal.x, faceNormal.y, faceNormal.z); // <<< LICHT funktioniert jetzt korrekt
    for (let index of face.indices) {
      const v = mesh.vertices[index];
      vertex(v.x, v.y, v.z);
    }
    endShape(CLOSE);
  }
  
  	if(!normalsVisible)
		return;

  // Zeichne Normalen
  stroke(0, 255, 255); // Cyan für Normale
  strokeWeight(1);
  for (let face of mesh.faces) {
    if (face.indices.length < 3) continue;

    const a = mesh.vertices[face.indices[0]];
    const b = mesh.vertices[face.indices[1]];
    const c = mesh.vertices[face.indices[2]];

    const ab = createVector(b.x - a.x, b.y - a.y, b.z - a.z);
    const ac = createVector(c.x - a.x, c.y - a.y, c.z - a.z);
    const normal = ab.cross(ac).normalize();

    // Mittelpunkt der Fläche
    let center = createVector(0, 0, 0);
    for (let index of face.indices) {
      const v = mesh.vertices[index];
      center.add(createVector(v.x, v.y, v.z));
    }
    center.div(face.indices.length);

    // Zeichne Linie für die Normale
    const normalLength = 0.2;
    const endpoint = p5.Vector.add(center, p5.Vector.mult(normal, normalLength));

    line(center.x, center.y, center.z, endpoint.x, endpoint.y, endpoint.z);
  }
}

function drawMesh2() {
  noStroke();

  for (let i = 0; i < mesh.faces.length; i++) {
    const face = mesh.faces[i];
    if (face.indices.length < 3) continue;

    if (i === selectedFaceIndex) fill(255, 0, 0); // Highlight Rot
    else fill(180);

    drawFace(face);
  }
}

function drawPickingBuffer() {
	pickingBuffer.clear();
	pickingBuffer.background(0);
	pickingBuffer.noStroke();

	pickingBuffer.push();
	pickingBuffer.scale(workspace.scale);
	pickingBuffer.rotateX(workspace.rotationX);
	pickingBuffer.rotateY(workspace.rotationY);

	for (let i = 0; i < mesh.faces.length; i++) {
		const face = mesh.faces[i];
		if (face.indices.length < 3) continue;

    // Face-ID als Farbe codieren (z.B. in R-Kanal)
    let r = (i + 1) / 255; // +1, da 0 = kein Face
    pickingBuffer.fill(r * 255, 0, 0);
    drawFace(face, pickingBuffer);
  }
  pickingBuffer.pop();
}

function drawFace(face, gfx = null) {
  const context = gfx || window; // default draw in main canvas
  context.beginShape();
  for (let index of face.indices) {
    const v = mesh.vertices[index];
    context.vertex(v.x, v.y, v.z);
  }
  context.endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseDragged() {
  workspace.onMouseDragged(mouseButton === LEFT);
}

function mouseWheel(event) {
  workspace.onMouseWheel(event.delta);
}

function mouseMoved() {
  // Mausposition im Backbuffer abfragen, p5 hat (0,0) oben links im Canvas:
  let px = mouseX;
  let py = mouseY;

  // Korrigiere Koordinaten, falls nötig (WEBGL canvas mit Verschiebungen)
  // p5 mit WEBGL hat origin in Canvas Mitte, evtl. Mouse Koords anpassen:
  px = constrain(px, 0, width - 1);
  py = constrain(py, 0, height - 1);

  let c = pickingBuffer.get(px, py);
  if (c[0] === 0) {
    selectedFaceIndex = -1; // keine Auswahl
  } else {
    selectedFaceIndex = c[0] - 1; // Face Index aus rotem Kanal
  }
}

function keyTyped() {
  if (key === 'n') {
   normalsVisible = !normalsVisible;
  }
}
