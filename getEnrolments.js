import { writeFileSync } from 'fs';
import { got } from 'got';
import * as _ from 'lodash';
import * as dotenv from 'dotenv'

dotenv.config()

const { WISENET_API_KEY } = process.env;

(async () => {

    let skip = 0;
    let done = true;
    while (done) {
        const data = await getEnrolments(skip)
        
        console.log(skip, data.length)

        if (data.length > 0) {
            writeFileSync(`C:\\dev\\20220419-duplicate-enrolments\\${skip}-data.json`, JSON.stringify(data, null, 2), 'utf-8')
            skip = skip + data.length
        } else {
            done = false
        }
    }

})();


async function getEnrolments(skipNumber) {
    const response = await got(`https://api.wisenet.co/v1/course-enrolments?enrolmentStatusIdFilter=4&skip=${skipNumber}`, {
        headers: {
            'x-api-key': WISENET_API_KEY
        }
    }).json();

    return response
}