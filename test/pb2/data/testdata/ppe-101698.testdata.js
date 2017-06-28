module.exports = {
    search:{
        from: `http://www.${global.testEnv}.webmd.com/cancer/tc/ncicdr0000062793-overview`,
        to: `http://www.${global.testEnv}.webmd.com/mental-health/ptsd-directory`
    },
    urls:{
        doesNotStartWithHttp: `www.${global.testEnv}.webmd.com/mental-health/ptsd-directory`,
        doesNotStartWithHttps: `www.${global.testEnv}.webmd.com/mental-health/ptsd-directory`,
        startsWithHttp: `http://www.${global.testEnv}.webmd.com/mental-health/ptsd-directory`,
        startsWithHttps: `https://www.${global.testEnv}.webmd.com/mental-health/ptsd-directory`,
        goesThruOrClick: `http://www.cnn.com`,
        hopscenario:`http://www.${global.testEnv}.webmd.com/cancer/tc/post-traumatic-stress-disorder-pdq-supportive-care---health-professional-information-nci-current-clinical-trials`
    },
    chronicleIds:{
        valid: '091e9c5e806f2169'
    }
}