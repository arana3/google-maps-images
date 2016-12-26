// @flow

import StaticMap,                 { makeStaticMap                 } from './static-map/static-map.js';
import StaticMapLocation                                            from './static-map/location.js';
import StaticMapMarkerCollection, { makeStaticMapMarkerCollection } from './static-map/marker-collection.js';
import StaticMapStyle,            { makeStaticMapStyle            } from './static-map/style.js';

import StaticMapAuthenticatedFactory from './static-map/authenticated-factory.js';

export {

    StaticMap,
    StaticMapLocation,
    StaticMapMarkerCollection,
    StaticMapStyle,

    StaticMapAuthenticatedFactory,

    makeStaticMap,
    makeStaticMapMarkerCollection,
    makeStaticMapStyle

};
