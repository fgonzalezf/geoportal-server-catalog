define(["dojo/_base/declare", 
        "dojo/_base/lang",
        "dojo/has",
        "esri/dijit/metadata/base/Descriptor",
        "esri/dijit/metadata/form/Element",
        "esri/dijit/metadata/form/Tabs",
        "esri/dijit/metadata/types/iso/gmd/dataQuality/Quality",
        "esri/dijit/metadata/types/iso/gmd/distribution/Distribution",
        "../gmd/identification/DataIdentification",
        "../gmd/metadataEntity/MetadataSection",
        "dojo/text!./templates/DataRoot.html"],
function(declare, lang, has, Descriptor, Element, Tabs, Quality, Distribution, DataIdentification, MetadataSection,
  template) {

  var oThisClass = declare(Descriptor, {

    templateString: template

  });

  return oThisClass;
});