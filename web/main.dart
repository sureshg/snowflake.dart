// Copyright (c) 2017, Suresh. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:math';

void main() {
  var snowStorm = new SnowStorm("snowstorm", new Effect(windSpeed: 0.5), 100);
  snowStorm.start();
  print("Animation started!");
}

class Effect {
  /// shimmering effect (small side-to-side movements).
  bool shimmering;

  /// Snowflakes wind speed. Larger snowflakes move faster than
  /// smaller snowflakes this creates an illusion of distance.
  double windSpeed;

  /// Constructor new effect
  /// [shimmering] defaults value is `true`
  /// [windSpeed] default value is 0.3
  Effect({this.shimmering = true, this.windSpeed = 0.3});
}

class Snowflake {
  /// x coordinate of the flake.
  num x;

  ///  y coordinate of the flake.
  num y;

  /// Snowflake effect.
  Effect effect;

  /// Snowflake radius (always been between 2 and 6).
  int radius = SnowStorm.rand.nextInt(6) + 1;

  /// Larger snowflakes move faster than smaller snowflakes
  /// this creates an illusion of distance.
  double get xVelocity => this.radius * effect.windSpeed;

  /// Larger snowflakes move faster than smaller snowflakes
  /// this creates an illusion of distance.
  double get yVelocity => this.radius / 2;

  Snowflake(this.x, this.y, this.effect);

  /// Moves the snowflake across the canvas by the velocity.
  void move() {
    x += xVelocity;
    y += yVelocity;
    if (effect.shimmering) {
      x += 1 - SnowStorm.rand.nextDouble() + 0.5;
    }
  }

  /// Animate in the given [canvas] element.
  animate(CanvasElement canvas) async {
    // Draw the snowflake
    var ctx = canvas.context2D
      ..beginPath()
      ..arc(x, y, radius, 0, 2 * PI, false)
      ..setFillColorRgb(255, 255, 255, 0.4)
      ..fill();
    // then move
    move();
    // and recycle.
    recycle(canvas);
  }

  /// Recycle the snowflake if it reaches the bottom of the canvas.
  void recycle(CanvasElement canvas) {
    // Moves the snowflake to the left of the canvas once it reaches the
    // rightmost position. This is for positive windSpeed directions.
    if (x > canvas.width && xVelocity > 0) x = 0;

    // Moves the snowflake to the right of the canvas once it reaches the
    // leftmost position. This is for negative windSpeed directions.
    if (x < 0 && xVelocity < 0) x = canvas.width;

    // Moves the snowflake to the top of the canvas once it reaches the bottom.
    if (y > canvas.height) y = 0;
  }
}

class SnowStorm {
  static Random rand = new Random();

  /// Snowflake effect.
  Effect effect;

  /// Number of snowflakes to render.
  int numOfSnowFlakes;

  /// Canvas element.
  CanvasElement _canvas;

  /// List of all snow flakes.
  List<Snowflake> _snowflakes;

  bool _animate = true;

  SnowStorm(String canvasId, this.effect, this.numOfSnowFlakes) {
    _canvas = document.getElementById(canvasId) as CanvasElement;
    // Make canvas transparent and black.
    _canvas.context2D
      ..fillStyle = "transparent"
      ..setFillColorRgb(0, 0, 0)
      ..fillRect(0, 0, _canvas.width, _canvas.height);

    _snowflakes = new List<Snowflake>();
    for (int i = 0; i < numOfSnowFlakes; i++) {
      // position the snowflakes randomly on the canvas.
      var flake = new Snowflake(rand.nextDouble() * _canvas.width,
          rand.nextDouble() * _canvas.height, effect);
      _snowflakes.add(flake);
    }
  }

  start() async {
    while (true) {
      // Clear the canvas every time we animate all of the snowflakes.
      _canvas.context2D.clearRect(0, 0, _canvas.width, _canvas.height);
      // Animate every individual snowflake.
      _snowflakes.forEach((Snowflake s) => s.animate(_canvas));
      await window.animationFrame;
      if (!_animate) break;
    }
  }

  stop() async {
    _animate = false;
  }
}
