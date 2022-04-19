import { readdirSync, readFileSync, writeFileSync } from 'fs';
import _ from 'lodash'

(async() => {

    let DIR = readdirSync(`C:\\dev\\20220419-duplicate-enrolments\\`).filter( i => i.match(/-data/gi)).map( i => {
        return {
            filename : i,
            order : parseInt(i.replace(/\W/gi, ''))
        }
    });

    DIR = _.sortBy(DIR,'order')

    let ALL_DATA = await Promise.all(_.map(DIR, DIR => {
       return JSON.parse(readFileSync(`C:\\dev\\20220419-duplicate-enrolments\\${DIR.filename}`, 'utf-8'))
    }))

    let FLATTED = _.flatMap(ALL_DATA);

    writeFileSync(`C:\\dev\\20220419-duplicate-enrolments\\combined.json`, JSON.stringify(FLATTED, null, 2), 'utf-8')

})()