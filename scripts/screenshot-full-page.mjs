import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const [, , url = "http://127.0.0.1:5173/", output = "screenshots/home-full-page.png"] = process.argv;
const outputPath = path.resolve(process.cwd(), output);
const viewportWidth = Number(process.env.SCREENSHOT_WIDTH ?? 1440);
const viewportHeight = Number(process.env.SCREENSHOT_HEIGHT ?? 1100);
const deviceScaleFactor = Number(process.env.SCREENSHOT_DPR ?? 1);

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 700;
      const timer = window.setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          window.clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: viewportWidth, height: viewportHeight },
    deviceScaleFactor,
  });

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(async () => {
      await document.fonts?.ready;
      const imagesReady = Promise.all(
        Array.from(document.images)
          .filter((image) => !image.complete)
          .map((image) => new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          })),
      );
      await Promise.race([
        imagesReady,
        new Promise((resolve) => window.setTimeout(resolve, 3000)),
      ]);
    });
    await autoScroll(page);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      animations: "disabled",
    });
    console.log(`Saved full-page screenshot: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
