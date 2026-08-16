import { test, expect } from '@playwright/test';

test.describe('Project Reigns - Game Loop Tests', () => {

  test('should load the start screen with options', async ({ page }) => {
    await page.goto('/');

    // Check title/header
    await expect(page.locator('h1')).toHaveText('PROJECT REIGNS');
    await expect(page.locator('h2')).toHaveText('IT 프로젝트 수호자');

    // Check methodology options exist
    await expect(page.getByTestId('methodology-AGILE')).toBeVisible();
    await expect(page.getByTestId('methodology-WATERFALL')).toBeVisible();
    await expect(page.getByTestId('methodology-DEVOPS')).toBeVisible();

    // Check target options exist
    await expect(page.getByTestId('target-MVP')).toBeVisible();
    await expect(page.getByTestId('target-ENTERPRISE')).toBeVisible();
    await expect(page.getByTestId('target-UNICORN')).toBeVisible();

    // Start button is visible
    await expect(page.getByTestId('start-game-btn')).toBeVisible();
  });

  test('should start the game and allow making choice decisions', async ({ page }) => {
    await page.goto('/');

    // Select DevOps and Unicorn for a harder target
    await page.getByTestId('methodology-DEVOPS').click();
    await page.getByTestId('target-UNICORN').click();

    // Click start game
    await page.getByTestId('start-game-btn').click();

    // Verify turn counter shows Turn 1 / 40
    await expect(page.locator('text=TURN 1 / 40')).toBeVisible();

    // Verify resource bars are visible
    await expect(page.getByText('예산', { exact: true })).toBeVisible();
    await expect(page.locator('text=일정')).toBeVisible();
    await expect(page.locator('text=사기')).toBeVisible();
    await expect(page.locator('text=품질')).toBeVisible();

    // Choice buttons are present
    const leftBtn = page.getByTestId('choice-left-btn');
    const rightBtn = page.getByTestId('choice-right-btn');
    await expect(leftBtn).toBeVisible();
    await expect(rightBtn).toBeVisible();

    // Hover to test resource indicator trigger
    await leftBtn.hover();
    await expect(page.locator('text=왼쪽 선택지에 따라')).toBeVisible();

    // Make left choice
    await leftBtn.click();

    // Verify Turn goes to Turn 2
    await expect(page.locator('text=TURN 2 / 40')).toBeVisible();

    // Verify history panel updated
    await expect(page.locator('text=최근 의사결정 히스토리')).toBeVisible();
    await expect(page.locator('text=Turn 1')).toBeVisible();
  });

  test('should verify game restart functionality from game-over/victory states', async ({ page }) => {
    await page.goto('/');

    // Select MVP (20 turns)
    await page.getByTestId('methodology-AGILE').click();
    await page.getByTestId('target-MVP').click();
    await page.getByTestId('start-game-btn').click();

    // Click left/right sequentially to trigger a transition or just click 10+ times to reach gameover/victory
    // Each decision alters stats. We will keep choosing until we trigger GameOver or Victory.
    let gameOverOrVictory = false;
    for (let i = 0; i < 25; i++) {
      const isGameOver = await page.locator('text=Game Over').count();
      const isVictory = await page.locator('text=프로젝트 성공 배포!').count();

      if (isGameOver > 0 || isVictory > 0) {
        gameOverOrVictory = true;
        break;
      }

      // Alternating choices or random to push bounds
      if (i % 2 === 0) {
        await page.getByTestId('choice-left-btn').click();
      } else {
        await page.getByTestId('choice-right-btn').click();
      }
      await page.waitForTimeout(100);
    }

    // Verify restart button is present on the end screen
    if (gameOverOrVictory) {
      await expect(page.getByTestId('restart-game-btn')).toBeVisible();
      await page.getByTestId('restart-game-btn').click();
      // Back to starting screen
      await expect(page.getByTestId('start-game-btn')).toBeVisible();
    }
  });

  test('generate-screenshot', async ({ page }) => {
    // Navigate to game start, click start and take a screenshot
    await page.goto('/');
    await page.screenshot({ path: 'start-screen.png' });

    await page.getByTestId('methodology-AGILE').click();
    await page.getByTestId('target-MVP').click();
    await page.getByTestId('start-game-btn').click();

    // Hover on a choice for visual details
    await page.getByTestId('choice-left-btn').hover();
    await page.waitForTimeout(200);

    await page.screenshot({ path: 'gameplay-screen.png' });
  });

});
