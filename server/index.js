const app = require('./src/server')

const port = process.env.PORT || 3100

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
