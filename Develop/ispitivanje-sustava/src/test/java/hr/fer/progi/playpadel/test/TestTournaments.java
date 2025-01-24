package hr.fer.progi.playpadel.test;

import static org.junit.Assert.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;

public class TestTournaments {

    private static final String BASE_URL = "https://playpadel.tech/";
    private static final String LOGIN_SELECTOR = "#root > main > a > button";

    private static final String TOURNAMENT_SELECTOR = "#root > main > section > a:nth-child(2)";

    private static final String ADD_TOURNAMENT_SELECTOR = "#root > main > section > a";

    private static final String ADD_TOURNAMENT_BUTTON_SELECTOR = "#root > main > div.register-form-container > div > form > button";

    private static final String TOURNAMENT_ERROR_SELECTOR = "#root > main > div.flex.justify-center > div > span";

    private static final String TOURNAMENT_NAME = "TestTournament";

   private static Date  FUTURE_DATE;

   private static Date PAST_DATE;

   private static final SimpleDateFormat DATE_FORMAT =  new SimpleDateFormat("MMddyyyy", Locale.ENGLISH);

    static {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        cal.add(Calendar.DATE, 1);
        FUTURE_DATE = cal.getTime();
        Date pastDate = new Date();
        cal.setTime(pastDate);
        cal.add(Calendar.DATE, -1);
        PAST_DATE = cal.getTime();
    }

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
        TestTournaments.driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        driver.switchTo().window(driver.getWindowHandle());
    }

    private static String addTournament(String tournamentName, Date date, String courtId, boolean checkError) {
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

        element = driver.findElement(By.xpath("//div[text()='playpadel182@gmail.com']"));
        element.click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignorable) {}

        element = driver.findElement(By.cssSelector(TOURNAMENT_SELECTOR));
        element.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}

        element = driver.findElement(By.cssSelector(ADD_TOURNAMENT_SELECTOR));
        element.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}


        element = driver.findElement(By.name("tournamentName"));
        element.sendKeys(tournamentName);

        element = driver.findElement(By.name("playerLevel"));
        element.sendKeys("Beginner");

        element = driver.findElement(By.name("description"));
        element.sendKeys("Description");

        element = driver.findElement(By.name("registrationFee"));
        element.sendKeys("5.00");

        element = driver.findElement(By.name("reward"));
        element.sendKeys("5.00");

        Select dropdown = new Select(driver.findElement(By.name("courtId")));
        dropdown.selectByValue(courtId);

        element = driver.findElement(By.name("date"));
        element.sendKeys(DATE_FORMAT.format(date));

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignorable) {}

        element = driver.findElement(By.cssSelector(ADD_TOURNAMENT_BUTTON_SELECTOR));
        element.click();



        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignored) {}

        String result;
        if (checkError) {
            element = driver.findElement(By.cssSelector(TOURNAMENT_ERROR_SELECTOR));
            result = element.getText();
        } else {
            result = driver.getCurrentUrl();
        }
        driver.quit();

        return result;
    }

    @Test
    public void organizeTournament() {
        String randomName = TOURNAMENT_NAME + (new Random()).nextInt(1000000);
        assertEquals(BASE_URL + "app/tournaments/1", addTournament(randomName, FUTURE_DATE, "2", false));
    }

    @Test
    public void organizeTournamentDuplicateName() {
        String randomName = TOURNAMENT_NAME + (new Random()).nextInt(1000000);
        addTournament(randomName, FUTURE_DATE, "3", false);
        assertEquals("Failed to organize tournament, reason: That tournament name alrady exists", addTournament(randomName, FUTURE_DATE, "4", true));
    }

    @Test
    public void organizeTournamentDateInThePast() {
        String randomName = TOURNAMENT_NAME + (new Random()).nextInt(1000000);
        assertEquals("Date has to be in the future.", addTournament(randomName, PAST_DATE, "5", true));
    }

}
