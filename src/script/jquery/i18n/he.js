(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["he"] = $.extend(true, {}, en, {
        name: "he",
        englishName: "Hebrew",
        nativeName: "עברית",
        language: "he",
        isRTL: true,
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currencies: {'':{
                pattern: ["$-n","$ n"],
                symbol: "₪"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],
                    namesAbbr: ["יום א","יום ב","יום ג","יום ד","יום ה","יום ו","שבת"],
                    namesShort: ["א","ב","ג","ד","ה","ו","ש"]
                },
                months: {
                    names: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר",""],
                    namesAbbr: ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ",""]
                },
                eras: [{"name":"לספירה","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd dd MMMM yyyy HH:mm",
                    F: "dddd dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "dd/MM/yyyy HH:mm",
                    L: "dd/MM/yyyy HH:mm:ss"
                }
            }),
            Hebrew: $.extend(true, {}, standard, {
                name: "Hebrew",
                '/': " ",
                days: {
                    names: ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],
                    namesAbbr: ["א","ב","ג","ד","ה","ו","ש"],
                    namesShort: ["א","ב","ג","ד","ה","ו","ש"]
                },
                months: {
                    names: ["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"],
                    namesAbbr: ["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"]
                },
                eras: [{"name":"C.E.","start":null,"offset":0}],
                twoDigitYearMax: 5790,
                patterns: {
                    d: "dd MMMM yyyy",
                    D: "dddd dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd dd MMMM yyyy HH:mm",
                    F: "dddd dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "dd MMMM yyyy HH:mm",
                    L: "dd MMMM yyyy HH:mm:ss"
                }
            })
        }
    }, regions["he"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));