import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

// Vercel Serverless Function config
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

async function getBrowser() {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: null,
        executablePath,
        headless: chromium.headless,
    });

    return browser;
}

export async function POST(request) {
    let browser = null;

    try {
        // Parse request body
        const body = await request.json();
        const { html, width = 1280, quality = 80 } = body;

        // Validate
        if (!html || typeof html !== 'string') {
            return new Response(
                JSON.stringify({
                    error: 'Missing or invalid "html" field. Must be a non-empty string.',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        if (quality < 1 || quality > 100) {
            return new Response(
                JSON.stringify({
                    error: '"quality" must be between 1 and 100.',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Launch browser
        browser = await getBrowser();
        const page = await browser.newPage();

        // Set viewport width — height will auto-expand for full page screenshot
        await page.setViewport({
            width: Math.min(Math.max(width, 320), 3840),
            height: 800,
            deviceScaleFactor: 1,
        });

        // Load the HTML content
        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 30000,
        });

        // Wait a tiny bit for any final rendering (fonts, images, etc.)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get the actual content bounding box to avoid blank space
        const bodyHandle = await page.$('body');
        const boundingBox = await bodyHandle.boundingBox();

        let screenshotBuffer;

        if (boundingBox && boundingBox.width > 0 && boundingBox.height > 0) {
            // Clip to exact body content — no blank space
            screenshotBuffer = await page.screenshot({
                type: 'webp',
                quality: quality,
                clip: {
                    x: 0,
                    y: 0,
                    width: Math.ceil(boundingBox.width),
                    height: Math.ceil(boundingBox.height),
                },
            });
        } else {
            // Fallback to full page if bounding box fails
            screenshotBuffer = await page.screenshot({
                type: 'webp',
                quality: quality,
                fullPage: true,
            });
        }

        await bodyHandle.dispose();
        await page.close();
        await browser.close();
        browser = null;

        // Return the WebP binary
        return new Response(screenshotBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/webp',
                'Content-Disposition': 'inline; filename="screenshot.webp"',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Screenshot error:', error);

        return new Response(
            JSON.stringify({
                error: 'Failed to generate screenshot.',
                details: error.message,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch (e) {
                // ignore cleanup errors
            }
        }
    }
}

// Health check
export async function GET() {
    return new Response(
        JSON.stringify({
            status: 'ok',
            service: 'ScreenshotDONE',
            endpoint: 'POST /api/screenshot',
            body: {
                html: '(required) HTML string to render',
                width: '(optional) viewport width in px, default 1280',
                quality: '(optional) WebP quality 1-100, default 80',
            },
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    );
}
