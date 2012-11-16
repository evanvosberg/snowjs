(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["fy-NL"] = $.extend(true, {}, en, {
        name: "fy-NL",
        englishName: "Frisian (Netherlands)",
        nativeName: "Frysk (Nederlân)",
        language: "fy",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["$ -n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["Snein","Moandei","Tiisdei","Woansdei","Tongersdei","Freed","Sneon"],
                    namesAbbr: ["Sn","Mo","Ti","Wo","To","Fr","Sn"],
                    namesShort: ["S","M","T","W","T","F","S"]
                },
                months: {
                    names: ["jannewaris","febrewaris","maart","april","maaie","juny","july","augustus","septimber","oktober","novimber","desimber",""],
                    namesAbbr: ["jann","febr","mrt","apr","maaie","jun","jul","aug","sept","okt","nov","des",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d-M-yyyy",
                    D: "dddd d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd d MMMM yyyy H:mm",
                    F: "dddd d MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "d-M-yyyy H:mm",
                    L: "d-M-yyyy H:mm:ss"
                }
            })
        }
    }, regions["fy-NL"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));