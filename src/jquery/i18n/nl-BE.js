(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["nl-BE"] = $.extend(true, {}, en, {
        name: "nl-BE",
        englishName: "Dutch (Belgium)",
        nativeName: "Nederlands (België)",
        language: "nl",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
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
                firstDay: 1,
				firstWeekMin: 4,
                days: {
                    names: ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],
                    namesAbbr: ["zo","ma","di","wo","do","vr","za"],
                    namesShort: ["zo","ma","di","wo","do","vr","za"]
                },
                months: {
                    names: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december",""],
                    namesAbbr: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd d MMMM yyyy H:mm",
                    F: "dddd d MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "d/MM/yyyy H:mm",
                    L: "d/MM/yyyy H:mm:ss"
                }
            })
        }
    }, regions["nl-BE"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));