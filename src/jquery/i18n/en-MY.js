(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-MY"] = $.extend(true, {}, en, {
        name: "en-MY",
        englishName: "English (Malaysia)",
        nativeName: "English (Malaysia)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currencies: {'':{
                symbol: "RM"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    namesShort: ["S","M","T","W","T","F","S"]
                },
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d MMMM, yyyy",
                    f: "dddd, d MMMM, yyyy h:mm tt",
                    F: "dddd, d MMMM, yyyy h:mm:ss tt",
                    M: "d MMMM",
                    l: "d/M/yyyy h:mm tt",
                    L: "d/M/yyyy h:mm:ss tt"
                }
            })
        }
    }, regions["en-MY"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));