(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["ug-CN"] = $.extend(true, {}, en, {
        name: "ug-CN",
        englishName: "Uyghur (PRC)",
        nativeName: "ئۇيغۇرچە (جۇڭخۇا خەلق جۇمھۇرىيىتى)",
        language: "ug",
        isRTL: true,
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currencies: {'':{
                pattern: ["$-n","$n"],
                symbol: "¥"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                days: {
                    names: ["يەكشەنبە","دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"],
                    namesAbbr: ["يە","دۈ","سە","چا","پە","جۈ","شە"],
                    namesShort: ["ي","د","س","چ","پ","ج","ش"]
                },
                months: {
                    names: ["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""],
                    namesAbbr: ["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""]
                },
                AM: ["چۈشتىن بۇرۇن","چۈشتىن بۇرۇن","چۈشتىن بۇرۇن"],
                PM: ["چۈشتىن كېيىن","چۈشتىن كېيىن","چۈشتىن كېيىن"],
                eras: [{"name":"مىلادى","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-M-d",
                    D: "yyyy-'يىلى' MMMM d-'كۈنى،'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy-'يىلى' MMMM d-'كۈنى،' H:mm",
                    F: "yyyy-'يىلى' MMMM d-'كۈنى،' H:mm:ss",
                    M: "MMMM d'-كۈنى'",
                    Y: "yyyy-'يىلى' MMMM",
                    l: "yyyy-M-d H:mm",
                    L: "yyyy-M-d H:mm:ss"
                }
            })
        }
    }, regions["ug-CN"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));