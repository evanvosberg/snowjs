(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["se-NO"] = $.extend(true, {}, en, {
        name: "se-NO",
        englishName: "Sami, Northern (Norway)",
        nativeName: "davvisámegiella (Norga)",
        language: "se",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-%n","%n"],
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["$ -n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "kr"
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
                    d: "dd.MM.yyyy",
                    D: "MMMM d'. b. 'yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "MMMM d'. b. 'yyyy HH:mm",
                    F: "MMMM d'. b. 'yyyy HH:mm:ss",
                    M: "MMMM d'. b. '",
                    Y: "MMMM yyyy",
                    l: "dd.MM.yyyy HH:mm",
                    L: "dd.MM.yyyy HH:mm:ss"
                }
            })
        }
    }, regions["se-NO"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));