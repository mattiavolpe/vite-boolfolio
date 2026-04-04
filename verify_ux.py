from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context(record_video_dir="/home/jules/verification/videos")
    page = context.new_page()

    def handle_route(route):
        print(f"Intercepted: {route.request.url}")
        route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true}',
        )

    # Note: Axios is probably requesting /undefinedapi/contact/ or something because host is missing
    # Let's intercept ALL requests and just mock anything that looks like the API
    page.route("**/*api/contact/*", handle_route)
    page.route("**/*undefined*", handle_route) # In case host is literally 'undefined' string

    page.goto("http://localhost:5173/contact")

    # Catching everything just in case
    page.route("**/*", lambda route: route.fulfill(status=200, body='{"success": true}') if "contact" in route.request.url and route.request.method == "POST" else route.continue_())

    # Fill form
    page.locator("#name").fill("Test User")
    page.locator("#emailAddress").fill("test@example.com")
    page.locator("#emailContent").fill("This is a test message.")

    # Click submit
    page.locator("button[type='submit']").click()

    # Wait for success message
    page.wait_for_selector(".text-success", state="visible", timeout=5000)
    page.screenshot(path="/home/jules/verification/screenshots/verification_success.png", full_page=True)

    # Test error state
    page.goto("http://localhost:5173/contact")

    page.route("**/*", lambda route: route.fulfill(status=500, body='{"error": true}') if "contact" in route.request.url and route.request.method == "POST" else route.continue_())

    # Fill form again
    page.locator("#name").fill("Test User")
    page.locator("#emailAddress").fill("test@example.com")
    page.locator("#emailContent").fill("This is a test message.")

    # Click submit
    page.locator("button[type='submit']").click()

    # Wait for error message
    page.wait_for_selector(".text-danger", state="visible", timeout=5000)
    page.screenshot(path="/home/jules/verification/screenshots/verification_error.png", full_page=True)

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
