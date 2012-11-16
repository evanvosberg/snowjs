(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["se-FI"] = $.extend(true, {}, en, {
        name: "se-FI",
        englishName: "Sami, Northern (Finland)",
        nativeName: "davvisámegiella (Suopma)",
        language: "se",
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
                days: {
                    names: ["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorastat","bearjadat","lávvardat"],
                    namesAbbr: ["sotn","vuos","maŋ","gask","duor","bear","láv"],
                    namesShort: ["s","m","d","g","d","b","l"]
                },
                months: {
                    names: ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],
                    namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
                },
                monthsGenitive: {
                    names: ["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],
                    namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "MMMM d'. b. 'yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "MMMM d'. b. 'yyyy H:mm",
                    F: "MMMM d'. b. 'yyyy H:mm:ss",
                    M: "MMMM d'. b. '",
                    Y: "MMMM yyyy",
                    l: "d.M.yyyy H:mm",
                    L: "d.M.yyyy H:mm:ss"
                }
            })
        }
    }, regions["se-FI"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));