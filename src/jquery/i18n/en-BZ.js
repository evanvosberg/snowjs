(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-BZ"] = $.extend(true, {}, en, {
        name: "en-BZ",
        englishName: "English (Belize)",
        nativeName: "English (Belize)",
        numberFormat: {
            currencies: {'':{
                groupSizes: [3,0],
                symbol: "BZ$"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, dd MMMM yyyy hh:mm tt",
                    F: "dddd, dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "dd/MM/yyyy hh:mm tt",
                    L: "dd/MM/yyyy hh:mm:ss tt"
                }
            })
        }
    }, regions["en-BZ"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));