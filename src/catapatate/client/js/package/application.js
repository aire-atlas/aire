
dojo.provide('package.application');

// third-party
dojo.require('package.proj4js');
dojo.require('package.openlayers');

// basic
dojo.require('jig.workspace');
dojo.require('ploomap.tool.layer.Simple');
dojo.require('ploomap.tool.layer.Select');

// initial cacoins
dojo.require('jig.layout.RootPane');
dojo.require('jig.layout.BorderContainer');
dojo.require('ploomap.map.Geoportal');
dojo.require('ploomap.tool.Layers');
dojo.require('catapatate.info.About');
dojo.require('ploomap.tool.OverviewMap');

// application-specific
dojo.require('catapatate.layerDef.Application');
dojo.require('catapatate.layerLibrary.Application');

// tools
dojo.require('ploomap.tool.Export');
dojo.require('ploomap.tool.StreetView');
dojo.require('ploomap.tool.OverviewMap');
dojo.require('ploomap.tool.Itineraries');
dojo.require('jig.tool.UserFeedback');

// Optional
//dojo.require('package.presentationView');
