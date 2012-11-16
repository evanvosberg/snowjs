(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-GB"] = $.extend(true, {}, en, {
        name: "en-GB",
        englishName: "English (United Kingdom)",
        nativeName: "English (United Kingdom)",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"],
                symbol: "£"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "dd/MM/yyyy HH:mm",
                    L: "dd/MM/yyyy HH:mm:ss"
                }
            })
        }
    }, regions["en-GB"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));