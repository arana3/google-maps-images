// @flow

/** @see developers.google.com/maps/documentation/static-maps/styling#style-rules */
export type TypeStyleRules = {
    [key: string]: string  // flowtype.org/docs/objects.html#objects-as-maps
};

/** @see developers.google.com/maps/documentation/static-maps/styling#style-syntax */
export type TypeParams = {
    feature: string,
    element: string,
    rules:   TypeStyleRules
};

/** @see developers.google.com/maps/documentation/javascript/style-reference#stylers */
export type TypeJsonStyler = {
    [key: string]: (string | number)  // flowtype.org/docs/objects.html#objects-as-maps
};

/** @see developers.google.com/maps/documentation/javascript/style-reference#the-json-object */
export type TypeJsonStyleObject = {
    featureType: string,
    elementType: string,
    stylers:     TypeJsonStyler[]
};


/** @see developers.google.com/maps/documentation/static-maps/styling */
export class StaticMapStyle {

    params: TypeParams;

    constructor() {
        this.params = {
            feature: '',
            element: '',
            rules:   {}
        };
    }

    toString(): string {
        const merged: Object = {
            feature: this.params.feature,
            element: this.params.element,
            ...this.params.rules
        };
        const stringified: string[] = Object.keys(merged).map((key: string) => key + ':' + merged[key]);
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

    /** @see developers.google.com/maps/documentation/javascript/style-reference#the-json-object */
    static fromJsonStyleObject(js: TypeJsonStyleObject): StaticMapStyle {
        return new StaticMapStyle()
            .feature(js.featureType)
            .element(js.elementType)
            .rules(convertJsonStylersToRules(js.stylers));
    }

}

/**
 * JSON Stylers use a different color format to the style rules of Static Maps,
 * so the colors need to be converted:
 *
 *     JSON Stylers:    #RRGGBB
 *     Static Maps:     0xRRGGBB
 *
 * @see developers.google.com/maps/documentation/javascript/style-reference#stylers
 * @see developers.google.com/maps/documentation/static-maps/styling#style-rules
 */
function convertJsonStylersToRules(jsonStylers: TypeJsonStyler[]): TypeStyleRules {

    const JSON_STYLER_COLOR_REGEX: RegExp         = /^#([0-9a-f]{6})$/i;
    const rules:                   TypeStyleRules = {};

    jsonStylers.forEach(function (jsonStyler: TypeJsonStyler) {
        const ruleKey:    string    = Object.keys(jsonStyler)[0];  // There's always just one key
        let   ruleValue:  string    = String(jsonStyler[ruleKey]);
        const colorMatch: ?string[] = ruleValue.match(JSON_STYLER_COLOR_REGEX);
        if (Array.isArray(colorMatch)) {
            ruleValue = '0x' + colorMatch[1];  // Element at index 1 contains the captured group (RRGGBB)
        }
        rules[ruleKey] = ruleValue;
    });

    return rules;

}

export function makeStaticMapStyle(): StaticMapStyle {

    return new StaticMapStyle();

}
