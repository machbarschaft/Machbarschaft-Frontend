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
    define(['ApiClient', 'model/GeoPointResource'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GeoPointResource'));
  } else {
    // Browser globals (root is window)
    if (!root.ApiDocumentation) {
      root.ApiDocumentation = {};
    }
    root.ApiDocumentation.AnonymizedUserResource = factory(root.ApiDocumentation.ApiClient, root.ApiDocumentation.GeoPointResource);
  }
}(this, function(ApiClient, GeoPointResource) {
  'use strict';

  /**
   * The AnonymizedUserResource model module.
   * @module model/AnonymizedUserResource
   * @version 1.0
   */

  /**
   * Constructs a new <code>AnonymizedUserResource</code>.
   * @alias module:model/AnonymizedUserResource
   * @class
   * @param centerOfLocationGeoHash {module:model/GeoPointResource} 
   * @param city {String} 
   * @param locationGeoHash {String} 
   * @param source {module:model/AnonymizedUserResource.SourceEnum} 
   * @param zipCode {String} 
   */
  var exports = function(centerOfLocationGeoHash, city, locationGeoHash, source, zipCode) {
    this.centerOfLocationGeoHash = centerOfLocationGeoHash;
    this.city = city;
    this.locationGeoHash = locationGeoHash;
    this.source = source;
    this.zipCode = zipCode;
  };

  /**
   * Constructs a <code>AnonymizedUserResource</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AnonymizedUserResource} obj Optional instance to populate.
   * @return {module:model/AnonymizedUserResource} The populated <code>AnonymizedUserResource</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('centerOfLocationGeoHash'))
        obj.centerOfLocationGeoHash = GeoPointResource.constructFromObject(data['centerOfLocationGeoHash']);
      if (data.hasOwnProperty('city'))
        obj.city = ApiClient.convertToType(data['city'], 'String');
      if (data.hasOwnProperty('firstName'))
        obj.firstName = ApiClient.convertToType(data['firstName'], 'String');
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('locationGeoHash'))
        obj.locationGeoHash = ApiClient.convertToType(data['locationGeoHash'], 'String');
      if (data.hasOwnProperty('source'))
        obj.source = ApiClient.convertToType(data['source'], 'String');
      if (data.hasOwnProperty('zipCode'))
        obj.zipCode = ApiClient.convertToType(data['zipCode'], 'String');
    }
    return obj;
  }

  /**
   * @member {module:model/GeoPointResource} centerOfLocationGeoHash
   */
  exports.prototype.centerOfLocationGeoHash = undefined;

  /**
   * @member {String} city
   */
  exports.prototype.city = undefined;

  /**
   * @member {String} firstName
   */
  exports.prototype.firstName = undefined;

  /**
   * @member {String} id
   */
  exports.prototype.id = undefined;

  /**
   * @member {String} locationGeoHash
   */
  exports.prototype.locationGeoHash = undefined;

  /**
   * @member {module:model/AnonymizedUserResource.SourceEnum} source
   */
  exports.prototype.source = undefined;

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