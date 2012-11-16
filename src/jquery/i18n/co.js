(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["co"] = $.extend(true, {}, en, {
        name: "co",
        englishName: "Corsican",
        nativeName: "Corsu",
        language: "co",
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
                firstDay: 1,
                days: {
                    names: ["dumenica","luni","marti","mercuri","ghjovi","venderi","sabbatu"],
                    namesAbbr: ["dum.","lun.","mar.","mer.","ghj.","ven.","sab."],
                    namesShort: ["du","lu","ma","me","gh","ve","sa"]
                },
                months: {
                    names: ["ghjennaghju","ferraghju","marzu","aprile","maghju","ghjunghju","lugliu","aostu","settembre","ottobre","nuvembre","dicembre",""],
                    namesAbbr: ["ghje","ferr","marz","apri","magh","ghju","lugl","aost","sett","otto","nuve","dice",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"dopu J-C","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd d MMMM yyyy HH:mm",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy",
                    l: "dd/MM/yyyy HH:mm",
                    L: "dd/MM/yyyy HH:mm:ss"
                }
            })
        }
    }, regions["co"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));