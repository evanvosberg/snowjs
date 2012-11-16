(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["da-DK"] = $.extend(true, {}, en, {
        name: "da-DK",
        englishName: "Danish (Denmark)",
        nativeName: "dansk (Danmark)",
        language: "da",
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
                symbol: "kr."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
				firstWeekMin: 4,
                days: {
                    names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
                    namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
                    namesShort: ["sø","ma","ti","on","to","fr","lø"]
                },
                months: {
                    names: ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december",""],
                    namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "d. MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d. MMMM yyyy HH:mm",
                    F: "d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy",
                    l: "dd-MM-yyyy HH:mm",
                    L: "dd-MM-yyyy HH:mm:ss"
                }
            })
        }
    }, regions["da-DK"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));