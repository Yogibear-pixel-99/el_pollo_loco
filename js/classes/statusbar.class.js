/**
 * Base class for the ui status bars.
 * Inherits from {@link DrawableObject}
 */
class Statusbar extends DrawableObject {
  /**
   * Width of the status bar.
   * @type {number}
   */
  width = 200;

  /**
   * Height of the status bar.
   * @type {number}
   */
  height = 50;

  constructor() {
    super();
  }
}
