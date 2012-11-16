(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["gsw"] = $.extend(true, {}, en, {
        name: "gsw",
        englishName: "Alsatian",
        nativeName: "Elsässisch",
        language: "gsw",
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
                    names: ["Sundàà","Mondàà","Dienschdàà","Mittwuch","Dunnerschdàà","Fridàà","Sàmschdàà"],
                    namesAbbr: ["Su.","Mo.","Di.","Mi.","Du.","Fr.","Sà."],
                    namesShort: ["Su","Mo","Di","Mi","Du","Fr","Sà"]
                },
                months: {
                    names: ["Jänner","Feverje","März","Àpril","Mai","Jüni","Jüli","Augscht","September","Oktower","Nowember","Dezember",""],
                    namesAbbr: ["Jän.","Fev.","März","Apr.","Mai","Jüni","Jüli","Aug.","Sept.","Okt.","Now.","Dez.",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"Vor J.-C.","start":null,"offset":0}],
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
    }, regions["gsw"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));