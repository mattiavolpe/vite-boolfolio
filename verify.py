import re
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:5173/contact")
    page.wait_for_timeout(500)

    # Fill the form
    page.locator("#name").fill("Test User")
    page.wait_for_timeout(500)
    page.locator("#emailAddress").fill("test@example.com")
    page.wait_for_timeout(500)
    page.locator("#emailContent").fill("This is a test message to verify the form submission and loading state.")
    page.wait_for_timeout(500)

    # Setup network interception to delay the response and verify the loading state
    routes = []
    def handle_route(route):
        routes.append(route)

    # Use re.compile to match the endpoint
    page.route(re.compile(r".*api/contact.*"), handle_route)

    # Submit the form
    page.get_by_role("button", name="Send e-mail").click()
    page.wait_for_timeout(500)

    # Take screenshot while loading
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

    # Fulfill the route
    if routes:
        routes[0].fulfill(status=200, body='{"success": true}', headers={"Access-Control-Allow-Origin": "*"})

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
