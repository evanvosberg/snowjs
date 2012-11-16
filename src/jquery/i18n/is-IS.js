(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["is-IS"] = $.extend(true, {}, en, {
        name: "is-IS",
        englishName: "Icelandic (Iceland)",
        nativeName: "íslenska (Ísland)",
        language: "is",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                decimals: 0,
                ',': ".",
                '.': ",",
                symbol: "kr."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"],
                    namesAbbr: ["sun.","mán.","þri.","mið.","fim.","fös.","lau."],
                    namesShort: ["su","má","þr","mi","fi","fö","la"]
                },
                months: {
                    names: ["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember",""],
                    namesAbbr: ["jan.","feb.","mar.","apr.","maí","jún.","júl.","ágú.","sep.","okt.","nóv.","des.",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d. MMMM yyyy HH:mm",
                    F: "d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy",
                    l: "d.M.yyyy HH:mm",
                    L: "d.M.yyyy HH:mm:ss"
                }
            })
        }
    }, regions["is-IS"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));