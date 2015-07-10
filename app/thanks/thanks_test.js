'use strict';

describe('myApp.thanks module', function() {

  beforeEach(module('myApp.thanks'));

  describe('thanks controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var ThanksCtrl = $controller('ThanksCtrl');
      expect(ThanksCtrl).toBeDefined();
    }));

  });
});