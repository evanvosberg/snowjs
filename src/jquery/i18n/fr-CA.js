(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["fr-CA"] = $.extend(true, {}, en, {
        name: "fr-CA",
        englishName: "French (Canada)",
        nativeName: "français (Canada)",
        language: "fr",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["(n $)","n $"],
                ',': " ",
                '.': ","
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
				firstWeekMin: 4,
                days: {
                    names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
                    namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
                    namesShort: ["di","lu","ma","me","je","ve","sa"]
                },
                months: {
                    names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
                    namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d MMMM yyyy HH:mm",
                    F: "d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    l: "yyyy-MM-dd HH:mm",
                    L: "yyyy-MM-dd HH:mm:ss"
                }
            })
        }
    }, regions["fr-CA"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));