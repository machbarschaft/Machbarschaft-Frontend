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
    define(['ApiClient', 'model/OrderResource', 'model/UserResource'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrderResource'), require('./UserResource'));
  } else {
    // Browser globals (root is window)
    if (!root.ApiDocumentation) {
      root.ApiDocumentation = {};
    }
    root.ApiDocumentation.UserOrderAcceptedResponse = factory(root.ApiDocumentation.ApiClient, root.ApiDocumentation.OrderResource, root.ApiDocumentation.UserResource);
  }
}(this, function(ApiClient, OrderResource, UserResource) {
  'use strict';

  /**
   * The UserOrderAcceptedResponse model module.
   * @module model/UserOrderAcceptedResponse
   * @version 1.0
   */

  /**
   * Constructs a new <code>UserOrderAcceptedResponse</code>.
   * @alias module:model/UserOrderAcceptedResponse
   * @class
   * @param consumer {module:model/UserResource} 
   * @param order {module:model/OrderResource} 
   */
  var exports = function(consumer, order) {
    this.consumer = consumer;
    this.order = order;
  };

  /**
   * Constructs a <code>UserOrderAcceptedResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserOrderAcceptedResponse} obj Optional instance to populate.
   * @return {module:model/UserOrderAcceptedResponse} The populated <code>UserOrderAcceptedResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('consumer'))
        obj.consumer = UserResource.constructFromObject(data['consumer']);
      if (data.hasOwnProperty('order'))
        obj.order = OrderResource.constructFromObject(data['order']);
    }
    return obj;
  }

  /**
   * @member {module:model/UserResource} consumer
   */
  exports.prototype.consumer = undefined;

  /**
   * @member {module:model/OrderResource} order
   */
  exports.prototype.order = undefined;

  return exports;

}));
