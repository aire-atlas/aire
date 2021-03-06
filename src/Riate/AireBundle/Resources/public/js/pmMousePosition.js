
/**
 * @requires OpenLayers/Control.js
 */

/**
 * Class: OpenLayers.Control.pmMousePosition
 */
OpenLayers.Control.pmMousePosition = OpenLayers.Class(OpenLayers.Control,
{
    
    /** 
     * Property: element
     * {DOMElement} 
     */
    element: null,
    
    /** 
     * APIProperty: prefix
     * {String}
     */
    prefix: '',
    
    /** 
     * APIProperty: separator
     * {String}
     */
    separator: ', ',
    
    /** 
     * APIProperty: suffix
     * {String}
     */
    suffix: '',
    
    /** 
     * APIProperty: numDigits
     * {Integer}
     */
    numdigits: 5,
    
    /** 
     * APIProperty: granularity
     * {Integer} 
     */
    granularity: 10,
    
    /** 
     * Property: lastXy
     * {<OpenLayers.LonLat>}
     */
    lastXy: null,

    /**
     * APIProperty: displayProjection
     * {<OpenLayers.Projection>} A projection that the 
     * mousecontrol will display.
     */
    displayProjection: null, 
    
    /**
     * Constructor: OpenLayers.Control.MousePosition
     * 
     * Parameters:
     * options - {DOMElement} Options for control.
     */
    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: destroy
     */
     destroy: function() {
         if (this.map) {
             this.map.events.unregister('mousemove', this, this.redraw);
         }
         OpenLayers.Control.prototype.destroy.apply(this, arguments);
     },

  activate: function() {
    if (this.active)
      return false;
    OpenLayers.Control.prototype.activate.apply(this, arguments);
    if (this.map)
      this.map.events.register( 'mousemove', this, this.redraw);
    if (this.element)
      this.element.style.display = 'block';
    this.draw();
    return true;
  },
  
  deactivate: function() {
    if (!this.active)
      return false;
    OpenLayers.Control.prototype.deactivate.apply(this, arguments);
    if (this.map)
      this.map.events.unregister('mousemove', this, this.redraw);
    if (this.element)
      this.element.style.display = 'none';
    return true;
  },
  
    /**
     * Method: draw
     * {DOMElement}
     */    
    draw: function() {
        OpenLayers.Control.prototype.draw.apply(this, arguments);

        if (!this.element) {
            this.div.left = "";
            this.div.top = "";
            this.element = this.div;
        }
        
        this.redraw();
        return this.div;
    },
   
    /**
     * Method: redraw  
     */
    redraw: function(evt) {
      if (!this.active)
	return;
      
        var lonLat;

        if (evt == null) {
            lonLat = new OpenLayers.LonLat(0, 0);
        } else {
            if (this.lastXy == null ||
                Math.abs(evt.xy.x - this.lastXy.x) > this.granularity ||
                Math.abs(evt.xy.y - this.lastXy.y) > this.granularity)
            {
                this.lastXy = evt.xy;
                return;
            }

            lonLat = this.map.getLonLatFromPixel(evt.xy);
            if (!lonLat) { 
                // map has not yet been properly initialized
                return;
            }    
            if (this.displayProjection) {
                lonLat.transform(this.map.getProjectionObject(), 
                                 this.displayProjection );
            }      
            this.lastXy = evt.xy;
            
        }
        
        var newHtml = this.formatOutput(lonLat);

        if (newHtml != this.element.innerHTML) {
            this.element.innerHTML = newHtml;
        }
    },

    /**
     * Method: formatOutput
     * Override to provide custom display output
     *
     * Parameters:
     * lonLat - {<OpenLayers.LonLat>} Location to display
     */
    formatOutput: function(lonLat) {
        var digits = parseInt(this.numdigits);
        var newHtml =
            this.prefix +
            lonLat.lon.toFixed(digits) +
            this.separator + 
            lonLat.lat.toFixed(digits) +
            this.suffix;
        return newHtml;
     },

    /** 
     * Method: setMap
     */
    setMap: function() {
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
//        this.map.events.register( 'mousemove', this, this.redraw);
    },     

    CLASS_NAME: "OpenLayers.Control.pmMousePosition"
});
