export const configuration = () => {
    return {
        environment: process.env.NODE_EVN,
        port: process.env.PORT
    }
}