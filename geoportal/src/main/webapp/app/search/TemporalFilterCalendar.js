/* See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * Esri Inc. licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/aspect",
        "dijit/form/DateTextBox",
        "app/common/Templated",
        "app/common/ModalDialog",
        "dojo/text!./templates/TemporalFilterCalendar.html",
        "dojo/i18n!app/nls/resources" ], 
function(declare, lang, aspect, DateTextBox, Templated, ModalDialog, template, i18n) {
  
  var oThisClass = declare([Templated], {
    
    i18n: i18n,
    templateString: template,
    
    dialog: null,
    targetWidget: null,
    startDate: null,
    endDate: null,
    
    postCreate: function() {
      this.inherited(arguments);
      
      // Setting zIndex in openDropDown is necessary, otherwise callendars will appear behind 
      // the modal dialog box which has zIndex set to 1050.
      this.own(aspect.after(this.startDateCalendar, "openDropDown", lang.hitch(this, function(){
        this.startDateCalendar.dropDown._popupWrapper.style.zIndex=1100;
        this.own(aspect.after(this.startDateCalendar.dropDown.monthWidget, "openDropDown", lang.hitch(this, function(){
          this.startDateCalendar.dropDown.monthWidget.dropDown._popupWrapper.style.zIndex = 1101;
        })));
      })));
      this.own(aspect.after(this.endDateCalendar, "openDropDown", lang.hitch(this, function(){
        this.endDateCalendar.dropDown._popupWrapper.style.zIndex=1100;
        this.own(aspect.after(this.endDateCalendar.dropDown.monthWidget, "openDropDown", lang.hitch(this, function(){
          this.endDateCalendar.dropDown.monthWidget.dropDown._popupWrapper.style.zIndex = 1101;
        })));
      })));
    },
    
    getTitle: function() {
      if (this.targetWidget) {
        return this.targetWidget.label;
      }
      return null;
    },
    
    hideDialog: function() {
      if (this.dialog) this.dialog.hide();
    },
    
    init: function() {
      this.startDateCalendar.set('value', this.startDate);
      this.endDateCalendar.set('value', this.endDate);
    },
    
    focus: function() {
    },
    
    showDialog: function() {
      var self = this, dialog = null;
      this.init();
      this.dialog = dialog = new ModalDialog({
        content: this.domNode,
        title: this.getTitle(),
        onHide: function() {
          self.destroyRecursive(false);
        }, 
        onShow: function() {
          self.focus();
        },
        onOkClicked: function() {
          self.validateAndApply();
        }
      });
      dialog.show();
    },
    
    validateAndApply: function() {
      this.targetWidget.updateRange(this.startDateCalendar.get('value'), this.endDateCalendar.get('value'));
      this.hideDialog();
    }
    
  });
  
  return oThisClass;
});