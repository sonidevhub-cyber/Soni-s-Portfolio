import os
import time
from playwright.sync_api import sync_playwright

PORTFOLIO_PUBLIC = r"C:\Users\Awan\OneDrive\Documents\portfolio\public"
BASE_URL = "http://localhost:8000"

SCREENSHOTS = [
    {
        "name": "obe-login.jpg",
        "path": "/login/",
        "full": True,
    },
    {
        "name": "obe-dashboard.jpg",
        "path": "/teacher",
        "full": True,
    },
    {
        "name": "obe-reports.jpg",
        "path": "/teacher",
        "full": True,
    },
]


def ensure_dir(path: str):
    os.makedirs(path, exist_ok=True)


def capture(page, url: str, output_path: str, full_page: bool = True):
    print(f"Opening {url}")
    page.goto(url, wait_until="networkidle")
    time.sleep(2)
    page.screenshot(path=output_path, fullPage=full_page)
    print(f"Saved screenshot -> {output_path}")


def main():
    ensure_dir(PORTFOLIO_PUBLIC)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        for item in SCREENSHOTS:
            output_path = os.path.join(PORTFOLIO_PUBLIC, item["name"])
            capture(page, BASE_URL + item["path"], output_path, item["full"])

        browser.close()
    print("Screenshots captured.")


if __name__ == "__main__":
    main()
