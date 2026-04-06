import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = await context.new_page()

        print("Navigating to http://localhost:3000/")
        await page.goto("http://localhost:3000/")

        print("Scrolling down to trigger the event listener")
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        await asyncio.sleep(2)

        print("Scrolling back up")
        await page.evaluate("window.scrollTo(0, 0)")

        await asyncio.sleep(1)

        os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
        screenshot_path = "/home/jules/verification/screenshots/verification.png"
        await page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())