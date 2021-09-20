{
    "version": 2,
    "builds": [
        {
            "src": "api/**/*.js",
            "use": "@vercel/node"
        },
        {
            "src": "nuxt.config.js",
            "use": "@nuxtjs/vercel-builder",
            "config": {
                "serverFiles": [
                    "api/**"
                ]
            }
        }
    ]
}