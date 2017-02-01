// @flow

//----------------------------------------------------------------------//
//                          Import NPM modules                          //
//----------------------------------------------------------------------//

import base64Url from 'base64-url';  // www.npmjs.com/package/base64-url
import jsSHA     from 'jssha';       // www.npmjs.com/package/jssha
import UrlParse  from 'url-parse';   // www.npmjs.com/package/url-parse


//----------------------------------------------------------------------//
//                          Exported function                           //
//----------------------------------------------------------------------//

/**
 * @see developers.google.com/maps/documentation/static-maps/get-api-key#generating_valid_signatures
 * @see developers.google.com/maps/documentation/static-maps/get-api-key#sample-code-for-url-signing
 * @see github.com/googlemaps/google-maps-services-js/blob/0.3.1/lib/internal/make-api-call.js#L157-L185
 * @see github.com/Caligatio/jsSHA/tree/v2.2.0#hmac
 */
export function generateSignature(url: string, clientSecret: string): string {

    /** @see github.com/unshiftio/url-parse/tree/1.1.7#usage */
    type TypeParsedUrl = {
        pathname: string,  // "/maps/api/staticmap"
        query:    string   // "?client=gme-democlient&size=150x150&zoom=7&..."
    };

    const parsedUrl:   TypeParsedUrl = new UrlParse(url);
    const hmacPayload: string        = parsedUrl.pathname + parsedUrl.query;

    const shaObj: Object = new jsSHA('SHA-1', 'TEXT');

    shaObj.setHMACKey(clientSecret, 'B64');
    shaObj.update(hmacPayload);

    const hmacDigest: string = shaObj.getHMAC('B64');
    const signature:  string = base64Url.escape(hmacDigest);

    return signature;

}
