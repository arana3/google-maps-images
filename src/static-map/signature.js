// @flow

//----------------------------------------------------------------------//
//                          Import NPM modules                          //
//----------------------------------------------------------------------//

import base64Url from 'base64-url';  // www.npmjs.com/package/base64-url
import buffer    from 'buffer/';     // www.npmjs.com/package/buffer
import crypto    from 'crypto';      // www.npmjs.com/package/crypto-browserify
import UrlParse  from 'url-parse';   // www.npmjs.com/package/url-parse

const Buffer = buffer.Buffer;  // github.com/feross/buffer/tree/v5.0.2#usage


//----------------------------------------------------------------------//
//                          Exported function                           //
//----------------------------------------------------------------------//

/**
 * @see developers.google.com/maps/documentation/static-maps/get-api-key#generating_valid_signatures
 * @see developers.google.com/maps/documentation/static-maps/get-api-key#sample-code-for-url-signing
 * @see github.com/googlemaps/google-maps-services-js/blob/0.3.1/lib/internal/make-api-call.js#L157-L185
 * @see nodejs.org/dist/latest-v5.x/docs/api/buffer.html#buffer_new_buffer_str_encoding
 * @see nodejs.org/dist/latest-v5.x/docs/api/crypto.html#crypto_crypto_createhmac_algorithm_key
 * @see nodejs.org/dist/latest-v5.x/docs/api/crypto.html#crypto_hmac_update_data_input_encoding
 * @see nodejs.org/dist/latest-v5.x/docs/api/crypto.html#crypto_hmac_digest_encoding
 */
export function generateSignature(url: string, clientSecret: string): string {

    /** @see github.com/unshiftio/url-parse/tree/1.1.7#usage */
    type TypeParsedUrl = {
        pathname: string,  // "/maps/api/staticmap"
        query:    string   // "?client=gme-democlient&size=150x150&zoom=7&..."
    };

    const parsedUrl:    TypeParsedUrl = new UrlParse(url);
    const hmacPayload:  string        = parsedUrl.pathname + parsedUrl.query;
    const secretBuffer: Buffer        = new Buffer(clientSecret, 'base64');
    const hmacDigest:   string        = crypto.createHmac('sha1', secretBuffer).update(hmacPayload).digest('base64');
    const signature:    string        = base64Url.escape(hmacDigest);

    return signature;

}
