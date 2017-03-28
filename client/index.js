
// Meteor Imports
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/**
 ** LAYOUT ELEMENTS
 **/
$(document).ready(function(){

  // Create Tab Structure
  $(".panel-left").tabs();

  // Create Draggable Left/Right Elements
  $(".panel-left").resizable({
      autoHide: false,
      handles: 'e',
      resize: function(e, ui)
      {
          var parent = ui.element.parent();
          var remainingSpace = parent.width() - ui.element.outerWidth(),
              divTwo = ui.element.next(),
              divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width()))/parent.width()*100+"%";
              divTwo.width(divTwoWidth);
          window.dispatchEvent(new Event('resize'));
      },
      stop: function(e, ui)
      {
          var parent = ui.element.parent();
          ui.element.css(
          {
              width: ui.element.width()/parent.width()*100+"%",
          });
      }
    });

});

/**
 **  BLOCKLY
 **/
Template.blockly.onRendered(function() {
  var blocklyArea = document.getElementById('blockly_area');
  var blocklyDiv = document.getElementById('blockly_div');

  var workspace = Blockly.inject(blocklyDiv,
      {
        media: 'lib/google-blockly/media/',
        toolbox: document.getElementById('toolbox'),
        zoom:
          {controls: false,
           wheel: true,
           startScale: 1.0,
           maxScale: 3,
           minScale: 0.3,
           scaleSpeed: 1.2},
      }
  );

  var blockly_resize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  };
  window.addEventListener('resize', blockly_resize, false);
  blockly_resize();
  Blockly.svgResize(workspace);

});
