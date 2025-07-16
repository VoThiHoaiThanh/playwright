import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('has correct title', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/');

  // Expect the title to contain "Tài liệu học automation test"
  await expect(page).toHaveTitle(/Tài liệu học automation test/);
});

test('go to Register Page and check heading', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/');

  // Click on the link with text "Bài học 1: Register Page"
  await page.getByRole('link', { name: 'Bài học 1: Register Page' }).click();

  // Expect to see heading "User Registration"
  await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();
});

// test('Game "Đi chợ"', async ({ page }) => {
//   await page.goto('https://material.playwrightvn.com/games/001-di-cho.html');
  
//   // Bước 1: Lấy dữ liệu từ bảng "Danh sách đi chợ"
//   // Chờ bảng load xong
//   await page.waitForSelector('table');
  
//   // Lấy tất cả các rows trong tbody của bảng đầu tiên
//   const rows = page.locator('table').first().locator('tbody tr');
//   const items: Record<string, number> = {};
//   const count = await rows.count();
//   console.log(`📦 Số dòng tìm được trong bảng: ${count}`);
  
//   // Lặp qua từng row để lấy dữ liệu
//   for (let i = 0; i < count; i++) {
//     const row = rows.nth(i);
    
//     // Lấy tên món ăn từ cột đầu tiên
//     const nameCell = row.locator('td').nth(0);
//     const name = await nameCell.innerText();
    
//     // Lấy số lượng từ cột thứ hai
//     const quantityCell = row.locator('td').nth(1);
//     const quantityText = await quantityCell.innerText();
//     const quantity = parseInt(quantityText.trim());
    
//     // Lưu vào object
//     const cleanName = name.trim();
//     items[cleanName] = quantity;
//     console.log(`🛒 Món: ${cleanName} - Số lượng: ${quantity}`);
//   }
  
//   console.log('✅ Danh sách đầy đủ:', items);
  
//     // Helper function: Quay về trang 1
//   async function goToFirstPage() {
//     console.log(`🔄 Quay về trang 1`);
//     while (true) {
//       const prevPageButton = page.locator('button').filter({ hasText: 'Trang trước' });
//       const prevPageExists = await prevPageButton.count() > 0;
      
//       if (prevPageExists) {
//         await prevPageButton.click();
//         await page.waitForTimeout(300);
//       } else {
//         console.log(`✅ Đã ở trang 1`);
//         break;
//       }
//     }
//   }
  
//   // Bước 2: Lặp qua danh sách giỏ hàng, tìm kiếm và click nút + để tăng số lượng
//   for (const [itemName, quantity] of Object.entries(items)) {
//     console.log(`🔍 Tìm kiếm món: ${itemName} với số lượng: ${quantity}`);
    
//     // Luôn bắt đầu tìm kiếm từ trang 1 cho mỗi món
//     await goToFirstPage();
    
//     let itemFound = false;
//     let currentPage = 1;
//     const maxPages = 10; // Giới hạn số trang để tránh vòng lặp vô hạn
    
//     // Tìm kiếm item qua các trang
//     while (!itemFound && currentPage <= maxPages) {
//       console.log(`📄 Đang tìm kiếm ở trang ${currentPage}`);
      
//       // Kiểm tra xem item có tồn tại trên trang hiện tại không
//       const itemLocator = page.locator('div').filter({ hasText: itemName });
//       const itemCount = await itemLocator.count();
      
//       if (itemCount > 0) {
//         console.log(`✅ Tìm thấy món ${itemName} ở trang ${currentPage}`);
        
//         // Tìm row chứa item
//         const itemRow = itemLocator.first().locator('xpath=ancestor::div[contains(@class,"flex") or contains(@class,"row")][1]');
        
//         // Tìm nút + trong row đó
//         const plusButton = itemRow.locator('button').filter({ hasText: '+' });
        
//         // Kiểm tra số lượng hiện tại
//         const currentQuantityInput = itemRow.locator('input[type="number"]');
        
//         // Click nút + để tăng số lượng đến đúng giá trị
//         for (let i = 0; i < quantity; i++) {
//           await plusButton.click();
//           console.log(`➕ Clicked + cho ${itemName}, lần ${i + 1}/${quantity}`);
//           await page.waitForTimeout(100); // Đợi một chút giữa các lần click
//         }
        
//         // Kiểm tra lại số lượng cuối cùng
//         const finalQuantity = await currentQuantityInput.inputValue();
//         console.log(`✅ Số lượng cuối cùng cho ${itemName}: ${finalQuantity}`);
        
//         itemFound = true;
//         break;
//       }
      
//       // Nếu không tìm thấy, thử chuyển sang trang tiếp theo
//       const nextPageButton = page.locator('button').filter({ hasText: 'Trang sau' });
//       const nextPageExists = await nextPageButton.count() > 0;
      
//       if (nextPageExists) {
//         console.log(`➡️ Chuyển sang trang tiếp theo`);
//         await nextPageButton.click();
//         await page.waitForTimeout(500); // Đợi trang load
//         currentPage++;
//       } else {
//         console.log(`⚠️ Không tìm thấy nút trang tiếp theo`);
//         break;
//       }
//     }
    
//     if (!itemFound) {
//       console.log(`❌ Không tìm thấy món ${itemName} trong tất cả các trang`);
//     }
//   }
  
//   // Bước 3: Bấm nút "Kiểm tra kết quả"
//   page.once('dialog', async dialog => {
//     const message = dialog.message();
//     console.log(`📢 Dialog message: ${message}`);
//     expect(message).toContain('Bạn đã đi chợ chính xác!');
//     await dialog.accept(); // đóng popup
//   });
  
//   // Click nút kiểm tra kết quả
//   await page.getByRole('button', { name: 'Kiểm tra kết quả' }).click();
  
//   // Đợi một chút để dialog xuất hiện
//   await page.waitForTimeout(1000);
// });



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