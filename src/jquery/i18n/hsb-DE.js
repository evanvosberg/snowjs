(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["hsb-DE"] = $.extend(true, {}, en, {
        name: "hsb-DE",
        englishName: "Upper Sorbian (Germany)",
        nativeName: "hornjoserbšćina (Němska)",
        language: "hsb",
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
                symbol: "€"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ". ",
                firstDay: 1,
                days: {
                    names: ["njedźela","póndźela","wutora","srjeda","štwórtk","pjatk","sobota"],
                    namesAbbr: ["nje","pón","wut","srj","štw","pja","sob"],
                    namesShort: ["n","p","w","s","š","p","s"]
                },
                months: {
                    names: ["januar","februar","měrc","apryl","meja","junij","julij","awgust","september","oktober","nowember","december",""],
                    namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]
                },
                monthsGenitive: {
                    names: ["januara","februara","měrca","apryla","meje","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],
                    namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"po Chr.","start":null,"offset":0}],
                patterns: {
                    d: "d. M. yyyy",
                    D: "dddd, 'dnja' d. MMMM yyyy",
                    t: "H.mm 'hodź.'",
                    T: "H:mm:ss",
                    f: "dddd, 'dnja' d. MMMM yyyy H.mm 'hodź.'",
                    F: "dddd, 'dnja' d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy",
                    l: "d. M. yyyy H.mm 'hodź.'",
                    L: "d. M. yyyy H:mm:ss"
                }
            })
        }
    }, regions["hsb-DE"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));