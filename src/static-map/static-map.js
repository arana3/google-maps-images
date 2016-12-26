// @flow

//----------------------------------------------------------------------//
//                          Import NPM modules                          //
//----------------------------------------------------------------------//

import queryString from 'query-string';  // www.npmjs.com/package/query-string


//----------------------------------------------------------------------//
//                         Import local modules                         //
//----------------------------------------------------------------------//

import { StaticMapLocation         } from './location.js';
import { StaticMapMarkerCollection } from './marker-collection.js';
import { StaticMapStyle            } from './style.js';
import type { TypeJsonStyleObject  } from './style.js';
import { generateSignature         } from './signature.js';
import { BASE_URL_STATICMAP        } from '../constants.js';

import type { TypeAuthDataApiKey, TypeAuthDataClient, TypeAuthData } from './types.js';


//----------------------------------------------------------------------//
//                              Flow types                              //
//----------------------------------------------------------------------//

/**
 * queryString.stringify() accepts an object map whose values are either strings or arrays of strings.
 *
 * @see github.com/sindresorhus/query-string/tree/v4.2.3#nesting
 * @see flowtype.org/docs/objects.html#objects-as-maps
 */
type TypeParams = {
    [key: string]: (string | string[])
};


//----------------------------------------------------------------------//
//                            Exported class                            //
//----------------------------------------------------------------------//

/** @see developers.google.com/maps/documentation/static-maps/intro */
export class StaticMap {

    params:            TypeParams;
    markerCollections: StaticMapMarkerCollection[];
    visibleLocations:  StaticMapLocation[];
    styles:            StaticMapStyle[];
    auth:              TypeAuthData | null;

    constructor(width: number, height: number) {

        this.params = {
            size: width + 'x' + height
        };

        this.markerCollections = [];
        this.visibleLocations  = [];
        this.styles            = [];
        this.auth              = null;

    }

    generateUrl(): string {

        const mergedParams: TypeParams = {
            ...this.params,
            markers: this.markerCollections.map((mc: StaticMapMarkerCollection) => mc.toString()),
            style:   this.styles.map((style: StaticMapStyle) => style.toString())
        };

        if (this.visibleLocations.length > 0) {
            mergedParams.visible = this.visibleLocations.map((loc: StaticMapLocation) => loc.toString()).join('|');
        }

        if (this.auth === null) {
            throw new Error('No authentication');
        }

        /** @see flowtype.org/docs/disjoint-unions.html */
        switch (this.auth.type) {
            case 'apiKey':
                mergedParams.key = this.auth.apiKey;
                break;
            case 'client':
                mergedParams.client = this.auth.clientId;
                break;
        }

        let url: string = BASE_URL_STATICMAP + queryString.stringify(mergedParams);

        if (this.auth !== null && this.auth.type === 'client') {
            url += '&signature=' + generateSignature(url, this.auth.clientSecret);
        }

        return url;

    }

    centerLatLng(lat: number, lng: number): StaticMap {
        this.params.center = StaticMapLocation.fromLatLng(lat, lng).toString();
        return this;
    }

    centerAddress(address: string): StaticMap {
        this.params.center = StaticMapLocation.fromAddress(address).toString();
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#Zoomlevels */
    zoom(zoom: number): StaticMap {
        this.params.zoom = String(zoom);
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#scale_values */
    doubleScale(): StaticMap {
        this.params.scale = '2';
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#ImageFormats */
    pngFormat(): StaticMap {
        this.params.format = 'png';
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#ImageFormats */
    jpegFormat(): StaticMap {
        this.params.format = 'jpg';
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#MapTypes */
    maptypeRoadmap(): StaticMap {
        this.params.maptype = 'roadmap';
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#MapTypes */
    maptypeSatellite(): StaticMap {
        this.params.maptype = 'satellite';
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#MapTypes */
    maptypeTerrain(): StaticMap {
        this.params.maptype = 'terrain';
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/intro#MapTypes */
    maptypeHybrid(): StaticMap {
        this.params.maptype = 'hybrid';
        return this;
    }

    language(language: string): StaticMap {
        this.params.language = language;
        return this;
    }

    region(region: string): StaticMap {
        this.params.region = region;
        return this;
    }

    addMarkerCollections(markerCollections: StaticMapMarkerCollection[]): StaticMap {
        this.markerCollections = [...this.markerCollections, ...markerCollections];
        return this;
    }

    addVisibleLocations(visibleLocations: StaticMapLocation[]): StaticMap {
        this.visibleLocations = [...this.visibleLocations, ...visibleLocations];
        return this;
    }

    addStyles(styles: StaticMapStyle[]): StaticMap {
        this.styles = [...this.styles, ...styles];
        return this;
    }

    /** @see developers.google.com/maps/documentation/javascript/style-reference#the-json-object */
    addStylesFromJsonObjects(jsonStyleObjects: TypeJsonStyleObject[]): StaticMap {
        this.addStyles(
            jsonStyleObjects.map((js: TypeJsonStyleObject) => StaticMapStyle.fromJsonStyleObject(js))
        );
        return this;
    }

    setApiKey(apiKey: string): StaticMap {
        const authData: TypeAuthDataApiKey = { type: 'apiKey', apiKey };
        this.auth = authData;
        return this;
    }

    setClientCredentials(clientId: string, clientSecret: string): StaticMap {
        const authData: TypeAuthDataClient = { type: 'client', clientId, clientSecret };
        this.auth = authData;
        return this;
    }

}

export function makeStaticMap(width: number, height: number): StaticMap {

    return new StaticMap(width, height);

}
