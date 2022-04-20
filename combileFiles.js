import { readdirSync, readFileSync, writeFileSync } from 'fs';
import _ from 'lodash'
import { __dirname } from './dirname.js'

(async() => {

    let DIR = readdirSync(`${__dirname}/`).filter( i => i.match(/-data/gi)).map( i => {
        return {
            filename : i,
            order : parseInt(i.replace(/\W/gi, ''))
        }
    });

    DIR = _.sortBy(DIR,'order')

    let ALL_DATA = await Promise.all(_.map(DIR, DIR => {
       return JSON.parse(readFileSync(`${__dirname}/${DIR.filename}`, 'utf-8'))
    }))

    let FLATTED = _.flatMap(ALL_DATA);

    writeFileSync(`${__dirname}/combined.json`, JSON.stringify(FLATTED, null, 2), 'utf-8')

})()