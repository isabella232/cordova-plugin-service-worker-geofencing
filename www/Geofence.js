/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

var exec = require('cordova/exec');
var geofenceController = require('./GeofenceManager');
var geofenceRegion = require('./GeofenceRegion');
var circularGeofenceRegion = require('./CircularGeofenceRegion');

function Geofence(id, name, lat, lon, radius) {
    this.id = id;
    if (lat !== undefined && lon !== undefined && radius !== undefined) {
	this.region = new CircularGeofenceRegion(name, lat, lon, radius);
    } else {
	this.region = new GeofenceRegion(name);
    }
}

Geofence.prototype.remove = function() {
    var scopeId = this.id;
    return new Promise(function(resolve, reject) {
	var success = function() {
	    resolve();
	};
	var failure = function(err) {
	    reject(err);
	};
	exec(success, failure, "Geofencing", "unregister", [scopeId]);
    });
};

module.exports = Geofence;
