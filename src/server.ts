import app from './app'

const PORT = process.env.PORT_PROD
const TYPE_DRIVER_BD = process.env.TYPE_DRIVER_BD

app.listen(PORT, () => {
  console.info(
    `🚀[Core]: Server running on http://localhost:${PORT} bd:${TYPE_DRIVER_BD}`
  )
})
