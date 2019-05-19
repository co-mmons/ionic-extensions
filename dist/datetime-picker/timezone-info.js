var currentLocale;
export function timezoneInfo(tz, date) {
    if (!date) {
        date = new Date();
    }
    var format1 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: tz };
    var format2 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short", timeZone: tz };
    if (!currentLocale) {
        currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
    }
    try {
        var d = new Intl.DateTimeFormat(currentLocale, format1).format(date);
        var o = new Intl.DateTimeFormat(currentLocale, format2).format(date).replace(d, "").trim();
        return { id: tz, label: tz.replace("_", " ") + " (" + o + ")", date: d };
    }
    catch (error) {
        throw new Error("Invalid timezone. " + error);
        // console.log(error);
    }
}
//# sourceMappingURL=timezone-info.js.map