(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-ZA"] = $.extend(true, {}, en, {
        name: "en-ZA",
        englishName: "English (South Africa)",
        nativeName: "English (South Africa)",
        numberFormat: {
            ',': " ",
            percent: {
                pattern: ["-n%","n%"],
                ',': " "
            },
            currencies: {'':{
                pattern: ["$-n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "R"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dd MMMM yyyy hh:mm tt",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "yyyy/MM/dd hh:mm tt",
                    L: "yyyy/MM/dd hh:mm:ss tt"
                }
            })
        }
    }, regions["en-ZA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));