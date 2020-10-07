/*
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.15
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GeoPointResourceReq'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GeoPointResourceReq'));
  } else {
    // Browser globals (root is window)
    if (!root.ApiDocumentation) {
      root.ApiDocumentation = {};
    }
    root.ApiDocumentation.UpdateUserDto = factory(root.ApiDocumentation.ApiClient, root.ApiDocumentation.GeoPointResourceReq);
  }
}(this, function(ApiClient, GeoPointResourceReq) {
  'use strict';

  /**
   * The UpdateUserDto model module.
   * @module model/UpdateUserDto
   * @version 1.0
   */

  /**
   * Constructs a new <code>UpdateUserDto</code>.
   * @alias module:model/UpdateUserDto
   * @class
   * @param city {String} 
   * @param email {String} 
   * @param firstName {String} 
   * @param lastName {String} 
   * @param location {module:model/GeoPointResourceReq} 
   * @param phone {String} 
   * @param source {module:model/UpdateUserDto.SourceEnum} 
   * @param street {String} 
   * @param streetNo {String} 
   * @param zipCode {String} 
   */
  var exports = function(city, email, firstName, lastName, location, phone, source, street, streetNo, zipCode) {
    this.city = city;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.phone = phone;
    this.source = source;
    this.street = street;
    this.streetNo = streetNo;
    this.zipCode = zipCode;
  };

  /**
   * Constructs a <code>UpdateUserDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UpdateUserDto} obj Optional instance to populate.
   * @return {module:model/UpdateUserDto} The populated <code>UpdateUserDto</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('city'))
        obj.city = ApiClient.convertToType(data['city'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('firstName'))
        obj.firstName = ApiClient.convertToType(data['firstName'], 'String');
      if (data.hasOwnProperty('lastName'))
        obj.lastName = ApiClient.convertToType(data['lastName'], 'String');
      if (data.hasOwnProperty('location'))
        obj.location = GeoPointResourceReq.constructFromObject(data['location']);
      if (data.hasOwnProperty('phone'))
        obj.phone = ApiClient.convertToType(data['phone'], 'String');
      if (data.hasOwnProperty('source'))
        obj.source = ApiClient.convertToType(data['source'], 'String');
      if (data.hasOwnProperty('street'))
        obj.street = ApiClient.convertToType(data['street'], 'String');
      if (data.hasOwnProperty('streetNo'))
        obj.streetNo = ApiClient.convertToType(data['streetNo'], 'String');
      if (data.hasOwnProperty('zipCode'))
        obj.zipCode = ApiClient.convertToType(data['zipCode'], 'String');
    }
    return obj;
  }

  /**
   * @member {String} city
   */
  exports.prototype.city = undefined;

  /**
   * @member {String} email
   */
  exports.prototype.email = undefined;

  /**
   * @member {String} firstName
   */
  exports.prototype.firstName = undefined;

  /**
   * @member {String} lastName
   */
  exports.prototype.lastName = undefined;

  /**
   * @member {module:model/GeoPointResourceReq} location
   */
  exports.prototype.location = undefined;

  /**
   * @member {String} phone
   */
  exports.prototype.phone = undefined;

  /**
   * @member {module:model/UpdateUserDto.SourceEnum} source
   */
  exports.prototype.source = undefined;

  /**
   * @member {String} street
   */
  exports.prototype.street = undefined;

  /**
   * @member {String} streetNo
   */
  exports.prototype.streetNo = undefined;

  /**
   * @member {String} zipCode
   */
  exports.prototype.zipCode = undefined;


  /**
   * Allowed values for the <code>source</code> property.
   * @enum {String}
   * @readonly
   */
  exports.SourceEnum = {
    /**
     * value: "ADMIN"
     * @const
     */
    ADMIN: "ADMIN",

    /**
     * value: "APP"
     * @const
     */
    APP: "APP",

    /**
     * value: "HOTLINE"
     * @const
     */
    HOTLINE: "HOTLINE"
  };

  return exports;

}));
