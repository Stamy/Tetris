/**
 * Created by Sarunas Tamasauskas
 */

'use strict';

(function (window) {
  /**
   * Class for creating grid
   * Y
   * |      |
   * |      |
   * |      |
   * |-------X
   *
   * @param  [xSize]
   * @param  [ySize]
   * @constructor
   */
  function Grid(xSize, ySize) {
    this.xSize = xSize || 10;
    this.ySize = ySize || 20;
    this.grid = [];
  }

  /**
   * Generates the grid
   *
   * @returns {Grid}
   */
  Grid.prototype.generate = function () {
    for (var y = 0; y < this.ySize; y++) {
      this.grid[y] = [];
      for (var x = 0; x < this.xSize; x++) {
        this.grid[y][x] = 0;
      }
    }

    return this;
  };

  /**
   * Creates deep copy of grid array
   *
   * @returns {*}
   */
  Grid.prototype.get = function () {
    return JSON.parse(JSON.stringify(this.grid));
  };

  /**
   * Renders the grid
   *
   * @param figureArr
   * @param yOffset
   * @param xOffset
   * @returns {boolean}
   */
  Grid.prototype.render = function (figureArr, yOffset, xOffset) {
    var grid = this.grid;
    var gridString = '';

    // Check if the optional arguments are passed if so check if there
    // are not collisions and then render the temporary generated grid
    if( arguments.length = 3){
      var tempGrid = this.isCollision(figureArr, yOffset, xOffset);
      if(tempGrid){
        grid = tempGrid;
      } else {
        return false;
      }
    }

    // Rendering part
    var canvas = document.getElementById("myCanvas");
    var boxSize = 25;
    canvas.width = this.xSize * boxSize;
    canvas.height = this.ySize * boxSize;

    var ctx = canvas.getContext("2d");
    //ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#0000ff";
    ctx.lineWidth = 1;
    var cX = 0;
    var cY = 0;

    grid.forEach(function (row) {
      //gridString += '*';
      row.forEach(function (column) {
        if (column === 0) {
          // Empty box
          ctx.fillStyle = "#FFFFFF";
          ctx.strokeRect(cX, cY, boxSize, boxSize);
          ctx.fillRect(cX, cY, boxSize, boxSize);
        } else {
          // Filled box
          ctx.fillStyle = "#FF0000";
          ctx.strokeRect(cX, cY, boxSize, boxSize);
          ctx.fillRect(cX, cY, boxSize, boxSize);
        }
        cX += boxSize;
      });
      cX = 0;
      cY += boxSize;
    });

    return true;
  };


  /**
   * Checks if there is any problems with the new figure and then redraws
   *
   * @returns {boolean}
   */
  Grid.prototype.isCollision = function (figureArr, yOffset, xOffset) {
    var grid = this.grid.deepClone(); // create deep copy of a grid

    for (var y = 0; y < figureArr.length; y++) {
      for (var x = 0; x < figureArr[y].length; x++) {
        if (grid[y + yOffset][x + xOffset] === 1 && figureArr[y][x] === 1) {
          return false;
        } else if (!(grid[y + yOffset][x + xOffset] === 1)) {
          grid[y + yOffset][x + xOffset] = figureArr[y][x];
        }
      }
    }

    return grid;
  };

  /**
   * Ads figure to grid
   */
  Grid.prototype.addFigure = function (figureArr, yOffset, xOffset) {
    for (var y = 0; y < figureArr.length; y++) {
      for (var x = 0; x < figureArr[y].length; x++) {
        if (!(this.grid[y + yOffset][x + xOffset] === 1)) {
          this.grid[y + yOffset][x + xOffset] = figureArr[y][x];
        }
      }
    }

    this.deleteLine(figureArr, yOffset);
  };

  /**
   * Removes the full X line and inserts empty in the beginning
   *
   * @param figureArr
   * @param yOffset
   */
  Grid.prototype.deleteLine = function(figureArr, yOffset) {

    // Loop only where the new figure is added
    for (var y = yOffset; y < (figureArr.length + yOffset); y++) {
      for (var x = 0; x < this.xSize; x++) {
        if(this.grid[y][x] === 0){
          break;
        } else if (x === this.xSize - 1) {
          // Remove line
          this.grid.splice(y,1);

          // Add line to the first position
          this.grid.unshift([]);
          for (var x = 0; x < this.xSize; x++) {
            this.grid[0][x] = 0;
          }
        }
      }
    }
  };

  // Export to window
  window.app = window.app || {};
  window.app.Grid = Grid;
})(window);
