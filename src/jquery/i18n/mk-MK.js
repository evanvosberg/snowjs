(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["mk-MK"] = $.extend(true, {}, en, {
        name: "mk-MK",
        englishName: "Macedonian (Former Yugoslav Republic of Macedonia)",
        nativeName: "македонски јазик (Македонија)",
        language: "mk",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "ден."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["недела","понеделник","вторник","среда","четврток","петок","сабота"],
                    namesAbbr: ["нед","пон","втр","срд","чет","пет","саб"],
                    namesShort: ["не","по","вт","ср","че","пе","са"]
                },
                months: {
                    names: ["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември",""],
                    namesAbbr: ["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd, dd MMMM yyyy HH:mm",
                    F: "dddd, dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "dd.MM.yyyy HH:mm",
                    L: "dd.MM.yyyy HH:mm:ss"
                }
            })
        }
    }, regions["mk-MK"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));