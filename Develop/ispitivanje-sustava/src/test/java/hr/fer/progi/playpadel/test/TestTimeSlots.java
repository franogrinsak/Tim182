package hr.fer.progi.playpadel.test;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;

public class TestTimeSlots {
    private static final String BASE_URL = "https://playpadel.tech/";
    private static final String LOGIN_SELECTOR = "#root > main > a > button";

    private static final String ADD_TIME_SLOT_MODAL_SELECTOR = "#addTimeSlotModal";

    private static final String COURTS_SELECTOR = "#root > main > section > a:nth-child(1)";

    private static final String COURT_SELECTOR = "#root > main > div > div > div > div:nth-child(3)";

    private static final String ADD_TIME_SLOT_SELECTOR = "#root > main > div > section > button";

    private static final String ADD_TIME_SLOT_BUTTON_SELECTOR = "#addTimeSlotModal > div.flex.items-center.justify-end.shrink-0.flex-wrap.p-4.text-blue-gray-500 > button";

    private static final String USER_ERROR_SELECTOR = "#addTimeSlotModal > div.relative.p-4.text-blue-gray-500.antialiased.font-sans.text-base.font-light.leading-relaxed.space-y-4.pb-6 > div.bg-red-100.border.border-red-400.text-red-700.px-4.py-3.rounded > span";

    private static final String START_TIME = "300P"; // 03:00 PM

    private static final String END_TIME = "400P"; // 04:00 PM

    private static final String START_TIME_CONFLICT = "200P"; // 02:00 PM

    private static final String END_TIME_SHORT = "302P"; // 03:02 PM

    private static Date FUTURE_DATE;

    private static Date FUTURE_DATE_FAR;

    private static Date PAST_DATE;

    private static Date CONFLICT_DATE;

    private static final SimpleDateFormat DATE_FORMAT =  new SimpleDateFormat("MMddyyyy", Locale.ENGLISH);

    private static final SimpleDateFormat ERROR_DATE_FORMAT =  new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    static {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        cal.add(Calendar.DATE, 2);
        FUTURE_DATE = cal.getTime();
        Date pastDate = new Date();
        cal.setTime(pastDate);
        cal.add(Calendar.DATE, -1);
        PAST_DATE = cal.getTime();
        Date farDate = new Date();
        cal.setTime(farDate);
        cal.add(Calendar.DATE, 4);
        FUTURE_DATE_FAR = cal.getTime();
        Date overlap = new Date();
        cal.setTime(overlap);
        cal.add(Calendar.DATE, 3);
        CONFLICT_DATE = cal.getTime();
    }

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
        TestTimeSlots.driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        driver.switchTo().window(driver.getWindowHandle());
    }

    private static String addTimeSlot(String startDate, String startTime, String endDate, String endTime, boolean checkError) {
        setup();
        driver.get(BASE_URL + "login");


        // Find the username input element by its name
        WebElement element = driver.findElement(By.cssSelector(LOGIN_SELECTOR));
        try {
            Thread.sleep(4000);
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

        element = driver.findElement(By.cssSelector(COURTS_SELECTOR));
        element.click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignored) {}

        element = driver.findElement(By.cssSelector(COURT_SELECTOR));
        element.click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignored) {}

        element = driver.findElement(By.cssSelector(ADD_TIME_SLOT_SELECTOR));
        element.click();


        element = driver.findElement(By.name("startDate"));
        element.sendKeys(startDate);

        element = driver.findElement(By.name("startTime"));
        element.sendKeys(startTime);

        element = driver.findElement(By.name("endDate"));
        element.sendKeys(endDate);

        element = driver.findElement(By.name("endTime"));
        element.sendKeys(endTime);

        element = driver.findElement(By.name("price"));
        element.clear();
        element.sendKeys("5.00");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException ignorable) {}

        element = driver.findElement(By.cssSelector(ADD_TIME_SLOT_BUTTON_SELECTOR));
        element.click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException ignored) {}

        String result;
        if (checkError) {
            element = driver.findElement(By.cssSelector(USER_ERROR_SELECTOR));
            result = element.getText();
        } else {
            List<WebElement> elements = driver.findElements(By.cssSelector(ADD_TIME_SLOT_MODAL_SELECTOR));
            result = elements.isEmpty() ? "success" : "fail";
        }
        driver.quit();

        return result;
    }

    @Test
    public void testAddTimeSlot() {
        assertEquals("success",
                addTimeSlot(DATE_FORMAT.format(FUTURE_DATE), START_TIME, DATE_FORMAT.format(FUTURE_DATE), END_TIME, false));
    }

    @Test
    public void testPastDate() {
        assertEquals("Starting date and time has to be at least 30 minutes after the current time.",
                addTimeSlot(DATE_FORMAT.format(PAST_DATE), START_TIME, DATE_FORMAT.format(PAST_DATE), END_TIME, true));
    }

    @Test
    public void testShortSlot() {
        assertEquals("Time slot has to last at least 5 minutes",
                addTimeSlot(DATE_FORMAT.format(FUTURE_DATE), START_TIME, DATE_FORMAT.format(FUTURE_DATE), END_TIME_SHORT, true));
    }

    @Test
    public void testAddTimeSlotBig() {
        assertEquals("Start and end times have to be 24 hours apart at most.",
                addTimeSlot(DATE_FORMAT.format(FUTURE_DATE), START_TIME, DATE_FORMAT.format(FUTURE_DATE_FAR), END_TIME, true));
    }

    @Test
    public void testAddTimeSlotReverse() {
        assertEquals("Start date and time has to be earlier than end date and time.",
                addTimeSlot(DATE_FORMAT.format(FUTURE_DATE), END_TIME, DATE_FORMAT.format(FUTURE_DATE), START_TIME, true));
    }

    @Test
    public void testAddTimeSlotConflict() {
        addTimeSlot(DATE_FORMAT.format(CONFLICT_DATE), START_TIME, DATE_FORMAT.format(CONFLICT_DATE), END_TIME, false);
        assertEquals("Failed to add a time slot: there is a conflict with a slot starting at "
                        + ERROR_DATE_FORMAT.format(CONFLICT_DATE) + " 15:00 PM",
                addTimeSlot(DATE_FORMAT.format(CONFLICT_DATE), START_TIME_CONFLICT, DATE_FORMAT.format(CONFLICT_DATE), END_TIME, true));
    }
}
