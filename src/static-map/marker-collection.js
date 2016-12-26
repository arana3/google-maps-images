// @flow

import StaticMapLocation from './location.js';

/** @see developers.google.com/maps/documentation/static-maps/intro#Markers */
export default class StaticMapMarkerCollection {

    locations: StaticMapLocation[];
    styles:    { [key: string]: string };  // flowtype.org/docs/objects.html#objects-as-maps

    constructor(locations: StaticMapLocation[]) {
        this.locations = locations;
        this.styles    = {};
    }

    toString(): string {
        const styles:    string[] = Object.keys(this.styles).map((key: string) => key + ':' + this.styles[key]);
        const locations: string[] = this.locations.map((loc: StaticMapLocation) => loc.toString());
        const merged:    string[] = [...styles, ...locations];
        return merged.join('|');
    }

    sizeTiny(): StaticMapMarkerCollection {
        this.styles.size = 'tiny';
        return this;
    }

    sizeMid(): StaticMapMarkerCollection {
        this.styles.size = 'mid';
        return this;
    }

    sizeSmall(): StaticMapMarkerCollection {
        this.styles.size = 'small';
        return this;
    }

    color(color: string): StaticMapMarkerCollection {
        this.styles.color = color;
        return this;
    }

    label(label: string): StaticMapMarkerCollection {
        this.styles.label = label;
        return this;
    }

    icon(url: string): StaticMapMarkerCollection {
        this.styles.icon = encodeURI(url);
        return this;
    }

}

export function makeStaticMapMarkerCollection(locations: StaticMapLocation[]): StaticMapMarkerCollection {

    return new StaticMapMarkerCollection(locations);

}
