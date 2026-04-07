import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            record_video_size={"width": 1280, "height": 720}
        )
        page = await context.new_page()

        # Handle API response (mock)
        async def handle_route(route):
            await asyncio.sleep(2) # Simulate network delay to see "Sending..."
            await route.fulfill(
                status=200,
                content_type="application/json",
                body='{"success": true}'
            )

        await page.route("**/*api/contact/*", handle_route)
        await page.route("**/*api/contact", handle_route)

        try:
            # Go to the contact page
            await page.goto("http://localhost:3000/contact")

            # Wait for form to load
            await page.wait_for_selector('form')

            # Fill the form
            await page.fill('input[id="name"]', 'Test User')
            await page.fill('input[id="emailAddress"]', 'test@example.com')
            await page.fill('textarea[id="emailContent"]', 'This is a test message to verify the new UX features.')

            # Take screenshot before submitting
            await page.screenshot(path="/home/jules/verification/screenshots/contact_form_filled.png", full_page=True)

            # Submit the form
            # Click the submit button
            submit_button = page.locator('button[type="submit"]')
            await submit_button.click()

            # Assert that the button is disabled and text is "Sending..."
            await expect(submit_button).to_be_disabled()
            await expect(submit_button).to_contain_text("Sending...")
            await expect(submit_button).to_have_attribute("aria-busy", "true")

            # Wait for the success message
            success_message = page.locator('div[role="status"][aria-live="polite"]')
            await expect(success_message).to_be_visible(timeout=5000)
            await expect(success_message).to_have_text("Your message has been sent successfully!")

            # Ensure button is enabled again and text is "Send e-mail"
            await expect(submit_button).to_be_enabled()
            await expect(submit_button).to_contain_text("Send e-mail")

            # Ensure form is reset
            await expect(page.locator('input[id="name"]')).to_have_value("")
            await expect(page.locator('input[id="emailAddress"]')).to_have_value("")
            await expect(page.locator('textarea[id="emailContent"]')).to_have_value("")

            # Take final screenshot
            await page.screenshot(path="/home/jules/verification/screenshots/contact_form_success.png", full_page=True)
            print("Verification script passed successfully.")

        finally:
            await context.close()
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())