(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-CA"] = $.extend(true, {}, en, {
        name: "en-CA",
        englishName: "English (Canada)",
        nativeName: "English (Canada)",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"]
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
				firstWeekMin: 4,
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "MMMM-dd-yy",
                    f: "MMMM-dd-yy h:mm tt",
                    F: "MMMM-dd-yy h:mm:ss tt",
                    l: "dd/MM/yyyy h:mm tt",
                    L: "dd/MM/yyyy h:mm:ss tt"
                }
            })
        }
    }, regions["en-CA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));