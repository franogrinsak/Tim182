package hr.fer.progi.playpadel.test;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;

import java.awt.*;
import java.awt.datatransfer.StringSelection;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;

public class TestUsers {
    private static final String BASE_URL = "https://playpadel.tech/";
    private static final String LOGIN_SELECTOR = "#root > main > a > button";

    private static final String USERS_SELECTOR = "#root > main > section > a:nth-child(1)";

    private static final String ADD_USER_SELECTOR = "#root > main > section > a";

    private static final String ADD_USER_BUTTON_SELECTOR = "#root > main > div.register-form-container > div > form > button";

    private static final String USER_ERROR_SELECTOR = "#root > main > div.register-form-container > div > div > span";

    /**
     * Test driver.
     */
    private static WebDriver driver;

    private static String generateRandomEmail() {
        Random rand = new Random();
        return "johntester" + rand.nextInt(1000000) + "@gmail.com";
    }

    /**
     * Initialize the driver using the debugger.
     */
    public static void setup() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Chrome Driver\\chromedriver.exe");
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--lang=hr-HR");
        options.setExperimentalOption("debuggerAddress", "localhost:8989");
        TestUsers.driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        driver.switchTo().window(driver.getWindowHandle());
    }

    private static String addUser(String email, boolean checkError) {
        setup();
        driver.get(BASE_URL + "login");


        // Find the username input element by its name
        WebElement element = driver.findElement(By.cssSelector(LOGIN_SELECTOR));
        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}


        element.click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignorable) {}

        element = driver.findElement(By.xpath("//div[text()='playpadel182a@gmail.com']"));
        element.click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignorable) {}

        element = driver.findElement(By.cssSelector(USERS_SELECTOR));
        element.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}

        element = driver.findElement(By.cssSelector(ADD_USER_SELECTOR));
        element.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}


        element = driver.findElement(By.name("firstName"));
        element.sendKeys("John");

        element = driver.findElement(By.name("lastName"));
        element.sendKeys("Tester");

        element = driver.findElement(By.name("email"));
        Toolkit.getDefaultToolkit().getSystemClipboard().setContents(new StringSelection(email), null);
        element.click();
        element.sendKeys(Keys.CONTROL, "v");

        Select dropdown = new Select(driver.findElement(By.name("roleId")));
        dropdown.selectByValue("2");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignorable) {}

        element = driver.findElement(By.cssSelector(ADD_USER_BUTTON_SELECTOR));
        element.click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignored) {}

        String result;
        if (checkError) {
            element = driver.findElement(By.cssSelector(USER_ERROR_SELECTOR));
            result = element.getText();
        } else {
            result = driver.getCurrentUrl();
        }
        driver.quit();

        return result;
    }

    @Test
    public void testAddUser() {
        assertEquals(BASE_URL + "app/users", addUser(generateRandomEmail(), false));
    }

    @Test
    public void testAddUserDuplicateEmail() {
        String randomEmail = generateRandomEmail();
        addUser(randomEmail, false);
        assertEquals("Failed to add the user: That email is already being used", addUser(randomEmail, true));
    }
}
