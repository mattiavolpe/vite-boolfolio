import asyncio
import os
from playwright.async_api import async_playwright

async def test_form_submission():
    os.makedirs('/home/jules/verification/videos', exist_ok=True)
    os.makedirs('/home/jules/verification/screenshots', exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            record_video_dir='/home/jules/verification/videos',
            viewport={'width': 1280, 'height': 720}
        )
        page = await context.new_page()

        async def delayed_route(route):
            print("Route intercepted")
            await asyncio.sleep(2)
            await route.fulfill(
                status=200,
                content_type="application/json",
                body='{"success": true}'
            )

        # Mock the backend API response
        await page.route("**/*api/contact/*", delayed_route)

        print("Navigating to Contact page...")
        await page.goto('http://localhost:4173/contact')
        await page.wait_for_load_state('networkidle')

        print("Filling out form...")
        await page.fill('input#name', 'Jules')
        await page.fill('input#emailAddress', 'jules@example.com')
        await page.fill('textarea#emailContent', 'Hello, this is a test message.')

        print("Submitting form...")
        await page.click('button[type="submit"]')

        print("Waiting for Sending... state")
        # Assert the button text changes
        await page.wait_for_selector('button:has-text("Sending...")', timeout=5000)
        await page.wait_for_selector('button:disabled', timeout=5000)

        print("Waiting for success message...")
        # Wait for the status div to appear
        await page.wait_for_selector('div[role="status"]', state="visible", timeout=10000)

        print("Taking screenshot...")
        screenshot_path = '/home/jules/verification/screenshots/verification.png'
        await page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        await context.close()
        await browser.close()
        print("Verification complete!")

if __name__ == "__main__":
    asyncio.run(test_form_submission())
