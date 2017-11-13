// Global constants
var CIRCLE_SIZE = 20;
var CANVAS_WIDTH = 700;
var CANVAS_HEIGHT = 550;
var COLOR_BG = '#043A4A';
var COLOR_MIN = '#F9B182';
var COLOR_MAX = '#E17DA4';
var NUMBER_OF_STRANDS = 2;
var CIRCLE_DISTANCE_Y = 25;
var CIRCLE_DISTANCE_X = 45;
var NUMBER_OF_COLUMNS = 15;
var NUMBER_OF_CIRCLES_PER_COLUMN = 15;

// Global Timer
var timer = 0;

// Get the main container
var mainContainer = document.getElementById('mainContainer');

// Circle class
var Circle = function(x, y, size, color) {
  this.context;

  if (!x) x = 0;
  if (!y) y = 0;
  if (!size) size = CIRCLE_SIZE;
  if (!color) color = COLOR_MIN;

  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;

  this.setX = function(x) {
    this.x = x;
  }

  this.setY = function(y) {
    this.y = y;
  }

  this.setSize = function(size) {
    this.size = size;
  }

  this.setColor = function(color) {
    this.color = color;
  }

  this.setContext = function(context) {
    this.context = context;
  }

  this.draw = function() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}

// Strand class
var Strand = function() {
  this.phase;
  this.updatePhase = function(phase, index) {
    this.phase = phase + interpolate(index, 0, NUMBER_OF_STRANDS, 0, 2 * Math.PI);
  }

  // Setup 2D array of circles
  this.circles = [];
  this.init = function(context) {
    for(var col = 0; col < NUMBER_OF_COLUMNS; col++) {
      this.circles.push([]);
      for(var row = 0; row < NUMBER_OF_CIRCLES_PER_COLUMN; row++) {
        var circle = new Circle();
        circle.setContext(context)
        this.circles[col].push(circle)
      }
    }
  }

  this.animate = function(phase, index) {
    this.updatePhase(phase, index);

    for(var col = 0; col < NUMBER_OF_COLUMNS; col++) {
      for(var row = 0; row < NUMBER_OF_CIRCLES_PER_COLUMN; row++) {
        var xOffset = interpolate(col, 0, NUMBER_OF_COLUMNS, 0, Math.PI);
        var x = interpolate(col, 0, NUMBER_OF_COLUMNS, CIRCLE_DISTANCE_X, NUMBER_OF_COLUMNS * CIRCLE_DISTANCE_X);
        var y = 100 + row * CIRCLE_DISTANCE_Y  + Math.sin(this.phase + xOffset) * 50;
        var sizeOffset = (Math.cos(this.phase - (row / NUMBER_OF_CIRCLES_PER_COLUMN) + xOffset) + 1) * 0.5;
        var circleSize = sizeOffset * CIRCLE_SIZE;

        this.circles[col][row].setX(x);
        this.circles[col][row].setY(y);
        this.circles[col][row].setSize(circleSize);
        this.circles[col][row].setColor(generateColor(COLOR_MIN, COLOR_MAX, row, NUMBER_OF_CIRCLES_PER_COLUMN));
        this.circles[col][row].draw();
      }
    }
  }
}

// Animation class
var Animation = function() {
  var that = this;

  this.phase = 0;
  this.speed = 0.05;

  this.context;
  this.setContext = function(context) {
    this.context = context;
  }

  this.updatePhase = function() {
    this.phase = timer * this.speed;
  }

  this.strands = [];

  this.init = function() {
    for(var i = 0; i < NUMBER_OF_STRANDS; i++) {
      var strand = new Strand();
      strand.init(this.context);
      this.strands.push(strand);
    }
  }

  this.start = function() {
    this.updatePhase();

    this.strands.forEach(function(strand, i) {
      strand.animate(that.phase, i);
    });
  }
}

// Canvas class
var Canvas = function() {
  var that = this;

  this.element = document.createElement('canvas');
  this.element.setAttribute('width', CANVAS_WIDTH);
  this.element.setAttribute('height', CANVAS_HEIGHT);
  mainContainer.appendChild(this.element);

  this.context = this.element.getContext('2d');

  this.animation;

  this.init = function() {
    this.animation = new Animation();
    this.animation.setContext(this.context);
    this.animation.init();

    setInterval(function() {
      // Update global timer
      timer++;

      that.clear();
      that.paintBG();

      that.animation.start();
    }, 50);
  }

  this.clear = function() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  this.paintBG = function() {
    this.context.beginPath();
    this.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.fillStyle = COLOR_BG;
    this.context.fill();
    this.context.closePath();
  }
}

// Initialization
var canvas = new Canvas();
canvas.init();
