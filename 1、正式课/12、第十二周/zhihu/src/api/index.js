import http from './http.js';

export function hotList(option){
    return http.get('/v4//mweb-feed/content/list',{
        params:option
    })
}