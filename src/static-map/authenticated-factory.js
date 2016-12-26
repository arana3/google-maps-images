// @flow

//----------------------------------------------------------------------//
//                         Import local modules                         //
//----------------------------------------------------------------------//

import StaticMap                                                     from './static-map.js';
import StaticMapLocation,         { makeStaticMapLocation          } from './location.js';
import StaticMapMarkerCollection, { makeStaticMapMarkerCollection  } from './marker-collection.js';
import StaticMapStyle,            { makeStaticMapStyle             } from './style.js';
import type { TypeAuthDataApiKey, TypeAuthDataClient, TypeAuthData } from './types.js';


//----------------------------------------------------------------------//
//                            Exported class                            //
//----------------------------------------------------------------------//

export default class StaticMapAuthenticatedFactory {

    auth: TypeAuthData;

    /** @private */
    constructor(auth: TypeAuthData) {
        this.auth = auth;
    }

    static usingApiKey(apiKey: string): StaticMapAuthenticatedFactory {
        const auth: TypeAuthDataApiKey = { type: 'apiKey', apiKey };
        return new StaticMapAuthenticatedFactory(auth);
    }

    static usingClientCredentials(clientId: string, clientSecret: string): StaticMapAuthenticatedFactory {
        const auth: TypeAuthDataClient = { type: 'client', clientId, clientSecret };
        return new StaticMapAuthenticatedFactory(auth);
    }

    makeStaticMap(width: number, height: number): StaticMap {

        const staticMap: StaticMap = new StaticMap(width, height);

        /** @see flowtype.org/docs/disjoint-unions.html */
        switch (this.auth.type) {
            case 'apiKey':
                staticMap.setApiKey(this.auth.apiKey);
                break;
            case 'client':
                staticMap.setClientCredentials(this.auth.clientId, this.auth.clientSecret);
                break;
        }

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
