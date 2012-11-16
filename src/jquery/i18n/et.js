(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["et"] = $.extend(true, {}, en, {
        name: "et",
        englishName: "Estonian",
        nativeName: "eesti",
        language: "et",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': " ",
                symbol: "kr"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"],
                    namesAbbr: ["P","E","T","K","N","R","L"],
                    namesShort: ["P","E","T","K","N","R","L"]
                },
                months: {
                    names: ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember",""],
                    namesAbbr: ["jaan","veebr","märts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets",""]
                },
                AM: ["EL","el","EL"],
                PM: ["PL","pl","PL"],
                patterns: {
                    d: "d.MM.yyyy",
                    D: "d. MMMM yyyy'. a.'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy'. a.' H:mm",
                    F: "d. MMMM yyyy'. a.' H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy'. a.'",
                    l: "d.MM.yyyy H:mm",
                    L: "d.MM.yyyy H:mm:ss"
                }
            })
        }
    }, regions["et"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));