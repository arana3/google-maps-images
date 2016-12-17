// @flow

import StaticMap                                                    from './static-map.js';
import StaticMapLocation,         { makeStaticMapLocation         } from './location.js';
import StaticMapMarkerCollection, { makeStaticMapMarkerCollection } from './marker-collection.js';
import StaticMapStyle,            { makeStaticMapStyle            } from './style.js';

export default class StaticMapAuthenticatedFactory {

    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    makeStaticMap(width: number, height: number): StaticMap {
        const staticMap = new StaticMap(width, height);
        staticMap.apiKey(this.apiKey);
        return staticMap;
    }

    makeStaticMapLocation         = makeStaticMapLocation;
    makeStaticMapMarkerCollection = makeStaticMapMarkerCollection;
    makeStaticMapStyle            = makeStaticMapStyle;

    StaticMap                 = StaticMap;
    StaticMapLocation         = StaticMapLocation;
    StaticMapMarkerCollection = StaticMapMarkerCollection;
    StaticMapStyle            = StaticMapStyle;

}
