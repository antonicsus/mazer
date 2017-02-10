function Cell(x, y, s) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.current = false;
  this.visited = false;
  this.walls = [true, true, true, true];

  this.makeCurrent = function() {
    this.visited = true;
    this.current = true;
  }

  this.notCurrent = function() {
    this.current = false;
  }

  this.encolor = function() {
    noStroke();
    if (this.visited) {
      fill(255);
    } else {
      fill(200);
    }
    if (this.current) {
      fill(255, 105, 180);
    }
    rect(x, y, x+s, y+s);
  }

  this.show = function() {
    //color cell
    this.encolor();

    //make needed walls
    stroke(80);
    if (this.walls[0]) {
      line(x, y, x+s-1, y);
    }
    if (this.walls[1]) {
      line(x+s-1, y, x+s-1, y+s-1);
    }
    if (this.walls[2]) {
      line(x+s-1, y+s-1, x, y+s-1);
    }
    if (this.walls[3]) {
      line(x, y, x, y+s-1);
    }
  }
}
