(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-JM"] = $.extend(true, {}, en, {
        name: "en-JM",
        englishName: "English (Jamaica)",
        nativeName: "English (Jamaica)",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"],
                symbol: "J$"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                patterns: {
                    d: "dd/MM/yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy hh:mm tt",
                    F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
                    l: "dd/MM/yyyy hh:mm tt",
                    L: "dd/MM/yyyy hh:mm:ss tt"
                }
            })
        }
    }, regions["en-JM"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));