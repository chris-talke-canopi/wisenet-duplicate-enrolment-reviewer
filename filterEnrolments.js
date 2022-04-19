import { readFileSync, writeFileSync } from 'fs';
import _ from 'lodash'

(async() => {

    const ENROLMENTS = JSON.parse(readFileSync(`C:\\dev\\20220419-duplicate-enrolments\\data.json`, 'utf-8'));

    const ENROLMENTS_BY_LEARNER = _.groupBy(ENROLMENTS, 'Data.LearnerId');

    const LEARNERS_WITH_DUPLICATE_ENROLMENTS = _.filter(ENROLMENTS_BY_LEARNER, learnersEnrolments => {

        const ENROLMENTS_GROUPED_BY_COURSE_OFFER = _.groupBy(learnersEnrolments, 'Data.CourseOfferId');

        let learnerHasDuplicateEnrolment = false;
        _.forEach(ENROLMENTS_GROUPED_BY_COURSE_OFFER, enrolment => {
            if (enrolment.length > 1) {
                learnerHasDuplicateEnrolment = true
            }
        })

        return learnerHasDuplicateEnrolment
    })

    writeFileSync(`C:\\dev\\20220419-duplicate-enrolments\\duplicates.json`, JSON.stringify(_.flatMap(LEARNERS_WITH_DUPLICATE_ENROLMENTS), null, 2), 'utf-8')
    
    const CSV_OUTPUT = [`LearnerId,Email,CourseOffer\n`];
    _.forEach(LEARNERS_WITH_DUPLICATE_ENROLMENTS, l => {
        const ENROLMENT = l[0]
        if (ENROLMENT.Relationships.Learner.IsActive){
            CSV_OUTPUT.push(`${ENROLMENT.Data.LearnerId},${ENROLMENT.Relationships.Learner.Email || ENROLMENT.Relationships.Username || (`${ENROLMENT.Relationships.FirstName} ${ENROLMENT.Relationships.LastName}`)},${ENROLMENT.Data.CourseOfferId}\n`)
        }
    })
    
    writeFileSync(`C:\\dev\\20220419-duplicate-enrolments\\duplicates.csv`, CSV_OUTPUT.join(), 'utf-8')

})()