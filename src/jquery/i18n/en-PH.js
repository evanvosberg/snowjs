(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["en-PH"] = $.extend(true, {}, en, {
        name: "en-PH",
        englishName: "English (Republic of the Philippines)",
        nativeName: "English (Philippines)",
        numberFormat: {
            currencies: {'':{
                symbol: "Php"
            }}
        }
    }, regions["en-PH"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));