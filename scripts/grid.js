/**
 * Created by Sarunas Tamasauskas
 */

'use strict';

(function (window) {
  /**
   * Class for creating grid
   * X
   * |
   * |
   * |
   * |-------Y
   *
   * @param  [columns]
   * @param  [rows]
   * @constructor
   */
  function Grid(columns, rows) {
    this.y = columns || 20;
    this.x = rows || 20;
    this.grid = [];
  }

  /**
   * Generates the matrix
   *
   * @returns {Grid}
   */
  Grid.prototype.generate = function () {
    for (var xAxis = 0; xAxis < this.x; xAxis++) {
      this.grid[xAxis] = [];
      for (var yAxis = 0; yAxis < this.y; yAxis++) {
        this.grid[xAxis][yAxis] = 0;
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
   * @param [figureArr]
   * @param [yOffset]
   * @param [xOffset]
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

    grid.forEach(function (row) {
      gridString += '*';
      row.forEach(function (column) {
        if (column === 0) {
          gridString += ' ';
        } else {
          gridString += '@';
        }
      });
      gridString += '*\n';
    });

    // Bottom border
    for (var i = 0; i < this.x + 2; i++) {
      gridString += '*';
    }

    // Send grid to html
    document.getElementById('tetris').innerHTML = gridString;

    return true;
  };


  /**
   * Checks if there is any problems with the new figure and then redraws
   *
   * @returns {boolean}
   */
  Grid.prototype.isCollision = function (figureArr, yOffset, xOffset) {
    var grid = this.grid.deepClone(); // create deep copy of a grid

    for (var x = 0; x < figureArr.length; x++) {
      for (var y = 0; y < figureArr[x].length; y++) {
        if (grid[x + yOffset][y + xOffset] === 1 && figureArr[x][y] === 1) {
          return false;
        } else if (!(grid[x + yOffset][y + xOffset] === 1)) {
          grid[x + yOffset][y + xOffset] = figureArr[x][y];
        }
      }
    }

    return grid;
  };

  /**
   * Ads figure to grid
   */
  Grid.prototype.addFigure = function (figureArr, yOffset, xOffset) {
    for (var x = 0; x < figureArr.length; x++) {
      for (var y = 0; y < figureArr[x].length; y++) {
        if (!(this.grid[x + yOffset][y + xOffset] === 1)) {
          this.grid[x + yOffset][y + xOffset] = figureArr[x][y];
        }
      }
    }
  };

  // Export to window
  window.app = window.app || {};
  window.app.Grid = Grid;
})(window);
