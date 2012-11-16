(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["fi-FI"] = $.extend(true, {}, en, {
        name: "fi-FI",
        englishName: "Finnish (Finland)",
        nativeName: "suomi (Suomi)",
        language: "fi",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "€"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
				firstWeekMin: 4,
                days: {
                    names: ["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],
                    namesAbbr: ["su","ma","ti","ke","to","pe","la"],
                    namesShort: ["su","ma","ti","ke","to","pe","la"]
                },
                months: {
                    names: ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu",""],
                    namesAbbr: ["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM'ta 'yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM'ta 'yyyy H:mm",
                    F: "d. MMMM'ta 'yyyy H:mm:ss",
                    M: "d. MMMM'ta'",
                    Y: "MMMM yyyy",
                    l: "d.M.yyyy H:mm",
                    L: "d.M.yyyy H:mm:ss"
                }
            })
        }
    }, regions["fi-FI"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));