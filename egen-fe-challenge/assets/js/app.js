angular.module('app', [])
.controller('PhoneNumberController', ['$scope', 'PhoneNumberService', function ($scope, PhoneNumberService) {
   $scope.phoneNumber = '';
 }])
.service('PhoneNumberService', [function() {
 

}])
.filter('phoneNumberFormatter', function() {
   return function(phoneNumber, countryCode) {
      if(phoneNumber != '') {
         switch(countryCode) {
         case '1':
            var formattedPhoneNumber = countryCode + '-'; 
            if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
               return formattedPhoneNumber + phoneNumber.slice(0,3) + '-' + phoneNumber.slice(3,6);
            }
            if (phoneNumber.length > 6){
               return formattedPhoneNumber + phoneNumber.slice(0,3) + '-' + phoneNumber.slice(3,6) + '-' + phoneNumber.slice(6);
            } else {
               return formattedPhoneNumber + phoneNumber;
            }
            break;
         case '31':
            var formattedPhoneNumber = '+' + countryCode + ' ';
            if(phoneNumber.length > 2) {
               return formattedPhoneNumber + phoneNumber.slice(0,2) + ' ' + phoneNumber.slice(2);
            } else {
               return formattedPhoneNumber + phoneNumber;
            }
            break;
         case '8':
            var formattedPhoneNumber = countryCode + ' ';
            if(phoneNumber.length > 4 && phoneNumber.length <= 5) {
               return formattedPhoneNumber + phoneNumber.slice(0,4) + ' ' + phoneNumber.slice(4);
            } else if(phoneNumber.length > 5 && phoneNumber.length <= 7) {
               return formattedPhoneNumber + phoneNumber.slice(0,4) + ' ' + phoneNumber.slice(4,6) + '-' + phoneNumber.slice(6);
            } else if(phoneNumber.length > 7) {
               return formattedPhoneNumber + phoneNumber.slice(0,4) + ' ' + phoneNumber.slice(4,6) + '-' + phoneNumber.slice(6,8) + '-' + phoneNumber.slice(8);
            } else {
               return formattedPhoneNumber + phoneNumber;
            }
            break;
         case '91':
            return '+' + countryCode + '-' + phoneNumber.slice(0,3) + ' ' + phoneNumber.slice(3,6) + ' ' + phoneNumber.slice(6);
            break;
         case '63':
            var formattedPhoneNumber = '+' + countryCode + ' ' + '(';
            if(phoneNumber.length > 3) {
               return formattedPhoneNumber + phoneNumber.slice(0,3) + ')' + ' ' + phoneNumber.slice(3,6) + ' ' + phoneNumber.slice(6);
            } else {
               return formattedPhoneNumber + phoneNumber;
            }
            break;
         default:
            if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
               return phoneNumber.slice(0,3) + '-' + phoneNumber.slice(3,6);
            }
            if (phoneNumber.length > 6){
               return phoneNumber.slice(0,3) + '-' + phoneNumber.slice(3,6) + '-' + phoneNumber.slice(6);
            } else {
               return phoneNumber;
            }
            break;
         }
      }
   }
});

describe('Unit Tests for Phone Number Formatter', function () {
  'use strict'; 

  var $filter;

  beforeEach(function () {
    module('app');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('Format 1234567890 As per US', function () {
    var phoneNumber = '1234567890',
    result;

    result = $filter('phoneNumberFormatter')(phoneNumber);

    expect(result).toEqual('123-456-7890');
  });

  it('Format 1234567890 As per Netherlands', function () {
    var phoneNumber = '1234567890',
    countryCode = '31',
    result;

    result = $filter('phoneNumberFormatter')(phoneNumber, countryCode);

    expect(result).toEqual('+31 12 34567890');
  });

  it('Format 1234567890 As per Russia', function () {
    var phoneNumber = '1234567890',
    countryCode = '8',
    result;

    result = $filter('phoneNumberFormatter')(phoneNumber, countryCode);

    expect(result).toEqual('8 1234 56-78-90');
  });

  it('Format 1234567890 As per India', function () {
    var phoneNumber = '1234567890',
    countryCode = '91',
    result;

    result = $filter('phoneNumberFormatter')(phoneNumber, countryCode);

    expect(result).toEqual('+91-123 456 7890');
  });

  it('Format 1234567890 As per Philippines', function () {
    var phoneNumber = '1234567890',
    countryCode = '63',
    result;

    result = $filter('phoneNumberFormatter')(phoneNumber, countryCode);

    expect(result).toEqual('+63 (123) 456 7890');
  });
  
});