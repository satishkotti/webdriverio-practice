<<<<<<< HEAD
const randomstring = require('randomstring');
let assetName = `QASM-PPE96474-${randomstring.generate(3)}`;

module.exports = {
    validsubdomainurls:
    [

=======
module.exports = {
    validsubdomainurls:
    [
        
>>>>>>> origin/integration-pb2-release2.10
        {
            "url": 'https://exchanges$$LifeCycle$$$$CoreDomain$$/webmd-exchanges/experts-guests-sponsors',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://relief$$LifeCycle$$$$CoreDomain$$/allergies/relief-advisor',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://relief-staging$$LifeCycle$$$$CoreDomain$$/allergies/relief-advisor',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://symptomsbeta$$LifeCycle$$$$CoreDomain$$/default.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://dictionary$$LifeCycle$$$$CoreDomain$$/default.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://fit$$LifeCycle$$$$CoreDomain$$/editorial-policy',
            "siteId": "3",
            "environment": global.testEnv
        },

        {
            "url": 'https://exchanges$$LifeCycle$$$$CoreDomain$$/webmd-exchanges/blogsrssbelowthebeltwomenshealth',
            "siteId": "3",
            "environment": global.testEnv
        },
<<<<<<< HEAD
        {
=======
         {
>>>>>>> origin/integration-pb2-release2.10
            "url": 'https://fit$$LifeCycle$$$$CoreDomain$$/kids/food/article/default.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://fit$$LifeCycle$$$$CoreDomain$$/kids/food/eval/your-fit-food-horoscope',
            "siteId": "3",
            "environment": global.testEnv
        },
<<<<<<< HEAD
        {
=======
         {
>>>>>>> origin/integration-pb2-release2.10
            "url": 'https://pets$$LifeCycle$$$$CoreDomain$$/healthy-pets-vet-16/how-often-bathe-your-dog-poll',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://symptoms$$LifeCycle$$$$CoreDomain$$/seasonal-allergy-map-tool/allergy-free-gardening',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://symptoms$$LifeCycle$$$$CoreDomain$$/seasonal-allergy-map-tool/default.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://teens$$LifeCycle$$$$CoreDomain$$/girls-puberty-10/default.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
<<<<<<< HEAD
        {
=======
         {
>>>>>>> origin/integration-pb2-release2.10
            "url": 'https://teens$$LifeCycle$$$$CoreDomain$$/virtual/news/default.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
<<<<<<< HEAD
        {
=======
         {
>>>>>>> origin/integration-pb2-release2.10
            "url": 'https://www$$LifeCycle$$$$CoreDomain$$/a-to-z-guides/healthy-living/e.htm',
            "siteId": "3",
            "environment": global.testEnv
        },
<<<<<<< HEAD
    ],

    invalidsubdomainurls:
    [

=======
        ],

        invalidsubdomainurls:
    [
        
>>>>>>> origin/integration-pb2-release2.10
        {
            "url": 'https://exchanges$$LifeCycle$$$$CoreDomain$$/teen/food-exchanges-health',
            "siteId": "3",
            "environment": global.testEnv
        },
        {
            "url": 'https://teens$$LifeCycle$$$$CoreDomain$$/exchanges-food',
            "siteId": "3",
            "environment": global.testEnv
        }
<<<<<<< HEAD

    ],

    fe:
    {
        asset: {
            val1: {
                chronicle_id: '091e9c5e8053803f',
                expected_values: {
                    title: 'Experts Guests and Sponsors'
                }
            },
            val2: {
                friendly_url: `http://exchanges.${global.testEnv}.webmd.com/webmd-exchanges/experts-guests-sponsors`,
                expected_values: {
                    title: 'Experts Guests and Sponsors'
                }
            },
            val3: {
                keyword: 'Experts Guests and Sponsors'
            }
        },
        LinkListModule: {
            "moduleName": assetName,
            "moduleDispName": assetName,
            "moduleType": "LinkList",
            "category": null,
            "selectXSL": 'Footer v2',
            "selectCSS": 'Standard',
            "dynamicModuleCategory": null,
            "moduleLabel1": null,
            "moduleLabel2": null,
            "linkedModule": null,
            "sponsorProgram": null,
            "description": assetName + "-desc",
            "tier": 2,
            "moduleTitle":
            {
                "moduleTitle": "Testing PPE-96474",
                "link": `http://exchanges.${global.testEnv}.webmd.com/webmd-exchanges/experts-guests-sponsors`
            },
            "moduleLinks": [],
            "emphasizedLinks":
            {
                "linkText": null,
                "link": null
            }
        }
    },
=======
        
        ]


>>>>>>> origin/integration-pb2-release2.10
}