(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["sr-Cyrl-BA"] = $.extend(true, {}, en, {
        name: "sr-Cyrl-BA",
        englishName: "Serbian (Cyrillic, Bosnia and Herzegovina)",
        nativeName: "српски (Босна и Херцеговина)",
        language: "sr-Cyrl",
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
                symbol: "КМ"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
                    namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
                    namesShort: ["н","п","у","с","ч","п","с"]
                },
                months: {
                    names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
                    namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"н.е.","start":null,"offset":0}],
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy H:mm",
                    F: "d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM"
                }
            })
        }
    }, regions["sr-Cyrl-BA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));