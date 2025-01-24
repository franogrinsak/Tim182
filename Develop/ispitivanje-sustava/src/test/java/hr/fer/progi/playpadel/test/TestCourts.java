package hr.fer.progi.playpadel.test;

import static org.junit.Assert.*;

import java.io.File;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;

public class TestCourts {

	private static String BASE_URL = "https://playpadel.tech/";
	private static String LOGIN_SELECTOR = "#root > main > a > button";

	private static String COURTS_SELECTOR = "#root > main > section > a:nth-child(1)";

	private static String ADD_COURT_SELECTOR = "#root > main > div > div > div > div.border-dashed.border-gray-300.border-4.rounded-xl.group.relative.zoom-animation";

	private static String IMAGE_UPLOAD_SELECTOR = "#dropzone-file";

	private static String ADD_COURT_BUTTON_SELECTOR = "#root > main > div > div > div > form > button:nth-child(7)";

	private static String COURT_ERROR_SELECTOR = "#root > main > div > div > div > div > span";

	private static String APP_ERROR_SELECTOR = "#root > main > div > h2";

	private static final String COURT_NAME = "TestCourt";

	/**
	 * Test driver.
	 */
	private static WebDriver driver;

	/**
	 * Initialize the driver using the debugger.
	 */
	public static void setup() {
		System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Chrome Driver\\chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.setExperimentalOption("debuggerAddress", "localhost:8989");
		TestCourts.driver = new ChromeDriver(options);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.switchTo().window(driver.getWindowHandle());
		driver.manage().window().maximize();
	}

	private static String addCourt(String courtName, boolean checkError) {
		setup();
		driver.get(BASE_URL + "login");


		// Find the username input element by its name
		WebElement element = driver.findElement(By.cssSelector(LOGIN_SELECTOR));
		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}


		element.click();

		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}

		element = driver.findElement(By.xpath("//div[text()='playpadel182@gmail.com']"));
		element.click();

		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}

		element = driver.findElement(By.cssSelector(COURTS_SELECTOR));
		element.click();

		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}

		element = driver.findElement(By.cssSelector(ADD_COURT_SELECTOR));
		element.click();

		try {
			Thread.sleep(2000);
		} catch (InterruptedException ignorable) {}

		File uploadFile = new File("src/test/resources/small.png");
		element = driver.findElement(By.cssSelector(IMAGE_UPLOAD_SELECTOR));
		element.sendKeys(uploadFile.getAbsolutePath());

		element = driver.findElement(By.name("courtName"));
		element.sendKeys(courtName);

		element = driver.findElement(By.name("location"));
		element.sendKeys("location");

		Select dropdown = new Select(driver.findElement(By.name("isIndoor")));
		dropdown.selectByVisibleText("Outdoor");

		element = driver.findElement(By.cssSelector(ADD_COURT_BUTTON_SELECTOR));
		element.click();



		try {
			Thread.sleep(2000);
		} catch (InterruptedException ignorable) {}

		String result;
		if (checkError) {
			element = driver.findElement(By.cssSelector(COURT_ERROR_SELECTOR));
			result = element.getText();
		} else {
			result = driver.getCurrentUrl();
		}
		driver.quit();

		return result;
	}

	@Test
	public void testAddCourt() {
		String randomName = COURT_NAME + (new Random()).nextInt(1000000);
		assertEquals(BASE_URL + "app/courts/1", addCourt(randomName, false));
	}
	
	@Test
	public void testAddDuplicateCourtName() {
		String randomName = COURT_NAME + (new Random()).nextInt(1000000);
		addCourt(randomName, false);
		assertEquals("Failed to add a court: That court name alrady exists", addCourt(randomName, true));
	}

	@Test
	public void testNonExistentCourt() {
		setup();
		driver.get(BASE_URL + "login");


		// Find the username input element by its name
		WebElement element = driver.findElement(By.cssSelector(LOGIN_SELECTOR));
		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}


		element.click();

		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}

		element = driver.findElement(By.xpath("//div[text()='playpadel182@gmail.com']"));
		element.click();

		try {
			Thread.sleep(4000);
		} catch (InterruptedException ignorable) {}

		driver.get(BASE_URL + "app/courts/1/1000");

		element = driver.findElement(By.cssSelector(APP_ERROR_SELECTOR));
		String acutal = element.getText();

		driver.quit();

		assertEquals("Error", acutal);
	}

}
