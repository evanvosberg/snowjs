(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["ro"] = $.extend(true, {}, en, {
        name: "ro",
        englishName: "Romanian",
        nativeName: "română",
        language: "ro",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "lei"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["duminică","luni","marţi","miercuri","joi","vineri","sâmbătă"],
                    namesAbbr: ["D","L","Ma","Mi","J","V","S"],
                    namesShort: ["D","L","Ma","Mi","J","V","S"]
                },
                months: {
                    names: ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie",""],
                    namesAbbr: ["ian.","feb.","mar.","apr.","mai.","iun.","iul.","aug.","sep.","oct.","nov.","dec.",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d MMMM yyyy HH:mm",
                    F: "d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy",
                    l: "dd.MM.yyyy HH:mm",
                    L: "dd.MM.yyyy HH:mm:ss"
                }
            })
        }
    }, regions["ro"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));