module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:5000',
                },
                '/session': {
                    target: 'http://localhost:5000',
                },
            },
        },
    },
} 