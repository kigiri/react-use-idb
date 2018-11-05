import http from 'http'
import puppeteer from 'puppeteer'
const port = process.env.PORT || 7578

http.createServer((req, res) => {}).listen(port, async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}/test-index.html`)
  const result = await page.evaluate(() => runTests())
  console.log(result)
  await browser.close()
})
