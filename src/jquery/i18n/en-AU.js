(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-AU"] = $.extend(true, {}, en, {
        name: "en-AU",
        englishName: "English (Australia)",
        nativeName: "English (Australia)",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"]
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                patterns: {
                    d: "d/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    f: "dddd, d MMMM yyyy h:mm tt",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "d/MM/yyyy h:mm tt",
                    L: "d/MM/yyyy h:mm:ss tt"
                }
            })
        }
    }, regions["en-AU"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));