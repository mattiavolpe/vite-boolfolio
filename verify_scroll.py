from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:5173/")
    page.wait_for_timeout(1000)

    # Scroll down the page to trigger the handleScroll method
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(1000)

    page.evaluate("window.scrollTo(0, 1000)")
    page.wait_for_timeout(1000)

    page.evaluate("window.scrollTo(0, 2000)")
    page.wait_for_timeout(1000)

    # Take screenshot at the final state
    page.screenshot(path="/tmp/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/tmp/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
