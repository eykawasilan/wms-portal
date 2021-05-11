const modules = require.context('./modules', true, /[A-Za-z-_,\s]+\.js$/i)
const data = {}

modules.keys().forEach(key => {
    const matched = key.match(/([A-Za-z-_]+)\./i)
    if (matched && matched.length > 1) {
        const name = matched[1]
        data[name] = modules(key).default
    }
})

export default data
