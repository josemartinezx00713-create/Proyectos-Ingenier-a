const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Segment {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = 0;
    this.tx = x;
    this.ty = y;
  }

  follow(tx, ty) {
    let dx = tx - this.x;
    let dy = ty - this.y;
    this.angle = Math.atan2(dy, dx);
    let dist = Math.sqrt(dx * dx + dy * dy);

    // Si la distancia es grande, se "estira"
    let stretch = Math.min(dist / this.length, 2);
    this.tx = tx - Math.cos(this.angle) * this.length * stretch;
    this.ty = ty - Math.sin(this.angle) * this.length * stretch;
    this.x = this.tx;
    this.y = this.ty;
  }

  draw(i, time) {
    // Dibujar el cuerpo
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + Math.cos(this.angle) * this.length,
      this.y + Math.sin(this.angle) * this.length
    );
    ctx.stroke();

    // Centro del segmento
    let midX = this.x + Math.cos(this.angle) * this.length / 2;
    let midY = this.y + Math.sin(this.angle) * this.length / 2;

    // Vector perpendicular
    let px = -Math.sin(this.angle);
    let py = Math.cos(this.angle);

    // Movimiento de patas
    
    let legLength = 50;
    let step = Math.sin(time * 0.1 + i * 0.9) * 5;

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX + px * (legLength + step), midY + py * (legLength + step));
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - px * (legLength + step), midY - py * (legLength + step));
    ctx.stroke();
  }
}

let segments = [];
let numSegments = 30;
let segLength = 20;

// Crear segmentos
for (let i = 0; i < numSegments; i++) {
  segments.push(new Segment(mouse.x, mouse.y, segLength));
}

let time = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Primer segmento sigue al mouse
  segments[0].follow(mouse.x, mouse.y);

  // Cada segmento sigue al anterior
  for (let i = 1; i < segments.length; i++) {
    segments[i].follow(
      segments[i - 1].x,
      segments[i - 1].y
    );
  }

  // Dibujar de cabeza a cola
  for (let i = 0; i < segments.length; i++) {
    segments[i].draw(i, time);
  }

  time++;
  requestAnimationFrame(animate);
}

animate();