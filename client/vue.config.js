module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                },
                '/session': {
                    target: 'http://localhost:3000',
                },
            },
        },
    },
} 