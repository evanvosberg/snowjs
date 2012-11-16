(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-ZW"] = $.extend(true, {}, en, {
        name: "en-ZW",
        englishName: "English (Zimbabwe)",
        nativeName: "English (Zimbabwe)",
        numberFormat: {
            currencies: {'':{
                symbol: "Z$"
            }}
        }
    }, regions["en-ZW"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));