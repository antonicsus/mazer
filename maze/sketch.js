var view_rc = 400;
var maze_rc = 25;
var cells = [];
var stuck = [];
var current;

function setup() {
  createCanvas(view_rc, view_rc).parent('maze');
  launchSketch();
}

function launchSketch() {
  cells = [];
  stuck = [];
  cell_wh = floor(view_rc / maze_rc);
  for (var j = 0; j < maze_rc; j++) {
    for (var i = 0; i < maze_rc; i++) {
      cells.push( new Cell(i*cell_wh, j*cell_wh, cell_wh) );
    }
  }
  cells[0].walls[0] = false;
  cells[cells.length-1].walls[2] = false;
  current = 0;
  cells[current].makeCurrent();
}

function resetSketch() {
  console.log('reset');
  if (stuck.length == 0) {
    // if reset pressed after last sketch ended
    launchSketch();
    loop();
  } else {
    // if reset pressed while sketch running
    launchSketch();
  }
}

function move() {
  var choices = [];
  if (current >= maze_rc && cells[current-maze_rc].visited == false) {
    // TOP
    choices.push('TOP');
  }
  if ((current+1) % maze_rc != 0 && cells[current+1].visited == false) {
    // RIGHT
    choices.push('RIGHT');
  }
  if (current < maze_rc*maze_rc-maze_rc && cells[current+maze_rc].visited == false) {
    // BOTTOM
    choices.push('BOTTOM');
  }
  if ((current) % maze_rc != 0 && cells[current-1].visited == false) {
    // LEFT
    choices.push('LEFT');
  }

  if (choices.length == 0) {
    // Backtracking
    if (stuck.length > 0) {
      // Go back one step
      var last = stuck.pop();
      cells[current].notCurrent();
      current = last;
      cells[last].makeCurrent();
    } else {
      // No more cells left
      cells[current].notCurrent();
      cells[current].show();
      console.log('done =)');
      noLoop();
    }
  } else {
    // Move to a random unvisited cell
    var choice = random(choices);
    switch (choice) {
      case 'TOP':
        // TOP
        stuck.push(current);
        cells[current].walls[0] = false;
        cells[current].notCurrent();
        // Change current
        current -= maze_rc;
        cells[current].walls[2] = false;
        cells[current].makeCurrent();
        break;
      case 'RIGHT':
        // RIGHT
        stuck.push(current);
        cells[current].walls[1] = false;
        cells[current].notCurrent();
        // Change current
        current++;
        cells[current].walls[3] = false;
        cells[current].makeCurrent();
        break;
      case 'BOTTOM':
        // BOTTOM
        stuck.push(current);
        cells[current].walls[2] = false;
        cells[current].notCurrent();
        // Change current
        current += maze_rc;
        cells[current].walls[0] = false;
        cells[current].makeCurrent();
        break;
      case 'LEFT':
        // LEFT
        stuck.push(current);
        cells[current].walls[3] = false;
        cells[current].notCurrent();
        // Change current
        current--;
        cells[current].walls[1] = false;
        cells[current].makeCurrent();
        break;
      default:
        console.log('some error when deciding');
    }
  }
}

function draw() {
  background(255);
  for (var j = 0; j < maze_rc; j++) {
    for (var i = 0; i < maze_rc; i++) {
      cells[i+j*maze_rc].show();
    }
  }
  move();
}
