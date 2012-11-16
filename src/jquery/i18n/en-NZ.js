(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-NZ"] = $.extend(true, {}, en, {
        name: "en-NZ",
        englishName: "English (New Zealand)",
        nativeName: "English (New Zealand)",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"]
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
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
    }, regions["en-NZ"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));