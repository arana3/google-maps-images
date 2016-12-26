// @flow

/** @see developers.google.com/maps/documentation/static-maps/intro#Locations */
export class StaticMapLocation {

    location: string;

    /** @private */
    constructor(loc: string) {
        this.location = loc;
    }

    toString(): string {
        return this.location;
    }

    static fromLatLng(lat: number, lng: number): StaticMapLocation {
        return new StaticMapLocation(lat + ',' + lng);
    }

    static fromAddress(address: string): StaticMapLocation {
        return new StaticMapLocation(address);
    }

}
