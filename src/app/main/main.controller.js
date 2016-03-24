'use strict';

angular.module('inspinia')
  .controller('MainCtrl', function ($scope, gettextCatalog) {

      var lang = 'pt_PT';
      gettextCatalog.debug = true;
      gettextCatalog.setCurrentLanguage(lang);
      gettextCatalog.loadRemote("/assets/i18n/"+lang+".json");

      this.userName = 'Example user';
      this.helloText = 'Welcome in INSPINIA Gulp SeedProject';
      this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

  });
