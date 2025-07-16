import { test, expect } from '@playwright/test';
// const { test, expect } = require('@playwright/test');

test.describe('Frappé Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Điều hướng đến trang đăng nhập
    await page.goto('https://your-frappe-site.com/login');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    // Nhập email
    await page.fill('input[type="email"]', 'jane@example.com');
    
    // Nhập password
    await page.fill('input[type="password"]', 'your_password_here');
    
    // Click nút Login
    await page.click('button:has-text("Login")');
    
    // Verify successful login (có thể điều chỉnh selector theo trang đích)
    await expect(page).toHaveURL(/dashboard|home/);
  });

  test('Login with Email Link functionality', async ({ page }) => {
    // Nhập email
    await page.fill('input[type="email"]', 'jane@example.com');
    
    // Click nút "Login with Email Link"
    await page.click('button:has-text("Login with Email Link")');
    
    // Verify message hiển thị thông báo gửi email
    await expect(page.locator('text=Check your email')).toBeVisible();
  });

  test('Show/Hide password functionality', async ({ page }) => {
    // Nhập password
    await page.fill('input[type="password"]', 'testpassword');
    
    // Click nút Show
    await page.click('button:has-text("Show")');
    
    // Verify password field chuyển thành text type
    await expect(page.locator('input[type="text"]')).toHaveValue('testpassword');
    
    // Click lại để hide
    await page.click('button:has-text("Hide")');
    
    // Verify password field chuyển về password type
    await expect(page.locator('input[type="password"]')).toHaveValue('testpassword');
  });

  test('Forgot Password functionality', async ({ page }) => {
    // Click link "Forgot Password?"
    await page.click('a:has-text("Forgot Password?")');
    
    // Verify điều hướng đến trang reset password
    await expect(page).toHaveURL(/forgot-password|reset-password/);
  });

  test('Validation for empty fields', async ({ page }) => {
    // Click Login button khi chưa nhập gì
    await page.click('button:has-text("Login")');
    
    // Verify error messages hoặc validation
    await expect(page.locator('input[type="email"]:invalid')).toBeVisible();
  });

  test('Validation for invalid email format', async ({ page }) => {
    // Nhập email không hợp lệ
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    
    // Click Login
    await page.click('button:has-text("Login")');
    
    // Verify validation message
    await expect(page.locator('input[type="email"]:invalid')).toBeVisible();
  });

  test('UI elements visibility and styling', async ({ page }) => {
    // Verify logo hiển thị
    await expect(page.locator('img, [role="img"]').first()).toBeVisible();
    
    // Verify heading "Login to Frappé"
await expect(page.locator('h1, h2, h3').filter({ hasText: 'Login to Frappé' })).toBeVisible();
    
    // Verify form fields hiển thị
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Verify các buttons hiển thị
    await expect(page.locator('button:has-text("Login")')).toBeVisible();
    await expect(page.locator('button:has-text("Login with Email Link")')).toBeVisible();
    
    // Verify "or" separator
    await expect(page.locator('text=or')).toBeVisible();
  });
});