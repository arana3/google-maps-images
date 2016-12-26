// @flow

export type TypeAuthDataApiKey = {
    type:   'apiKey',  // Sentinel property for disjoint union
    apiKey: string
};

export type TypeAuthDataClient = {
    type:         'client',  // Sentinel property for disjoint union
    clientId:     string,
    clientSecret: string
};

/** @see flowtype.org/docs/disjoint-unions.html */
export type TypeAuthData = TypeAuthDataApiKey | TypeAuthDataClient;
