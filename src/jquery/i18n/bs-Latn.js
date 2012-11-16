(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["bs-Latn"] = $.extend(true, {}, en, {
        name: "bs-Latn",
        englishName: "Bosnian (Latin)",
        nativeName: "bosanski",
        language: "bs-Latn",
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
                symbol: "KM"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
                    namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
                    namesShort: ["ne","po","ut","sr","če","pe","su"]
                },
                months: {
                    names: ["januar","februar","mart","april","maj","juni","juli","avgust","septembar","oktobar","novembar","decembar",""],
                    namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy H:mm",
                    F: "d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, regions["bs-Latn"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));