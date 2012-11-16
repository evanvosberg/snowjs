(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-029"] = $.extend(true, {}, en, {
        name: "en-029",
        englishName: "English (Caribbean)",
        nativeName: "English (Caribbean)",
        numberFormat: {
            currencies: {'':{
                pattern: ["-$n","$n"]
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                patterns: {
                    d: "MM/dd/yyyy"
                }
            })
        }
    }, regions["en-029"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));