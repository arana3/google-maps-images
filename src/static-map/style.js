// @flow

type TypeStyleRules = {
    [key: string]: string  // flowtype.org/docs/objects.html#objects-as-maps
};

type TypeParams = {
    feature: string;
    element: string;
    rules:   TypeStyleRules
};

/** @see developers.google.com/maps/documentation/static-maps/styling */
export default class StaticMapStyle {

    params: TypeParams;

    constructor() {
        this.params = {
            feature: '',
            element: '',
            rules:   {}
        };
    }

    toString(): string {
        const merged = {
            feature: this.params.feature,
            element: this.params.element,
            ...this.params.rules
        };
        const stringified: string[] = Object.keys(merged).map(key => key + ':' + merged[key]);
        return stringified.join('|');
    }

    /** @see developers.google.com/maps/documentation/static-maps/styling#features */
    feature(feature: string): StaticMapStyle {
        this.params.feature = feature;
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/styling#elements */
    element(element: string): StaticMapStyle {
        this.params.element = element;
        return this;
    }

    /** @see developers.google.com/maps/documentation/static-maps/styling#style-rules */
    rules(rules: TypeStyleRules): StaticMapStyle {
        this.params.rules = rules;
        return this;
    }

}

export function makeStaticMapStyle(): StaticMapStyle {

    return new StaticMapStyle();

}
